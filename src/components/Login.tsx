import { useState } from 'react';
import { X } from 'lucide-react';

interface LoginProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function Login({ onClose, onSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 bg-[#F5D7C1] z-50 flex items-center justify-center p-4">
      <div className="bg-black border-4 border-[#FF5757] rounded-2xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#FF5757] hover:text-white transition"
        >
          <X className="w-6 h-6" />
        </button>

        <h1 className="text-3xl font-black text-[#FF5757] text-center mb-2">
          BROKEN POCKET
        </h1>

        <h2 className="text-white font-bold text-lg text-center mb-8">
          Inicio de sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-400 text-xs font-bold mb-2 block">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="lilith@gmail.com"
              className="w-full px-4 py-3 bg-gray-800 text-white placeholder-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5757] border border-gray-700"
              required
            />
          </div>

          <div>
            <label className="text-gray-400 text-xs font-bold mb-2 block">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 bg-gray-800 text-[#FF5757] placeholder-[#FF5757]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5757] border border-gray-700"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!email || !password}
            className="w-full bg-gray-700 text-[#FF5757] font-bold py-3 rounded-lg hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            Continúe
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-gray-400 text-sm text-center">
            ¿No tienes cuenta?{' '}
            <button className="text-[#FF5757] font-bold hover:text-white transition">
              Regístrate
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
