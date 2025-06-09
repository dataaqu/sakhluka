import { useState } from 'react'
import { Link } from 'react-scroll'
import { motion } from 'framer-motion'
import { 
  FiHome, 
  FiInfo, 
  FiImage, 
  FiCalendar, 
  FiMail 
} from 'react-icons/fi'

interface BottomNavigationProps {
  theme?: string;
}

const BottomNavigation = ({ theme }: BottomNavigationProps) => {
  const [activeSection, setActiveSection] = useState('hero')

  const navigationItems = [
    { 
      href: "hero", 
      label: "Home", 
      icon: FiHome,
      bgColor: theme === 'light' ? 'bg-blue-100/50' : 'bg-white/20',
      textColor: theme === 'light' ? 'text-blue-700' : 'text-white',
      dotColor: theme === 'light' ? 'bg-blue-700' : 'bg-white'
    },
    { 
      href: "about", 
      label: "About", 
      icon: FiInfo,
      bgColor: theme === 'light' ? 'bg-blue-100/50' : 'bg-white/20',
      textColor: theme === 'light' ? 'text-blue-700' : 'text-white',
      dotColor: theme === 'light' ? 'bg-blue-700' : 'bg-white'
    },
    { 
      href: "gallery", 
      label: "Gallery", 
      icon: FiImage,
      bgColor: theme === 'light' ? 'bg-blue-100/50' : 'bg-white/20',
      textColor: theme === 'light' ? 'text-blue-700' : 'text-white',
      dotColor: theme === 'light' ? 'bg-blue-700' : 'bg-white'
    },
    { 
      href: "book", 
      label: "Book", 
      icon: FiCalendar,
      bgColor: theme === 'light' ? 'bg-blue-100/50' : 'bg-white/20',
      textColor: theme === 'light' ? 'text-blue-700' : 'text-white',
      dotColor: theme === 'light' ? 'bg-blue-700' : 'bg-white'
    },
    { 
      href: "contact", 
      label: "Contact", 
      icon: FiMail,
      bgColor: theme === 'light' ? 'bg-blue-100/50' : 'bg-white/20',
      textColor: theme === 'light' ? 'text-blue-700' : 'text-white',
      dotColor: theme === 'light' ? 'bg-blue-700' : 'bg-white'
    },
  ]

  // Handle active section detection
  const handleSetActive = (section: string) => {
    setActiveSection(section)
  }

  // Mobile offset calculation (similar to Header component)
  const getMobileOffset = (sectionId: string) => {
    switch (sectionId) {
      case "hero":
        return -40
      case "about":
        return -80
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

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1 
      }}
      transition={{ 
        type: "spring", 
        damping: 25, 
        stiffness: 300,
        duration: 0.3 
      }}
    >
      <div 
        className={`
          backdrop-blur-lg 
          ${theme === 'light' ? 'border-gray-300' : 'border-slate-800'} border
          rounded-full px-4 py-3 shadow-2xl
          flex items-center justify-center space-x-1
        `}
        style={{
          backgroundColor: theme === 'light' ? '#efdec4' : '#0f172a'
        }}
      >
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.href
          
          return (
            <Link
              key={item.href}
              to={item.href}
              href={`#${item.href}`}
              spy={true}
              smooth={true}
              offset={getMobileOffset(item.href)}
              duration={800}
              delay={50}
              onSetActive={() => handleSetActive(item.href)}
              className="relative cursor-pointer"
            >
              <motion.div
                className={`
                  relative p-3 rounded-full transition-all duration-200
                  ${isActive 
                    ? '' // No base background when active since we use the animated background
                    : `hover:${theme === 'light' ? 'bg-blue-100/30' : 'bg-white/10'}`
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: isActive ? 1.02 : 1,
                }}
                transition={{ type: "spring", damping: 20, stiffness: 400 }}
              >
                {/* Active indicator background with instant animation */}
                {isActive && (
                  <motion.div
                    className={`absolute inset-0 rounded-full ${item.bgColor}`}
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1, opacity: 0 }}
                    transition={{ 
                      duration: 0
                    }}
                  />
                )}
                
                {/* Icon with instant color transitions */}
                <Icon 
                  className={`
                    relative z-10 text-lg
                    ${isActive 
                      ? item.textColor
                      : ''
                    }
                  `}
                  style={{
                    color: !isActive 
                      ? (theme === 'light' ? '#3154cf' : '#9ca3af')
                      : undefined
                  }}
                />
                
                {/* Active indicator dot with instant animation */}
                {isActive && (
                  <motion.div
                    className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${item.dotColor}`}
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ 
                      duration: 0
                    }}
                  />
                )}
              </motion.div>
            </Link>
          )
        })}
      </div>
    </motion.div>
  )
}

export default BottomNavigation
