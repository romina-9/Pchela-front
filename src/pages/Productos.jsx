import React, { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react"; // 👈 iconos web

export default function Products() {
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Tijerita", precio: 12000, cantidad: 20, img: "/assets/tijerita.jpg" },
    { id: 2, nombre: "Lima", precio: 9000, cantidad: 50, img: "/assets/limas.jpg" },
    { id: 3, nombre: "Tijera Sm", precio: 6000, cantidad: 10, img: "/assets/pinzaexpert.jpg" },
    { id: 4, nombre: "Bob Cut", precio: 11000, cantidad: 15, img: "/assets/muchas.jpg" },
    { id: 5, nombre: "Pinzas", precio: 5000, cantidad: 30, img: "/assets/pinzas.jpg" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [productoForm, setProductoForm] = useState({ id: null, nombre: "", precio: "", cantidad: "" });
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (producto) => {
    setProductoForm({ ...producto });
    setIsEditing(true);
    setModalVisible(true);
  };

  const handleAdd = () => {
    setProductoForm({ id: null, nombre: "", precio: "", cantidad: "" });
    setIsEditing(false);
    setModalVisible(true);
  };

  const handleSave = () => {
    if (isEditing) {
      setProductos((prev) => prev.map((p) => (p.id === productoForm.id ? productoForm : p)));
    } else {
      const newProduct = {
        ...productoForm,
        id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1,
        img: "/assets/fondo.jpg",
      };
      setProductos((prev) => [...prev, newProduct]);
    }
    setModalVisible(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      setProductos((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-pink-600 mb-6">Productos disponibles</h2>

      {/* LISTA */}
      <div className="grid gap-4">
        {productos.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-white rounded-xl shadow p-4 border border-pink-300"
          >
            <img src={item.img} alt={item.nombre} className="w-16 h-16 object-contain mr-4" />
            <div className="flex-1">
              <h3 className="font-bold text-lg">{item.nombre}</h3>
              <p className="text-gray-700">Precio: ${item.precio}</p>
              <p className="text-sm text-gray-500">Cantidad: {item.cantidad}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800">
                <Pencil size={22} />
              </button>
              <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800">
                <Trash2 size={22} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* BOTÓN AGREGAR */}
      <button
        onClick={handleAdd}
        className="fixed bottom-6 right-6 bg-pink-600 text-white p-4 rounded-full shadow-lg hover:bg-pink-700"
      >
        <Plus size={28} />
      </button>

      {/* MODAL */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-pink-600">
              {isEditing ? "Editar Producto" : "Agregar Producto"}
            </h3>
            <input
              className="w-full border p-2 rounded mb-3"
              placeholder="Nombre"
              value={productoForm.nombre}
              onChange={(e) => setProductoForm({ ...productoForm, nombre: e.target.value })}
            />
            <input
              type="number"
              className="w-full border p-2 rounded mb-3"
              placeholder="Precio"
              value={productoForm.precio}
              onChange={(e) => setProductoForm({ ...productoForm, precio: Number(e.target.value) })}
            />
            <input
              type="number"
              className="w-full border p-2 rounded mb-3"
              placeholder="Cantidad"
              value={productoForm.cantidad}
              onChange={(e) => setProductoForm({ ...productoForm, cantidad: Number(e.target.value) })}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalVisible(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
