import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import { SmoothScrollHero } from './components/Hero'
import About from './components/About'
import Loader from './components/Loader'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [theme, setTheme] = useState('dark')

  // Theme initialization and persistence
  useEffect(() => {
    const savedTheme = localStorage.getItem('sakhluka-theme') || 'dark'
    setTheme(savedTheme)
    
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
          <Header theme={theme} onThemeChange={handleThemeChange} />
          
          <SmoothScrollHero />

     <About />
      {/* Gallery Section */}
      <motion.section 
        id="gallery" 
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
              color: theme === 'dark' ? "#10b981" : "#059669",
              transition: { duration: 0.3 }
            }}
          >
            Gallery
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
            variants={contentVariants}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            Beautiful moments captured in the heart of Georgian mountains
          </motion.p>
          
          {/* Image placeholder grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8"
            variants={containerVariants}
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div
                key={item}
                className="h-32 bg-gradient-to-br from-emerald-200/80 to-blue-200/80 dark:from-emerald-800/40 dark:to-blue-800/40 rounded-lg border border-border"
                variants={contentVariants}
                whileHover={{
                  scale: 1.05,
                  rotate: 2,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              />
            ))}
          </motion.div>
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
        </motion.div>
      )}
    </>
  )
}



export default App
