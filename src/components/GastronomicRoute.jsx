import React, { useState, useEffect } from "react";
import { rutaGastronomica } from "../data/puebloData";
import {
  MapPin,
  Utensils,
  BookOpen,
  Map,
  Image as ImageIcon,
} from "lucide-react";

const GastronomicRoute = () => {
  const [paradaActiva, setParadaActiva] = useState(rutaGastronomica[0]);
  const [modoVista, setModoVista] = useState("foto"); // 'foto' o 'mapa'
  const [mostrarRuta, setMostrarRuta] = useState(false); // Nuevo estado para mostrar la vista de ruta
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("desayuno"); // desayuno, comida, cena
  const [horaDesayuno, setHoraDesayuno] = useState("08:00");
  const [horaComida, setHoraComida] = useState("13:00");
  const [horaCena, setHoraCena] = useState("19:00");

  // Filtrar puntos según el horario seleccionado
  const puntosFiltrados = rutaGastronomica.filter(parada =>
    parada.horarios.includes(horarioSeleccionado)
  );

  // Actualizar parada activa cuando cambia el horario
  useEffect(() => {
    if (puntosFiltrados.length > 0) {
      // Si la parada activa actual no está disponible para el nuevo horario, seleccionar la primera disponible
      const paradaActivaDisponible = puntosFiltrados.find(parada => parada.id === paradaActiva.id);
      if (!paradaActivaDisponible) {
        setParadaActiva(puntosFiltrados[0]);
        setModoVista("foto"); // Resetear a foto al cambiar
      }
    }
  }, [horarioSeleccionado, puntosFiltrados, paradaActiva.id]);

  const crearRutaAutomatica = () => {
    setMostrarRuta(true); // Mostrar la vista de ruta automática
  };

  const volverALista = () => {
    setMostrarRuta(false); // Volver a la vista normal
  };

  // Si mostrarRuta es true, mostrar la vista de ruta automática
  if (mostrarRuta) {
    const puntosRuta = puntosFiltrados.map(parada => parada.busquedaMapa).join('/');
    const urlRuta = `https://www.google.com/maps/dir/${puntosRuta}`;

    return (
      <section className="min-h-screen bg-gray-50">
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Botón Volver */}
          <div className="lg:w-1/4 p-6 bg-white shadow-lg">
            <button
              onClick={volverALista}
              className="mb-6 flex items-center gap-2 text-mexico-blue hover:text-mexico-blue/80 font-bold transition-colors"
            >
              ← Volver a la lista
            </button>

            <h2 className="text-2xl font-serif font-bold text-mexico-clay mb-6 flex items-center gap-3">
              <Map size={24} />
              Ruta Automática
            </h2>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-700 mb-4">Recorrido Sugerido para {horarioSeleccionado}:</h3>
              {puntosFiltrados.map((parada, index) => (
                <div
                  key={parada.id}
                  className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border-l-4 border-mexico-yellow"
                >
                  <div className="w-8 h-8 bg-mexico-yellow text-gray-800 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{parada.nombre}</h4>
                    <p className="text-xs text-gray-600 mt-1">{parada.tipo}</p>
                    <p className="text-xs text-gray-500">{parada.coordenadas}</p>
                  </div>
                </div>
              ))}
              {puntosFiltrados.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No hay puntos disponibles para este horario.</p>
                  <p className="text-sm mt-2">Prueba cambiando el horario de tu ruta.</p>
                </div>
              )}
            </div>

            <div className="mt-8 p-4 bg-mexico-pink/10 rounded-lg">
              <h4 className="font-bold text-mexico-pink mb-2">
                💡 Consejos para tu ruta ({horarioSeleccionado} a las {
                  horarioSeleccionado === "desayuno" ? horaDesayuno :
                  horarioSeleccionado === "comida" ? horaComida :
                  horaCena
                }):
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Sigue el orden sugerido para optimizar tu tiempo</li>
                <li>• Cada parada toma aproximadamente 30-45 minutos</li>
                {horarioSeleccionado === "desayuno" && (
                  <>
                    <li>• ☕ Ideal para comenzar el día con energía a las {horaDesayuno}</li>
                    <li>• 🥐 Disfruta de panadería fresca y café tradicional</li>
                    <li>• ⏰ Recomendado entre 7:00 AM - 10:00 AM</li>
                  </>
                )}
                {horarioSeleccionado === "comida" && (
                  <>
                    <li>• 🌯 Prueba los platillos principales de la región a las {horaComida}</li>
                    <li>• 🍲 Aprovecha los menús del día con precios especiales</li>
                    <li>• ⏰ Recomendado entre 12:00 PM - 3:00 PM</li>
                  </>
                )}
                {horarioSeleccionado === "cena" && (
                  <>
                    <li>• 🌙 Ambiente relajado para terminar el día a las {horaCena}</li>
                    <li>• 🍷 Opciones más elaboradas y especialidades</li>
                    <li>• ⏰ Recomendado entre 6:00 PM - 9:00 PM</li>
                  </>
                )}
                <li>• Usa Google Maps para navegación en tiempo real</li>
              </ul>
            </div>
          </div>

          {/* Mapa de Ruta Completa */}
          <div className="lg:w-3/4 p-6">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-full min-h-[600px]">
              <iframe
                title="Ruta Gastronómica Completa"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '600px' }}
                loading="lazy"
                allowFullScreen
                src={`${urlRuta}&output=embed`}
                className="animate-fade-in"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Vista normal
  return (
    <section id="ruta-gastronomica" className="py-20 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-mexico-clay flex justify-center items-center gap-3">
            <Utensils className="text-mexico-yellow" size={32} />
            Ruta del Sabor
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Selecciona un punto en la lista para ver su historia y ubicación
            exacta.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* COLUMNA IZQUIERDA: Lista de Paradas */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-4 sticky top-24">
              <h3 className="text-lg font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">
                Puntos de Interés
              </h3>
              <div className="space-y-3">
                {rutaGastronomica.map((parada, index) => {
                  const estaDisponible = parada.horarios.includes(horarioSeleccionado);
                  return (
                    <div
                      key={parada.id}
                      onClick={() => {
                        if (estaDisponible) {
                          setParadaActiva(parada);
                          setModoVista("foto"); // Resetear a foto al cambiar
                        }
                      }}
                      className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ${
                        !estaDisponible
                          ? "opacity-50 cursor-not-allowed bg-gray-50"
                          : paradaActiva.id === parada.id
                            ? "bg-mexico-pink/10 border-l-4 border-mexico-pink cursor-pointer"
                            : "hover:bg-gray-100 border-l-4 border-transparent cursor-pointer"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          !estaDisponible
                            ? "bg-gray-300 text-gray-400"
                            : paradaActiva.id === parada.id
                              ? "bg-mexico-pink text-white"
                              : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4
                          className={`font-bold text-sm ${
                            !estaDisponible
                              ? "text-gray-400"
                              : paradaActiva.id === parada.id
                                ? "text-mexico-pink"
                                : "text-gray-700"
                          }`}
                        >
                          {parada.nombre}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded uppercase font-bold ${
                            !estaDisponible
                              ? "bg-gray-200 text-gray-500"
                              : "bg-mexico-yellow text-gray-800"
                          }`}>
                            {parada.tipo}
                          </span>
                          {!estaDisponible && (
                            <span className="text-xs text-gray-400 italic">
                              No disponible para {horarioSeleccionado}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selector de Horarios y Botón Crear Ruta Automática */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    🕐 Elige el horario para tu ruta:
                  </label>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setHorarioSeleccionado("desayuno")}
                        className={`py-2 px-3 rounded-lg font-bold text-xs transition-colors ${
                          horarioSeleccionado === "desayuno"
                            ? "bg-mexico-yellow text-gray-800"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        ☀️ Desayuno
                      </button>
                      <button
                        onClick={() => setHorarioSeleccionado("comida")}
                        className={`py-2 px-3 rounded-lg font-bold text-xs transition-colors ${
                          horarioSeleccionado === "comida"
                            ? "bg-mexico-yellow text-gray-800"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        🌞 Comida
                      </button>
                      <button
                        onClick={() => setHorarioSeleccionado("cena")}
                        className={`py-2 px-3 rounded-lg font-bold text-xs transition-colors ${
                          horarioSeleccionado === "cena"
                            ? "bg-mexico-yellow text-gray-800"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        🌙 Cena
                      </button>
                    </div>

                    {/* Input de hora específico */}
                    {horarioSeleccionado === "desayuno" && (
                      <div className="flex items-center gap-2">
                        <label className="text-xs font-medium text-gray-600">Hora del desayuno:</label>
                        <input
                          type="time"
                          value={horaDesayuno}
                          onChange={(e) => setHoraDesayuno(e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-mexico-yellow"
                        />
                      </div>
                    )}
                    {horarioSeleccionado === "comida" && (
                      <div className="flex items-center gap-2">
                        <label className="text-xs font-medium text-gray-600">Hora de la comida:</label>
                        <input
                          type="time"
                          value={horaComida}
                          onChange={(e) => setHoraComida(e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-mexico-yellow"
                        />
                      </div>
                    )}
                    {horarioSeleccionado === "cena" && (
                      <div className="flex items-center gap-2">
                        <label className="text-xs font-medium text-gray-600">Hora de la cena:</label>
                        <input
                          type="time"
                          value={horaCena}
                          onChange={(e) => setHoraCena(e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-mexico-yellow"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={crearRutaAutomatica}
                  className="w-full bg-mexico-yellow hover:bg-yellow-500 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Map size={18} />
                  Crear Ruta Automática
                </button>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: Tarjeta Interactiva con Mapa Real */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 min-h-[500px] flex flex-col">
              {/* Pestañas de Navegación (Foto vs Mapa) */}
              <div className="flex border-b border-gray-100">
                <button
                  onClick={() => setModoVista("foto")}
                  className={`flex-1 py-4 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
                    modoVista === "foto"
                      ? "bg-white text-mexico-pink border-b-2 border-mexico-pink"
                      : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                  }`}
                >
                  <ImageIcon size={18} /> Galería
                </button>
                <button
                  onClick={() => setModoVista("mapa")}
                  className={`flex-1 py-4 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
                    modoVista === "mapa"
                      ? "bg-white text-mexico-blue border-b-2 border-mexico-blue"
                      : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                  }`}
                >
                  <Map size={18} /> Ubicación Real
                </button>
              </div>

              {/* Área de Visualización (Cambiante) */}
              <div className="h-64 md:h-80 relative bg-gray-100">
                {modoVista === "foto" ? (
                  /* VISTA FOTO */
                  paradaActiva.img ? (
                    <img
                      src={paradaActiva.img}
                      alt={paradaActiva.nombre}
                      className="w-full h-full object-cover animate-fade-in"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <ImageIcon size={48} className="text-gray-400" />
                    </div>
                  )
                ) : (
                  /* VISTA MAPA (IFRAME) */
                  <iframe
                    title="Mapa Gastronómico"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      paradaActiva.busquedaMapa
                    )}&output=embed`}
                    className="animate-fade-in"
                  ></iframe>
                )}
              </div>

              {/* Contenido Texto */}
              <div className="p-8 flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-mexico-yellow text-xs font-bold px-2 py-1 rounded text-gray-800 uppercase">
                    {paradaActiva.tipo}
                  </span>
                  <span className="text-gray-400 text-xs flex items-center gap-1">
                    <MapPin size={12} /> {paradaActiva.coordenadas}
                  </span>
                </div>

                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                  {paradaActiva.nombre}
                </h3>

                <div className="flex items-start gap-3">
                  <BookOpen
                    className="text-mexico-clay flex-shrink-0 mt-1"
                    size={20}
                  />
                  <p className="text-gray-600 leading-relaxed">
                    {paradaActiva.historia}
                  </p>
                </div>

                {modoVista === "foto" && (
                  <button
                    onClick={() => setModoVista("mapa")}
                    className="mt-6 text-mexico-blue font-bold text-sm hover:underline flex items-center gap-2 self-start"
                  >
                    Ver ubicación en el mapa →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GastronomicRoute;
