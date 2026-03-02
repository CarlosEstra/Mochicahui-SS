import React, { useState } from "react";
import { Star, Send } from "lucide-react";

const Gallery = () => {
  // Datos de los rincones mágicos
  const rinconesMagicos = [
    {
      id: 1,
      nombre: "Iglesia de Mochicahui",
      descripcion: "Arquitectura colonial que refleja la historia espiritual del pueblo.",
      img: "https://images.unsplash.com/photo-1518659685715-462152865b20?q=80&w=2070"
    },
    {
      id: 2,
      nombre: "Calle Principal",
      descripcion: "Calles empedradas llenas de vida y tradición.",
      img: "https://images.unsplash.com/photo-1585640369877-3e4b78759367?q=80&w=1974"
    },
    {
      id: 3,
      nombre: "Plazuela del Ejido",
      descripcion: "Lugar de encuentro para la comunidad y eventos culturales.",
      img: "https://images.unsplash.com/photo-1605648873993-9c878985161f?q=80&w=2070"
    },
    {
      id: 4,
      nombre: "Mirador Natural",
      descripcion: "Vistas panorámicas del valle y la sierra circundante.",
      img: "https://images.unsplash.com/photo-1566415273775-4c077b94b0a4?q=80&w=2071"
    }
  ];

  const [rinconActivo, setRinconActivo] = useState(rinconesMagicos[0]);
  const [calificaciones, setCalificaciones] = useState(() => {
    // Cargar calificaciones desde localStorage
    const saved = localStorage.getItem('magical-spots-ratings');
    return saved ? JSON.parse(saved) : {};
  });

  const [nuevaCalificacion, setNuevaCalificacion] = useState({
    estrellas: 0,
    comentario: ''
  });

  const guardarCalificacion = () => {
    if (nuevaCalificacion.estrellas === 0) {
      alert('Por favor selecciona una calificación de estrellas');
      return;
    }

    const id = rinconActivo.id;
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
    localStorage.setItem('magical-spots-ratings', JSON.stringify(nuevasCalificaciones));
    
    // Resetear formulario
    setNuevaCalificacion({ estrellas: 0, comentario: '' });
  };

  const obtenerPromedioCalificaciones = (id) => {
    const lista = calificaciones[id] || [];
    if (lista.length === 0) return 0;
    const total = lista.reduce((sum, cal) => sum + cal.estrellas, 0);
    return (total / lista.length).toFixed(1);
  };

  return (
    <section id="galeria" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
        <h2 className="text-4xl font-serif font-bold text-gray-900">
          Rincones Mágicos
        </h2>
        <p className="text-gray-500 mt-2">
          Capturando la esencia de nuestras calles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-7xl mx-auto px-4">
        {/* Columna Izquierda: Lista de Rincones */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-400 uppercase tracking-wider mb-4">
              Rincones Mágicos
            </h3>
            <div className="space-y-4">
              {rinconesMagicos.map((rincon) => (
                <div
                  key={rincon.id}
                  onClick={() => setRinconActivo(rincon)}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    rinconActivo.id === rincon.id
                      ? "bg-mexico-pink/10 border-l-4 border-mexico-pink"
                      : "hover:bg-gray-100 border-l-4 border-transparent"
                  }`}
                >
                  <h4 className={`font-bold text-sm ${
                    rinconActivo.id === rincon.id
                      ? "text-mexico-pink"
                      : "text-gray-700"
                  }`}>
                    {rincon.nombre}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {rincon.descripcion}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-2xl">⭐</span>
                    <span className="text-sm font-bold text-mexico-yellow">
                      {obtenerPromedioCalificaciones(rincon.id)}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({(calificaciones[rincon.id] || []).length} reseñas)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Columna Derecha: Imagen y Detalles */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Imagen Principal */}
            <div className="relative h-96 md:h-[500px] bg-gray-100">
              <img
                src={rinconActivo.img}
                alt={rinconActivo.nombre}
                className="w-full h-full object-cover animate-fade-in"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-3xl font-serif font-bold mb-2">
                  {rinconActivo.nombre}
                </h3>
                <p className="text-lg text-white/90">
                  {rinconActivo.descripcion}
                </p>
              </div>
            </div>

            {/* Contenido Detallado */}
            <div className="p-8">
              {/* Calificación Promedio */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <span className="text-lg font-bold text-mexico-yellow">
                    {obtenerPromedioCalificaciones(rinconActivo.id)}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({(calificaciones[rinconActivo.id] || []).length} reseñas)
                  </span>
                </div>
              </div>

              {/* Formulario de Calificación */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Califica este rincón mágico</h4>
                
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
                    placeholder="Cuéntanos tu experiencia en este lugar mágico..."
                  />
                </div>

                {/* Botón de Enviar */}
                <button
                  onClick={guardarCalificacion}
                  className="flex items-center gap-2 bg-mexico-pink hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                  <Send size={18} />
                  Enviar Calificación
                </button>
              </div>

              {/* Reseñas Existentes */}
              {calificaciones[rinconActivo.id] && calificaciones[rinconActivo.id].length > 0 && (
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Reseñas de Visitantes</h4>
                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    {calificaciones[rinconActivo.id]
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
