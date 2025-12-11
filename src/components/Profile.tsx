import { X, User, Mail, Lock, Image, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ProfileProps {
  onClose: () => void;
  clientId?: string;
}

export function Profile({ onClose, clientId = 'CLI-001' }: ProfileProps) {
  const [username, setUsername] = useState('Usuario invitado 1');
  const [email, setEmail] = useState('usuarioinvitado1@brokenpocket.com.pa');
  const [telefono, setTelefono] = useState('');
  const [provincia, setProvincia] = useState('');
  const [fechaRegistro, setFechaRegistro] = useState('');
  const [password, setPassword] = useState('**********');
  const [language, setLanguage] = useState('es');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showUsernameEdit, setShowUsernameEdit] = useState(false);
  const [showPasswordEdit, setShowPasswordEdit] = useState(false);

  const handleSaveUsername = () => {
    setShowUsernameEdit(false);
  };

  const handleSavePassword = () => {
    if (newPassword && newPassword === confirmPassword) {
      setPassword('**********');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordEdit(false);
    } else {
      alert('Las contraseñas no coinciden');
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const { fetchJson } = await import('../utils/api');
        const data = await fetchJson('/cliente.php?id=' + encodeURIComponent(clientId));
        setUsername(data.nombre + (data.apellido ? (' ' + data.apellido) : ''));
        setEmail(data.correo || '');
        setTelefono(data.telefono || '');
        setProvincia(data.provincia || '');
        setFechaRegistro(data.fecha_registro || '');
      } catch (e) {
        console.error('Could not load cliente', e);
      }
    };
    load();
  }, [clientId]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-[#001937] border-4 border-[#ff5d23] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b-2 border-[#ff5d23]">
          <h2 className="text-3xl font-black text-[#ff5d23]">PERFIL</h2>
          <button
            onClick={onClose}
            className="text-[#ff5d23] hover:text-white transition"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Profile Picture */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Image className="w-5 h-5 text-[#ff5d23]" />
              Imagen de perfil
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                <User className="w-12 h-12 text-gray-400" />
              </div>
              <button className="px-6 py-2 bg-[#ff5d23] text-black font-bold rounded-lg hover:bg-[#ff4500] transition">
                Cambiar Imagen
              </button>
            </div>
          </div>

          {/* Username */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <User className="w-5 h-5 text-[#ff5d23]" />
              Nombre de Usuario
            </h3>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-[#ff5d23]">{username}</span>
              <button
                onClick={() => setShowUsernameEdit(true)}
                className="px-6 py-2 bg-[#ff5d23] text-black font-bold rounded-lg hover:bg-[#ff4500] transition"
              >
                Cambiar Nombre de Usuario
              </button>
            </div>
            {showUsernameEdit && (
              <div className="flex gap-2 mt-4">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border-2 border-[#ff5d23] bg-[#001937] text-white"
                />
                <button
                  onClick={handleSaveUsername}
                  className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
                >
                  Guardar
                </button>
              </div>
            )}
          </div>

          {/* Password */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#ff5d23]" />
              Contraseña
            </h3>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-[#ff5d23]">{password}</span>
              <button
                onClick={() => setShowPasswordEdit(true)}
                className="px-6 py-2 bg-[#ff1f1f] text-white font-bold rounded-lg hover:bg-[#cc1a1a] transition"
              >
                Cambiar Contraseña
              </button>
            </div>
            {showPasswordEdit && (
              <div className="flex flex-col gap-2 mt-4">
                <input
                  type="password"
                  placeholder="Contraseña actual"
                  className="px-4 py-2 rounded-lg border-2 border-[#ff5d23] bg-[#001937] text-white"
                />
                <input
                  type="password"
                  placeholder="Nueva contraseña"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="px-4 py-2 rounded-lg border-2 border-[#ff5d23] bg-[#001937] text-white"
                />
                <input
                  type="password"
                  placeholder="Confirmar contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="px-4 py-2 rounded-lg border-2 border-[#ff5d23] bg-[#001937] text-white"
                />
                <button
                  onClick={handleSavePassword}
                  className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
                >
                  Guardar Contraseña
                </button>
              </div>
            )}
          </div>

          {/* Email */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#ff5d23]" />
              Correo electrónico
            </h3>
            <p className="text-lg text-[#ff5d23]">{email}</p>
            {telefono && (
              <p className="text-sm text-gray-300">Teléfono: {telefono}</p>
            )}
            {provincia && (
              <p className="text-sm text-gray-300">Provincia: {provincia}</p>
            )}
            {fechaRegistro && (
              <p className="text-sm text-gray-300">Fecha registro: {fechaRegistro}</p>
            )}
          </div>

          {/* Language */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#ff5d23]" />
              Idioma
            </h3>
            <div className="flex items-center gap-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-4 py-2 rounded-lg border-2 border-[#ff5d23] bg-[#001937] text-white"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="pt">Português</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
