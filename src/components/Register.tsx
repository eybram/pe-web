import { useState } from 'react';
import { X } from 'lucide-react';

interface RegisterProps {
  onClose: () => void;
  onSuccess: (id?: string, name?: string) => void;
  onOpenLogin?: () => void;
}

export function Register({ onClose, onSuccess, onOpenLogin }: RegisterProps) {

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cedula, setCedula] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [provincia, setProvincia] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!(correo && password && password === confirm)) return;

    (async () => {
      try {
        const { fetchJson } = await import('../utils/api');

        const response = await fetchJson('/register.php', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre,
            apellido,
            cedula,
            correo,
            telefono,
            provincia,
            contraseña: password,
            confirm
          })
        });

        const id = response.id_cliente;
        const nameResp = response.nombre;

        localStorage.setItem('clientId', id);
        localStorage.setItem('clientName', nameResp);

        onSuccess && onSuccess(id, nameResp);

      } catch (err) {
        console.error('register failed', err);
        alert('No se pudo registrar: ' + err);
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

        <h1 className="text-3xl font-black text-[#ff5d23] text-center mb-2">BROKEN POCKET</h1>
        <h2 className="text-white font-bold text-lg text-center mb-8">Registrarse</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Nombre */}
          <div>
            <label className="text-gray-400 text-xs font-bold mb-2 block">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre"
              className="w-full px-4 py-3 bg-gray-800 text-white placeholder-gray-600 rounded-lg border border-gray-700 focus:ring-2 focus:ring-[#ff5d23]"
              required
            />
          </div>

          {/* Apellido */}
          <div>
            <label className="text-gray-400 text-xs font-bold mb-2 block">Apellido</label>
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              placeholder="Apellido"
              className="w-full px-4 py-3 bg-gray-800 text-white placeholder-gray-600 rounded-lg border border-gray-700 focus:ring-2 focus:ring-[#ff5d23]"
              required
            />
          </div>

          {/* Cédula */}
          <div>
            <label className="text-gray-400 text-xs font-bold mb-2 block">Cédula</label>
            <input
              type="text"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              placeholder="Ej: 8-888-888"
              className="w-full px-4 py-3 bg-gray-800 text-white placeholder-gray-600 rounded-lg border border-gray-700 focus:ring-2 focus:ring-[#ff5d23]"
              required
            />
          </div>

          {/* Correo */}
          <div>
            <label className="text-gray-400 text-xs font-bold mb-2 block">Correo electrónico</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full px-4 py-3 bg-gray-800 text-white placeholder-gray-600 rounded-lg border border-gray-700 focus:ring-2 focus:ring-[#ff5d23]"
              required
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="text-gray-400 text-xs font-bold mb-2 block">Teléfono</label>
            <input
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Opcional"
              className="w-full px-4 py-3 bg-gray-800 text-white placeholder-gray-600 rounded-lg border border-gray-700 focus:ring-2 focus:ring-[#ff5d23]"
            />
          </div>

          {/* Provincia */}
          <div>
            <label className="text-gray-400 text-xs font-bold mb-2 block">Provincia</label>
            <input
              type="text"
              value={provincia}
              onChange={(e) => setProvincia(e.target.value)}
              placeholder="Provincia"
              className="w-full px-4 py-3 bg-gray-800 text-white placeholder-gray-600 rounded-lg border border-gray-700 focus:ring-2 focus:ring-[#ff5d23]"
              required
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="text-gray-400 text-xs font-bold mb-2 block">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-800 text-[#ff5d23] placeholder-[#ff5d23]/50 rounded-lg border border-gray-700 focus:ring-2 focus:ring-[#ff5d23]"
              required
            />
          </div>

          {/* Confirmar contraseña */}
          <div>
            <label className="text-gray-400 text-xs font-bold mb-2 block">Confirmar contraseña</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-800 text-[#ff5d23] placeholder-[#ff5d23]/50 rounded-lg border border-gray-700 focus:ring-2 focus:ring-[#ff5d23]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!correo || !password || password !== confirm}
            className="w-full bg-gray-700 text-[#ff5d23] font-bold py-3 rounded-lg hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            Registrarse
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-gray-400 text-sm text-center">
            Ya tienes cuenta?{' '}
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenLogin && onOpenLogin();
              }}
              className="text-[#ff5d23] font-bold hover:text-white transition"
            >
              Inicia sesión
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
