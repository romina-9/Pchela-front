import React, { useEffect, useState } from "react";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    nombre_completo: "",
    email: "",
    telefono: "",
    direccion: "",
  });

  // 🔹 1. Obtener lista de clientes al cargar
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/clientes/") // 👈 tu endpoint de Django
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => console.error("Error cargando clientes:", err));
  }, []);

  // 🔹 2. Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 3. Enviar datos al backend (POST)
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/clientes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newCliente) => {
        setClientes([...clientes, newCliente]); // lo agregamos a la lista
        setFormData({ nombre_completo: "", email: "", telefono: "", direccion: "" }); // limpiar form
      })
      .catch((err) => console.error("Error creando cliente:", err));
  };

  return (
    <div className="space-y-8 p-6 bg-gray-100 min-h-screen">
      {/* Título */}
      <h2 className="text-3xl font-bold text-pink-600">Clientes</h2>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded-2xl shadow space-y-4"
      >
        <h3 className="text-xl font-semibold text-gray-700">➕ Agregar Cliente</h3>

        <input
          type="text"
          name="nombre_completo"
          value={formData.nombre_completo}
          onChange={handleChange}
          placeholder="Nombre completo"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />

        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        <input
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          placeholder="Dirección"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        <button
          type="submit"
          className="px-5 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition"
        >
          Guardar Cliente
        </button>
      </form>

      {/* Listado de clientes */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-700">📋 Lista de Clientes</h3>
        {clientes.length === 0 ? (
          <p className="text-gray-500">No hay clientes registrados.</p>
        ) : (
          <ul className="grid md:grid-cols-2 gap-4">
            {clientes.map((cliente, index) => (
              <li
                key={index}
                className="p-4 bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition"
              >
                <p className="text-lg font-semibold text-pink-600">
                  {cliente.nombre_completo}
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong> {cliente.email}
                </p>
                <p className="text-gray-600">
                  <strong>Teléfono:</strong> {cliente.telefono || "No registrado"}
                </p>
                <p className="text-gray-600">
                  <strong>Dirección:</strong> {cliente.direccion || "No registrada"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Clientes;
