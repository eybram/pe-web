import { Category } from '../types';
import { X } from 'lucide-react';

interface SidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({
  categories,
  selectedCategory,
  onCategorySelect,
  isOpen = true,
  onClose
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

        <div className="p-6">
          <h2 className="text-xl font-black text-[#ff5d23] mb-6 border-b-2 border-[#ff5d23] pb-4">
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
      </aside>
    </>
  );
}
