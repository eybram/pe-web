import { X, Calendar } from 'lucide-react';

interface HistoryItem {
  id: string;
  name: string;
  image: string;
  date: string;
}

interface HistoryProps {
  onClose: () => void;
}

export function History({ onClose }: HistoryProps) {
  // Mock data - should be fetched from backend
  const historyItems: HistoryItem[] = [
    {
      id: '1',
      name: 'Figura human',
      image: '🧑',
      date: '12/04/2021',
    },
    {
      id: '2',
      name: 'perro tobi',
      image: '🐕',
      date: '03/03/2021',
    },
    {
      id: '3',
      name: 'The Heavy',
      image: '📦',
      date: '21/01/2021',
    },
    {
      id: '4',
      name: 'Pines Enamel Deltarune',
      image: '📌',
      date: '05/01/2021',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-[#001937] border-4 border-[#ff5d23] rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b-2 border-[#ff5d23]">
          <h2 className="text-3xl font-black text-[#ff5d23]">HISTORIAL</h2>
          <button
            onClick={onClose}
            className="text-[#ff5d23] hover:text-white transition"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {historyItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No hay historial de productos</p>
            </div>
          ) : (
            <div className="space-y-4">
              {historyItems.map(item => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-[#002952] border-2 border-[#ff5d23] rounded-lg hover:bg-[#003366] transition"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gray-300 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                    {item.image}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                    <div className="flex items-center gap-2 text-[#ff5d23]">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Fecha: {item.date}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="px-6 py-2 bg-[#ff5d23] text-black font-bold rounded-lg hover:bg-[#ff4500] transition whitespace-nowrap">
                    Ver Producto
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
