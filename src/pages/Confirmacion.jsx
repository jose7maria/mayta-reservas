import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Confirmacion = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const datosReserva = location.state;

  const [mostrarModal, setMostrarModal] = useState(false);


  /* =========================
     FORMATEAR FECHA
  ========================= */

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


  /* =========================
     CONFIRMAR
  ========================= */

  const confirmarReserva = () => {

    setMostrarModal(true);

  };


  /* =========================
     SI ENTRAN DIRECTO A URL
  ========================= */

  if (!datosReserva) {

    return (

      <section className="confirmacion-page">

        <div className="container">

          <div className="confirmacion-box text-center">

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

    <section className="confirmacion-page">

      <div className="container">

        <div className="confirmacion-box">


          {/* ENCABEZADO */}

          <div className="confirmacion-header">

            <span>
              RESERVAS MAYTA
            </span>

            <h1>
              REVISA TU RESERVA
            </h1>

            <p>
              Confirma que todos los datos sean correctos.
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

            <span className="paso activo">
              3
            </span>

            <span className="linea"></span>

            <span className="paso activo">
              4
            </span>

          </div>



          {/* DATOS PRINCIPALES */}

          <div className="confirmacion-resumen">

            <div className="confirmacion-cliente">

              <span>
                CLIENTE
              </span>

              <strong>
                {datosReserva.nombre}
              </strong>

              <p>
                {datosReserva.correo}
              </p>

              <p>
                {datosReserva.celular}
              </p>

            </div>


            <div className="confirmacion-datos-grid">

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
                  HORA
                </span>

                <strong>
                  {datosReserva.horario}
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

            </div>

          </div>



          {/* COMENSALES */}

          <div className="confirmacion-seccion">

            <h3>
              EXPERIENCIA DE LOS COMENSALES
            </h3>


            <div className="confirmacion-comensales">

              {datosReserva.comensales?.map((comensal) => (

                <div
                  className="confirmacion-comensal"
                  key={comensal.id}
                >

                  <div className="confirmacion-comensal-titulo">

                    <strong>
                      Comensal {comensal.id}
                    </strong>

                    <span>
                      {comensal.tipo}
                    </span>

                  </div>


                  <p>
                    Bitácora Amazónica · 10 tiempos
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

              ))}

            </div>

          </div>



          {/* OBSERVACIONES */}

          {datosReserva.observaciones && (

            <div className="confirmacion-observaciones">

              <span>
                OBSERVACIONES
              </span>

              <p>
                {datosReserva.observaciones}
              </p>

            </div>

          )}



          {/* MENSAJE INFORMATIVO */}

          <div className="confirmacion-aviso">

            <div>
              i
            </div>

            <p>
              Recuerda que la reserva cuenta con
              15 minutos de tolerancia.
            </p>

          </div>



          {/* BOTONES */}

          <div className="acciones-confirmacion">

            <button
              type="button"
              className="btn btn-volver"
              onClick={() =>
                navigate('/datos-cliente', {
                  state: datosReserva
                })
              }
            >
              MODIFICAR
            </button>


            <button
              type="button"
              className="btn btn-confirmar-reserva"
              onClick={confirmarReserva}
            >
              CONFIRMAR RESERVA
            </button>

          </div>


        </div>

      </div>



      {/* =========================
          MODAL CONFIRMACIÓN
      ========================= */}

      {mostrarModal && (

        <div className="modal-reserva-fondo">

          <div className="modal-reserva">

            <div className="modal-check">
              ✓
            </div>


            <span className="modal-subtitulo">
              MAYTA
            </span>


            <h2>
              RESERVA CONFIRMADA
            </h2>


            <p>
              Tu reserva fue registrada correctamente.
            </p>


            <div className="codigo-reserva">

              <span>
                CÓDIGO DE RESERVA
              </span>

              <strong>
                MAY-0245
              </strong>

            </div>


            <div className="modal-resumen">

              <strong>
                {formatearFecha(datosReserva.fecha)}
              </strong>

              <span>
                {datosReserva.horario}
              </span>

              <span>
                {datosReserva.personas} personas · {datosReserva.zona}
              </span>

            </div>


            <button
              type="button"
              className="btn btn-finalizar"
              onClick={() => navigate('/')}
            >
              FINALIZAR
            </button>

          </div>

        </div>

      )}

    </section>

  );

};