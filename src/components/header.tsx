import Link from 'next/link'
import { FaPlane, FaUser, FaGlobe } from 'react-icons/fa'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <FaPlane className="text-blue-600 text-2xl" />
            <span className="text-xl font-bold text-blue-600">GotoGate</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/flights" className="text-gray-600 hover:text-blue-600">Flights</Link>
            <Link href="/deals" className="text-gray-600 hover:text-blue-600">Deals</Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600">About</Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-600 hover:text-blue-600">
              <FaGlobe className="mr-1" />
              EN
            </button>
            <button className="flex items-center text-gray-600 hover:text-blue-600">
              <FaUser className="mr-1" />
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}