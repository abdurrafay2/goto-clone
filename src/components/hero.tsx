export default function Hero() {
    return (
      <div className="relative h-[600px] bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
            opacity: 0.5
          }}
        />
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect Flight
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Search and compare flights from hundreds of airlines worldwide
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors">
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    )
  }