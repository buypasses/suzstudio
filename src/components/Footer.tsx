interface FooterProps {
  className?: string
}

export default function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={`py-3 px-6 lg:px-12 border-t border-border ${className}`}>
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Suz&apos;s Studio. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
