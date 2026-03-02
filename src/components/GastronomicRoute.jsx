import React, { useState, useEffect } from "react";
import { rutaGastronomica } from "../data/puebloData";
import {
  MapPin,
  Utensils,
  BookOpen,
  Map,
  Image as ImageIcon,
  Star,
  Send,
  Clock,
  Plus,
  Trash2,
  Calendar,
  Save,
  Download
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
    // Filtrar puntos según el horario seleccionado para la ruta automática
    const puntosRuta = rutaGastronomica.filter(parada => parada.horarios.includes(horarioSeleccionado));
    const puntosRutaMapa = puntosRuta.map(parada => parada.busquedaMapa).join('/');
    const urlRuta = `https://www.google.com/maps/dir/${puntosRutaMapa}`;

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
              {puntosRuta.length > 0 ? (
                puntosRuta.map((parada, index) => (
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
                ))
              ) : (
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
              {puntosRuta.length > 0 ? (
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
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <Map size={64} className="mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">No hay puntos para mostrar en el mapa</p>
                    <p className="text-sm text-gray-400 mt-2">Selecciona un horario con lugares disponibles</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Sistema de calificaciones
  const [calificaciones, setCalificaciones] = useState(() => {
    // Cargar calificaciones desde localStorage con validación
    try {
      const saved = localStorage.getItem('gastronomic-ratings');
      if (!saved) return {};
      
      const parsed = JSON.parse(saved);
      // Validar que sea un objeto válido
      if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
        throw new Error('Formato de datos inválido');
      }
      
      return parsed;
    } catch (error) {
      console.error('Error al cargar calificaciones:', error);
      return {};
    }
  });

  const [nuevaCalificacion, setNuevaCalificacion] = useState({
    estrellas: 0,
    comentario: ''
  });

  // Validaciones de formulario de calificación
  const validarFormularioCalificacion = () => {
    if (nuevaCalificacion.estrellas <= 0 || nuevaCalificacion.estrellas > 5) {
      return 'Por favor selecciona una calificación de estrellas válida (1-5)';
    }

    if (nuevaCalificacion.comentario && nuevaCalificacion.comentario.trim().length > 500) {
      return 'El comentario no puede exceder 500 caracteres';
    }

    if (nuevaCalificacion.comentario && nuevaCalificacion.comentario.trim().length < 10) {
      return 'El comentario debe tener al menos 10 caracteres';
    }

    return null; // No hay errores
  };

  const guardarCalificacion = () => {
    // Validaciones de calificación
    if (!paradaActiva || !paradaActiva.id) {
      alert('Error: No hay un lugar seleccionado para calificar');
      return;
    }

    if (nuevaCalificacion.estrellas <= 0 || nuevaCalificacion.estrellas > 5) {
      alert('Por favor selecciona una calificación de estrellas válida (1-5)');
      return;
    }

    if (nuevaCalificacion.comentario && nuevaCalificacion.comentario.trim().length > 500) {
      alert('El comentario no puede exceder 500 caracteres');
      return;
    }

    const id = paradaActiva.id;
    const calificacionGuardada = {
      ...nuevaCalificacion,
      fecha: new Date().toLocaleDateString('es-ES'),
      id: Date.now()
    };

    const nuevasCalificaciones = {
      ...calificaciones,
      [id]: [...(calificaciones[id] || []), calificacionGuardada]
    };

    setCalificaciones(nuevasCalificaciones);
    localStorage.setItem('gastronomic-ratings', JSON.stringify(nuevasCalificaciones));
    
    // Resetear formulario
    setNuevaCalificacion({ estrellas: 0, comentario: '' });
    
    // Mostrar mensaje de éxito
    alert('Calificación guardada exitosamente');
  };

  const obtenerPromedioCalificaciones = (id) => {
    // Validaciones de cálculo de promedio
    if (!id || id <= 0) {
      return 0;
    }

    const lista = calificaciones[id] || [];
    if (!Array.isArray(lista) || lista.length === 0) {
      return 0;
    }

    try {
      const total = lista.reduce((sum, cal) => {
        // Validar que cada calificación tenga estrellas válidas
        if (!cal || typeof cal.estrellas !== 'number' || cal.estrellas < 0 || cal.estrellas > 5) {
          return sum;
        }
        return sum + cal.estrellas;
      }, 0);

      const promedio = total / lista.length;
      return promedio.toFixed(1);
    } catch (error) {
      console.error('Error al calcular promedio:', error);
      return 0;
    }
  };

  // Sistema de Ruta Personalizada
  const [mostrarRutaPersonalizada, setMostrarRutaPersonalizada] = useState(false);
  const [rutaPersonalizada, setRutaPersonalizada] = useState([]);
  const [nuevoPunto, setNuevoPunto] = useState({
    tipo: 'gastronomico',
    id: '',
    hora: '',
    tipoComida: 'desayuno'
  });

  const agregarPuntoRuta = () => {
    // Validaciones de punto de ruta
    if (!nuevoPunto.tipo || (nuevoPunto.tipo !== 'gastronomico' && nuevoPunto.tipo !== 'turistico')) {
      alert('Por favor selecciona un tipo de lugar válido');
      return;
    }

    if (!nuevoPunto.id || parseInt(nuevoPunto.id) <= 0) {
      alert('Por favor selecciona un lugar válido');
      return;
    }

    if (!nuevoPunto.hora || nuevoPunto.hora.trim() === '') {
      alert('Por favor selecciona una hora válida');
      return;
    }

    if (!nuevoPunto.tipoComida || !['desayuno', 'comida', 'cena'].includes(nuevoPunto.tipoComida)) {
      alert('Por favor selecciona un tipo de comida válido');
      return;
    }

    // Validar que no se repita el mismo lugar en la misma hora
    const existeMismaHora = rutaPersonalizada.some(p => p.hora === nuevoPunto.hora);
    if (existeMismaHora) {
      alert('Ya existe un punto programado para esa hora. Por favor selecciona una hora diferente.');
      return;
    }

    let puntoSeleccionado;
    if (nuevoPunto.tipo === 'gastronomico') {
      puntoSeleccionado = rutaGastronomica.find(p => p.id === parseInt(nuevoPunto.id));
    } else {
      puntoSeleccionado = obtenerRinconesMagicos().find(p => p.id === parseInt(nuevoPunto.id));
    }

    if (!puntoSeleccionado) {
      alert('Lugar no encontrado en la base de datos');
      return;
    }

    // Validar que el lugar no esté ya en la ruta
    const yaExiste = rutaPersonalizada.some(p => p.id === puntoSeleccionado.id);
    if (yaExiste) {
      alert('Este lugar ya está en tu ruta. Por favor selecciona un lugar diferente.');
      return;
    }

    const nuevoPuntoRuta = {
      ...puntoSeleccionado,
      hora: nuevoPunto.hora,
      tipoComida: nuevoPunto.tipoComida,
      id: Date.now()
    };

    const nuevaRuta = [...rutaPersonalizada, nuevoPuntoRuta].sort((a, b) => {
      return a.hora.localeCompare(b.hora);
    });

    setRutaPersonalizada(nuevaRuta);
    
    // Resetear formulario
    setNuevoPunto({
      tipo: 'gastronomico',
      id: '',
      hora: '',
      tipoComida: 'desayuno'
    });
    
    // Mostrar mensaje de éxito
    alert('Punto agregado a tu ruta exitosamente');
  };

  const eliminarPuntoRuta = (id) => {
    // Validaciones de eliminación
    if (!id || id <= 0) {
      alert('Error: No se puede eliminar un punto inválido');
      return;
    }

    const puntoAEliminar = rutaPersonalizada.find(p => p.id === id);
    if (!puntoAEliminar) {
      alert('Error: No se encontró el punto a eliminar');
      return;
    }

    // Confirmación de eliminación
    const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar "${puntoAEliminar.nombre}" de tu ruta?`);
    if (!confirmacion) {
      return;
    }

    setRutaPersonalizada(rutaPersonalizada.filter(p => p.id !== id));
    
    // Mostrar mensaje de éxito
    alert('Punto eliminado de tu ruta exitosamente');
  };

  const guardarRutaPersonalizada = () => {
    // Validaciones de guardado de ruta
    if (!rutaPersonalizada || rutaPersonalizada.length === 0) {
      alert('No hay puntos en tu ruta para guardar');
      return;
    }

    try {
      const rutasGuardadas = JSON.parse(localStorage.getItem('custom-routes') || '[]');
      
      // Validar que el array sea válido
      if (!Array.isArray(rutasGuardadas)) {
        throw new Error('Error al cargar rutas guardadas');
      }

      const nuevaRuta = {
        id: Date.now(),
        nombre: `Mi Ruta ${new Date().toLocaleDateString('es-ES')}`,
        fecha: new Date().toISOString(),
        puntos: rutaPersonalizada
      };

      // Validar que la nueva ruta tenga datos válidos
      if (!nuevaRuta.id || !nuevaRuta.nombre || !nuevaRuta.fecha || !nuevaRuta.puntos) {
        throw new Error('Error al crear la ruta');
      }

      localStorage.setItem('custom-routes', JSON.stringify([...rutasGuardadas, nuevaRuta]));
      alert('Ruta guardada exitosamente');
    } catch (error) {
      console.error('Error al guardar la ruta:', error);
      alert('Error al guardar la ruta. Por favor intenta de nuevo.');
    }
  };

  const exportarRuta = () => {
    // Validaciones de exportación
    if (!rutaPersonalizada || rutaPersonalizada.length === 0) {
      alert('No hay puntos en tu ruta para exportar');
      return;
    }

    try {
      const contenido = {
        nombre: `Ruta Personalizada ${new Date().toLocaleDateString('es-ES')}`,
        fecha: new Date().toISOString(),
        puntos: rutaPersonalizada
      };

      // Validar que el contenido tenga datos válidos
      if (!contenido.nombre || !contenido.fecha || !contenido.puntos) {
        throw new Error('Error al crear el contenido de exportación');
      }

      const blob = new Blob([JSON.stringify(contenido, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ruta-personalizada-${Date.now()}.json`;
      
      // Validar que el enlace se haya creado correctamente
      if (!a.href || !a.download) {
        throw new Error('Error al crear el enlace de descarga');
      }

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert('Ruta exportada exitosamente');
    } catch (error) {
      console.error('Error al exportar la ruta:', error);
      alert('Error al exportar la ruta. Por favor intenta de nuevo.');
    }
  };

  const obtenerRinconesMagicos = () => {
    return [
      {
        id: 1,
        nombre: "Iglesia de Mochicahui",
        descripcion: "Arquitectura colonial que refleja la historia espiritual del pueblo.",
        tipo: "Lugar Turístico"
      },
      {
        id: 2,
        nombre: "Calle Principal",
        descripcion: "Calles empedradas llenas de vida y tradición.",
        tipo: "Lugar Turístico"
      },
      {
        id: 3,
        nombre: "Plazuela del Ejido",
        descripcion: "Lugar de encuentro para la comunidad y eventos culturales.",
        tipo: "Lugar Turístico"
      },
      {
        id: 4,
        nombre: "Mirador Natural",
        descripcion: "Vistas panorámicas del valle y la sierra circundante.",
        tipo: "Lugar Turístico"
      }
    ];
  };

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
                  className="w-full bg-mexico-yellow hover:bg-yellow-500 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 mb-4"
                >
                  <Map size={18} />
                  Crear Ruta Automática
                </button>

                {/* Botón para Ruta Personalizada */}
                <button
                  onClick={() => setMostrarRutaPersonalizada(!mostrarRutaPersonalizada)}
                  className="w-full bg-mexico-pink hover:bg-pink-700 text-black font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 border-2 border-mexico-pink/80 hover:border-mexico-pink"
                >
                  <Calendar size={18} />
                  {mostrarRutaPersonalizada ? 'Ocultar' : 'Crear'} Ruta Personalizada
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

                {/* Calificación Promedio */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⭐</span>
                    <span className="text-lg font-bold text-mexico-yellow">
                      {obtenerPromedioCalificaciones(paradaActiva.id)}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({(calificaciones[paradaActiva.id] || []).length} reseñas)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BookOpen
                    className="text-mexico-clay flex-shrink-0 mt-1"
                    size={20}
                  />
                  <p className="text-gray-600 leading-relaxed">
                    {paradaActiva.historia}
                  </p>
                </div>

                {/* Formulario de Calificación */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Califica este lugar</h4>
                  
                  {/* Selección de Estrellas */}
                  <div className="flex items-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((estrella) => (
                      <button
                        key={estrella}
                        onClick={() => setNuevaCalificacion({...nuevaCalificacion, estrellas})}
                        className="transition-transform hover:scale-125"
                      >
                        <Star
                          size={32}
                          className={`${
                            estrella <= nuevaCalificacion.estrellas
                              ? "text-mexico-yellow fill-mexico-yellow"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  {/* Comentario */}
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Comentario (opcional)
                    </label>
                    <textarea
                      value={nuevaCalificacion.comentario}
                      onChange={(e) => setNuevaCalificacion({...nuevaCalificacion, comentario: e.target.value})}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mexico-yellow"
                      placeholder="Cuéntanos tu experiencia..."
                    />
                  </div>

                  {/* Botón de Enviar */}
                  <button
                    onClick={guardarCalificacion}
                    disabled={validarFormularioCalificacion() !== null}
                    className={`flex items-center gap-2 font-bold py-2 px-6 rounded-lg transition-colors ${
                      validarFormularioCalificacion() !== null
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "bg-mexico-pink hover:bg-pink-700 text-white"
                    }`}
                  >
                    <Send size={18} />
                    Enviar Calificación
                  </button>
                </div>

                {/* Reseñas Existentes */}
                {calificaciones[paradaActiva.id] && calificaciones[paradaActiva.id].length > 0 && (
                  <div className="mt-8 border-t border-gray-200 pt-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Reseñas de Visitantes</h4>
                    <div className="space-y-4 max-h-64 overflow-y-auto">
                      {calificaciones[paradaActiva.id]
                        .sort((a, b) => b.id - a.id)
                        .map((cal) => (
                          <div key={cal.id} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={16}
                                  className={`${
                                    i < cal.estrellas
                                      ? "text-mexico-yellow fill-mexico-yellow"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="text-sm text-gray-500 ml-2">{cal.fecha}</span>
                            </div>
                            {cal.comentario && (
                              <p className="text-gray-700 italic">"{cal.comentario}"</p>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

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

        {/* Ruta Personalizada */}
        {mostrarRutaPersonalizada && (
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-serif font-bold text-mexico-clay flex items-center gap-3">
                <Calendar className="text-mexico-yellow" size={28} />
                Tu Ruta Personalizada
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={guardarRutaPersonalizada}
                  className="flex items-center gap-2 bg-mexico-pink hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  <Save size={18} />
                  Guardar Ruta
                </button>
                <button
                  onClick={exportarRuta}
                  className="flex items-center gap-2 bg-mexico-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  <Download size={18} />
                  Exportar Ruta
                </button>
              </div>
            </div>

            {/* Formulario para agregar puntos */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-6 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Tipo de Lugar</label>
                <select
                  value={nuevoPunto.tipo}
                  onChange={(e) => setNuevoPunto({...nuevoPunto, tipo: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mexico-yellow"
                >
                  <option value="gastronomico">Lugar Gastronómico</option>
                  <option value="turistico">Lugar Turístico</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Selecciona Lugar</label>
                <select
                  value={nuevoPunto.id}
                  onChange={(e) => setNuevoPunto({...nuevoPunto, id: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mexico-yellow"
                >
                  <option value="">Selecciona un lugar</option>
                  {nuevoPunto.tipo === 'gastronomico' ? (
                    rutaGastronomica.map(p => (
                      <option key={p.id} value={p.id}>{p.nombre}</option>
                    ))
                  ) : (
                    obtenerRinconesMagicos().map(p => (
                      <option key={p.id} value={p.id}>{p.nombre}</option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Tipo de Comida</label>
                <select
                  value={nuevoPunto.tipoComida}
                  onChange={(e) => setNuevoPunto({...nuevoPunto, tipoComida: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mexico-yellow"
                >
                  <option value="desayuno">Desayuno</option>
                  <option value="comida">Comida</option>
                  <option value="cena">Cena</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Hora</label>
                <input
                  type="time"
                  value={nuevoPunto.hora}
                  onChange={(e) => setNuevoPunto({...nuevoPunto, hora: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mexico-yellow"
                />
              </div>

              <div className="md:col-span-4 flex justify-end">
                <button
                  onClick={agregarPuntoRuta}
                  className="flex items-center gap-2 bg-mexico-yellow hover:bg-yellow-500 text-gray-800 font-bold py-2 px-6 rounded-lg transition-colors"
                >
                  <Plus size={18} />
                  Agregar a Ruta
                </button>
              </div>
            </div>

            {/* Lista de puntos en la ruta */}
            {rutaPersonalizada.length > 0 ? (
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Itinerario (ordenado por hora):</h4>
                {rutaPersonalizada.map((punto, index) => (
                  <div key={punto.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-l-4 border-mexico-yellow">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-mexico-yellow text-gray-800 rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900">{punto.nombre}</h5>
                        <p className="text-sm text-gray-600">{punto.tipo}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {punto.hora} {punto.hora >= '12:00' ? 'PM' : 'AM'}
                          </span>
                          <span className="px-2 py-1 bg-mexico-pink/20 text-mexico-pink rounded-full text-xs font-bold">
                            {punto.tipoComida}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => eliminarPuntoRuta(punto.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                <Calendar size={48} className="mx-auto mb-4 text-gray-400" />
                <p>Aún no has agregado puntos a tu ruta personalizada</p>
                <p className="text-sm mt-2">Selecciona un lugar y una hora para comenzar a planificar tu itinerario</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default GastronomicRoute;
