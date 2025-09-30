import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Productos from "./pages/Productos";
import Clientes from "./pages/Clientes";
import Proveedores from "./pages/Proveedores";
import Compras from "./pages/Compras";
import Ventas from "./pages/Ventas";
import Caja from "./pages/Caja";
import LoginPage from "./pages/Login";

function AppLayout() {
  const location = useLocation();

  // 👇 si la ruta es login, mostramos solo el login
  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-pink-100">
        <LoginPage />
      </div>
    );
  }

  return (
    <div
      className="flex min-h-screen relative"
      style={{
        backgroundImage: "url('/src/assets/alicates.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay para dar contraste */}
      <div className="absolute inset-0 bg-white/70"></div>

      {/* Contenido de la app */}
      <div className="flex-1 flex relative z-10">
        {/* Sidebar */}
        <Sidebar />

        {/* Contenido principal */}
        <div className="flex-1 flex flex-col">
          <header className="bg-white shadow p-4 flex justify-between items-center">
            <h1 className="text-lg font-semibold">Panel de Control</h1>
            <div>Dueño • Empresa</div>
          </header>

          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/proveedores" element={<Proveedores />} />
              <Route path="/compras" element={<Compras />} />
              <Route path="/ventas" element={<Ventas />} />
              <Route path="/caja" element={<Caja />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
