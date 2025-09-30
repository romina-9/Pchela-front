// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Users,
  Truck,
  ShoppingCart,
  Receipt,
  Package,
  DollarSign,
  Settings,
  LogOut,
  User,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen flex flex-col relative shadow-xl">
      {/* Fondo con imagen */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/src/assets/herramientas.jpg')" }}
      />
      {/* Overlay degradado */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-white/95" />

      {/* CONTENIDO */}
      <div className="relative z-10 flex flex-col h-full">
        {/* LOGO */}
        <div className="p-4 flex items-center border-b border-pink-200">
          <img
            src="/src/assets/Logoestrellanegra.png"
            alt="Logo"
            className="w-10 h-10 mr-2"
          />
          <div>
            <h1 className="text-xl font-bold text-pink-600">Pchelá</h1>
            <p className="text-xs text-gray-500">Universal Beauty</p>
          </div>
        </div>

        {/* NAV LINKS */}
        <nav className="flex-1 p-4 space-y-2">
          <NavItem to="/" icon={<Users size={18} />} label="Inicio" end />
          <NavItem to="/clientes" icon={<Users size={18} />} label="Clientes" />
          <NavItem
            to="/proveedores"
            icon={<Truck size={18} />}
            label="Proveedores"
          />
          <NavItem
            to="/compras"
            icon={<ShoppingCart size={18} />}
            label="Compras"
          />
          <NavItem to="/ventas" icon={<Receipt size={18} />} label="Ventas" />
          <NavItem
            to="/productos"
            icon={<Package size={18} />}
            label="Productos"
          />
          <NavItem to="/caja" icon={<DollarSign size={18} />} label="Caja" />
          <NavItem
            to="/configuracion"
            icon={<Settings size={18} />}
            label="Configuración"
          />
        </nav>

        {/* FOOTER */}
        <div className="border-t border-pink-200 p-4 space-y-2 bg-white/70 backdrop-blur-sm">
          <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 rounded hover:bg-pink-50">
            <User size={18} className="text-pink-600" />
            Perfil
          </button>
          <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 rounded hover:bg-pink-50">
            <LogOut size={18} className="text-red-500" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </aside>
  );
}

// Componente para cada item del menú
function NavItem({ to, icon, label, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition ${
          isActive
            ? "bg-pink-100 text-pink-700"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}
