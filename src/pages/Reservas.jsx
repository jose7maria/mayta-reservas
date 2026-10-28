import { useEffect, useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';


export const Reservas = () => {

  /* ==================================================
     RESERVAS
  ================================================== */

  const [reservas, setReservas] =
    useState([]);

  const [
    reservaSeleccionada,
    setReservaSeleccionada
  ] = useState(null);



  /* ==================================================
     CARGAR LOCALSTORAGE
  ================================================== */

  useEffect(() => {

    cargarReservas();

  }, []);



  const cargarReservas = () => {

    const guardadas =
      JSON.parse(
        localStorage.getItem(
          'reservasMayta'
        )
      ) || [];


    setReservas(
      guardadas
    );

  };



  /* ==================================================
     FORMATEAR FECHA
  ================================================== */

  const formatearFecha = (
    fecha
  ) => {

    if (!fecha) {
      return '-';
    }


    const objetoFecha =
      new Date(
        `${fecha}T00:00:00`
      );


    return objetoFecha
      .toLocaleDateString(
        'es-PE',
        {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }
      );

  };



  /* ==================================================
     TOTAL DE RESERVAS
  ================================================== */

  const totalReservas =
    reservas.length;


  const confirmadas =
    reservas.filter(
      reserva =>
        reserva.estado ===
        'Confirmada'
    ).length;


  const pagadas =
    reservas.filter(
      reserva =>
        reserva.pago?.estado ===
        'Pagado'
    ).length;


  const totalVentas =
    reservas.reduce(
      (total, reserva) =>
        total +
        Number(
          reserva.total || 0
        ),
      0
    );



  return (

    <AdminLayout>


      <div className="admin-reservas-page">


        {/* ==================================================
            CABECERA
        ================================================== */}

        <div className="admin-page-header">

          <div>

            <span>
              GESTIÓN DE RESERVAS
            </span>

            <h1>
              Reservas
            </h1>

            <p>
              Consulta las reservas realizadas
              por los clientes.
            </p>

          </div>


          <button
            type="button"

            className="admin-btn-recargar"

            onClick={
              cargarReservas
            }
          >
            ACTUALIZAR
          </button>

        </div>



        {/* ==================================================
            INDICADORES
        ================================================== */}

        <div className="admin-reservas-kpis">


          <div className="admin-reserva-kpi">

            <span>
              TOTAL RESERVAS
            </span>

            <strong>
              {totalReservas}
            </strong>

          </div>



          <div className="admin-reserva-kpi">

            <span>
              CONFIRMADAS
            </span>

            <strong>
              {confirmadas}
            </strong>

          </div>



          <div className="admin-reserva-kpi">

            <span>
              PAGADAS
            </span>

            <strong>
              {pagadas}
            </strong>

          </div>



          <div className="admin-reserva-kpi">

            <span>
              INGRESOS
            </span>

            <strong>
              S/{' '}
              {
                totalVentas
                  .toLocaleString(
                    'es-PE'
                  )
              }
            </strong>

          </div>


        </div>



        {/* ==================================================
            TABLA
        ================================================== */}

        <div className="admin-reservas-card">


          <div className="admin-reservas-card-header">

            <div>

              <span>
                REGISTRO
              </span>

              <h2>
                Reservas registradas
              </h2>

            </div>


            <strong>
              {totalReservas}
              {' '}
              {
                totalReservas === 1
                  ? 'reserva'
                  : 'reservas'
              }
            </strong>

          </div>



          {
            reservas.length === 0 ? (

              <div className="admin-reservas-vacio">

                <strong>
                  No hay reservas registradas
                </strong>

                <p>
                  Las reservas confirmadas
                  desde la web aparecerán aquí.
                </p>

              </div>

            ) : (

              <div className="admin-tabla-scroll">


                <table className="admin-reservas-tabla">

                  <thead>

                    <tr>

                      <th>
                        CÓDIGO
                      </th>

                      <th>
                        CLIENTE
                      </th>

                      <th>
                        FECHA
                      </th>

                      <th>
                        HORA
                      </th>

                      <th>
                        PERS.
                      </th>

                      <th>
                        MESA
                      </th>

                      <th>
                        TOTAL
                      </th>

                      <th>
                        PAGO
                      </th>

                      <th>
                        ESTADO
                      </th>

                      <th>
                        ACCIÓN
                      </th>

                    </tr>

                  </thead>



                  <tbody>

                    {
                      reservas.map(
                        reserva => (

                          <tr
                            key={
                              reserva.codigo
                            }
                          >


                            <td>

                              <strong className="admin-codigo-reserva">

                                {
                                  reserva.codigo
                                }

                              </strong>

                            </td>



                            <td>

                              <strong>

                                {
                                  reserva
                                    .cliente
                                    ?.nombre ||
                                  'Sin nombre'
                                }

                              </strong>


                              <span className="admin-tabla-secundario">

                                {
                                  reserva
                                    .cliente
                                    ?.correo ||
                                  ''
                                }

                              </span>

                            </td>



                            <td>

                              {
                                formatearFecha(
                                  reserva.fecha
                                )
                              }

                            </td>



                            <td>

                              {
                                reserva.hora
                              }

                            </td>



                            <td>

                              {
                                reserva.personas
                              }

                            </td>



                            <td>

                              {
                                reserva.mesa
                              }

                            </td>



                            <td>

                              <strong>

                                S/{' '}

                                {
                                  Number(
                                    reserva.total || 0
                                  )
                                    .toLocaleString(
                                      'es-PE'
                                    )
                                }

                              </strong>

                            </td>



                            <td>

                              <span
                                className={
                                  reserva.pago
                                    ?.estado ===
                                  'Pagado'

                                    ? 'admin-badge pago'

                                    : 'admin-badge pendiente'
                                }
                              >

                                {
                                  reserva
                                    .pago
                                    ?.estado ||
                                  'Pendiente'
                                }

                              </span>

                            </td>



                            <td>

                              <span
                                className={`admin-badge estado-${String(
                                  reserva.estado || ''
                                )
                                  .toLowerCase()
                                  .replaceAll(' ', '-')}`}
                              >

                                {
                                  reserva.estado
                                }

                              </span>

                            </td>



                            <td>

                              <button
                                type="button"

                                className="admin-btn-ver"

                                onClick={() =>
                                  setReservaSeleccionada(
                                    reserva
                                  )
                                }
                              >
                                VER
                              </button>

                            </td>


                          </tr>

                        )
                      )
                    }

                  </tbody>

                </table>


              </div>

            )
          }


        </div>


      </div>



      {/* ==================================================
          MODAL DETALLE
      ================================================== */}

      {
        reservaSeleccionada && (

          <div
            className="admin-modal-fondo"

            onClick={() =>
              setReservaSeleccionada(
                null
              )
            }
          >


            <div
              className="admin-modal-reserva"

              onClick={(e) =>
                e.stopPropagation()
              }
            >


              {/* CABECERA */}

              <div className="admin-modal-header">


                <div>

                  <span>
                    DETALLE DE RESERVA
                  </span>

                  <h2>
                    {
                      reservaSeleccionada
                        .codigo
                    }
                  </h2>

                </div>



                <button
                  type="button"

                  onClick={() =>
                    setReservaSeleccionada(
                      null
                    )
                  }
                >
                  ×
                </button>


              </div>



              {/* CLIENTE */}

              <div className="admin-detalle-seccion">

                <h3>
                  CLIENTE
                </h3>


                <div className="admin-detalle-grid">


                  <div>

                    <span>
                      NOMBRE
                    </span>

                    <strong>

                      {
                        reservaSeleccionada
                          .cliente
                          ?.nombre
                      }

                    </strong>

                  </div>



                  <div>

                    <span>
                      CELULAR
                    </span>

                    <strong>

                      {
                        reservaSeleccionada
                          .cliente
                          ?.celular
                      }

                    </strong>

                  </div>



                  <div>

                    <span>
                      CORREO
                    </span>

                    <strong>

                      {
                        reservaSeleccionada
                          .cliente
                          ?.correo
                      }

                    </strong>

                  </div>


                </div>

              </div>



              {/* RESERVA */}

              <div className="admin-detalle-seccion">

                <h3>
                  RESERVA
                </h3>


                <div className="admin-detalle-grid">


                  <div>

                    <span>
                      FECHA
                    </span>

                    <strong>

                      {
                        formatearFecha(
                          reservaSeleccionada
                            .fecha
                        )
                      }

                    </strong>

                  </div>



                  <div>

                    <span>
                      HORA
                    </span>

                    <strong>

                      {
                        reservaSeleccionada
                          .hora
                      }

                    </strong>

                  </div>



                  <div>

                    <span>
                      PERSONAS
                    </span>

                    <strong>

                      {
                        reservaSeleccionada
                          .personas
                      }

                    </strong>

                  </div>



                  <div>

                    <span>
                      AMBIENTE
                    </span>

                    <strong>

                      {
                        reservaSeleccionada
                          .zona
                      }

                    </strong>

                  </div>



                  <div>

                    <span>
                      MESA
                    </span>

                    <strong>

                      {
                        reservaSeleccionada
                          .mesa
                      }

                    </strong>

                  </div>



                  <div>

                    <span>
                      ESTADO
                    </span>

                    <strong>

                      {
                        reservaSeleccionada
                          .estado
                      }

                    </strong>

                  </div>


                </div>

              </div>



              {/* CONSUMO */}

              <div className="admin-detalle-seccion">

                <h3>
                  CONSUMO
                </h3>


                <div className="admin-detalle-consumos">


                  {
                    reservaSeleccionada
                      .consumos
                      ?.map(
                        consumo => (

                          <div
                            key={
                              consumo.id
                            }
                          >

                            <span>

                              {
                                consumo.cantidad
                              }
                              {' × '}
                              {
                                consumo.nombre
                              }

                            </span>


                            <strong>

                              S/{' '}

                              {
                                Number(
                                  consumo.subtotal
                                )
                                  .toLocaleString(
                                    'es-PE'
                                  )
                              }

                            </strong>

                          </div>

                        )
                      )
                  }



                  {
                    reservaSeleccionada
                      .adicionales
                      ?.libroMayta && (

                        <div>

                          <span>
                            1 × Libro de Mayta
                          </span>

                          <strong>

                            S/{' '}

                            {
                              Number(
                                reservaSeleccionada
                                  .adicionales
                                  .precioLibro
                              )
                                .toLocaleString(
                                  'es-PE'
                                )
                            }

                          </strong>

                        </div>

                      )
                  }


                </div>


                <div className="admin-detalle-total">

                  <span>
                    TOTAL PAGADO
                  </span>

                  <strong>

                    S/{' '}

                    {
                      Number(
                        reservaSeleccionada
                          .total || 0
                      )
                        .toLocaleString(
                          'es-PE'
                        )
                    }

                  </strong>

                </div>

              </div>



              {/* PAGO */}

              <div className="admin-detalle-seccion">

                <h3>
                  PAGO
                </h3>


                <div className="admin-detalle-grid">


                  <div>

                    <span>
                      ESTADO
                    </span>

                    <strong>

                      {
                        reservaSeleccionada
                          .pago
                          ?.estado
                      }

                    </strong>

                  </div>



                  <div>

                    <span>
                      MÉTODO
                    </span>

                    <strong>

                      {
                        reservaSeleccionada
                          .pago
                          ?.metodo
                      }

                    </strong>

                  </div>



                  <div>

                    <span>
                      TARJETA
                    </span>

                    <strong>

                      ••••{' '}

                      {
                        reservaSeleccionada
                          .pago
                          ?.ultimos4
                      }

                    </strong>

                  </div>


                </div>

              </div>



              {/* COMPROBANTE */}

              <div className="admin-detalle-seccion">

                <h3>
                  COMPROBANTE
                </h3>


                <div className="admin-detalle-grid">


                  <div>

                    <span>
                      TIPO
                    </span>

                    <strong>

                      {
                        reservaSeleccionada
                          .comprobante
                          ?.tipo ||
                        'No solicitado'
                      }

                    </strong>

                  </div>


                  {
                    reservaSeleccionada
                      .comprobante
                      ?.documento && (

                        <div>

                          <span>
                            DOCUMENTO
                          </span>

                          <strong>

                            {
                              reservaSeleccionada
                                .comprobante
                                .documento
                            }

                          </strong>

                        </div>

                      )
                  }


                  {
                    reservaSeleccionada
                      .comprobante
                      ?.razonSocial && (

                        <div>

                          <span>
                            RAZÓN SOCIAL
                          </span>

                          <strong>

                            {
                              reservaSeleccionada
                                .comprobante
                                .razonSocial
                            }

                          </strong>

                        </div>

                      )
                  }


                </div>

              </div>



              {/* PREFERENCIAS */}

              {
                reservaSeleccionada
                  .preferenciasRegistradas &&
                reservaSeleccionada
                  .comensales
                  ?.length > 0 && (

                  <div className="admin-detalle-seccion">

                    <h3>
                      COMENSALES
                    </h3>


                    <div className="admin-comensales-lista">


                      {
                        reservaSeleccionada
                          .comensales
                          .map(
                            comensal => (

                              <div
                                key={
                                  comensal.id
                                }
                              >

                                <strong>
                                  Comensal{' '}
                                  {
                                    comensal.id
                                  }
                                </strong>


                                <span>
                                  {
                                    comensal.tipo
                                  }
                                </span>


                                <p>

                                  {
                                    comensal
                                      .restricciones
                                      ?.length > 0

                                      ? comensal
                                          .restricciones
                                          .join(', ')

                                      : 'Sin restricciones'
                                  }

                                </p>

                              </div>

                            )
                          )
                      }


                    </div>

                  </div>

                )
              }



              {/* OBSERVACIONES */}

              <div className="admin-detalle-seccion">

                <h3>
                  OBSERVACIONES
                </h3>


                <p className="admin-observaciones">

                  {
                    reservaSeleccionada
                      .observaciones ||
                    'Sin observaciones.'
                  }

                </p>

              </div>



              <button
                type="button"

                className="admin-btn-cerrar-modal"

                onClick={() =>
                  setReservaSeleccionada(
                    null
                  )
                }
              >
                CERRAR
              </button>


            </div>

          </div>

        )
      }


    </AdminLayout>

  );

};