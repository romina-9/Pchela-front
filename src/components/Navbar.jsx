import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Mi Tienda</h1>
      <ul className="flex space-x-4">
        <li><a href="#" className="hover:underline">Inicio</a></li>
        <li><a href="#" className="hover:underline">Productos</a></li>
        <li><a href="#" className="hover:underline">Contacto</a></li>
      </ul>
    </nav>
  );
}
