import { useState } from 'react';
import { X } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutProps {
  cartItems: CartItem[];
  total: number;
  onClose: () => void;
  onSuccess: () => void;
}

export function Checkout({ cartItems, total, onClose, onSuccess }: CheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState('email');
  const [formData, setFormData] = useState({
    email: '',
    region: '',
    name: '',
    lastname: '',
    address: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.region && formData.name && formData.lastname && formData.address) {
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 bg-[#F5D7C1] z-50 flex items-center justify-center p-4 overflow-auto">
      <div className="w-full max-w-6xl grid md:grid-cols-3 gap-6">
        {/* Checkout Form */}
        <div className="md:col-span-2">
          <div className="bg-black border-4 border-[#ff5d23] rounded-2xl p-8 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#ff5d23] hover:text-white transition"
            >
              <X className="w-6 h-6" />
            </button>

            <h1 className="text-3xl font-black text-[#ff5d23] text-center mb-2">
              BROKEN POCKET
            </h1>

            <h2 className="text-white font-bold text-lg text-center mb-8">
              Método de pago
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Payment Methods */}
              <div className="flex gap-3 justify-center flex-wrap">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('email')}
                  className={`px-8 py-3 rounded-full font-bold border-2 transition ${
                    paymentMethod === 'email'
                      ? 'bg-white text-black border-white'
                      : 'bg-black text-white border-gray-700 hover:border-[#ff5d23]'
                  }`}
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`px-8 py-3 rounded-full font-bold border-2 transition ${
                    paymentMethod === 'paypal'
                      ? 'bg-white text-black border-white'
                      : 'bg-black text-white border-gray-700 hover:border-[#ff5d23]'
                  }`}
                >
                  PayPal
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('google')}
                  className={`px-8 py-3 rounded-full font-bold border-2 transition ${
                    paymentMethod === 'google'
                      ? 'bg-white text-black border-white'
                      : 'bg-black text-white border-gray-700 hover:border-[#ff5d23]'
                  }`}
                >
                  Google Pay
                </button>
              </div>

              {/* Email Input */}
              <div>
                <label className="text-gray-400 text-xs font-bold mb-2 block">
                  Email
                </label>
                <div className="flex items-center bg-gray-800 rounded-lg px-4 border border-gray-700">
                  <span className="text-[#ff5d23] text-xl mr-3">👤</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="lilith14@gmail.com"
                    className="flex-1 py-3 bg-transparent text-white placeholder-gray-600 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Region */}
              <div>
                <label className="text-gray-400 text-xs font-bold mb-2 block">
                  País/Región
                </label>
                <input
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  placeholder="Panamá, Panamá Oeste"
                  className="w-full px-4 py-3 bg-white text-black placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5d23] font-semibold"
                  required
                />
              </div>

              {/* Name and Lastname */}
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                  className="px-4 py-3 bg-white text-black placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5d23] font-semibold"
                  required
                />
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  placeholder="Apellido"
                  className="px-4 py-3 bg-white text-black placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5d23] font-semibold"
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label className="text-gray-400 text-xs font-bold mb-2 block">
                  Dirección
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Calle principal, casa 5232A"
                  className="w-full px-4 py-3 bg-white text-black placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5d23] font-semibold"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!formData.email || !formData.region || !formData.name || !formData.lastname || !formData.address}
                className="w-full bg-gray-700 text-white font-bold py-3 rounded-lg hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                Continúe
              </button>
            </form>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="bg-gray-800 border-4 border-[#ff5d23] rounded-2xl p-6 h-fit">
          <h3 className="text-2xl font-black text-white mb-6">TU CARRO</h3>

          <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
            {cartItems.map((item) => (
              <div key={`${item.product.id}-${item.size}`} className="border-b border-gray-700 pb-4">
                <div className="flex gap-3 mb-2">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded border border-[#ff5d23]"
                  />
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-sm line-clamp-2">
                      {item.product.name}
                    </h4>
                    <p className="text-[#ff5d23] font-bold text-sm">
                      ${item.product.price.toFixed(2)} USD
                    </p>
                  </div>
                </div>
                <p className="text-gray-400 text-xs">
                  Enviado el: 10/9/25 • Qty: {item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t-2 border-[#ff5d23] pt-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-white font-bold">Subtotal:</span>
              <span className="text-white font-black text-lg">
                ${total.toFixed(2)}
              </span>
            </div>
            <button className="w-full bg-[#ff5d23] text-black font-black py-3 rounded-lg hover:bg-white transition">
              CONFIRMAR
            </button>
            <a href="#" className="block text-gray-400 text-center text-sm hover:text-white transition underline">
              HISTORIAL DE COMPRA
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
