import { Product } from '../types';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (quantity: number, size?: string) => void;
}

export function ProductDetail({ product, onClose, onAddToCart }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes?.[0]);

  const handleAddToCart = () => {
    onAddToCart(quantity, selectedSize);
    setQuantity(1);
  };

  return (
    <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 md:p-0">
      <div className="bg-black border-4 border-[#ff5d23] rounded-lg w-full max-w-4xl max-h-screen overflow-y-auto">
        <div className="flex items-start justify-between p-6 border-b-2 border-[#ff5d23] sticky top-0 bg-black">
          <h2 className="text-2xl font-black text-[#ff5d23]">{product.name}</h2>
          <button
            onClick={onClose}
            className="text-[#ff5d23] hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-6">
          <div className="flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-lg border-2 border-[#ff5d23]"
            />
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-gray-400 text-sm mb-1">Precio</p>
              <p className="text-3xl font-black text-[#ff5d23]">
                ${product.price.toFixed(2)} USD
              </p>
            </div>

            <div>
              <label className="text-white font-bold mb-3 block">Cantidad</label>
              <div className="flex items-center gap-3 bg-black border-2 border-[#ff5d23] rounded-lg w-fit px-4 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-[#ff5d23] hover:text-white transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-white font-bold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-[#ff5d23] hover:text-white transition"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="text-white font-bold mb-3 block">Talla</label>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 rounded-full font-bold border-2 transition ${
                        selectedSize === size
                          ? 'bg-[#ff5d23] text-black border-[#ff5d23]'
                          : 'text-[#ff5d23] border-[#ff5d23] hover:bg-[#ff5d23]/10'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3 pt-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#ff5d23] text-black font-black py-3 rounded-lg hover:bg-white transition text-lg"
              >
                AÑADIR AL CARRO
              </button>
              <button
                onClick={onClose}
                className="w-full bg-gray-800 text-white font-bold py-3 rounded-lg hover:bg-gray-700 transition"
              >
                CERRAR
              </button>
            </div>

            <div className="border-t-2 border-[#ff5d23] pt-4">
              <h3 className="text-white font-black mb-2">DESCRIPCIÓN DE PRODUCTO</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
