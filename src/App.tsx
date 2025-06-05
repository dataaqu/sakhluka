import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import { SmoothScrollHero } from './components/Hero'
import About from './components/About'
import Loader from './components/Loader'
import { ParallaxScrollDemo } from './components/Gallery'
import BottomNavigation from './components/BottomNavigation'



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
          
          <SmoothScrollHero />

     <About />
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
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-foreground mb-6"
            variants={contentVariants}
          >
            Our cabin, inside and out — a visual journey
          </motion.h2>
        </motion.div>
          
        {/* Parallax Scroll Gallery */}
        <motion.div 
          variants={contentVariants}
          className="w-full"
        >
          <ParallaxScrollDemo />
        </motion.div>
      </motion.section>

      {/* Book Section */}
      <motion.section 
        id="book" 
        className="min-h-screen flex items-center justify-center bg-background"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div 
          className="text-center max-w-4xl mx-auto px-6"
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
            variants={contentVariants}
            whileHover={{ 
              scale: 1.05,
              color: theme === 'dark' ? "#f87171" : "#DC2626",
              transition: { duration: 0.3 }
            }}
          >
            Availability
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8"
            variants={contentVariants}
          >
            Check our availability and book your stay
          </motion.p>
          
          <motion.button
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-8 rounded-lg text-lg transition-colors"
            variants={contentVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: theme === 'dark' 
                ? "0 10px 25px rgba(255, 255, 255, 0.1)" 
                : "0 10px 25px rgba(59, 130, 246, 0.3)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            Check Availability
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact" 
        className="min-h-screen flex items-center justify-center bg-muted/30 relative"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div 
          className="text-center max-w-4xl mx-auto px-6"
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
            variants={contentVariants}
            whileHover={{ 
              scale: 1.05,
              color: theme === 'dark' ? "#a78bfa" : "#7C3AED",
              transition: { duration: 0.3 }
            }}
          >
            Contact
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8"
            variants={contentVariants}
          >
            Get in touch with us to plan your perfect getaway
          </motion.p>

          {/* Contact cards */}
          <motion.div 
            className="grid md:grid-cols-3 gap-6 mt-8"
            variants={containerVariants}
          >
            <motion.div
              className="bg-card border border-border p-6 rounded-lg shadow-lg"
              variants={contentVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow: theme === 'dark' 
                  ? "0 20px 40px rgba(255,255,255,0.05)" 
                  : "0 20px 40px rgba(0,0,0,0.1)",
                transition: { duration: 0.3 }
              }}
            >
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">Phone</h3>
              <p className="text-muted-foreground">+995 XXX XXX XXX</p>
            </motion.div>

            <motion.div
              className="bg-card border border-border p-6 rounded-lg shadow-lg"
              variants={contentVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow: theme === 'dark' 
                  ? "0 20px 40px rgba(255,255,255,0.05)" 
                  : "0 20px 40px rgba(0,0,0,0.1)",
                transition: { duration: 0.3 }
              }}
            >
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">Email</h3>
              <p className="text-muted-foreground">info@sakhluka.ge</p>
            </motion.div>

            <motion.div
              className="bg-card border border-border p-6 rounded-lg shadow-lg"
              variants={contentVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow: theme === 'dark' 
                  ? "0 20px 40px rgba(255,255,255,0.05)" 
                  : "0 20px 40px rgba(0,0,0,0.1)",
                transition: { duration: 0.3 }
              }}
            >
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">Location</h3>
              <p className="text-muted-foreground">Racha, Georgia</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
      <BottomNavigation theme={theme} />
        </motion.div>
      )}
    </>
  )
}



export default App
