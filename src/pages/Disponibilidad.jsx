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
    sillaNino = false
  } = datosReserva;



  /* =========================
     HORARIO SELECCIONADO
  ========================= */

  const [horaSeleccionada, setHoraSeleccionada] =
    useState(null);



  /* =========================
     HORARIOS SIMULADOS
  ========================= */

  const [horarios, setHorarios] = useState([]);



  /* ==================================================
     CARGAR HORARIOS

     Simulamos disponibilidad.
     Más adelante esto vendría del backend.
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
      horario => horario.disponible
    ).length;



  /* ==================================================
     FORMATEAR FECHA
  ================================================== */

  const formatearFecha = (fechaOriginal) => {

    if (!fechaOriginal) {
      return 'No seleccionada';
    }


    const fechaObjeto =
      new Date(`${fechaOriginal}T00:00:00`);


    return fechaObjeto.toLocaleDateString(
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

      alert('Selecciona un horario');

      return;

    }


    navigate('/datos-cliente', {

      state: {

        fecha: fecha,

        personas: personas,

        zona: zona,

        mesa: mesa,

        capacidadMesa: capacidadMesa,

        hora: horaSeleccionada,

        accesible: accesible,

        sillaNino: sillaNino

      }

    });

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

          </div>



          {/* ==================================================
              MODIFICAR RESERVA
          ================================================== */}

          <div className="disponibilidad-modificar">

            <button
              type="button"
              className="btn-modificar-reserva"
              onClick={() => navigate('/reserva')}
            >
              MODIFICAR
            </button>

          </div>



          {/* ==================================================
              RESUMEN DE LA RESERVA
          ================================================== */}

          <div className="disponibilidad-resumen disponibilidad-resumen-cuatro">


            {/* FECHA */}

            <div>

              <span>
                FECHA
              </span>

              <strong>
                {formatearFecha(fecha)}
              </strong>

            </div>



            {/* PERSONAS */}

            <div>

              <span>
                PERSONAS
              </span>

              <strong>
                {personas} personas
              </strong>

            </div>



            {/* UBICACIÓN */}

            <div>

              <span>
                UBICACIÓN
              </span>

              <strong>
                {zona}
              </strong>

            </div>



            {/* MESA */}

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
              DISPONIBILIDAD
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
                Tenemos {cantidadDisponibles}{' '}
                horarios disponibles para
                la fecha seleccionada.
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

              {horarios.map((horario) => {

                const seleccionado =
                  horaSeleccionada === horario.hora;


                return (

                  <button
                    type="button"

                    key={horario.hora}

                    disabled={!horario.disponible}

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

              })}

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
                navigate('/reserva')
              }
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