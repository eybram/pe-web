import { Category } from '../types';
import { X } from 'lucide-react';

interface SidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  isOpen?: boolean;
  onClose?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onHistoryClick?: () => void;
  onLogoutClick?: () => void;
}

export function Sidebar({
  categories,
  selectedCategory,
  onCategorySelect,
  isOpen = true,
  onClose,
  onProfileClick,
  onSettingsClick,
  onHistoryClick,
  onLogoutClick
}: SidebarProps) {
  return (
    <>
      {!isOpen && onClose && (
        <button onClick={onClose} className="md:hidden fixed inset-0 bg-black/50 z-30" />
      )}

      <aside
        className={`fixed md:relative md:block w-64 min-h-screen md:min-h-full bg-black border-r-4 border-[#ff5d23] overflow-y-auto z-40 transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {!isOpen && onClose && (
          <button
            onClick={onClose}
            className="md:hidden absolute top-4 right-4 text-[#ff5d23]"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        <div className="p-6 flex flex-col h-full">
          {/* Profile Section */}
          <div className="mb-8 pb-8 border-b-2 border-[#ff5d23]">
            <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">👤</span>
            </div>
            <h3 className="text-center text-[#ff5d23] font-black mb-4">PERFIL</h3>
            <button
              onClick={onProfileClick}
              className="w-full px-4 py-2 bg-[#ff5d23] text-black font-bold rounded-lg hover:bg-[#ff4500] transition"
            >
              PERFIL
            </button>
          </div>

          {/* Categories Section */}
          <div className="mb-8 pb-8 border-b-2 border-[#ff5d23]">
            <h2 className="text-xl font-black text-[#ff5d23] mb-4 pb-2">
              CATEGORÍAS
            </h2>

            <nav className="space-y-3">
              <button
                onClick={() => onCategorySelect(null)}
                className={`w-full text-left px-4 py-3 rounded-lg font-bold transition ${
                  selectedCategory === null
                    ? 'bg-[#ff5d23] text-black'
                    : 'text-[#ff5d23] hover:bg-[#ff5d23]/10'
                }`}
              >
                TODOS
              </button>

              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => onCategorySelect(category.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-bold transition ${
                    selectedCategory === category.id
                      ? 'bg-[#ff5d23] text-black'
                      : 'text-[#ff5d23] hover:bg-[#ff5d23]/10'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{category.name}</span>
                    <span className="text-xs opacity-70">({category.count})</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* User Menu - Bottom Section */}
          <div className="mt-auto space-y-3">
            <button
              onClick={onSettingsClick}
              className="w-full px-4 py-3 bg-[#ff5d23] text-black font-bold rounded-lg hover:bg-[#ff4500] transition"
            >
              AJUSTES
            </button>
            <button
              onClick={onHistoryClick}
              className="w-full px-4 py-3 text-[#ff5d23] font-bold border-2 border-[#ff5d23] rounded-lg hover:bg-[#ff5d23]/10 transition"
            >
              HISTORIAL
            </button>
            <button
              onClick={onLogoutClick}
              className="w-full px-4 py-3 bg-[#ff1f1f] text-white font-bold rounded-lg hover:bg-[#cc1a1a] transition"
            >
              CERRAR SESION
            </button>
            <button
              onClick={onClose}
              className="w-full px-4 py-3 text-[#ff5d23] font-bold border-2 border-[#ff5d23] rounded-lg hover:bg-[#ff5d23]/10 transition md:hidden"
            >
              Regresar a inicio
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
