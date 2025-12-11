import { Search, ShoppingCart, Menu } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
  cartItemCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
  onLoginClick: () => void;
  userName?: string;
  onProfileClick?: () => void;
}

export function Header({ onSearch, cartItemCount, onCartClick, onMenuClick, onLoginClick, userName, onProfileClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <header className="bg-[#ff5d23] border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-6">
        <div className="flex items-center gap-8 flex-1">
          <h1 className="text-2xl md:text-3xl font-black text-black whitespace-nowrap">
            BROKEN POCKET
          </h1>

          <nav className="hidden md:flex items-center gap-6 text-black font-bold text-lg">
            <button className="hover:opacity-80 transition flex items-center gap-1">
              CATÁLOGO <span className="text-xl">↓</span>
            </button>
            <button className="hover:opacity-80 transition flex items-center gap-1">
              MÁS <span className="text-xl">↓</span>
            </button>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {userName ? (
            <button onClick={() => onProfileClick && onProfileClick()} className="text-black font-bold flex items-center gap-2 hover:opacity-80 transition">
              <span>👋</span>
              <span>{userName}</span>
            </button>
          ) : (
            <button onClick={onLoginClick} className="text-black font-bold hover:opacity-80 transition flex items-center gap-2">
              👤 LOGIN
            </button>
          )}

          <div className="relative w-80">
            <input
              type="text"
              placeholder="BUSCAR"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-2 bg-white text-black placeholder-gray-400 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-black"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black pointer-events-none" />
          </div>

          <button onClick={onCartClick} className="relative hover:opacity-80 transition">
            <ShoppingCart className="w-6 h-6 text-black" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

        <button onClick={onMenuClick} className="md:hidden text-black">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
