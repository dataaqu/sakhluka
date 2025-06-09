import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-scroll'
import { motion } from 'framer-motion'
import { FiMoon, FiSun, FiGlobe } from 'react-icons/fi'
import lightLogo from '../assets/light.png'
import darkLogo from '../assets/dark.png'



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
    hashSpy: false,
    saveHashHistory: false,
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
      <div className={`relative flex w-fit items-center rounded-full backdrop-blur-sm"
      }`}>
        {/* Sliding background div */}
        <motion.div
          className="absolute top-0 h-full w-1/2 rounded-full"
          style={{
            backgroundColor: theme === "light" ? "#3154cf" : "white",
            opacity: 1,
            boxShadow: theme === "dark" 
              ? "0 0 20px rgba(255, 255, 255, 0.3)" 
              : "0 0 20px rgba(0, 0, 0, 0.1)",
            transformPerspective: "1000px"
          }}
          animate={{
            x: themeSliderPosition.x,
            scale: [1, 1.1, 1],
            rotateY: [0, 5, 0],
          }}
          initial={false}
          transition={{ 
            type: "spring", 
            damping: 10, 
            stiffness: 350,
            mass: 0.6,
            scale: { duration: 0.3 },
            rotateY: { duration: 0.4 },
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: theme === "dark" 
              ? "0 0 30px rgba(255, 255, 255, 0.5)" 
              : "0 0 30px rgba(0, 0, 0, 0.1)"
          }}
        />
        
        <motion.button
          className={TOGGLE_CLASSES}
          style={{
            color: theme === "light" ? "white" : "white"
          }}
          onClick={() => onThemeChange("light")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            scale: theme === "light" ? 1.1 : 1,
          }}
          transition={{ type: "spring", damping: 15, stiffness: 300 }}
        >
          <FiSun className="relative z-10 text-sm" />
          <span className="relative z-10 hidden sm:inline"></span>
        </motion.button>
        
        <motion.button
          className={TOGGLE_CLASSES}
          style={{
            color: theme === "dark" ? "black" : "#3154cf"
          }}
          onClick={() => onThemeChange("dark")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            scale: theme === "dark" ? 1.1 : 1,
          }}
          transition={{ type: "spring", damping: 15, stiffness: 300 }}
        >
          <FiMoon className="relative z-10 text-sm" />
          <span className="relative z-10 hidden sm:inline"></span>
        </motion.button>
      </div>
    );
  };

  // Language Toggle Component
  const LanguageToggle = () => {
    const languageSliderPosition = useMemo(() => ({
      x: language === "ქარ" ? "100%" : "0%",
    }), [language]);

    return (
      <div className={`relative flex w-fit items-center rounded-full backdrop-blur-sm"
      }`}>
        {/* Sliding background div */}
        <motion.div
          className="absolute top-0 h-full w-1/2 rounded-full"
          style={{
            backgroundColor: theme === "light" ? "#3154cf" : "white",
            opacity: 1,
            boxShadow: theme === "dark" 
              ? "0 0 20px rgba(255, 255, 255, 0.3)" 
              : "0 0 20px rgba(0, 0, 0, 0.1)",
            transformPerspective: "1000px"
          }}
          animate={{
            x: languageSliderPosition.x,
            scale: [1, 1.1, 1],
            rotateY: [0, 5, 0],
          }}
          initial={false}
          transition={{ 
            type: "spring", 
            damping: 10, 
            stiffness: 350,
            mass: 0.6,
            scale: { duration: 0.3 },
            rotateY: { duration: 0.4 },
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: theme === "dark" 
              ? "0 0 30px rgba(255, 255, 255, 0.5)" 
              : "0 0 30px rgba(0, 0, 0, 0.1)"
          }}
        />
        
        <motion.button
          className={`${TOGGLE_CLASSES} ${
            language === "EN" 
              ? (theme === "dark" ? "text-black" : "text-white") 
              : ""
          }`}
          style={{
            color: language !== "EN" && theme === "light" ? "#3154cf" : undefined
          }}
          onClick={() => setLanguage("EN")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            scale: language === "EN" ? 1.1 : 1,
          }}
          transition={{ type: "spring", damping: 15, stiffness: 300 }}
        >
          <FiGlobe className="relative z-10 text-sm" />
          <span className="relative z-10">EN</span>
        </motion.button>
        
        <motion.button
          className={`${TOGGLE_CLASSES} ${
            language === "ქარ" 
              ? (theme === "dark" ? "text-black" : "text-white") 
              : ""
          }`}
          style={{
            color: language !== "ქარ" && theme === "light" ? "#3154cf" : undefined
          }}
          onClick={() => setLanguage("ქარ")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            scale: language === "ქარ" ? 1.1 : 1,
          }}
          transition={{ type: "spring", damping: 15, stiffness: 300 }}
        >
          <FiGlobe className="relative z-10 text-sm" />
          <span className="relative z-10">ქარ</span>
        </motion.button>
      </div>
    );
  };

  return (
    <>
      <header className={`sticky top-0 z-50 w-full backdrop-blur-sm py-2 px-6 transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-slate-900/90 border-b border-slate-800' 
          : 'border-b border-gray-200'
      }`}
      style={{
        backgroundColor: theme === 'light' ? '#efdec4' : undefined
      }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={theme === 'dark' ? darkLogo : lightLogo} 
              alt="Sakhluka Logo" 
              className="h-40 w-40 md:h-24 md:w-24 object-contain"
              style={{
                filter: theme === 'light' ? 'brightness(0) saturate(100%) invert(21%) sepia(82%) saturate(2048%) hue-rotate(217deg) brightness(95%) contrast(89%)' : undefined
              }}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                href={`#${item.href}`}
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
                className={`px-4 py-3 rounded-md text-lg font-semibold transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-white hover:bg-slate-800' 
                    : 'hover:bg-gray-100'
                }`}
                style={{
                  color: theme === 'light' ? '#3154cf' : undefined
                }}
                activeClass={`scale-105 font-bold ${
                  theme === 'dark' ? 'text-blue-400' : ''
                }`}
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
                href={`#${item.href}`}
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
                className={`block px-4 py-3 rounded-md text-xl font-semibold transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  theme === 'dark' 
                    ? 'text-foreground hover:text-accent-foreground hover:bg-accent' 
                    : 'hover:bg-accent'
                }`}
                style={{
                  color: theme === 'light' ? '#3154cf' : undefined
                }}
                activeClass={`scale-105 font-bold ${
                  theme === 'dark' ? 'text-primary' : ''
                }`}
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
      
      {/* Custom styles for active states in light theme */}
      {theme === 'light' && (
        <style dangerouslySetInnerHTML={{
          __html: `
            .react-scroll-active-class {
              color: #3154cf !important;
              font-weight: bold !important;
            }
          `
        }} />
      )}
    </>
  )
}

export default Header
