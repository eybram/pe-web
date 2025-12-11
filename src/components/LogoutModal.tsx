import { X } from 'lucide-react';

interface LogoutModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ onClose, onConfirm }: LogoutModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-[#001937] border-4 border-[#ff5d23] rounded-lg max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b-2 border-[#ff5d23]">
          <h2 className="text-2xl font-black text-[#ff5d23]"></h2>
          <button
            onClick={onClose}
            className="text-[#ff5d23] hover:text-white transition"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 text-center space-y-6">
          <h3 className="text-2xl font-black text-white">
            ¿Seguro que desea Cerrar Sesión en su cuenta Broken Pocket?
          </h3>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-[#ff5d23] text-[#ff5d23] font-bold rounded-lg hover:bg-[#ff5d23]/10 transition"
            >
              VOLVER
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3 bg-[#ff5d23] text-black font-bold rounded-lg hover:bg-[#ff4500] transition"
            >
              CERRAR SESIÓN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
