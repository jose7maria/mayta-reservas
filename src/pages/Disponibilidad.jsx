import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/* ==================================================
   HORARIOS DE DEMOSTRACIÓN

   Más adelante Express/MySQL determinará los horarios
   reales según fecha, ambiente, mesa y duración.

   - Atención general: de 2:00 p. m. a 11:00 p. m.
   - Experiencias: último inicio a las 8:30 p. m.
   - Carta: último inicio provisional a las 9:00 p. m.
     (supone 2 horas de atención; se podrá configurar).
   - Intervalos de inicio: 30 minutos.
================================================== */
const HORA_APERTURA = 14 * 60;
const ULTIMO_INICIO_EXPERIENCIA = 20 * 60 + 30;
const ULTIMO_INICIO_CARTA = 21 * 60;
const INTERVALO_MINUTOS = 30;
const PRECIO_GARANTIA_CARTA = 25;

const formatearHora = (minutosTotales) => {
  const horas24 = Math.floor(minutosTotales / 60);
  const minutos = minutosTotales % 60;
  const horas12 = horas24 % 12 || 12;
  const periodo = horas24 >= 12 ? 'PM' : 'AM';

  return `${horas12}:${String(minutos).padStart(2, '0')} ${periodo}`;
};

const crearHorariosDemo = (esCarta) => {
  const limite = esCarta
    ? ULTIMO_INICIO_CARTA
    : ULTIMO_INICIO_EXPERIENCIA;

  const resultado = [];

  for (
    let minutos = HORA_APERTURA;
    minutos <= limite;
    minutos += INTERVALO_MINUTOS
  ) {
    // Solo ejemplos de horarios ocupados para mostrar estados visuales.
    // Estos bloqueos NO son datos reales de una reserva.
    const ocupadoDemo = minutos === 15 * 60 || minutos === 19 * 60 + 30;

    resultado.push({
      hora: formatearHora(minutos),
      minutos,
      disponible: !ocupadoDemo,
    });
  }

  return resultado;
};

const formatearFecha = (fechaOriginal) => {
  if (!fechaOriginal) return 'No seleccionada';

  const fechaObjeto = new Date(`${fechaOriginal}T00:00:00`);

  if (Number.isNaN(fechaObjeto.getTime())) return 'Fecha no válida';

  return fechaObjeto.toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const Disponibilidad = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Conservamos los datos que envía Reserva.jsx.
  const datosReserva = location.state || {};

  const {
    fecha = '',
    personas = 2,
    zona = 'Sin preferencia',
    mesa = 'Asignación automática',
    capacidadMesa = null,
    accesible = false,
    sillaNino = false,
    tipoReserva = 'experiencia',
    consumos = [],
    totalConsumos = 0,
  } = datosReserva;

  const esCarta = tipoReserva === 'carta';
  const garantiaReserva = esCarta
    ? personas * PRECIO_GARANTIA_CARTA
    : 0;

  const [horaSeleccionada, setHoraSeleccionada] = useState(null);
  const [horarios, setHorarios] = useState([]);

  // Generamos los horarios de ejemplo según la modalidad.
  useEffect(() => {
    setHorarios(crearHorariosDemo(esCarta));
    setHoraSeleccionada(null);
  }, [esCarta, fecha]);

  const horariosDisponibles = horarios.filter((item) => item.disponible);
  const horariosTarde = horarios.filter((item) => item.minutos < 17 * 60);
  const horariosNoche = horarios.filter((item) => item.minutos >= 17 * 60);

  // Importe recibido de Reserva.jsx; la garantía no es un plato.
  const importeReserva = Number(totalConsumos) || 0;
  const experienciasSeleccionadas = consumos.filter(
    (consumo) => consumo.id !== 'garantia-carta'
  );

  const volverAReserva = () => {
    navigate('/reserva', { state: datosReserva });
  };

  const continuar = () => {
    const horarioValido = horarios.some(
      (item) => item.hora === horaSeleccionada && item.disponible
    );

    if (!horarioValido) {
      alert('Selecciona un horario disponible');
      return;
    }

    navigate('/datos-cliente', {
      state: {
        ...datosReserva,
        fecha,
        personas,
        zona,
        mesa,
        capacidadMesa,
        accesible,
        sillaNino,
        tipoReserva,
        garantiaReserva,
        consumos,
        totalConsumos: importeReserva,
        hora: horaSeleccionada,
      },
    });
  };

  // Reutilizamos las clases actuales, sin crear otro archivo CSS.
  const mostrarHorario = (horario) => {
    const seleccionado = horaSeleccionada === horario.hora;

    return (
      <button
        type="button"
        key={horario.hora}
        disabled={!horario.disponible}
        aria-pressed={seleccionado}
        className={`horario-btn ${
          horario.disponible ? 'disponible' : 'no-disponible'
        } ${seleccionado ? 'seleccionado' : ''}`}
        onClick={() => setHoraSeleccionada(horario.hora)}
      >
        <strong>{horario.hora}</strong>
        <span>
          {!horario.disponible
            ? 'No disponible'
            : seleccionado
              ? 'Seleccionado'
              : 'Disponible'}
        </span>
      </button>
    );
  };

  return (
    <section className="disponibilidad-page">
      <div className="container">
        <div className="disponibilidad-box">
          {/* CABECERA */}
          <div className="disponibilidad-header">
            <span>RESERVAS MAYTA</span>
            <h1>DISPONIBILIDAD</h1>
            <p>Selecciona la hora de inicio de tu visita.</p>
          </div>

          {/* PROGRESO: PASO 2 DE 5 */}
          <div className="reserva-pasos">
            <span className="paso activo">1</span>
            <span className="linea"></span>
            <span className="paso activo">2</span>
            <span className="linea"></span>
            <span className="paso">3</span>
            <span className="linea"></span>
            <span className="paso">4</span>
            <span className="linea"></span>
            <span className="paso">5</span>
          </div>

          <div className="disponibilidad-modificar">
            <button
              type="button"
              className="btn-modificar-reserva"
              onClick={volverAReserva}
            >
              MODIFICAR
            </button>
          </div>

          {/* RESUMEN DE LA RESERVA */}
          <div className="disponibilidad-resumen disponibilidad-resumen-cuatro">
            <div>
              <span>FECHA</span>
              <strong>{formatearFecha(fecha)}</strong>
            </div>
            <div>
              <span>PERSONAS</span>
              <strong>
                {personas} {personas === 1 ? 'persona' : 'personas'}
              </strong>
            </div>
            <div>
              <span>UBICACIÓN</span>
              <strong>{zona}</strong>
            </div>
            <div>
              <span>MESA</span>
              <strong>{mesa}</strong>
            </div>
          </div>

          {/* RESUMEN ECONÓMICO SEGÚN MODALIDAD */}
          <div className="disponibilidad-consumo">
            <div className="disponibilidad-consumo-header">
              <div>
                <span>{esCarta ? 'CARTA AL LLEGAR' : 'DETALLE DE CONSUMO'}</span>
                <h2>
                  {esCarta ? 'GARANTÍA DE RESERVA' : 'EXPERIENCIAS SELECCIONADAS'}
                </h2>
              </div>
              <strong>S/ {importeReserva.toLocaleString('es-PE')}</strong>
            </div>

            <div className="disponibilidad-consumo-lista">
              {esCarta ? (
                <div className="disponibilidad-consumo-item">
                  <div>
                    <strong>Carta al llegar</strong>
                    <span>
                      {personas} × S/ {PRECIO_GARANTIA_CARTA} por persona
                    </span>
                    <p className="mb-0 mt-2">
                      Elige tus platos y bebidas al llegar. La garantía se
                      descontará de tu consumo final.
                    </p>
                  </div>
                  <strong>S/ {garantiaReserva.toLocaleString('es-PE')}</strong>
                </div>
              ) : (
                experienciasSeleccionadas.map((consumo) => (
                  <div
                    className="disponibilidad-consumo-item"
                    key={consumo.id}
                  >
                    <div>
                      <strong>{consumo.nombre}</strong>
                      <span>
                        {consumo.cantidad} × S/ {' '}
                        {Number(consumo.precioUnitario).toLocaleString('es-PE')}
                      </span>
                    </div>
                    <strong>
                      S/ {Number(consumo.subtotal).toLocaleString('es-PE')}
                    </strong>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* AVISO: LA DISPONIBILIDAD ES TODAVÍA SIMULADA */}
          <div className="estado-disponibilidad">
            <div className="estado-icono">✓</div>
            <div>
              <h2>HORARIOS DE DEMOSTRACIÓN</h2>
              <p>
                Se muestran {horariosDisponibles.length} horarios habilitados
                como ejemplo. La disponibilidad real por fecha y mesa se
                comprobará cuando conectemos MySQL.
              </p>
            </div>
          </div>

          {/* SELECCIÓN VISUAL DE HORARIO */}
          <div className="seleccion-horarios">
            <h2>ELIGE UN HORARIO</h2>
            <p className="reserva-ayuda">
              {esCarta
                ? 'Carta al llegar: horarios de inicio ilustrativos hasta las 9:00 p. m. El consumo se elige en el restaurante.'
                : 'Experiencia gastronómica: último inicio a las 8:30 p. m., sujeto a la duración de la experiencia.'}
              {' '}El restaurante cierra a las 11:00 p. m.
            </p>

            <h3 className="h5 mt-4 mb-3">☀️ TARDE · 2:00 a 4:30 p. m.</h3>
            <div className="horarios-grid">
              {horariosTarde.map(mostrarHorario)}
            </div>

            <h3 className="h5 mt-4 mb-3">🌙 NOCHE · desde las 5:00 p. m.</h3>
            <div className="horarios-grid">
              {horariosNoche.map(mostrarHorario)}
            </div>
          </div>

          <div className="leyenda-horarios">
            <span>
              <i className="leyenda-punto disponible"></i>
              Disponible (demo)
            </span>
            <span>
              <i className="leyenda-punto no-disponible"></i>
              No disponible (demo)
            </span>
          </div>

          {/* NAVEGACIÓN */}
          <div className="acciones-disponibilidad">
            <button
              type="button"
              className="btn btn-volver"
              onClick={volverAReserva}
            >
              VOLVER
            </button>
            <button
              type="button"
              className="btn btn-continuar"
              disabled={!horaSeleccionada}
              onClick={continuar}
            >
              CONTINUAR
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
