import { Product } from '../types';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <button
      onClick={onClick}
      className="group cursor-pointer h-full"
    >
      <div className="relative overflow-hidden rounded-lg bg-gray-900 aspect-square mb-3 border-2 border-[#ff5d23] hover:border-white transition">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <ShoppingCart className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <h3 className="font-bold text-sm text-white group-hover:text-[#ff5d23] transition line-clamp-2 text-left">
        {product.name}
      </h3>

      <p className="text-[#ff5d23] font-bold text-lg mt-1 text-left">
        ${product.price.toFixed(2)} USD
      </p>
    </button>
  );
}
