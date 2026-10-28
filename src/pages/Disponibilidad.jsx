import { useState, useEffect } from 'react';
import {
  useLocation,
  useNavigate
} from 'react-router-dom';


export const Disponibilidad = () => {

  /* =========================
     NAVEGACIÓN
  ========================= */

  const navigate = useNavigate();

  const location = useLocation();


  /* =========================
     DATOS RECIBIDOS
     DESDE RESERVA
  ========================= */

  const datosReserva = location.state || {};


  const {
    fecha = '',
    personas = 2,
    zona = 'Sin preferencia',
    mesa = 'Asignación automática',
    capacidadMesa = null,
    accesible = false,
    sillaNino = false,

    /* NUEVOS DATOS */

    consumos = [],
    totalConsumos = 0

  } = datosReserva;



  /* =========================
     HORARIO SELECCIONADO
  ========================= */

  const [
    horaSeleccionada,
    setHoraSeleccionada
  ] = useState(null);



  /* =========================
     HORARIOS SIMULADOS
  ========================= */

  const [
    horarios,
    setHorarios
  ] = useState([]);



  /* ==================================================
     CARGAR HORARIOS
  ================================================== */

  useEffect(() => {

    setHorarios([

      {
        hora: '7:00 PM',
        disponible: true
      },

      {
        hora: '7:30 PM',
        disponible: false
      },

      {
        hora: '8:00 PM',
        disponible: true
      },

      {
        hora: '8:30 PM',
        disponible: true
      },

      {
        hora: '9:00 PM',
        disponible: false
      },

      {
        hora: '9:30 PM',
        disponible: true
      }

    ]);

  }, []);



  /* =========================
     CONTAR DISPONIBLES
  ========================= */

  const cantidadDisponibles =
    horarios.filter(
      horario =>
        horario.disponible
    ).length;



  /* ==================================================
     FORMATEAR FECHA
  ================================================== */

  const formatearFecha = (
    fechaOriginal
  ) => {

    if (!fechaOriginal) {

      return 'No seleccionada';

    }


    const fechaObjeto =
      new Date(
        `${fechaOriginal}T00:00:00`
      );


    return fechaObjeto
      .toLocaleDateString(
        'es-PE',
        {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }
      );

  };



  /* ==================================================
     CONTINUAR AL PASO 3
  ================================================== */

  const continuar = () => {

    if (!horaSeleccionada) {

      alert(
        'Selecciona un horario'
      );

      return;

    }


    navigate(
      '/datos-cliente',
      {

        state: {

          ...datosReserva,

          fecha: fecha,

          personas: personas,

          zona: zona,

          mesa: mesa,

          capacidadMesa:
            capacidadMesa,

          hora:
            horaSeleccionada,

          accesible:
            accesible,

          sillaNino:
            sillaNino,

          consumos:
            consumos,

          totalConsumos:
            totalConsumos

        }

      }
    );

  };



  return (

    <section className="disponibilidad-page">

      <div className="container">

        <div className="disponibilidad-box">


          {/* ==================================================
              CABECERA
          ================================================== */}

          <div className="disponibilidad-header">

            <span>
              RESERVAS MAYTA
            </span>

            <h1>
              DISPONIBILIDAD
            </h1>

            <p>
              Revisa los horarios disponibles
              para tu reserva.
            </p>

          </div>



          {/* ==================================================
              PROGRESO
              2 DE 5
          ================================================== */}

          <div className="reserva-pasos">

            <span className="paso activo">
              1
            </span>

            <span className="linea"></span>

            <span className="paso activo">
              2
            </span>

            <span className="linea"></span>

            <span className="paso">
              3
            </span>

            <span className="linea"></span>

            <span className="paso">
              4
            </span>

            <span className="linea"></span>

            <span className="paso">
              5
            </span>

          </div>



          {/* ==================================================
              MODIFICAR
          ================================================== */}

          <div className="disponibilidad-modificar">

            <button
              type="button"
              className="btn-modificar-reserva"

              onClick={() =>
                navigate(
                  '/reserva',
                  {
                    state:
                      datosReserva
                  }
                )
              }
            >
              MODIFICAR
            </button>

          </div>



          {/* ==================================================
              RESUMEN PRINCIPAL
          ================================================== */}

          <div className="disponibilidad-resumen disponibilidad-resumen-cuatro">


            <div>

              <span>
                FECHA
              </span>

              <strong>
                {formatearFecha(fecha)}
              </strong>

            </div>



            <div>

              <span>
                PERSONAS
              </span>

              <strong>
                {personas}
                {' '}
                {
                  personas === 1
                    ? 'persona'
                    : 'personas'
                }
              </strong>

            </div>



            <div>

              <span>
                UBICACIÓN
              </span>

              <strong>
                {zona}
              </strong>

            </div>



            <div>

              <span>
                MESA
              </span>

              <strong>
                {mesa}
              </strong>

            </div>


          </div>



          {/* ==================================================
              RESUMEN DEL CONSUMO
          ================================================== */}

          <div className="disponibilidad-consumo">


            <div className="disponibilidad-consumo-header">

              <div>

                <span>
                  DETALLE DE CONSUMO
                </span>

                <h2>
                  EXPERIENCIA SELECCIONADA
                </h2>

              </div>


              <strong>
                S/{' '}
                {
                  totalConsumos
                    .toLocaleString(
                      'es-PE'
                    )
                }
              </strong>

            </div>



            <div className="disponibilidad-consumo-lista">


              {
                consumos.map(
                  (consumo) => (

                    <div
                      className="disponibilidad-consumo-item"
                      key={consumo.id}
                    >


                      <div>

                        <strong>
                          {consumo.nombre}
                        </strong>

                        <span>

                          {consumo.cantidad}
                          {' × '}
                          S/{' '}
                          {
                            consumo.precioUnitario
                              .toLocaleString(
                                'es-PE'
                              )
                          }

                        </span>

                      </div>


                      <strong>
                        S/{' '}
                        {
                          consumo.subtotal
                            .toLocaleString(
                              'es-PE'
                            )
                        }
                      </strong>


                    </div>

                  )
                )
              }


            </div>


          </div>



          {/* ==================================================
              ESTADO DISPONIBILIDAD
          ================================================== */}

          <div className="estado-disponibilidad">


            <div className="estado-icono">
              ✓
            </div>


            <div>

              <h2>
                HAY DISPONIBILIDAD
              </h2>

              <p>
                Tenemos
                {' '}
                {cantidadDisponibles}
                {' '}
                horarios disponibles
                para la fecha seleccionada.
              </p>

            </div>


          </div>



          {/* ==================================================
              ELEGIR HORARIO
          ================================================== */}

          <div className="seleccion-horarios">

            <h2>
              ELIGE UN HORARIO
            </h2>



            <div className="horarios-grid">

              {
                horarios.map(
                  (horario) => {


                    const seleccionado =
                      horaSeleccionada ===
                      horario.hora;


                    return (

                      <button
                        type="button"

                        key={horario.hora}

                        disabled={
                          !horario.disponible
                        }

                        className={`
                          horario-btn

                          ${
                            horario.disponible
                              ? 'disponible'
                              : 'no-disponible'
                          }

                          ${
                            seleccionado
                              ? 'seleccionado'
                              : ''
                          }
                        `}

                        onClick={() =>
                          setHoraSeleccionada(
                            horario.hora
                          )
                        }
                      >


                        <strong>
                          {horario.hora}
                        </strong>


                        <span>

                          {
                            horario.disponible

                              ? seleccionado

                                ? 'Seleccionado'

                                : 'Disponible'

                              : 'No disponible'
                          }

                        </span>


                      </button>

                    );

                  }
                )
              }

            </div>

          </div>



          {/* ==================================================
              LEYENDA
          ================================================== */}

          <div className="leyenda-horarios">

            <span>

              <i className="leyenda-punto disponible"></i>

              Disponible

            </span>


            <span>

              <i className="leyenda-punto no-disponible"></i>

              No disponible

            </span>

          </div>



          {/* ==================================================
              ACCIONES
          ================================================== */}

          <div className="acciones-disponibilidad">


            <button
              type="button"

              className="btn btn-volver"

              onClick={() =>
                navigate(
                  '/reserva',
                  {
                    state:
                      datosReserva
                  }
                )
              }
            >
              VOLVER
            </button>



            <button
              type="button"

              className="btn btn-continuar"

              disabled={
                !horaSeleccionada
              }

              onClick={
                continuar
              }
            >
              CONTINUAR
            </button>


          </div>


        </div>

      </div>

    </section>

  );

};