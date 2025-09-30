import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import api from "../services/api";

export default function Caja() {
  const navigate = useNavigate();
  const [caja, setCaja] = useState(null);
  const [movimientos, setMovimientos] = useState([]);

  // Cargar caja activa (última caja abierta)
  const fetchCaja = async () => {
    const res = await api.get("cajas/");
    const abiertas = res.data.filter(c => c.estado === "ABIERTA");
    if (abiertas.length > 0) {
      setCaja(abiertas[0]);
      fetchMovimientos(abiertas[0].id);
    }
  };

  const fetchMovimientos = async (cajaId) => {
    const res = await api.get("movimientos/");
    setMovimientos(res.data.filter(m => m.caja === cajaId));
  };

  // Abrir caja
  const abrirCaja = async () => {
    const res = await api.post("cajas/", {
      empleado_apertura: 1, // id del empleado (provisorio)
      monto_inicial: 10000,
      estado: "ABIERTA",
    });
    setCaja(res.data);
  };

  // Registrar movimiento
  const registrarMovimiento = async (tipo, monto) => {
    if (!caja) return;

    const res = await api.post("movimientos/", {
      caja: caja.id,
      monto,
      descripcion: tipo === "INGRESO" ? "Venta" : "Egreso",
      empleado: 1, // id del empleado (provisorio)
      id_tipo_movimiento: tipo === "INGRESO" ? 1 : 2, // según tu BD
      id_tipo_pago: 1, // por ejemplo efectivo
    });

    setMovimientos([...movimientos, res.data]);
  };

  // Cerrar caja
  const cerrarCaja = async () => {
    if (!caja) return;
    const res = await api.patch(`cajas/${caja.id}/`, {
      estado: "CERRADA",
      empleado_cierre: 1,
    });
    setCaja(res.data);
  };

  useEffect(() => {
    fetchCaja();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver
        </Button>
        <h1 className="text-2xl font-bold text-pink-600">Caja</h1>
        <div className="w-[90px]" />
      </header>

      <Card>
        <CardContent>
          {!caja ? (
            <Button onClick={abrirCaja}>Abrir Caja</Button>
          ) : (
            <div>
              <p className="mb-2">
                Estado:{" "}
                <span
                  className={
                    caja.estado === "ABIERTA" ? "text-green-600" : "text-red-600"
                  }
                >
                  {caja.estado}
                </span>
              </p>
              <p>Monto inicial: ${caja.monto_inicial}</p>

              {caja.estado === "ABIERTA" && (
                <>
                  <div className="flex gap-4 mt-4">
                    <Button onClick={() => registrarMovimiento("INGRESO", 5000)}>
                      Registrar Ingreso
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => registrarMovimiento("EGRESO", 2000)}
                    >
                      Registrar Egreso
                    </Button>
                  </div>

                  <h3 className="mt-6 font-bold">Movimientos</h3>
                  <ul className="list-disc ml-6">
                    {movimientos.map((m) => (
                      <li key={m.id}>
                        {m.descripcion} - ${m.monto}
                      </li>
                    ))}
                  </ul>

                  <Button className="mt-6" onClick={cerrarCaja}>
                    Cerrar Caja
                  </Button>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
