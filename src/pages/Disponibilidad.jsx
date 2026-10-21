import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Disponibilidad = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const datosReserva = location.state;

  const [horarios, setHorarios] = useState([]);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState('');


  useEffect(() => {

    // Datos simulados para el parcial
    const horariosSimulados = [
      { hora: '7:00 PM', disponible: true },
      { hora: '7:30 PM', disponible: false },
      { hora: '8:00 PM', disponible: true },
      { hora: '8:30 PM', disponible: true },
      { hora: '9:00 PM', disponible: false },
      { hora: '9:30 PM', disponible: true }
    ];

    setHorarios(horariosSimulados);

  }, [datosReserva?.fecha]);


  // FORMATEAR LA FECHA
  const formatearFecha = (fecha) => {

    if (!fecha) return '';

    const fechaLocal = new Date(`${fecha}T00:00:00`);

    return fechaLocal.toLocaleDateString(
      'es-PE',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }
    );

  };


  // CUÁNTOS HORARIOS ESTÁN DISPONIBLES
  const cantidadDisponibles =
    horarios.filter(horario => horario.disponible).length;


  const continuar = () => {

    if (!horarioSeleccionado) {
      alert('Selecciona un horario disponible');
      return;
    }

    navigate('/datos-cliente', {
      state: {
        ...datosReserva,
        horario: horarioSeleccionado
      }
    });

  };


  // SI ENTRAN DIRECTAMENTE A LA URL
  if (!datosReserva) {

    return (
      <section className="disponibilidad-page">

        <div className="container">

          <div className="disponibilidad-box text-center">

            <h2>
              Primero debes realizar una reserva.
            </h2>

            <button
              className="btn btn-continuar mt-4"
              onClick={() => navigate('/reserva')}
            >
              IR A RESERVAR
            </button>

          </div>

        </div>

      </section>
    );

  }


  return (

    <section className="disponibilidad-page">

      <div className="container">

        <div className="disponibilidad-box">


          {/* ENCABEZADO */}

          <div className="disponibilidad-header">

            <span>
              RESERVAS MAYTA
            </span>

            <h1>
              DISPONIBILIDAD
            </h1>

            <p>
              Revisa los horarios disponibles para tu reserva.
            </p>

          </div>



          {/* PASOS */}

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



          {/* RESUMEN */}

          <div className="disponibilidad-resumen">

            <div>

              <span>
                FECHA
              </span>

              <strong>
                {formatearFecha(datosReserva.fecha)}
              </strong>

            </div>


            <div>

              <span>
                PERSONAS
              </span>

              <strong>
                {datosReserva.personas} personas
              </strong>

            </div>


            <div>

              <span>
                UBICACIÓN
              </span>

              <strong>
                {datosReserva.zona}
              </strong>

            </div>


            <button
              type="button"
              className="btn-modificar-reserva"
              onClick={() => navigate('/reserva')}
            >
              MODIFICAR
            </button>

          </div>



          {/* MENSAJE DE DISPONIBILIDAD */}

          {
            cantidadDisponibles > 0
              ? (

                <div className="estado-disponibilidad disponible">

                  <div className="estado-icono">
                    ✓
                  </div>

                  <div>

                    <h3>
                      HAY DISPONIBILIDAD
                    </h3>

                    <p>
                      Tenemos {cantidadDisponibles} horarios disponibles
                      para la fecha seleccionada.
                    </p>

                  </div>

                </div>

              )
              : (

                <div className="estado-disponibilidad sin-disponibilidad">

                  <div className="estado-icono">
                    ×
                  </div>

                  <div>

                    <h3>
                      NO HAY DISPONIBILIDAD
                    </h3>

                    <p>
                      Prueba seleccionando otra fecha.
                    </p>

                  </div>

                </div>

              )
          }



          {/* HORARIOS */}

          {
            cantidadDisponibles > 0 && (

              <>

                <h3 className="titulo-horarios">
                  ELIGE UN HORARIO
                </h3>


                <div className="horarios-grid">

                  {
                    horarios.map((horario) => (

                      <button
                        key={horario.hora}
                        type="button"

                        disabled={!horario.disponible}

                        onClick={() =>
                          setHorarioSeleccionado(horario.hora)
                        }

                        className={`
                          horario-btn

                          ${
                            !horario.disponible
                              ? 'ocupado'
                              : ''
                          }

                          ${
                            horarioSeleccionado === horario.hora
                              ? 'seleccionado'
                              : ''
                          }
                        `}
                      >

                        <strong>
                          {horario.hora}
                        </strong>


                        <span>

                          {
                            !horario.disponible
                              ? 'No disponible'
                              : horarioSeleccionado === horario.hora
                                ? '✓ Seleccionado'
                                : 'Disponible'
                          }

                        </span>

                      </button>

                    ))
                  }

                </div>

              </>

            )
          }



          {/* LEYENDA */}

          <div className="leyenda-horarios">

            <span>
              <i className="leyenda-verde"></i>
              Disponible
            </span>

            <span>
              <i className="leyenda-gris"></i>
              No disponible
            </span>

          </div>



          {/* BOTONES */}

          <div className="acciones-disponibilidad">

            <button
              type="button"
              className="btn btn-volver"
              onClick={() => navigate(-1)}
            >
              VOLVER
            </button>


            <button
              type="button"
              className="btn btn-continuar"
              disabled={!horarioSeleccionado}
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