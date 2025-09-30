import { useEffect, useState } from "react";
import API from "../services/api";
import { DollarSign, Users, Package, ShoppingCart, BarChart3 } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

export default function Dashboard() {
  const [usuarios, setUsuarios] = useState([]);
  const [grupos, setGrupos] = useState([]);

  // Cargar usuarios y grupos
  useEffect(() => {
    API.get("users/")
      .then((res) => setUsuarios(res.data))
      .catch(() => console.log("No sos admin o no hay usuarios"));

    API.get("groups/")
      .then((res) => setGrupos(res.data))
      .catch(() => console.log("Error cargando grupos"));
  }, []);

  // Asignar grupo a un usuario
  const asignarGrupo = async (userId, groupName) => {
    try {
      await API.put(`assign-group/${userId}/`, { group: groupName });
      alert(`Perfil "${groupName}" asignado con éxito`);
    } catch (error) {
      alert("Error al asignar perfil");
    }
  };

  return (
    <div className="p-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-pink-600">Panel General</h1>
        <p className="text-gray-600">Resumen de tu sistema</p>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Clientes */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">Clientes</h2>
                <p className="text-sm text-gray-500">Total registrados</p>
              </div>
              <Users className="w-10 h-10 text-pink-600" />
            </div>
            <p className="text-2xl font-semibold mt-4">120</p>
          </CardContent>
        </Card>

        {/* Ventas */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">Ventas</h2>
                <p className="text-sm text-gray-500">Este mes</p>
              </div>
              <DollarSign className="w-10 h-10 text-pink-600" />
            </div>
            <p className="text-2xl font-semibold mt-4">$45,000</p>
          </CardContent>
        </Card>

        {/* Productos */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">Productos</h2>
                <p className="text-sm text-gray-500">En stock</p>
              </div>
              <Package className="w-10 h-10 text-pink-600" />
            </div>
            <p className="text-2xl font-semibold mt-4">320</p>
          </CardContent>
        </Card>

        {/* Compras */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">Compras</h2>
                <p className="text-sm text-gray-500">Última semana</p>
              </div>
              <ShoppingCart className="w-10 h-10 text-pink-600" />
            </div>
            <p className="text-2xl font-semibold mt-4">15</p>
          </CardContent>
        </Card>

        {/* Reportes */}
        <Card className="col-span-1 md:col-span-2">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Reportes</h2>
              <p className="text-sm text-gray-500">Estadísticas del negocio</p>
            </div>
            <BarChart3 className="w-10 h-10 text-pink-600" />
          </CardContent>
        </Card>
      </div>

      {/* Gestión de usuarios y perfiles */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-pink-600 mb-4">
          Gestión de Usuarios y Perfiles
        </h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          {usuarios.length === 0 ? (
            <p className="text-gray-500">No hay usuarios o no sos admin.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-pink-100">
                  <th className="p-2 text-left">Usuario</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Perfil</th>
                  <th className="p-2 text-left">Acción</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.id} className="border-b">
                    <td className="p-2">{u.username}</td>
                    <td className="p-2">{u.email}</td>
                    <td className="p-2">
                      {u.groups.length > 0
                        ? u.groups.map((g) => g.name).join(", ")
                        : "Sin perfil"}
                    </td>
                    <td className="p-2">
                      <select
                        onChange={(e) => asignarGrupo(u.id, e.target.value)}
                        defaultValue=""
                        className="border p-1 rounded"
                      >
                        <option value="" disabled>
                          Asignar perfil
                        </option>
                        {grupos.map((g) => (
                          <option key={g.id} value={g.name}>
                            {g.name}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
