import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Ventas() {
  const navigate = useNavigate();

  // Estado de ventas de prueba (hasta conectar con API)
  const [ventas, setVentas] = useState([
    { id: 1, fecha: "2025-09-01", empleado: "Juan Pérez", total: 25000 },
    { id: 2, fecha: "2025-09-15", empleado: "María Gómez", total: 15000 },
  ]);

  const agregarVenta = () => {
    const nuevaVenta = {
      id: ventas.length + 1,
      fecha: new Date().toISOString().split("T")[0],
      empleado: "Empleado Demo",
      total: Math.floor(Math.random() * 50000) + 1000,
    };
    setVentas([...ventas, nuevaVenta]);
  };

  const eliminarVenta = (id) => {
    setVentas(ventas.filter((venta) => venta.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver
        </Button>
        <h1 className="text-2xl font-bold text-pink-600">Ventas</h1>
        <div className="w-[90px]" />
      </header>

      {/* Contenido */}
      <Card>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Aquí podrás gestionar las ventas registradas en el sistema.
          </p>

          <Button className="mb-4" onClick={agregarVenta}>
            Registrar Nueva Venta
          </Button>

          {/* Tabla de ventas */}
          <table className="w-full text-left border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-pink-200 text-gray-700">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Empleado</th>
                <th className="px-4 py-2">Monto Total</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta) => (
                <tr key={venta.id} className="border-t">
                  <td className="px-4 py-2">{venta.id}</td>
                  <td className="px-4 py-2">{venta.fecha}</td>
                  <td className="px-4 py-2">{venta.empleado}</td>
                  <td className="px-4 py-2">${venta.total}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => alert(`Editar venta ${venta.id}`)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => eliminarVenta(venta.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
