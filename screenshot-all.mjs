import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const BASE_URL = 'http://localhost:3002';
const SCREENSHOT_DIR = './screenshots';

// Define viewports
const viewports = [
  { name: 'mobile-sm', width: 375, height: 667 },   // iPhone SE
  { name: 'mobile-lg', width: 428, height: 926 },   // iPhone 14 Pro Max
  { name: 'tablet', width: 768, height: 1024 },     // iPad
  { name: 'desktop', width: 1440, height: 900 },    // Desktop
];

// Define pages
const pages = [
  { name: 'home', path: '/' },
  { name: 'work', path: '/work' },
  { name: 'contact', path: '/contact' },
];

// Wait for all content to load (images, videos, fonts)
async function waitForContentLoad(page) {
  await page.evaluate(async () => {
    // Wait for all images to load
    const images = Array.from(document.querySelectorAll('img'));
    await Promise.all(images.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve, reject) => {
        img.addEventListener('load', resolve);
        img.addEventListener('error', resolve); // Don't fail on error, just continue
        // Timeout after 10s per image
        setTimeout(resolve, 10000);
      });
    }));

    // Wait for all videos to have loaded metadata
    const videos = Array.from(document.querySelectorAll('video'));
    await Promise.all(videos.map(video => {
      if (video.readyState >= 1) return Promise.resolve(); // HAVE_METADATA or higher
      return new Promise((resolve) => {
        video.addEventListener('loadedmetadata', resolve);
        video.addEventListener('error', resolve);
        setTimeout(resolve, 10000);
      });
    }));

    // Wait for fonts to load
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    // Wait for any lazy-loaded content
    await new Promise(resolve => setTimeout(resolve, 500));
  });
}

async function captureScreenshots() {
  console.log('Starting screenshot capture...\n');

  // Create screenshot directory
  await mkdir(SCREENSHOT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  for (const viewport of viewports) {
    console.log(`\n📱 Viewport: ${viewport.name} (${viewport.width}x${viewport.height})`);

    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
    });
    const page = await context.newPage();

    for (const pageInfo of pages) {
      console.log(`  📸 Capturing ${pageInfo.name} page...`);

      const url = `${BASE_URL}${pageInfo.path}`;

      // Navigate and wait for network to be idle
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

      // Wait for all content (images, videos, fonts) to load
      console.log(`    ⏳ Waiting for content to load...`);
      await waitForContentLoad(page);

      // Wait for animations to settle
      await page.waitForTimeout(2000);

      // Force animations to complete by triggering scroll
      await page.evaluate(() => window.scrollTo(0, 1));
      await page.waitForTimeout(300);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);

      // Above-the-fold screenshot (viewport only)
      const viewportFile = join(SCREENSHOT_DIR, `${pageInfo.name}-${viewport.name}-viewport.png`);
      await page.screenshot({ path: viewportFile });
      console.log(`    ✓ Viewport: ${viewportFile}`);

      // Scroll through entire page to trigger all animations (slower for reliability)
      await page.evaluate(async () => {
        const scrollHeight = document.body.scrollHeight;
        const viewportHeight = window.innerHeight;
        let currentPosition = 0;

        // Smaller increments and longer delays for reliable animation triggering
        while (currentPosition < scrollHeight) {
          currentPosition += viewportHeight * 0.5;
          window.scrollTo({ top: currentPosition, behavior: 'instant' });
          await new Promise(resolve => setTimeout(resolve, 400));
        }

        // Wait at bottom for animations to complete
        await new Promise(resolve => setTimeout(resolve, 500));

        // Scroll back to top
        window.scrollTo({ top: 0, behavior: 'instant' });
        await new Promise(resolve => setTimeout(resolve, 500));
      });
      await page.waitForTimeout(1500);

      // Full page screenshot (after triggering all animations)
      const fullpageFile = join(SCREENSHOT_DIR, `${pageInfo.name}-${viewport.name}-fullpage.png`);
      await page.screenshot({ path: fullpageFile, fullPage: true });
      console.log(`    ✓ Full page: ${fullpageFile}`);

      // Capture specific sections for work page
      if (pageInfo.name === 'work') {
        // Scroll to video section and capture
        await page.evaluate(() => {
          const videoSection = document.querySelector('h2');
          if (videoSection) videoSection.scrollIntoView({ block: 'start' });
        });
        await page.waitForTimeout(500);
        const videoFile = join(SCREENSHOT_DIR, `${pageInfo.name}-${viewport.name}-video-section.png`);
        await page.screenshot({ path: videoFile });
        console.log(`    ✓ Video section: ${videoFile}`);

        // Scroll to photo gallery
        await page.evaluate(() => {
          const photoHeading = Array.from(document.querySelectorAll('h2')).find(h => h.textContent?.includes('PHOTO'));
          if (photoHeading) photoHeading.scrollIntoView({ block: 'start' });
        });
        await page.waitForTimeout(500);
        const galleryFile = join(SCREENSHOT_DIR, `${pageInfo.name}-${viewport.name}-gallery-section.png`);
        await page.screenshot({ path: galleryFile });
        console.log(`    ✓ Gallery section: ${galleryFile}`);

        // Scroll to CTA section
        await page.evaluate(() => {
          const ctaHeading = Array.from(document.querySelectorAll('h2')).find(h => h.textContent?.includes('CREATE'));
          if (ctaHeading) ctaHeading.scrollIntoView({ block: 'center' });
        });
        await page.waitForTimeout(500);
        const ctaFile = join(SCREENSHOT_DIR, `${pageInfo.name}-${viewport.name}-cta-section.png`);
        await page.screenshot({ path: ctaFile });
        console.log(`    ✓ CTA section: ${ctaFile}`);
      }

      // Capture specific sections for home page
      if (pageInfo.name === 'home') {
        // Scroll to about section
        await page.evaluate(() => {
          const aboutHeading = document.querySelector('h2');
          if (aboutHeading) aboutHeading.scrollIntoView({ block: 'start' });
        });
        await page.waitForTimeout(500);
        const aboutFile = join(SCREENSHOT_DIR, `${pageInfo.name}-${viewport.name}-about-section.png`);
        await page.screenshot({ path: aboutFile });
        console.log(`    ✓ About section: ${aboutFile}`);
      }
    }

    await context.close();
  }

  await browser.close();
  console.log('\n✅ All screenshots captured successfully!');
  console.log(`📁 Screenshots saved to: ${SCREENSHOT_DIR}/`);
}

captureScreenshots().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
