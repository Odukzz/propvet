import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function SharedFooter() {
  const footerLinkClass =
    "text-sm transition-all duration-300 ease-in-out hover:text-green-600 hover:scale-105"

  return (
    <footer className="border-t bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/propvetlogo.png"
                alt="Logo"
                width={175}
                height={60.97}
                className="rounded"
              />
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Abuja's trusted property verification platform
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <nav className="flex flex-col space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <Link href="/about" className={footerLinkClass}>About</Link>
              <Link href="/blog" className={footerLinkClass}>Blog</Link>
              <Link href="/pricing" className={footerLinkClass}>Pricing</Link>
              <Link href="/contact" className={footerLinkClass}>Contact</Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <nav className="flex flex-col space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <Link href="/privacy" className={footerLinkClass}>Privacy Policy</Link>
              <Link href="/terms" className={footerLinkClass}>Terms of Use</Link>
              <Link href="/compliance" className={footerLinkClass}>NDPR Compliance</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <div className="flex flex-col space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-600" />
                <span>info@platformplaceholder.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-600" />
                <span>+234 812 345 6789</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-600" />
                <span>Central Area, Abuja, Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t pt-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © 2025 Imgholder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}