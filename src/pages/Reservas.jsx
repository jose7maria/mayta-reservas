import { useEffect, useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';

/* ==================================================
   AYUDAS PARA MOSTRAR RESERVAS
   Las reservas todavía se leen desde localStorage.
   Cuando exista la API REST, cambiaremos la fuente
   de datos sin reconstruir el diseño del panel.
================================================== */

const soles = (valor) =>
  `S/ ${Number(valor || 0).toLocaleString('es-PE')}`;

const esCartaAlLlegar = (reserva) => {
  if (reserva.tipoReserva === 'carta') return true;
  if (reserva.tipoReserva === 'experiencia') return false;

  // Compatibilidad con reservas anteriores a la última actualización.
  return Array.isArray(reserva.consumos) && reserva.consumos.some(
    (item) => item.id === 'garantia-carta'
  );
};

const modalidadTexto = (reserva) =>
  esCartaAlLlegar(reserva) ? 'Carta al llegar' : 'Experiencia gastronómica';

const obtenerGarantia = (reserva) => {
  if (!esCartaAlLlegar(reserva)) return 0;

  // Las reservas nuevas guardan la garantía en un campo independiente.
  if (Number(reserva.garantiaReserva) > 0) {
    return Number(reserva.garantiaReserva);
  }

  // En algunos registros anteriores la garantía estaba en consumos.
  const detalleAntiguo = Array.isArray(reserva.consumos)
    ? reserva.consumos.find((item) => item.id === 'garantia-carta')
    : null;

  return Number(detalleAntiguo?.subtotal || 0);
};

const obtenerExperiencias = (reserva) => {
  if (esCartaAlLlegar(reserva)) return [];

  return Array.isArray(reserva.consumos)
    ? reserva.consumos.filter((item) => item.id !== 'garantia-carta')
    : [];
};

const formatearFecha = (fecha) => {
  if (!fecha) return '-';

  const objeto = new Date(`${fecha}T00:00:00`);
  if (Number.isNaN(objeto.getTime())) return fecha;

  return objeto.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);

  /* ==================================================
     LECTURA DE RESERVAS (SIMULACIÓN ACTUAL)
  ================================================== */

  const cargarReservas = () => {
    try {
      const guardadas = JSON.parse(
        localStorage.getItem('reservasMayta') || '[]'
      );
      setReservas(Array.isArray(guardadas) ? guardadas : []);
    } catch (error) {
      // Si se dañó el contenido local, no rompemos todo el panel.
      console.error('No se pudieron leer las reservas:', error);
      setReservas([]);
    }
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  /* ==================================================
     INDICADORES: NO CONFUNDIR GARANTÍAS CON VENTAS
  ================================================== */

  const totalReservas = reservas.length;
  const confirmadas = reservas.filter(
    (reserva) => reserva.estado === 'Confirmada'
  ).length;
  const pagadas = reservas.filter(
    (reserva) => reserva.pago?.estado === 'Pagado'
  ).length;
  const reservasCarta = reservas.filter(esCartaAlLlegar).length;
  const reservasExperiencia = totalReservas - reservasCarta;

  // Pagos registrados en la SIMULACIÓN, no ingresos bancarios reales.
  const pagosSimulados = reservas.reduce((total, reserva) => {
    if (reserva.pago?.estado !== 'Pagado') return total;
    return total + Number(reserva.pago?.monto ?? reserva.total ?? 0);
  }, 0);

  const garantiasRegistradas = reservas.reduce((total, reserva) => {
    if (!esCartaAlLlegar(reserva)) return total;
    if (reserva.pago?.estado !== 'Pagado') return total;
    return total + obtenerGarantia(reserva);
  }, 0);

  const reservaCartaSeleccionada = reservaSeleccionada
    ? esCartaAlLlegar(reservaSeleccionada)
    : false;
  const experienciasSeleccionadas = reservaSeleccionada
    ? obtenerExperiencias(reservaSeleccionada)
    : [];
  const garantiaSeleccionada = reservaSeleccionada
    ? obtenerGarantia(reservaSeleccionada)
    : 0;

  return (
    <AdminLayout>
      <div className="admin-reservas-page">
        {/* CABECERA */}
        <div className="admin-page-header">
          <div>
            <span>GESTIÓN DE RESERVAS</span>
            <h1>Reservas</h1>
            <p>
              Consulta las reservas realizadas por los clientes, sus modalidades
              y pagos simulados.
            </p>
          </div>

          <button
            type="button"
            className="admin-btn-recargar"
            onClick={cargarReservas}
          >
            ACTUALIZAR
          </button>
        </div>

        {/* INDICADORES EXISTENTES, CON IMPORTES CORRECTAMENTE ROTULADOS */}
        <div className="admin-reservas-kpis">
          <div className="admin-reserva-kpi">
            <span>TOTAL RESERVAS</span>
            <strong>{totalReservas}</strong>
          </div>
          <div className="admin-reserva-kpi">
            <span>CONFIRMADAS</span>
            <strong>{confirmadas}</strong>
          </div>
          <div className="admin-reserva-kpi">
            <span>PAGADAS (DEMO)</span>
            <strong>{pagadas}</strong>
          </div>
          <div className="admin-reserva-kpi">
            <span>PAGOS SIMULADOS</span>
            <strong>{soles(pagosSimulados)}</strong>
          </div>
        </div>

        {/* TABLA PRINCIPAL */}
        <div className="admin-reservas-card">
          <div className="admin-reservas-card-header">
            <div>
              <span>REGISTRO</span>
              <h2>Reservas registradas</h2>
              <p className="admin-tabla-secundario">
                {reservasExperiencia} de experiencia · {reservasCarta} de carta al llegar
                {garantiasRegistradas > 0 && (
                  <> · Garantías simuladas: {soles(garantiasRegistradas)}</>
                )}
              </p>
            </div>
            <strong>
              {totalReservas} {totalReservas === 1 ? 'reserva' : 'reservas'}
            </strong>
          </div>

          {reservas.length === 0 ? (
            <div className="admin-reservas-vacio">
              <strong>No hay reservas registradas</strong>
              <p>Las reservas confirmadas desde la web aparecerán aquí.</p>
            </div>
          ) : (
            <div className="admin-tabla-scroll">
              <table className="admin-reservas-tabla">
                <thead>
                  <tr>
                    <th>CÓDIGO</th>
                    <th>CLIENTE</th>
                    <th>MODALIDAD</th>
                    <th>FECHA</th>
                    <th>HORA</th>
                    <th>PERS.</th>
                    <th>MESA</th>
                    <th>IMPORTE</th>
                    <th>PAGO</th>
                    <th>ESTADO</th>
                    <th>ACCIÓN</th>
                  </tr>
                </thead>

                <tbody>
                  {reservas.map((reserva, indice) => (
                    <tr key={`${reserva.codigo || 'reserva'}-${indice}`}>
                      <td>
                        <strong className="admin-codigo-reserva">
                          {reserva.codigo || '-'}
                        </strong>
                      </td>
                      <td>
                        <strong>{reserva.cliente?.nombre || 'Sin nombre'}</strong>
                        <span className="admin-tabla-secundario">
                          {reserva.cliente?.correo || ''}
                        </span>
                      </td>
                      <td>
                        <strong>{modalidadTexto(reserva)}</strong>
                        {esCartaAlLlegar(reserva) && (
                          <span className="admin-tabla-secundario">
                            Garantía: {soles(obtenerGarantia(reserva))}
                          </span>
                        )}
                      </td>
                      <td>{formatearFecha(reserva.fecha)}</td>
                      <td>{reserva.hora || '-'}</td>
                      <td>{reserva.personas ?? '-'}</td>
                      <td>{reserva.mesa || '-'}</td>
                      <td>
                        <strong>{soles(reserva.total)}</strong>
                      </td>
                      <td>
                        <span
                          className={
                            reserva.pago?.estado === 'Pagado'
                              ? 'admin-badge pago'
                              : 'admin-badge pendiente'
                          }
                        >
                          {reserva.pago?.estado || 'Pendiente'}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`admin-badge estado-${String(
                            reserva.estado || 'pendiente'
                          ).toLowerCase().replaceAll(' ', '-')}`}
                        >
                          {reserva.estado || 'Pendiente'}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="admin-btn-ver"
                          onClick={() => setReservaSeleccionada(reserva)}
                        >
                          VER
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ==================================================
          MODAL: DETALLE DE LA RESERVA
      ================================================== */}
      {reservaSeleccionada && (
        <div
          className="admin-modal-fondo"
          onClick={() => setReservaSeleccionada(null)}
        >
          <div
            className="admin-modal-reserva"
            role="dialog"
            aria-modal="true"
            aria-label="Detalle de reserva"
            onClick={(evento) => evento.stopPropagation()}
          >
            <div className="admin-modal-header">
              <div>
                <span>DETALLE DE RESERVA</span>
                <h2>{reservaSeleccionada.codigo || '-'}</h2>
              </div>
              <button
                type="button"
                aria-label="Cerrar detalle"
                onClick={() => setReservaSeleccionada(null)}
              >
                ×
              </button>
            </div>

            {/* CLIENTE */}
            <div className="admin-detalle-seccion">
              <h3>CLIENTE</h3>
              <div className="admin-detalle-grid">
                <div>
                  <span>NOMBRE</span>
                  <strong>{reservaSeleccionada.cliente?.nombre || '-'}</strong>
                </div>
                <div>
                  <span>CELULAR</span>
                  <strong>{reservaSeleccionada.cliente?.celular || '-'}</strong>
                </div>
                <div>
                  <span>CORREO</span>
                  <strong>{reservaSeleccionada.cliente?.correo || '-'}</strong>
                </div>
              </div>
            </div>

            {/* FECHA, AMBIENTE Y MODALIDAD */}
            <div className="admin-detalle-seccion">
              <h3>RESERVA</h3>
              <div className="admin-detalle-grid">
                <div>
                  <span>MODALIDAD</span>
                  <strong>{modalidadTexto(reservaSeleccionada)}</strong>
                </div>
                <div>
                  <span>FECHA</span>
                  <strong>{formatearFecha(reservaSeleccionada.fecha)}</strong>
                </div>
                <div>
                  <span>HORA</span>
                  <strong>{reservaSeleccionada.hora || '-'}</strong>
                </div>
                <div>
                  <span>PERSONAS</span>
                  <strong>{reservaSeleccionada.personas ?? '-'}</strong>
                </div>
                <div>
                  <span>AMBIENTE</span>
                  <strong>{reservaSeleccionada.zona || '-'}</strong>
                </div>
                <div>
                  <span>MESA</span>
                  <strong>{reservaSeleccionada.mesa || '-'}</strong>
                </div>
                <div>
                  <span>ESTADO</span>
                  <strong>{reservaSeleccionada.estado || '-'}</strong>
                </div>
              </div>
            </div>

            {/* EXPERIENCIAS O GARANTÍA: NO SON LO MISMO */}
            <div className="admin-detalle-seccion">
              <h3>
                {reservaCartaSeleccionada
                  ? 'GARANTÍA DE RESERVA'
                  : 'EXPERIENCIAS SELECCIONADAS'}
              </h3>

              <div className="admin-detalle-consumos">
                {reservaCartaSeleccionada ? (
                  <div>
                    <span>
                      {reservaSeleccionada.personas} × Garantía de Carta al llegar
                      <br />
                      <small>
                        Anticipo descontable del consumo final; platos y bebidas
                        se elegirán durante la visita.
                      </small>
                    </span>
                    <strong>{soles(garantiaSeleccionada)}</strong>
                  </div>
                ) : experienciasSeleccionadas.length > 0 ? (
                  experienciasSeleccionadas.map((consumo, indice) => (
                    <div key={`${consumo.id || 'consumo'}-${indice}`}>
                      <span>
                        {consumo.cantidad} × {consumo.nombre}
                      </span>
                      <strong>{soles(consumo.subtotal)}</strong>
                    </div>
                  ))
                ) : (
                  <p className="admin-observaciones">
                    Sin experiencias registradas.
                  </p>
                )}
              </div>
            </div>

            {/* ADICIONALES SEPARADOS DEL ANTICIPO */}
            {reservaSeleccionada.adicionales?.libroMayta && (
              <div className="admin-detalle-seccion">
                <h3>ADICIONALES</h3>
                <div className="admin-detalle-consumos">
                  <div>
                    <span>1 × Libro de Mayta</span>
                    <strong>
                      {soles(reservaSeleccionada.adicionales.precioLibro)}
                    </strong>
                  </div>
                </div>
              </div>
            )}

            <div className="admin-detalle-seccion">
              <div className="admin-detalle-total">
                <span>
                  {reservaSeleccionada.pago?.estado === 'Pagado'
                    ? 'TOTAL PAGADO (SIMULADO)'
                    : 'IMPORTE DE RESERVA'}
                </span>
                <strong>{soles(reservaSeleccionada.total)}</strong>
              </div>
              {reservaCartaSeleccionada && (
                <p className="admin-observaciones">
                  La garantía de {soles(garantiaSeleccionada)} se descontará
                  del consumo al llegar. El total incluye los adicionales
                  seleccionados, si los hay.
                </p>
              )}
            </div>

            {/* PAGO SIMULADO */}
            <div className="admin-detalle-seccion">
              <h3>PAGO</h3>
              <div className="admin-detalle-grid">
                <div>
                  <span>ESTADO</span>
                  <strong>{reservaSeleccionada.pago?.estado || 'Pendiente'}</strong>
                </div>
                <div>
                  <span>MÉTODO</span>
                  <strong>{reservaSeleccionada.pago?.metodo || '-'}</strong>
                </div>
                <div>
                  <span>TARJETA</span>
                  <strong>
                    {reservaSeleccionada.pago?.ultimos4
                      ? `•••• ${reservaSeleccionada.pago.ultimos4}`
                      : 'No registrada'}
                  </strong>
                </div>
                <div>
                  <span>MONTO REGISTRADO</span>
                  <strong>{soles(reservaSeleccionada.pago?.monto)}</strong>
                </div>
              </div>
            </div>

            {/* COMPROBANTE */}
            <div className="admin-detalle-seccion">
              <h3>COMPROBANTE</h3>
              <div className="admin-detalle-grid">
                <div>
                  <span>TIPO</span>
                  <strong>
                    {reservaSeleccionada.comprobante?.tipo || 'No solicitado'}
                  </strong>
                </div>
                {reservaSeleccionada.comprobante?.documento && (
                  <div>
                    <span>DOCUMENTO</span>
                    <strong>{reservaSeleccionada.comprobante.documento}</strong>
                  </div>
                )}
                {reservaSeleccionada.comprobante?.razonSocial && (
                  <div>
                    <span>RAZÓN SOCIAL</span>
                    <strong>{reservaSeleccionada.comprobante.razonSocial}</strong>
                  </div>
                )}
                {reservaSeleccionada.comprobante?.correo && (
                  <div>
                    <span>CORREO</span>
                    <strong>{reservaSeleccionada.comprobante.correo}</strong>
                  </div>
                )}
              </div>
            </div>

            {/* PREFERENCIAS Y REQUERIMIENTOS */}
            {reservaSeleccionada.preferenciasRegistradas &&
              Array.isArray(reservaSeleccionada.comensales) &&
              reservaSeleccionada.comensales.length > 0 && (
                <div className="admin-detalle-seccion">
                  <h3>COMENSALES</h3>
                  <div className="admin-comensales-lista">
                    {reservaSeleccionada.comensales.map((comensal, indice) => (
                      <div key={`${comensal.id || 'comensal'}-${indice}`}>
                        <strong>Comensal {comensal.id || indice + 1}</strong>
                        <span>{comensal.tipo || 'No especificado'}</span>
                        <p>
                          {Array.isArray(comensal.restricciones) &&
                          comensal.restricciones.length > 0
                            ? comensal.restricciones.join(', ')
                            : 'Sin restricciones'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {(reservaSeleccionada.requerimientos?.accesible ||
              reservaSeleccionada.requerimientos?.sillaNino) && (
              <div className="admin-detalle-seccion">
                <h3>REQUERIMIENTOS</h3>
                <p className="admin-observaciones">
                  {[
                    reservaSeleccionada.requerimientos.accesible
                      ? 'Acceso para silla de ruedas'
                      : null,
                    reservaSeleccionada.requerimientos.sillaNino
                      ? 'Silla para niño'
                      : null,
                  ].filter(Boolean).join(' · ')}
                </p>
              </div>
            )}

            <div className="admin-detalle-seccion">
              <h3>OBSERVACIONES</h3>
              <p className="admin-observaciones">
                {reservaSeleccionada.observaciones || 'Sin observaciones.'}
              </p>
            </div>

            <button
              type="button"
              className="admin-btn-cerrar-modal"
              onClick={() => setReservaSeleccionada(null)}
            >
              CERRAR
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
