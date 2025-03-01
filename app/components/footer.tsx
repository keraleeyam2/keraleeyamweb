import Link from 'next/link'

export default function Footer() {
  const socialLinks = [
    { name: 'YouTube', href: '#' },
    { name: 'LinkedIn', href: '#' },
    { name: 'Twitter', href: '#' },
    { name: 'Facebook', href: '#' },
    { name: 'Instagram', href: '#' },
    { name: 'Dribbble', href: '#' }
  ]

  return (
    <footer className="bg-white">
      <div className="container py-15">
        <div className="text-center">
          <div className="text-xl font-bold mb-6">KERALEEYAM</div>
          <nav className="mb-8">
            <ul className="flex justify-center gap-8">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-gray-600">
            Copyright © 2025, Keraleeyam. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

