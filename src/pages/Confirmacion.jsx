import { useState } from 'react';
import {
  useLocation,
  useNavigate
} from 'react-router-dom';


export const Confirmacion = () => {

  /* =========================
     NAVEGACIÓN
  ========================= */

  const navigate = useNavigate();

  const location = useLocation();


  /* =========================
     DATOS RECIBIDOS
  ========================= */

  const datosReserva = location.state || {};


  const {
    fecha = '',
    hora = '',
    personas = 2,

    zona = 'Sin preferencia',

    mesa = 'Asignación automática',

    capacidadMesa = null,

    accesible = false,

    sillaNino = false,

    nombre = '',
    celular = '',
    correo = '',

    preferenciasRegistradas = false,

    comensales = [],

    observaciones = ''
  } = datosReserva;



  /* =========================
     MODAL FINAL
  ========================= */

  const [
    mostrarModal,
    setMostrarModal
  ] = useState(false);



  /* =========================
     CÓDIGO DEMOSTRATIVO
  ========================= */

  const codigoReserva = 'MAY-0245';



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
     MODIFICAR

     Regresamos a DatosCliente enviando
     nuevamente toda la información.
  ================================================== */

  const modificarReserva = () => {

    navigate(
      '/datos-cliente',
      {
        state: datosReserva
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
     FINALIZAR
  ========================= */

  const finalizarReserva = () => {

    setMostrarModal(false);

    navigate('/');

  };



  return (

    <section className="confirmacion-page">

      <div className="container">

        <div className="confirmacion-box">


          {/* ==================================================
              CABECERA
          ================================================== */}

          <div className="confirmacion-header">

            <span>
              RESERVAS MAYTA
            </span>

            <h1>
              REVISA TU RESERVA
            </h1>

            <p>
              Confirma que todos los datos
              sean correctos.
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

            <span className="paso activo">
              3
            </span>

            <span className="linea"></span>

            <span className="paso activo">
              4
            </span>

          </div>



          {/* ==================================================
              CLIENTE
          ================================================== */}

          <div className="confirmacion-cliente">

            <span>
              CLIENTE
            </span>

            <h2>
              {nombre}
            </h2>

            <p>
              {correo}
            </p>

            <p>
              {celular}
            </p>

          </div>



          {/* ==================================================
              DATOS PRINCIPALES
          ================================================== */}

          <div className="confirmacion-datos-grid confirmacion-datos-cinco">


            {/* FECHA */}

            <div>

              <span>
                FECHA
              </span>

              <strong>
                {formatearFecha(fecha)}
              </strong>

            </div>



            {/* HORA */}

            <div>

              <span>
                HORA
              </span>

              <strong>
                {hora}
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
              NECESIDADES ESPECIALES
          ================================================== */}

          {
            (accesible || sillaNino) && (

              <div className="confirmacion-necesidades">

                <span>
                  REQUERIMIENTOS ADICIONALES
                </span>


                {
                  accesible && (

                    <p>
                      ✓ Acceso para silla de ruedas
                    </p>

                  )
                }


                {
                  sillaNino && (

                    <p>
                      ✓ Silla para niño
                    </p>

                  )
                }

              </div>

            )
          }



          {/* ==================================================
              PREFERENCIAS DE LOS COMENSALES
          ================================================== */}

          <div className="confirmacion-seccion">

            <h2>
              PREFERENCIAS DE LOS COMENSALES
            </h2>



            {/* =========================================
                SI REGISTRÓ PREFERENCIAS
            ========================================= */}

            {
              preferenciasRegistradas &&
              comensales.length > 0 ? (

                <div className="confirmacion-comensales">

                  {comensales.map((comensal) => (

                    <div
                      className="confirmacion-comensal"
                      key={comensal.id}
                    >


                      {/* CABECERA */}

                      <div className="confirmacion-comensal-header">

                        <strong>
                          Comensal {comensal.id}
                        </strong>


                        <span>
                          {comensal.tipo}
                        </span>

                      </div>



                      {/* MENÚ */}

                      <p>
                        Bitácora Amazónica · 10 tiempos
                      </p>



                      {/* ACOMPAÑAMIENTO */}

                      <p>

                        <strong>
                          Acompañamiento:
                        </strong>{' '}

                        {comensal.acompanamiento}

                      </p>



                      {/* RESTRICCIONES */}

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

              ) : (

                /* =========================================
                   SI NO REGISTRÓ PREFERENCIAS
                ========================================= */

                <div className="preferencias-no-registradas">

                  <div className="preferencias-no-icono">
                    i
                  </div>


                  <div>

                    <strong>
                      Preferencias no registradas
                    </strong>

                    <p>
                      El responsable de la reserva decidió
                      continuar sin registrar información
                      individual de los comensales.
                    </p>

                  </div>

                </div>

              )
            }


          </div>



          {/* ==================================================
              OBSERVACIONES GENERALES
          ================================================== */}

          <div className="confirmacion-seccion">

            <h2>
              OBSERVACIONES GENERALES
            </h2>


            {
              observaciones.trim() !== '' ? (

                <div className="confirmacion-observaciones">

                  <p>
                    {observaciones}
                  </p>

                </div>

              ) : (

                <div className="confirmacion-observaciones sin-observaciones">

                  <p>
                    Sin observaciones adicionales.
                  </p>

                </div>

              )
            }


          </div>



          {/* ==================================================
              RECORDATORIO
          ================================================== */}

          <div className="confirmacion-aviso">

            <span>
              i
            </span>

            <p>
              Recuerda que la reserva cuenta
              con 15 minutos de tolerancia.
            </p>

          </div>



          {/* ==================================================
              ACCIONES
          ================================================== */}

          <div className="acciones-confirmacion">


            <button
              type="button"
              className="btn btn-volver"
              onClick={modificarReserva}
            >
              MODIFICAR
            </button>



            <button
              type="button"
              className="btn btn-confirmar"
              onClick={confirmarReserva}
            >
              CONFIRMAR RESERVA
            </button>


          </div>


        </div>

      </div>



      {/* ==================================================
          MODAL FINAL
      ================================================== */}

      {
        mostrarModal && (

          <div className="modal-reserva-fondo">

            <div className="modal-reserva">


              {/* CHECK */}

              <div className="modal-reserva-check">
                ✓
              </div>



              {/* TÍTULO */}

              <span className="modal-reserva-etiqueta">
                MAYTA · LIMA
              </span>


              <h2>
                RESERVA CONFIRMADA
              </h2>


              <p className="modal-reserva-mensaje">
                Tu reserva ha sido registrada correctamente.
              </p>



              {/* CÓDIGO */}

              <div className="modal-reserva-codigo">

                <span>
                  CÓDIGO DE RESERVA
                </span>

                <strong>
                  {codigoReserva}
                </strong>

              </div>



              {/* =========================================
                  DATOS DEL TICKET
              ========================================= */}

              <div className="modal-reserva-datos">


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
                    HORA
                  </span>

                  <strong>
                    {hora}
                  </strong>

                </div>



                <div>

                  <span>
                    PERSONAS
                  </span>

                  <strong>
                    {personas}
                  </strong>

                </div>



                <div>

                  <span>
                    AMBIENTE
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



              {/* CLIENTE */}

              <div className="modal-reserva-cliente">

                <span>
                  RESERVA A NOMBRE DE
                </span>

                <strong>
                  {nombre}
                </strong>

              </div>



              {/* INFORMACIÓN ADICIONAL */}

              <p className="modal-reserva-info">
                Conserva tu código de reserva
                para cualquier consulta relacionada
                con tu experiencia.
              </p>



              {/* FINALIZAR */}

              <button
                type="button"
                className="btn btn-finalizar"
                onClick={finalizarReserva}
              >
                FINALIZAR
              </button>


            </div>

          </div>

        )
      }


    </section>

  );

};