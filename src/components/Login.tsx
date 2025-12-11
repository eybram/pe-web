import { useState } from 'react';
import { X } from 'lucide-react';

interface LoginProps {
  onClose: () => void;
  onSuccess: (clientId: string, name?: string) => void;
  onOpenRegister?: () => void;
}

export function Login({ onClose, onSuccess, onOpenRegister }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    (async () => {
      try {
        const { fetchJson } = await import('../utils/api');
        const data = await fetchJson('/login.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ q: email, password }) });
        const id = data.id_cliente;
        const name = (data.nombre || '') + (data.apellido ? ' ' + data.apellido : '');
        localStorage.setItem('clientId', id);
        if (name) localStorage.setItem('clientName', name);
        onSuccess(id, name);
      } catch (err) {
        console.error('login failed', err);
        alert('No se encontró usuario con ese correo o cédula');
      }
    })();
  };

  return (
    <div className="fixed inset-0 bg-[#001937] z-50 flex items-center justify-center p-4">
      <div className="bg-black border-4 border-[#ff5d23] rounded-2xl w-full max-w-md p-8 relative">
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
          Inicio de sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-400 text-xs font-bold mb-2 block">
              Correo o cédula
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@example.com o 8-123-456"
              className="w-full px-4 py-3 bg-gray-800 text-white placeholder-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5d23] border border-gray-700"
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
              className="w-full px-4 py-3 bg-gray-800 text-[#ff5d23] placeholder-[#ff5d23]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5d23] border border-gray-700"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!email || !password}
            className="w-full bg-gray-700 text-[#ff5d23] font-bold py-3 rounded-lg hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            Continúe
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-gray-400 text-sm text-center">
            ¿No tienes cuenta?{' '}
            <button
              type="button"
              onClick={() => onOpenRegister && onOpenRegister()}
              className="text-[#ff5d23] font-bold hover:text-white transition"
            >
              Regístrate
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
