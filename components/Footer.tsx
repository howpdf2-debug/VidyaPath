import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-400 pt-12 pb-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">📚</span>
            <span className="font-bold text-white text-lg">VidyaPath</span>
          </div>
          <p className="text-sm">India's free study portal – NCERT, CBSE, Sarkari Naukri, and more.</p>
          <div className="flex gap-2 mt-4">
            <span className="text-xs bg-gray-800 px-2 py-1 rounded">📱 Free</span>
            <span className="text-xs bg-gray-800 px-2 py-1 rounded">🇮🇳 Made in India</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/ncert">NCERT Solutions</Link></li>
            <li><Link href="/cbse">CBSE Papers</Link></li>
            <li><Link href="/state-boards">State Boards</Link></li>
            <li><Link href="/icse">ICSE / ISC</Link></li>
          </ul>
        </div>

        {/* Students */}
        <div>
          <h4 className="text-white font-semibold mb-3">Students</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/sarkari-naukri">Sarkari Naukri</Link></li>
            <li><Link href="/career">Career Guide</Link></li>
            <li><Link href="/results">Results Live</Link></li>
            <li><Link href="/tools">Study Tools</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Use</Link></li>
            <li><Link href="/dmca">DMCA / Copyright</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-500 pt-8 mt-8 border-t border-gray-800">
        © {currentYear} VidyaPath – Free Education for All
      </div>
    </footer>
  )
}