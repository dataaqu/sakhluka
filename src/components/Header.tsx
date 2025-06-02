import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const navigationItems = [
    { href: "hero", label: "Home" },
    { href: "about", label: "About" },
    { href: "gallery", label: "Gallery" },
    { href: "book", label: "Book" },
    { href: "contact", label: "Contact" },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Calculate scroll offset for mobile to center sections
  const getMobileOffset = (sectionId: string) => {
    if (!isMobile) return -80 // Desktop offset for header with padding
    
    if (sectionId === "hero") return -320
    
    // For mobile, calculate dynamic offset to center content
    if (typeof window !== 'undefined') {
      return -window.innerHeight / 2 + 80 // Center minus some padding
    }
    return -320
  }

  // Advanced scroll configuration for cooler effects
  const scrollConfig = {
    spy: true,
    smooth: true,
    isDynamic: true,
    ignoreCancelEvents: false,
    spyThrottle: 500,
    delay: 100,
    hashSpy: true,
    saveHashHistory: true,
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-zinc-950 backdrop-blur-sm shadow-sm p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">Sakhluka</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                spy={scrollConfig.spy}
                smooth={scrollConfig.smooth}
                offset={item.href === "hero" ? 0 : -80}
                duration={1200}
                delay={scrollConfig.delay}
                isDynamic={scrollConfig.isDynamic}
                ignoreCancelEvents={scrollConfig.ignoreCancelEvents}
                spyThrottle={scrollConfig.spyThrottle}
                hashSpy={scrollConfig.hashSpy}
                saveHashHistory={scrollConfig.saveHashHistory}
                className="text-white hover:text-gray-900 px-4 py-3 rounded-md text-lg font-medium transition-all duration-300 hover:bg-zinc-100 cursor-pointer transform hover:scale-105"
                activeClass="text-blue-400 scale-105 font-bold"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-3 text-white hover:bg-zinc-800 hover:text-gray-300 focus:outline-none transition-colors duration-200"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Slides down from header */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 pt-4 pb-6 space-y-2 text-center bg-zinc-900 shadow-lg ">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                spy={scrollConfig.spy}
                smooth={scrollConfig.smooth}
                offset={getMobileOffset(item.href)}
                duration={1500}
                delay={scrollConfig.delay}
                isDynamic={scrollConfig.isDynamic}
                ignoreCancelEvents={scrollConfig.ignoreCancelEvents}
                spyThrottle={scrollConfig.spyThrottle}
                hashSpy={scrollConfig.hashSpy}
                saveHashHistory={scrollConfig.saveHashHistory}
                onClick={closeMenu}
                className="block px-4 py-3 rounded-md text-xl font-semibold text-white hover:text-gray-900 hover:bg-zinc-100 transition-all duration-300 cursor-pointer transform hover:scale-105"
                activeClass="text-blue-400 scale-105 font-bold"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
