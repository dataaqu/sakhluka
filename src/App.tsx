import { motion } from 'framer-motion'
import Header from './components/Header'
import { SmoothScrollHero } from './components/Hero'

function App() {

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
    <div className="min-h-screen bg-gray-50 scroll-smooth">
      <Header />
      
      <SmoothScrollHero />

      {/* About Section */}
      <motion.section 
        id="about" 
        className="min-h-screen flex items-center justify-center bg-white"
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
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            variants={contentVariants}
           
          >
            About
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 leading-relaxed"
            variants={contentVariants}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            Learn more about us and discover the beauty of Sakhluka in Racha
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Gallery Section */}
      <motion.section 
        id="gallery" 
        className="min-h-screen flex items-center justify-center bg-gray-100 relative"
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
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            variants={contentVariants}
            whileHover={{ 
              scale: 1.05,
              color: "#059669",
              transition: { duration: 0.3 }
            }}
          >
            Gallery
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 leading-relaxed"
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
                className="h-32 bg-gradient-to-br from-green-200 to-blue-200 rounded-lg"
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
        className="min-h-screen flex items-center justify-center bg-white"
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
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            variants={contentVariants}
            whileHover={{ 
              scale: 1.05,
              color: "#DC2626",
              transition: { duration: 0.3 }
            }}
          >
            Availability
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8"
            variants={contentVariants}
          >
            Check our availability and book your stay
          </motion.p>
          
          <motion.button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg"
            variants={contentVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
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
        className="min-h-screen flex items-center justify-center bg-gray-100 relative"
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
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            variants={contentVariants}
            whileHover={{ 
              scale: 1.05,
              color: "#7C3AED",
              transition: { duration: 0.3 }
            }}
          >
            Contact
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8"
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
              className="bg-white p-6 rounded-lg shadow-lg"
              variants={contentVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                transition: { duration: 0.3 }
              }}
            >
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">+995 XXX XXX XXX</p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              variants={contentVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                transition: { duration: 0.3 }
              }}
            >
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-600">info@sakhluka.ge</p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              variants={contentVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                transition: { duration: 0.3 }
              }}
            >
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-gray-600">Racha, Georgia</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  )
}



export default App
