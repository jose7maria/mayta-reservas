import { useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';


export const Reservas = () => {

  const [filtro, setFiltro] = useState('Todas');

  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);


  const [reservas, setReservas] = useState([

    {
      id: 1,
      codigo: 'MAY-0245',
      fecha: '30/10/2026',
      hora: '8:00 PM',

      cliente: 'José Barzola',
      celular: '999 111 222',
      correo: 'jose@email.com',

      personas: 4,
      mesa: 'M10',
      zona: 'Salón principal',

      estado: 'Confirmada',

      comensales: [
        {
          id: 1,
          tipo: 'Adulto',
          acompanamiento: 'Maridaje',
          restricciones: []
        },
        {
          id: 2,
          tipo: 'Adulto',
          acompanamiento: 'Sin maridaje',
          restricciones: ['Sin gluten']
        },
        {
          id: 3,
          tipo: 'Menor',
          acompanamiento: 'Sin alcohol',
          restricciones: []
        },
        {
          id: 4,
          tipo: 'Menor',
          acompanamiento: 'Sin alcohol',
          restricciones: ['Alergia a mariscos']
        }
      ],

      observaciones: 'Celebración de cumpleaños.'
    },


    {
      id: 2,
      codigo: 'MAY-0246',
      fecha: '30/10/2026',
      hora: '8:30 PM',

      cliente: 'Andrea Chavez',
      celular: '988 222 333',
      correo: 'andrea@email.com',

      personas: 2,
      mesa: 'M3',
      zona: 'Salón principal',

      estado: 'Pendiente',

      comensales: [
        {
          id: 1,
          tipo: 'Adulto',
          acompanamiento: 'Maridaje',
          restricciones: []
        },
        {
          id: 2,
          tipo: 'Adulto',
          acompanamiento: 'Sin maridaje',
          restricciones: ['Lactosa']
        }
      ],

      observaciones: ''
    },


    {
      id: 3,
      codigo: 'MAY-0247',
      fecha: '31/10/2026',
      hora: '7:00 PM',

      cliente: 'Carlos Torres',
      celular: '977 333 444',
      correo: 'carlos@email.com',

      personas: 6,
      mesa: 'M6',
      zona: 'Terraza / exterior',

      estado: 'Confirmada',

      comensales: [
        {
          id: 1,
          tipo: 'Adulto',
          acompanamiento: 'Maridaje',
          restricciones: []
        },
        {
          id: 2,
          tipo: 'Adulto',
          acompanamiento: 'Maridaje',
          restricciones: []
        },
        {
          id: 3,
          tipo: 'Adulto',
          acompanamiento: 'Sin maridaje',
          restricciones: []
        },
        {
          id: 4,
          tipo: 'Adulto',
          acompanamiento: 'Sin alcohol',
          restricciones: ['Vegetariano']
        },
        {
          id: 5,
          tipo: 'Menor',
          acompanamiento: 'Sin alcohol',
          restricciones: []
        },
        {
          id: 6,
          tipo: 'Menor',
          acompanamiento: 'Sin alcohol',
          restricciones: []
        }
      ],

      observaciones: 'Mesa cercana a una zona tranquila.'
    }

  ]);


  /* =========================
     FILTRAR
  ========================= */

  const reservasFiltradas =
    filtro === 'Todas'
      ? reservas
      : reservas.filter(
          reserva => reserva.estado === filtro
        );


  /* =========================
     CANCELAR RESERVA
  ========================= */

  const cancelarReserva = (id) => {

    const nuevasReservas = reservas.map((reserva) => {

      if (reserva.id === id) {

        return {
          ...reserva,
          estado: 'Cancelada'
        };

      }

      return reserva;

    });


    setReservas(nuevasReservas);

    setReservaSeleccionada(null);
  };


  return (
    <AdminLayout>


      {/* =========================
          ENCABEZADO
      ========================= */}

      <div className="admin-pagina-header">

        <span>
          PANEL ADMINISTRATIVO
        </span>

        <h1>
          Reservas
        </h1>

        <p>
          Consulta las reservas y revisa
          la información de cada cliente.
        </p>

      </div>



      {/* =========================
          LISTADO
      ========================= */}

      <div className="admin-modulo">


        {/* FILTRO */}

        <div className="reservas-toolbar">

          <div>

            <label>
              Estado
            </label>

            <select
              className="form-select form-select-sm"
              value={filtro}
              onChange={(e) =>
                setFiltro(e.target.value)
              }
            >

              <option>Todas</option>

              <option>Confirmada</option>

              <option>Pendiente</option>

              <option>Cancelada</option>

            </select>

          </div>


          <span>
            {reservasFiltradas.length} reservas
          </span>

        </div>



        {/* TABLA */}

        <div className="table-responsive">

          <table className="table admin-tabla">

            <thead>

              <tr>

                <th>Código</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Cliente</th>
                <th>Pers.</th>
                <th>Mesa</th>
                <th>Estado</th>
                <th>Acción</th>

              </tr>

            </thead>


            <tbody>

              {reservasFiltradas.map((reserva) => (

                <tr key={reserva.id}>

                  <td>
                    <strong>
                      {reserva.codigo}
                    </strong>
                  </td>

                  <td>
                    {reserva.fecha}
                  </td>

                  <td>
                    {reserva.hora}
                  </td>

                  <td>
                    {reserva.cliente}
                  </td>

                  <td>
                    {reserva.personas}
                  </td>

                  <td>
                    {reserva.mesa}
                  </td>


                  <td>

                    <span
                      className={`
                        admin-estado
                        ${reserva.estado.toLowerCase()}
                      `}
                    >
                      {reserva.estado}
                    </span>

                  </td>


                  <td>

                    <button
                      type="button"
                      className="btn btn-sm admin-btn-ver"
                      onClick={() =>
                        setReservaSeleccionada(reserva)
                      }
                    >
                      Ver
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>



      {/* =========================
          MODAL DETALLE
      ========================= */}

      {reservaSeleccionada && (

        <div className="reserva-admin-modal-fondo">

          <div className="reserva-admin-modal">


            {/* CABECERA */}

            <div className="reserva-admin-modal-header">

              <div>

                <span>
                  DETALLE DE RESERVA
                </span>

                <h2>
                  {reservaSeleccionada.codigo}
                </h2>

              </div>


              <button
                type="button"
                onClick={() =>
                  setReservaSeleccionada(null)
                }
              >
                ×
              </button>

            </div>



            {/* CLIENTE */}

            <div className="reserva-admin-cliente">

              <div>

                <span>
                  CLIENTE
                </span>

                <strong>
                  {reservaSeleccionada.cliente}
                </strong>

                <p>
                  {reservaSeleccionada.correo}
                </p>

                <p>
                  {reservaSeleccionada.celular}
                </p>

              </div>


              <span
                className={`
                  admin-estado
                  ${reservaSeleccionada.estado.toLowerCase()}
                `}
              >
                {reservaSeleccionada.estado}
              </span>

            </div>



            {/* DATOS */}

            <div className="reserva-admin-resumen">

              <div>
                <span>FECHA</span>
                <strong>
                  {reservaSeleccionada.fecha}
                </strong>
              </div>


              <div>
                <span>HORA</span>
                <strong>
                  {reservaSeleccionada.hora}
                </strong>
              </div>


              <div>
                <span>PERSONAS</span>
                <strong>
                  {reservaSeleccionada.personas}
                </strong>
              </div>


              <div>
                <span>MESA</span>
                <strong>
                  {reservaSeleccionada.mesa}
                </strong>
              </div>


              <div>
                <span>UBICACIÓN</span>
                <strong>
                  {reservaSeleccionada.zona}
                </strong>
              </div>

            </div>



            {/* COMENSALES */}

            <div className="reserva-admin-seccion">

              <h3>
                COMENSALES
              </h3>


              <div className="reserva-admin-comensales">

                {reservaSeleccionada.comensales.map(
                  (comensal) => (

                    <div
                      className="reserva-admin-comensal"
                      key={comensal.id}
                    >

                      <div>

                        <strong>
                          Comensal {comensal.id}
                        </strong>

                        <span>
                          {comensal.tipo}
                        </span>

                      </div>


                      <p>
                        <strong>
                          Menú:
                        </strong>{' '}

                        Bitácora Amazónica
                      </p>


                      <p>
                        <strong>
                          Acompañamiento:
                        </strong>{' '}

                        {comensal.acompanamiento}
                      </p>


                      <p>
                        <strong>
                          Restricciones:
                        </strong>{' '}

                        {
                          comensal.restricciones.length > 0
                            ? comensal.restricciones.join(', ')
                            : 'Ninguna'
                        }
                      </p>

                    </div>

                  )
                )}

              </div>

            </div>



            {/* OBSERVACIONES */}

            {reservaSeleccionada.observaciones && (

              <div className="reserva-admin-observaciones">

                <span>
                  OBSERVACIONES
                </span>

                <p>
                  {reservaSeleccionada.observaciones}
                </p>

              </div>

            )}



            {/* ACCIONES */}

            <div className="reserva-admin-acciones">

              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() =>
                  setReservaSeleccionada(null)
                }
              >
                CERRAR
              </button>


              {
                reservaSeleccionada.estado !== 'Cancelada' && (

                  <button
                    type="button"
                    className="btn btn-sm btn-cancelar-reserva"
                    onClick={() =>
                      cancelarReserva(
                        reservaSeleccionada.id
                      )
                    }
                  >
                    CANCELAR RESERVA
                  </button>

                )
              }

            </div>


          </div>

        </div>

      )}


    </AdminLayout>
  );

};