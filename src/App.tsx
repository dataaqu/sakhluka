import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Hero, { WelcomeSection } from './components/Hero'
import About from './components/About'
import Loader from './components/Loader'
import { ParallaxScrollDemo } from './components/Gallery'
import Contact from './components/Contact'
import Book from './components/Book'
import BottomNavigation from './components/BottomNavigation'
import Footer from './components/Footer'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [theme, setTheme] = useState('dark')

  // Theme initialization and persistence
  useEffect(() => {
    const savedTheme = localStorage.getItem('sakhluka-theme') || 'dark'
    setTheme(savedTheme)
    
    // Ensure dark mode is applied to document from the start
    document.documentElement.classList.add('dark')
    
    // Apply theme to document
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Theme change handler
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem('sakhluka-theme', newTheme)
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleLoadComplete = () => {
    setIsLoading(false)
  }

  // Animation variants for sections
  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.2
      }
    }
  }

  // Enhanced staggered container for content
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  // Enhanced content animation variants
  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  }

  return (
    <>
      {/* Show loader while images are loading */}
      {isLoading && <Loader onLoadComplete={handleLoadComplete} />}
      
      {/* Main app content */}
      {!isLoading && (
        <motion.div 
          className="min-h-screen bg-background text-foreground scroll-smooth transition-colors duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Add decorative shapes to body */}
         
          
          <Header theme={theme} onThemeChange={handleThemeChange} />
          
          <Hero />
          <WelcomeSection theme={theme} />

     <About theme={theme} />
      {/* Gallery Section */}
      <motion.section 
        id="gallery" 
        className="bg-muted/30 relative py-20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div 
          className="text-center max-w-7xl mx-auto px-6"
          variants={containerVariants}
        >
       
        </motion.div>
          
        {/* Parallax Scroll Gallery */}
        <motion.div 
          variants={contentVariants}
          className="w-full"
        >
          <ParallaxScrollDemo theme={theme} />
        </motion.div>
      </motion.section>

      {/* Book Section */}
      <motion.section 
        id="book" 
        className="bg-background"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Book theme={theme} />
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact" 
        className="bg-background"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Contact theme={theme} />
      </motion.section>
  
            
      
      {/* Footer */}
      <Footer theme={theme} />
      
      <BottomNavigation theme={theme} />
        </motion.div>
      )}
    </>
  )
}



export default App
