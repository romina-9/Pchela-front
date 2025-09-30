import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft, ShoppingCart, Edit, Trash2, Plus } from "lucide-react";

export default function Compras() {
  const navigate = useNavigate();

  // Estado de compras mockeadas
  const [compras, setCompras] = useState([
    {
      id: 1,
      monto_total: 2500.5,
      fecha_compra: "2025-09-29",
      proveedor: "Proveedor A",
      usuario: "Admin",
    },
    {
      id: 2,
      monto_total: 7800,
      fecha_compra: "2025-09-28",
      proveedor: "Proveedor B",
      usuario: "Usuario1",
    },
  ]);

  const [nuevaCompra, setNuevaCompra] = useState({
    monto_total: "",
    proveedor: "",
    usuario: "",
  });

  const [modoEdicion, setModoEdicion] = useState(false);
  const [compraEditando, setCompraEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Agregar compra
  const handleAgregar = () => {
    if (!nuevaCompra.monto_total || !nuevaCompra.proveedor || !nuevaCompra.usuario) return;
    const id = compras.length + 1;
    const fecha = new Date().toISOString().split("T")[0];
    setCompras([...compras, { id, fecha_compra: fecha, ...nuevaCompra }]);
    setNuevaCompra({ monto_total: "", proveedor: "", usuario: "" });
    setMostrarFormulario(false);
  };

  // Editar compra
  const handleEditar = (id) => {
    const compra = compras.find((c) => c.id === id);
    setCompraEditando(compra);
    setNuevaCompra(compra);
    setModoEdicion(true);
    setMostrarFormulario(true);
  };

  const handleGuardarEdicion = () => {
    setCompras(
      compras.map((c) =>
        c.id === compraEditando.id ? { ...compraEditando, ...nuevaCompra } : c
      )
    );
    setModoEdicion(false);
    setCompraEditando(null);
    setNuevaCompra({ monto_total: "", proveedor: "", usuario: "" });
    setMostrarFormulario(false);
  };

  // Eliminar compra
  const handleEliminar = (id) => {
    setCompras(compras.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          className="flex items-center gap-2 border-pink-500 text-pink-600 hover:bg-pink-50"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" /> Volver
        </Button>
        <h1 className="text-2xl font-bold text-pink-600">Compras</h1>
        <div className="w-[90px]" />
      </header>

      {/* Tarjeta principal */}
      <Card className="shadow-md border-pink-200 mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="text-pink-600 h-6 w-6" />
            <h2 className="text-lg font-semibold text-gray-800">
              Gestión de Compras
            </h2>
          </div>
          <p className="text-gray-700 mb-4">
            Administra las compras registradas: Monto, Proveedor, Usuario y Fecha.
          </p>
          <Button
            onClick={() => setMostrarFormulario(true)}
            className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-6 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Registrar Compra
          </Button>
        </CardContent>
      </Card>

      {/* Lista de compras */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {compras.map((compra) => (
          <Card key={compra.id} className="shadow-md">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-pink-600 mb-2">
                Compra #{compra.id}
              </h3>
              <p className="text-gray-700"><strong>Monto:</strong> ${compra.monto_total}</p>
              <p className="text-gray-700"><strong>Fecha:</strong> {compra.fecha_compra}</p>
              <p className="text-gray-700"><strong>Proveedor:</strong> {compra.proveedor}</p>
              <p className="text-gray-700"><strong>Usuario:</strong> {compra.usuario}</p>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-pink-500 text-pink-600 hover:bg-pink-50"
                  onClick={() => handleEditar(compra.id)}
                >
                  <Edit className="h-4 w-4" /> Editar
                </Button>
                <Button
                  variant="destructive"
                  className="flex items-center gap-2"
                  onClick={() => handleEliminar(compra.id)}
                >
                  <Trash2 className="h-4 w-4" /> Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Formulario modal */}
      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold text-pink-600 mb-4">
              {modoEdicion ? "Editar Compra" : "Registrar Compra"}
            </h2>

            <input
              type="number"
              placeholder="Monto Total"
              value={nuevaCompra.monto_total}
              onChange={(e) =>
                setNuevaCompra({ ...nuevaCompra, monto_total: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Proveedor"
              value={nuevaCompra.proveedor}
              onChange={(e) =>
                setNuevaCompra({ ...nuevaCompra, proveedor: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Usuario"
              value={nuevaCompra.usuario}
              onChange={(e) =>
                setNuevaCompra({ ...nuevaCompra, usuario: e.target.value })
              }
              className="w-full mb-4 p-2 border rounded"
            />

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setMostrarFormulario(false);
                  setModoEdicion(false);
                  setCompraEditando(null);
                  setNuevaCompra({ monto_total: "", proveedor: "", usuario: "" });
                }}
              >
                Cancelar
              </Button>
              <Button
                className="bg-pink-600 hover:bg-pink-700 text-white"
                onClick={modoEdicion ? handleGuardarEdicion : handleAgregar}
              >
                {modoEdicion ? "Guardar Cambios" : "Registrar"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
