import { X, Settings as SettingsIcon, MapPin, Bell, Palette } from 'lucide-react';
import { useState } from 'react';

interface SettingsProps {
  onClose: () => void;
}

export function Settings({ onClose }: SettingsProps) {
  const [currency, setCurrency] = useState('USD');
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [desktopNotifications, setDesktopNotifications] = useState(false);

  const currencies = [
    { code: 'USD', flag: '🇺🇸', name: 'USD' },
    { code: 'EUR', flag: '🇪🇺', name: 'EUR' },
    { code: 'PAB', flag: '🇵🇦', name: 'PAB' },
    { code: 'CAD', flag: '🇨🇦', name: 'CAD' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-[#001937] border-4 border-[#ff5d23] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b-2 border-[#ff5d23]">
          <h2 className="text-3xl font-black text-[#ff5d23]">AJUSTES</h2>
          <button
            onClick={onClose}
            className="text-[#ff5d23] hover:text-white transition"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Store Settings */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <SettingsIcon className="w-6 h-6 text-[#ff5d23]" />
              Ajustes de Tienda
            </h3>

            {/* Currency */}
            <div className="space-y-4 ml-8">
              <h4 className="text-lg font-bold text-[#ff5d23]">Moneda</h4>
              <div className="flex flex-wrap gap-3">
                {currencies.map(curr => (
                  <button
                    key={curr.code}
                    onClick={() => setCurrency(curr.code)}
                    className={`px-4 py-2 rounded-lg font-bold transition ${
                      currency === curr.code
                        ? 'bg-[#ff5d23] text-black'
                        : 'bg-[#001937] text-[#ff5d23] border-2 border-[#ff5d23] hover:bg-[#ff5d23]/10'
                    }`}
                  >
                    <span className="mr-2">{curr.flag}</span>
                    {curr.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <MapPin className="w-6 h-6 text-[#ff5d23]" />
              Dirección de Envío
            </h3>
            <button className="ml-8 px-6 py-3 bg-[#ff5d23] text-black font-bold rounded-lg hover:bg-[#ff4500] transition">
              Actualizar Dirección
            </button>
          </div>

          {/* Personalization */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Palette className="w-6 h-6 text-[#ff5d23]" />
              Personalización
            </h3>

            {/* Email Recommendations */}
            <div className="space-y-3 ml-8">
              <h4 className="text-lg font-bold text-[#ff5d23]">Recomendaciones y alertas por correo</h4>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`w-6 h-6 rounded transition ${
                  emailNotifications
                    ? 'bg-[#ff5d23]'
                    : 'bg-gray-400'
                }`}
              />
            </div>
          </div>

          {/* Desktop Notifications */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Bell className="w-6 h-6 text-[#ff5d23]" />
              Notificaciones de escritorio
            </h3>
            <button
              onClick={() => setDesktopNotifications(!desktopNotifications)}
              className={`ml-8 w-6 h-6 rounded transition ${
                desktopNotifications
                  ? 'bg-[#ff5d23]'
                  : 'bg-gray-400'
              }`}
            />
          </div>

          {/* Site Colors */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Palette className="w-6 h-6 text-[#ff5d23]" />
              Colores del sitio
            </h3>
            <p className="ml-8 text-gray-400 italic">Not implemented</p>
          </div>
        </div>
      </div>
    </div>
  );
}
