export default function Footer() {
  const socialLinks = [
    { name: 'YouTube', href: 'https://youtube.com/@keraleeyam-c1d?si=TSRSvVIQCnYQU4qS' },
    { name: 'Facebook', href: 'https://www.facebook.com/share/1CZczq5RXL/?mibextid=wwXIfr' },
    { name: 'Instagram', href: 'https://www.instagram.com/pjc_keraleeyam?igsh=bjd6MnYxN3BsOG8w' },
  ]

  return (
    <footer className="bg-white">
      <div className="container py-15">
        <div className="text-center">
          <div className="text-xl mb-6">KERALEEYAM</div>
          <nav className="mb-8">
            <ul className="flex justify-center gap-8">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </a>
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
