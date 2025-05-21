import React from "react";
import { FileText, Clock, CheckCircle, XCircle, ChevronRight } from "lucide-react";
import routes from "../routes";
import { Link } from "react-router-dom";

const Convalidaciones = () => {
  const stats = [
    {
      name: "Total Convalidaciones",
      value: "245",
      subtext: "+12% respecto al mes anterior",
      icon: <FileText className="h-5 w-5 text-gray-400" />,
    },
    {
      name: "Pendientes",
      value: "8",
      subtext: "3 con alta prioridad",
      icon: <Clock className="h-5 w-5 text-gray-400" />,
    },
    {
      name: "Aprobadas",
      value: "189",
      subtext: "77% del total de solicitudes",
      icon: <CheckCircle className="h-5 w-5 text-gray-400" />,
    },
    {
      name: "Rechazadas",
      value: "48",
      subtext: "19% del total de solicitudes",
      icon: <XCircle className="h-5 w-5 text-gray-400" />,
    },
  ];

  const solicitudesRecientes = [
    {
      nombre: "Carlos Mendoza",
      universidad: "Universidad Nacional Mayor de San Marcos",
      cursos: 8,
      fecha: "2023-04-12",
      estado: "Pendiente",
    },
    {
      nombre: "María Fernández",
      universidad: "Universidad de Lima",
      cursos: 6,
      fecha: "2023-04-10",
      estado: "Aprobada",
    },
    {
      nombre: "Juan Pérez",
      universidad: "Pontificia Universidad Católica del Perú",
      cursos: 4,
      fecha: "2023-04-08",
      estado: "Rechazada",
    },
  ];

  const getStatusColor = (estado) => {
    switch (estado) {
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Aprobada":
        return "bg-green-100 text-green-800 border-green-300";
      case "Rechazada":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Panel de Control</h1>
            <p className="text-sm text-gray-400">Gestione las convalidaciones de cursos para estudiantes</p>
          </div>
          <Link to={routes.nuevaConvalidacion} className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white py-2 px-3 rounded-lg text-sm cursor-pointer">
            <span className="text-base">+</span>
            <span>Nueva Convalidación</span>
          </Link>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-[#1D1D20] rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-white">{stat.name}</h3>
                {stat.icon}
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-white mt-2">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.subtext}</p>
            </div>
          ))}
        </div>

        {/* Convalidaciones Recientes */}
        <div className="bg-[#1D1D20] rounded-lg p-4 border border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
            <div>
              <h2 className="text-lg font-bold text-white">Convalidaciones Recientes</h2>
              <p className="text-sm text-gray-400">Últimas solicitudes de convalidación procesadas</p>
            </div>
            <button className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 text-white py-1.5 px-3 rounded-lg text-sm">
              <span>Ver todas</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Lista de solicitudes */}
          <div className="space-y-4">
            {solicitudesRecientes.map((solicitud, index) => (
              <div key={index} className="border-b border-gray-700 pb-4 last:pb-0 last:border-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="flex items-center flex-wrap gap-2">
                        <h3 className="text-white font-medium text-sm">{solicitud.nombre}</h3>
                        <span className={`px-2 py-0.5 text-xs rounded border ${getStatusColor(solicitud.estado)}`}>
                          {solicitud.estado}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs">
                        {solicitud.universidad} • {solicitud.cursos} cursos • {solicitud.fecha}
                      </p>
                    </div>
                  </div>
                  <button className="text-sm text-gray-300 hover:text-white">
                    Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Convalidaciones;
