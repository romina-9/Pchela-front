import React from "react";

export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo + Marca */}
      <div className="flex items-center space-x-3">
        <img
          src="/src/assets/Logoestrellanegra.png" // 👈 poné tu logo acá
          alt="Logo Pchelá"
          className="w-10 h-10 object-contain"
        />
        <div>
          <h1 className="text-xl font-bold text-pink-600">Pchelá</h1>
          <p className="text-sm text-gray-500">Universal Beauty</p>
        </div>
      </div>

      {/* Usuario / Empresa */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-700 font-medium">Dueño • Empresa</span>
        <button className="px-3 py-1 bg-pink-600 text-white rounded hover:bg-pink-700">
          Salir
        </button>
      </div>
    </header>
  );
}
