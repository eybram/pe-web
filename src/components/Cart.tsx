import { CartItem } from '../types';
import { Trash2, X, ShoppingCart } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  total: number;
  onRemove: (productId: string, size?: string) => void;
  onUpdateQuantity: (productId: string, quantity: number, size?: string) => void;
  onClose: () => void;
  onCheckout: () => void;
}

export function Cart({ items, total, onRemove, onUpdateQuantity, onClose, onCheckout }: CartProps) {
  return (
    <div className="fixed inset-0 bg-black/75 z-50 flex items-end md:items-center justify-center">
      <div className="bg-black border-4 border-[#ff5d23] rounded-t-2xl md:rounded-2xl w-full md:w-96 max-h-screen md:max-h-[600px] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b-2 border-[#ff5d23]">
          <h2 className="text-2xl font-black text-[#ff5d23] flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            TU CARRO
          </h2>
          <button
            onClick={onClose}
            className="text-[#ff5d23] hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-400 text-center">Tu carro está vacío</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="bg-gray-900 border border-[#ff5d23]/50 rounded-lg p-4"
                >
                  <div className="flex gap-3 mb-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded border border-[#ff5d23]"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-sm line-clamp-2">
                        {item.product.name}
                      </h3>
                      {item.size && (
                        <p className="text-gray-400 text-xs mt-1">Talla: {item.size}</p>
                      )}
                      <p className="text-[#ff5d23] font-bold mt-1">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.quantity - 1, item.size)
                        }
                        className="text-[#ff5d23] hover:text-white transition font-bold"
                      >
                        −
                      </button>
                      <span className="text-white font-bold w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.quantity + 1, item.size)
                        }
                        className="text-[#ff5d23] hover:text-white transition font-bold"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => onRemove(item.product.id, item.size)}
                      className="text-gray-500 hover:text-[#ff5d23] transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-white font-bold text-sm mt-2 text-right">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-[#ff5d23] p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">Subtotal:</span>
                <span className="text-[#ff5d23] font-black text-lg">
                  ${total.toFixed(2)}
                </span>
              </div>
              <button onClick={onCheckout} className="w-full bg-[#ff5d23] text-black font-black py-3 rounded-lg hover:bg-white transition">
                PAGAR EN CAJA
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
