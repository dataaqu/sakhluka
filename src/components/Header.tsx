import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-scroll'
import { motion } from 'framer-motion'
import { FiMoon, FiSun, FiGlobe } from 'react-icons/fi'

const TOGGLE_CLASSES =
  "text-xs font-medium flex items-center gap-1 px-2 md:px-3 py-1.5 md:py-1 transition-colors relative z-10";

interface HeaderProps {
  theme: string;
  onThemeChange: (theme: string) => void;
}

const Header = ({ theme, onThemeChange }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [language, setLanguage] = useState("EN")

  // Mobile detection and persistence
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Load saved language preference
    const savedLanguage = localStorage.getItem('sakhluka-language') || 'EN'
    setLanguage(savedLanguage)
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Save language preference when it changes
  useEffect(() => {
    localStorage.setItem('sakhluka-language', language)
  }, [language])

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

  // Theme Toggle Component
  const ThemeToggle = () => {
    const themeSliderPosition = useMemo(() => ({
      x: theme === "dark" ? "100%" : "0%",
    }), [theme]);

    return (
      <div className={`relative flex w-fit items-center rounded-full backdrop-blur-sm border-2 ${
        theme === "light" ? "border-black" : "border-white"
      }`}>
        {/* Sliding background div */}
        <motion.div
          className={`absolute top-0 h-full w-1/2 rounded-full ${
            theme === "dark" ? "bg-white" : "bg-black"
          }`}
          animate={themeSliderPosition}
          initial={false}
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
        />
        
        <button
          className={`${TOGGLE_CLASSES} ${
            theme === "light" 
              ? "text-white" 
              : "text-muted-foreground"
          }`}
          onClick={() => onThemeChange("light")}
        >
          <FiSun className="relative z-10 text-sm" />
          <span className="relative z-10 hidden sm:inline"></span>
        </button>
        
        <button
          className={`${TOGGLE_CLASSES} ${
            theme === "dark" 
              ? "text-black" 
              : "text-muted-foreground"
          }`}
          onClick={() => onThemeChange("dark")}
        >
          <FiMoon className="relative z-10 text-sm" />
          <span className="relative z-10 hidden sm:inline"></span>
        </button>
      </div>
    );
  };

  // Language Toggle Component
  const LanguageToggle = () => {
    const languageSliderPosition = useMemo(() => ({
      x: language === "ქარ" ? "100%" : "0%",
    }), [language]);

    return (
      <div className={`relative flex w-fit items-center rounded-full backdrop-blur-sm border-2 ${
        theme === "dark" ? "border-white" : "border-black"
      }`}>
        {/* Sliding background div */}
        <motion.div
          className={`absolute top-0 h-full w-1/2 rounded-full ${
            theme === "dark" ? "bg-white" : "bg-black"
          }`}
          animate={languageSliderPosition}
          initial={false}
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
        />
        
        <button
          className={`${TOGGLE_CLASSES} ${
            language === "EN" 
              ? (theme === "dark" ? "text-black" : "text-white") 
              : "text-muted-foreground"
          }`}
          onClick={() => setLanguage("EN")}
        >
          <FiGlobe className="relative z-10 text-sm" />
          <span className="relative z-10">EN</span>
        </button>
        
        <button
          className={`${TOGGLE_CLASSES} ${
            language === "ქარ" 
              ? (theme === "dark" ? "text-black" : "text-white") 
              : "text-muted-foreground"
          }`}
          onClick={() => setLanguage("ქარ")}
        >
          <FiGlobe className="relative z-10 text-sm" />
          <span className="relative z-10">ქარ</span>
        </button>
      </div>
    );
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm p-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-foreground">Sakhluka</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
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
                className="text-muted-foreground hover:text-foreground px-4 py-3 rounded-md text-lg font-semibold transition-all duration-300 hover:bg-accent cursor-pointer transform hover:scale-105"
                activeClass="text-primary scale-105 font-bold"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Desktop Toggle Buttons */}
            <div className="flex items-center space-x-3 ml-4">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-foreground hover:text-muted-foreground focus:outline-none focus:text-muted-foreground"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <div className="w-6 h-6 relative mt-4" >
                <span
                  className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                    isMenuOpen ? 'rotate-45 translate-y-2.5' : 'translate-y-1'
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out translate-y-2.5 ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                    isMenuOpen ? '-rotate-45 translate-y-2.5' : 'translate-y-4'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Slides down from header */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 pt-4 pb-6 space-y-3 text-center bg-background border-t border-border">
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
                className="block px-4 py-3 rounded-md text-xl font-semibold text-foreground hover:text-accent-foreground hover:bg-accent transition-all duration-300 cursor-pointer transform hover:scale-105"
                activeClass="text-primary scale-105 font-bold"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Toggle Buttons */}
            <div className="flex items-center justify-center space-x-4 pt-6 border-t border-border mt-4 pb-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
