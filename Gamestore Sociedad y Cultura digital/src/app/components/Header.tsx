import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

export function Header({ cartCount }: { cartCount: number }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-gradient-to-r from-[#1b2838] to-[#2a475e] text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                GAMESTORE
              </h1>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="hover:text-blue-400 transition-colors">Tienda</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Comunidad</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Ofertas</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Soporte</a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-[#316282] rounded-md px-3 py-2 w-64">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Buscar juegos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm flex-1 text-white placeholder-gray-400"
              />
            </div>

            <Link to="/cart" className="relative hover:text-blue-400 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link to="/login" className="hover:text-blue-400 transition-colors">
              <User className="w-6 h-6" />
            </Link>

            <button className="md:hidden hover:text-blue-400 transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
