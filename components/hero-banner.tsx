export function HeroBanner() {
  return (
    <div className="relative bg-gradient-to-br from-red-500 via-red-600 to-blue-600 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-black/10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="relative z-10 px-6 py-12 md:py-16 max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 bg-clip-text text-transparent drop-shadow-lg">
              Pokémon Explorer
            </h1>
            <p className="text-xl md:text-2xl font-medium text-white/95 drop-shadow-md">
              Discover the world of Pokémon
            </p>
          </div>

          {/* Description */}
          <p className="text-lg text-white/85 max-w-3xl mx-auto leading-relaxed">
            Explore detailed information about all your favorite Pokémon. Browse through stats, 
            abilities, evolution details, and compare different Pokémon side-by-side in your complete digital Pokédex!
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mt-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Complete Pokédex</h3>
              <p className="text-white/80 text-sm">Browse through all 1000+ Pokémon with detailed stats and information</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Quick Search</h3>
              <p className="text-white/80 text-sm">Find any Pokémon quickly by searching for their name in the sidebar</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Detailed Stats</h3>
              <p className="text-white/80 text-sm">View comprehensive stats, moves, and evolution information</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Compare Pokémon</h3>
              <p className="text-white/80 text-sm">Compare stats, types, and abilities between different Pokémon side-by-side</p>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-8">
            <p className="text-white/90 text-lg font-medium">
              👈 Start exploring by selecting a Pokémon from the sidebar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
