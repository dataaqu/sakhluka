import React from 'react'
import { motion } from 'framer-motion'
import { 
  FiInstagram, 
  FiFacebook
} from 'react-icons/fi'
import { SiAirbnb } from 'react-icons/si'

interface FooterProps {
  theme: string
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { 
      name: 'Instagram',
      icon: FiInstagram,
      href: '#',
      hoverColor: 'hover:text-pink-500'
    },
    {
      name: 'Facebook',
      icon: FiFacebook,
      href: '#',
      hoverColor: 'hover:text-blue-500'
    },
    {
      name: 'Airbnb',
      icon: SiAirbnb,
      href: '#',
      hoverColor: 'hover:text-red-500'
    }
  ]

  return (
    <footer className={`
      py-12 px-6
      ${theme === 'dark' 
        ? 'bg-slate-900 text-white border-t border-slate-800' 
        : 'bg-white text-gray-900 border-t border-gray-200'
      }
    `}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* First Column - Logo/Title */}
          <motion.div 
            initial={{ y: 48, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.75 }}
            className="text-center md:text-left"
          >
            <h3 className={`text-3xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Sakhluka
            </h3>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Mountain Cabin Retreat
            </p>
          </motion.div>

          {/* Second Column - Description */}
          <motion.div 
            initial={{ y: 48, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.75, delay: 0.2 }}
            className="text-center"
          >
            <p className={`text-base leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Experience the beauty and tranquility of Georgian mountains in our cozy cabin. 
              Perfect for a peaceful getaway surrounded by nature's pristine beauty.
            </p>
          </motion.div>

          {/* Third Column - Social Links */}
          <motion.div 
            initial={{ y: 48, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.75, delay: 0.4 }}
            className="text-center md:text-right"
          >
            
            <div className="flex justify-center md:justify-end space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    initial={{ y: 24, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeInOut", duration: 0.6, delay: 0.6 + (index * 0.1) }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={social.href}
                    className={`
                      p-2 rounded-lg transition-colors duration-200
                      ${theme === 'dark' 
                        ? 'bg-slate-800 text-gray-300 hover:bg-slate-700' 
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                      } 
                      ${social.hoverColor}
                    `}
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

        </div>

        {/* Copyright */}
        <motion.div 
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75, delay: 0.8 }}
          className={`
            mt-8 pt-8 text-center border-t
            ${theme === 'dark' 
              ? 'border-slate-800 text-gray-400' 
              : 'border-gray-200 text-gray-500'
            }
          `}
        >
          <p className="text-sm">
            © {currentYear} Sakhluka. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
