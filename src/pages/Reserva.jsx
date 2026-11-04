import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Imágenes actuales de los ambientes: conservar rutas y nombres.
import zonaSalon from '../assets/img/salonjpg.jpg';
import zonaTerraza from '../assets/img/terrazaext.jpg';
import zonaBarra from '../assets/img/barra.jpg';
import zonaPrivada from '../assets/img/privado.jpg';

const PRECIO_GARANTIA_CARTA = 25;

const OPCIONES_CONSUMO = [
  {
    id: 'sin-maridaje',
    nombre: 'Bitácora Amazónica sin maridaje',
    detalle: 'Experiencia Bitácora Amazónica · 10 tiempos',
    precio: 998,
  },
  {
    id: 'parajes',
    nombre: 'Bitácora Amazónica + Maridaje Parajes',
    detalle: 'Experiencia con maridaje Parajes',
    precio: 1738,
  },
  {
    id: 'artesanos',
    nombre: 'Bitácora Amazónica + Maridaje Artesanos',
    detalle: 'Experiencia con maridaje Artesanos',
    precio: 1683,
  },
  {
    id: 'sin-alcohol',
    nombre: 'Bitácora Amazónica + Maridaje sin alcohol',
    detalle: 'Experiencia con bebidas sin alcohol',
    precio: 1343,
  },
];

const ZONAS = [
  {
    nombre: 'Salón principal',
    descripcion: 'Ambiente central y elegante para disfrutar la experiencia MAYTA.',
    imagen: zonaSalon,
  },
  {
    nombre: 'Terraza / exterior',
    descripcion: 'Espacio abierto y rodeado de naturaleza para una experiencia más relajada.',
    imagen: zonaTerraza,
  },
  {
    nombre: 'Barra',
    descripcion: 'Una experiencia cercana al servicio, los vinos y las bebidas.',
    imagen: zonaBarra,
  },
  {
    nombre: 'Salón privado',
    descripcion: 'Ambiente reservado, ideal para grupos o celebraciones especiales.',
    imagen: zonaPrivada,
  },
];

// Mesas demostrativas: 12 por cada ambiente (48 en total).
// Cuando esté lista la API, estas mesas vendrán desde MySQL.
const CAPACIDADES_DEMO = [2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 8, 10];
const PREFIJOS_AMBIENTE = ['SP', 'TE', 'BA', 'PR'];

const MESAS_DEMO = ZONAS.flatMap((ambiente, indiceAmbiente) =>
  CAPACIDADES_DEMO.map((capacidad, indiceMesa) => {
    const codigo = `${PREFIJOS_AMBIENTE[indiceAmbiente]}${String(
      indiceMesa + 1
    ).padStart(2, '0')}`;

    return {
      id: codigo,
      nombre: codigo,
      zona: ambiente.nombre,
      capacidad,
      // Estados ficticios: no representan ocupación real por fecha y hora.
      disponible: ![1, 6, 9].includes(indiceMesa),
    };
  })
);

const CANTIDADES_INICIALES = {
  'sin-maridaje': 0,
  parajes: 0,
  artesanos: 0,
  'sin-alcohol': 0,
};

export const Reserva = () => {
  const navigate = useNavigate();

  // Datos seleccionados por el cliente.
  const [fecha, setFecha] = useState('');
  const [personas, setPersonas] = useState(2);
  const [tipoReserva, setTipoReserva] = useState('experiencia');
  const [zona, setZona] = useState('Sin preferencia');
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const [accesible, setAccesible] = useState(false);
  const [sillaNino, setSillaNino] = useState(false);
  const [cantidadesConsumo, setCantidadesConsumo] = useState(CANTIDADES_INICIALES);

  const esCarta = tipoReserva === 'carta';
  const zonaSeleccionada = ZONAS.find((item) => item.nombre === zona);

  // Experiencias: una por persona. Carta al llegar: garantía por persona.
  const totalAsignados = Object.values(cantidadesConsumo).reduce(
    (total, cantidad) => total + cantidad,
    0
  );

  const totalConsumos = OPCIONES_CONSUMO.reduce(
    (total, opcion) => total + cantidadesConsumo[opcion.id] * opcion.precio,
    0
  );

  const consumosSeleccionados = OPCIONES_CONSUMO.filter(
    (opcion) => cantidadesConsumo[opcion.id] > 0
  ).map((opcion) => ({
    id: opcion.id,
    nombre: opcion.nombre,
    cantidad: cantidadesConsumo[opcion.id],
    precioUnitario: opcion.precio,
    subtotal: cantidadesConsumo[opcion.id] * opcion.precio,
  }));

  const garantiaReserva = esCarta ? personas * PRECIO_GARANTIA_CARTA : 0;
  const totalParaPagar = esCarta ? garantiaReserva : totalConsumos;

  // Estructura provisional compatible con las pantallas siguientes.
  // Al conectar el backend, la garantía se guardará separada de los consumos.
  const detalleParaEnviar = esCarta
    ? [
        {
          id: 'garantia-carta',
          nombre: 'Garantía de reserva - Carta al llegar',
          cantidad: personas,
          precioUnitario: PRECIO_GARANTIA_CARTA,
          subtotal: garantiaReserva,
        },
      ]
    : consumosSeleccionados;

  const cambiarCantidadConsumo = (id, cambio) => {
    const cantidadActual = cantidadesConsumo[id];

    if (cambio === 1 && totalAsignados >= personas) return;
    if (cambio === -1 && cantidadActual <= 0) return;

    setCantidadesConsumo((anteriores) => ({
      ...anteriores,
      [id]: anteriores[id] + cambio,
    }));
  };

  const aumentarPersonas = () => {
    if (personas >= 10) return;

    const nuevaCantidad = personas + 1;
    setPersonas(nuevaCantidad);

    // No conservar una mesa que ya no admita al grupo.
    if (mesaSeleccionada && nuevaCantidad > mesaSeleccionada.capacidad) {
      setMesaSeleccionada(null);
    }
  };

  const disminuirPersonas = () => {
    if (personas <= 1) return;

    const nuevaCantidad = personas - 1;
    setPersonas(nuevaCantidad);

    // Si sobran experiencias asignadas, se reinicia la selección.
    if (totalAsignados > nuevaCantidad) {
      setCantidadesConsumo({ ...CANTIDADES_INICIALES });
    }
  };

  const seleccionarZona = (nombreZona) => {
    setZona(nombreZona);
    setMesaSeleccionada(null);
  };

  // IMPORTANTE: Disponibilidad.jsx es otra pantalla.
  // Aquí solamente validamos los datos y navegamos hacia ella.
  const buscarDisponibilidad = () => {
    if (!fecha) {
      alert('Selecciona una fecha');
      return;
    }

    // La modalidad Carta no requiere asignar experiencias.
    if (!esCarta && totalAsignados !== personas) {
      alert(`Debes asignar una experiencia a las ${personas} personas`);
      return;
    }

    if (zona !== 'Sin preferencia' && !mesaSeleccionada) {
      alert('Selecciona una mesa');
      return;
    }

    navigate('/disponibilidad', {
      state: {
        fecha,
        personas,
        zona,
        mesa:
          zona === 'Sin preferencia'
            ? 'Asignación automática'
            : mesaSeleccionada.nombre,
        capacidadMesa: mesaSeleccionada ? mesaSeleccionada.capacidad : null,
        accesible,
        sillaNino,
        tipoReserva,
        garantiaReserva,
        consumos: detalleParaEnviar,
        totalConsumos: totalParaPagar,
      },
    });
  };

  return (
    <section className="reserva-page">
      <div className="container">
        <div className="reserva-box">
          {/* CABECERA */}
          <div className="reserva-header">
            <span>RESERVAS MAYTA</span>
            <h1>RESERVA TU MESA</h1>
            <p>Selecciona cuándo y cómo deseas vivir la experiencia.</p>
          </div>

          {/* PASOS DEL FLUJO */}
          <div className="reserva-pasos">
            <span className="paso activo">1</span>
            <span className="linea"></span>
            <span className="paso">2</span>
            <span className="linea"></span>
            <span className="paso">3</span>
            <span className="linea"></span>
            <span className="paso">4</span>
            <span className="linea"></span>
            <span className="paso">5</span>
          </div>

          {/* FECHA */}
          <div className="reserva-grupo">
            <label htmlFor="reserva-fecha">Fecha</label>
            <input
              id="reserva-fecha"
              type="date"
              className="form-control"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>

          {/* CANTIDAD DE PERSONAS */}
          <div className="reserva-grupo">
            <label>Número de personas</label>
            <div className="selector-personas">
              <button type="button" onClick={disminuirPersonas} disabled={personas <= 1}>
                −
              </button>
              <span>
                {personas} {personas === 1 ? 'persona' : 'personas'}
              </span>
              <button type="button" onClick={aumentarPersonas} disabled={personas >= 10}>
                +
              </button>
            </div>
          </div>

          {/* NUEVO: MODALIDAD DE RESERVA */}
          <div className="reserva-grupo">
            <label>¿Cómo deseas disfrutar tu visita?</label>
            <div className="row g-3 mt-1">
              <div className="col-md-6">
                <button
                  type="button"
                  aria-pressed={!esCarta}
                  className={`zona-sin-preferencia w-100 h-100 text-start ${
                    !esCarta ? 'seleccionada' : ''
                  }`}
                  onClick={() => setTipoReserva('experiencia')}
                >
                  <div>
                    <strong>🍽️ EXPERIENCIA GASTRONÓMICA</strong>
                    <span>Elige tu experiencia y maridaje.</span>
                  </div>
                  <span className="zona-radio">{!esCarta ? '✓' : ''}</span>
                </button>
              </div>
              <div className="col-md-6">
                <button
                  type="button"
                  aria-pressed={esCarta}
                  className={`zona-sin-preferencia w-100 h-100 text-start ${
                    esCarta ? 'seleccionada' : ''
                  }`}
                  onClick={() => setTipoReserva('carta')}
                >
                  <div>
                    <strong>📖 CARTA AL LLEGAR</strong>
                    <span>Elige tus platos al llegar. Garantía de S/25 por persona.</span>
                  </div>
                  <span className="zona-radio">{esCarta ? '✓' : ''}</span>
                </button>
              </div>
            </div>
          </div>

          {/* EXPERIENCIAS: SOLO EN ESTA MODALIDAD */}
          {!esCarta && (
            <div className="reserva-grupo consumo-reserva-seccion">
              <div className="consumo-reserva-header">
                <div>
                  <span>EXPERIENCIA MAYTA</span>
                  <h2>Selecciona el tipo de consumo</h2>
                  <p>Asigna una experiencia por cada persona de la reserva.</p>
                </div>
                <div
                  className={
                    totalAsignados === personas
                      ? 'consumo-asignados completo'
                      : 'consumo-asignados'
                  }
                >
                  {totalAsignados === personas ? '✓ ' : ''}
                  {totalAsignados} DE {personas} ASIGNADOS
                </div>
              </div>

              <div className="consumo-opciones">
                {OPCIONES_CONSUMO.map((opcion) => (
                  <div className="consumo-opcion" key={opcion.id}>
                    <div className="consumo-opcion-info">
                      <strong>{opcion.nombre}</strong>
                      <span>{opcion.detalle}</span>
                      <small>
                        S/ {opcion.precio.toLocaleString('es-PE')} por persona
                      </small>
                    </div>
                    <div className="consumo-cantidad">
                      <button
                        type="button"
                        onClick={() => cambiarCantidadConsumo(opcion.id, -1)}
                        disabled={cantidadesConsumo[opcion.id] === 0}
                      >
                        −
                      </button>
                      <strong>{cantidadesConsumo[opcion.id]}</strong>
                      <button
                        type="button"
                        onClick={() => cambiarCantidadConsumo(opcion.id, 1)}
                        disabled={totalAsignados >= personas}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="consumo-total">
                <div>
                  <span>TOTAL ESTIMADO</span>
                  <p>El detalle completo volverá a mostrarse antes del pago.</p>
                </div>
                <strong>S/ {totalConsumos.toLocaleString('es-PE')}</strong>
              </div>
            </div>
          )}

          {/* GARANTÍA: VISIBLE SOLO CUANDO ELIGEN CARTA AL LLEGAR */}
          {esCarta && (
            <div className="reserva-grupo">
              <div className="consumo-total">
                <div>
                  <span>GARANTÍA DE RESERVA</span>
                  <p>
                    S/25 por persona. Este anticipo se descontará del consumo
                    registrado al llegar al restaurante.
                  </p>
                </div>
                <strong>S/ {garantiaReserva.toLocaleString('es-PE')}</strong>
              </div>
            </div>
          )}

          {/* SELECCIÓN DE AMBIENTE */}
          <div className="reserva-grupo">
            <label>¿Dónde te gustaría sentarte?</label>
            <p className="reserva-ayuda">
              Puedes dejar que MAYTA asigne tu ubicación o seleccionar uno de
              nuestros ambientes.
            </p>

            <button
              type="button"
              className={
                zona === 'Sin preferencia'
                  ? 'zona-sin-preferencia seleccionada'
                  : 'zona-sin-preferencia'
              }
              onClick={() => seleccionarZona('Sin preferencia')}
            >
              <div>
                <strong>SIN PREFERENCIA</strong>
                <span>MAYTA asignará automáticamente la mejor mesa disponible.</span>
              </div>
              <span className="zona-radio">
                {zona === 'Sin preferencia' ? '✓' : ''}
              </span>
            </button>

            <div className="zonas-reserva-grid">
              {ZONAS.map((opcion) => (
                <button
                  type="button"
                  key={opcion.nombre}
                  className={
                    zona === opcion.nombre
                      ? 'zona-reserva-card seleccionada'
                      : 'zona-reserva-card'
                  }
                  onClick={() => seleccionarZona(opcion.nombre)}
                >
                  <div className="zona-reserva-imagen">
                    <img src={opcion.imagen} alt={opcion.nombre} />
                    {zona === opcion.nombre && (
                      <span className="zona-check">✓</span>
                    )}
                  </div>
                  <div className="zona-reserva-info">
                    <strong>{opcion.nombre}</strong>
                    <p>{opcion.descripcion}</p>
                    <span>
                      {zona === opcion.nombre ? 'SELECCIONADO' : 'SELECCIONAR'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* MESAS: 12 POR AMBIENTE, EN CUADRÍCULA RESPONSIVE */}
          {zona !== 'Sin preferencia' && zonaSeleccionada && (
            <div className="reserva-grupo mesas-cliente-seccion">
              <div className="mesas-cliente-header">
                <span>SELECCIÓN DE MESA · DEMOSTRACIÓN</span>
                <h2>{zona}</h2>
                <p>
                  12 mesas en este ambiente. Selecciona una según el tamaño de
                  tu grupo. La disponibilidad real se conectará con MySQL.
                </p>
              </div>

              {/* Bootstrap: 1 columna móvil, 2 en tablet, 3 en escritorio. */}
              <div className="row g-3">
                {MESAS_DEMO.filter((mesa) => mesa.zona === zona).map((mesa) => {
                  const capacidadInsuficiente = personas > mesa.capacidad;
                  const noDisponible = !mesa.disponible || capacidadInsuficiente;
                  const seleccionada = mesaSeleccionada?.id === mesa.id;

                  return (
                    <div className="col-12 col-sm-6 col-md-4 d-flex" key={mesa.id}>
                      <button
                        type="button"
                        disabled={noDisponible}
                        aria-pressed={seleccionada}
                        aria-label={`${mesa.nombre}, capacidad ${mesa.capacidad} personas, ${
                          !mesa.disponible
                            ? 'ocupada en la demostración'
                            : capacidadInsuficiente
                            ? 'capacidad insuficiente'
                            : seleccionada
                            ? 'seleccionada'
                            : 'seleccionar'
                        }`}
                        onClick={() => setMesaSeleccionada(mesa)}
                        className={`mesa-cliente-card d-flex flex-column h-100 ${
                          seleccionada ? 'seleccionada' : ''
                        } ${noDisponible ? 'bloqueada' : ''}`}
                      >
                        {/* FOTO DEL AMBIENTE */}
                        <div
                          className="mesa-cliente-imagen w-100"
                          style={{ height: 105, minHeight: 105 }}
                        >
                          <img
                            src={zonaSeleccionada.imagen}
                            alt={`Ambiente ${zona}`}
                          />
                        </div>

                        {/* INFORMACIÓN COMPACTA */}
                        <div className="mesa-cliente-info w-100 flex-grow-1">
                          <span>MESA</span>
                          <h3>{mesa.nombre}</h3>
                          <small>👥 Hasta {mesa.capacidad} personas</small>
                        </div>

                        {/* ESTADO DE SELECCIÓN */}
                        <div
                          className="mesa-cliente-accion flex-row mt-auto w-100"
                          style={{
                            borderLeft: 'none',
                            borderTop: '1px solid #e3ddd4',
                            minHeight: 40,
                          }}
                        >
                          {!mesa.disponible ? (
                            <span className="mesa-capacidad-error">OCUPADA (DEMO)</span>
                          ) : capacidadInsuficiente ? (
                            <span className="mesa-capacidad-error">
                              CAPACIDAD INSUFICIENTE
                            </span>
                          ) : seleccionada ? (
                            <>
                              <span className="mesa-check-simple">✓</span>
                              <strong>SELECCIONADA</strong>
                            </>
                          ) : (
                            <strong>SELECCIONAR</strong>
                          )}
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>

              {mesaSeleccionada && (
                <div className="mesa-cliente-confirmacion">
                  <span>✓</span>
                  <div>
                    <strong>{mesaSeleccionada.nombre} seleccionada</strong>
                    <p>
                      {zona} · {personas} personas
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* REQUERIMIENTOS ESPECIALES */}
          <div className="reserva-opciones">
            <label>
              <input
                type="checkbox"
                checked={accesible}
                onChange={(e) => setAccesible(e.target.checked)}
              />
              Requiero acceso para silla de ruedas
            </label>
            <label>
              <input
                type="checkbox"
                checked={sillaNino}
                onChange={(e) => setSillaNino(e.target.checked)}
              />
              Necesito silla para niño
            </label>
          </div>

          {/* CONTINUAR: CARTA NO EXIGE ASIGNAR EXPERIENCIAS */}
          <button
            type="button"
            className="btn buscar-disponibilidad"
            onClick={buscarDisponibilidad}
            disabled={!esCarta && totalAsignados !== personas}
          >
            BUSCAR DISPONIBILIDAD
          </button>
        </div>
      </div>
    </section>
  );
};
