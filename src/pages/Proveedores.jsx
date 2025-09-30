import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft, Truck, Edit, Trash2, Plus } from "lucide-react";

export default function Proveedores() {
  const navigate = useNavigate();

  // Estado para proveedores
  const [proveedores, setProveedores] = useState([
    { id: 1, nombre: "Proveedor A", localidad: "Buenos Aires", telefono: "11-1234-5678", direccion: "Av. Siempreviva 123" },
    { id: 2, nombre: "Proveedor B", localidad: "Córdoba", telefono: "351-9876-5432", direccion: "Calle Falsa 456" },
  ]);

  const [nuevoProveedor, setNuevoProveedor] = useState({
    nombre: "",
    localidad: "",
    telefono: "",
    direccion: "",
  });

  const [modoEdicion, setModoEdicion] = useState(false);
  const [proveedorEditando, setProveedorEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Agregar proveedor
  const handleAgregar = () => {
    if (!nuevoProveedor.nombre || !nuevoProveedor.localidad) return;
    const id = proveedores.length + 1;
    setProveedores([...proveedores, { id, ...nuevoProveedor }]);
    setNuevoProveedor({ nombre: "", localidad: "", telefono: "", direccion: "" });
    setMostrarFormulario(false);
  };

  // Editar proveedor
  const handleEditar = (id) => {
    const proveedor = proveedores.find((p) => p.id === id);
    setProveedorEditando(proveedor);
    setNuevoProveedor(proveedor);
    setModoEdicion(true);
    setMostrarFormulario(true);
  };

  const handleGuardarEdicion = () => {
    setProveedores(
      proveedores.map((p) =>
        p.id === proveedorEditando.id ? { ...proveedorEditando, ...nuevoProveedor } : p
      )
    );
    setModoEdicion(false);
    setProveedorEditando(null);
    setNuevoProveedor({ nombre: "", localidad: "", telefono: "", direccion: "" });
    setMostrarFormulario(false);
  };

  // Eliminar proveedor
  const handleEliminar = (id) => {
    setProveedores(proveedores.filter((p) => p.id !== id));
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
        <h1 className="text-2xl font-bold text-pink-600">Proveedores</h1>
        <div className="w-[90px]" /> {/* Para centrar el título */}
      </header>

      {/* Tarjeta principal */}
      <Card className="shadow-md border-pink-200 mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Truck className="text-pink-600 h-6 w-6" />
            <h2 className="text-lg font-semibold text-gray-800">
              Gestión de Proveedores
            </h2>
          </div>
          <p className="text-gray-700 mb-4">
            Administra aquí tus proveedores: Nombre, Localidad, Teléfono y Dirección.
          </p>
          <Button
            onClick={() => setMostrarFormulario(true)}
            className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-6 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Agregar Proveedor
          </Button>
        </CardContent>
      </Card>

      {/* Lista de proveedores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {proveedores.map((proveedor) => (
          <Card key={proveedor.id} className="shadow-md">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-pink-600 mb-2">
                {proveedor.nombre}
              </h3>
              <p className="text-gray-700"><strong>Localidad:</strong> {proveedor.localidad}</p>
              <p className="text-gray-700"><strong>Teléfono:</strong> {proveedor.telefono}</p>
              <p className="text-gray-700"><strong>Dirección:</strong> {proveedor.direccion}</p>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-pink-500 text-pink-600 hover:bg-pink-50"
                  onClick={() => handleEditar(proveedor.id)}
                >
                  <Edit className="h-4 w-4" /> Editar
                </Button>
                <Button
                  variant="destructive"
                  className="flex items-center gap-2"
                  onClick={() => handleEliminar(proveedor.id)}
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
              {modoEdicion ? "Editar Proveedor" : "Agregar Proveedor"}
            </h2>

            <input
              type="text"
              placeholder="Nombre"
              value={nuevoProveedor.nombre}
              onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, nombre: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Localidad"
              value={nuevoProveedor.localidad}
              onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, localidad: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Teléfono"
              value={nuevoProveedor.telefono}
              onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, telefono: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Dirección"
              value={nuevoProveedor.direccion}
              onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, direccion: e.target.value })}
              className="w-full mb-4 p-2 border rounded"
            />

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setMostrarFormulario(false);
                  setModoEdicion(false);
                  setProveedorEditando(null);
                  setNuevoProveedor({ nombre: "", localidad: "", telefono: "", direccion: "" });
                }}
              >
                Cancelar
              </Button>
              <Button
                className="bg-pink-600 hover:bg-pink-700 text-white"
                onClick={modoEdicion ? handleGuardarEdicion : handleAgregar}
              >
                {modoEdicion ? "Guardar Cambios" : "Agregar"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
