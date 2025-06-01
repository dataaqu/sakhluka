import Header from './components/Header'


function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      

      {/* Hero Section */}
      <section id="hero" className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">Hello Sakhluka</h1>
          
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About</h2>
          <p className="text-xl text-gray-600">Learn more about us</p>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h2>
          <p className="text-xl text-gray-600">Beautiful moments captured</p>
        </div>
      </section>

      

      {/* Book Section */}
      <section id="book" className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Availability</h2>
          <p className="text-xl text-gray-600">Check our availability</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact</h2>
          <p className="text-xl text-gray-600">Get in touch with us</p>
        </div>
      </section>
    </div>
  )
}



export default App
