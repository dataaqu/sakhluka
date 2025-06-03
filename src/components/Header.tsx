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
    
    // For mobile, use more specific offsets for better positioning
    switch (sectionId) {
      case "hero":
        return -40 // Show more of the hero section on mobile
      case "about":
        return -80 // Better positioning for About section  
      case "gallery":
        return -80
      case "book":
        return -80
      case "contact":
        return -80
      default:
        return -80
    }
  }

  // Enhanced scroll configuration with better mobile support
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

  // Mobile-specific scroll configuration
  const mobileScrollConfig = {
    ...scrollConfig,
    duration: isMobile ? 1800 : 1200, // Slower on mobile for better UX
    delay: isMobile ? 200 : 100, // Slightly more delay on mobile
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-zinc-950 backdrop-blur-sm p-6">
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
              className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <div className="w-6 h-6 relative">
                <span
                  className={`absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
                    isMenuOpen ? 'rotate-45 translate-y-2.5' : 'translate-y-1'
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out translate-y-2.5 ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
                    isMenuOpen ? '-rotate-45 translate-y-2.5' : 'translate-y-4'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Slides down from header */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 pt-4 pb-6 space-y-2 text-center bg-zinc-950  ">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                spy={mobileScrollConfig.spy}
                smooth={mobileScrollConfig.smooth}
                offset={getMobileOffset(item.href)}
                duration={mobileScrollConfig.duration}
                delay={mobileScrollConfig.delay}
                isDynamic={mobileScrollConfig.isDynamic}
                ignoreCancelEvents={mobileScrollConfig.ignoreCancelEvents}
                spyThrottle={mobileScrollConfig.spyThrottle}
                hashSpy={mobileScrollConfig.hashSpy}
                saveHashHistory={mobileScrollConfig.saveHashHistory}
                onClick={closeMenu}
                className="block px-4 py-3 rounded-md text-xl font-semibold text-white hover:text-gray-900 hover:bg-zinc-100 transition-all duration-300 cursor-pointer transform hover:scale-105"
                activeClass=" scale-105 font-bold"
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
