import { useState } from 'react';
import {
  useLocation,
  useNavigate
} from 'react-router-dom';


export const Confirmacion = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const datosReserva =
    location.state || {};


  const {
    fecha = '',
    hora = '',
    personas = 1,
    zona = 'Sin preferencia',
    mesa = 'Asignación automática',

    nombre = '',
    celular = '',
    correo = '',

    // Modalidad de reserva elegida en la primera pantalla.
    tipoReserva = 'experiencia',
    garantiaReserva = 0,
    consumos = [],
    totalConsumos = 0,

    adicionales = {
      libroMayta: false,
      precioLibro: 0
    },

    totalFinal = 0,

    pago = {
      estado: 'Pendiente',
      metodo: '',
      ultimos4: '',
      monto: 0
    },

    comprobante = {
      tipo: 'No solicitado'
    },

    preferenciasRegistradas = false,
    comensales = [],
    observaciones = '',

    accesible = false,
    sillaNino = false

  } = datosReserva;

  const esCarta = tipoReserva === 'carta';
  const montoGarantia = esCarta
    ? Number(garantiaReserva) || personas * 25
    : 0;

  // La garantía fue transmitida provisionalmente como un renglón de
  // consumos por compatibilidad con el flujo actual de React.
  // Al guardar la reserva la separamos de los consumos gastronómicos.
  const consumosGastronomicos = esCarta
    ? []
    : consumos.filter((item) => item.id !== 'garantia-carta');

  const formatoSoles = (monto) =>
    Number(monto || 0).toLocaleString('es-PE');

  /* ==================================================
     CÓDIGO FINAL
  ================================================== */

  const [codigoReserva] =
    useState(() => {

      const ultimos =
        String(Date.now()).slice(-4);

      return `MAY-${ultimos}`;

    });



  const [
    reservaConfirmada,
    setReservaConfirmada
  ] = useState(false);



  /* ==================================================
     GUARDAR EN LOCALSTORAGE
  ================================================== */

  const confirmarReserva = () => {

    // Evita que un doble clic intente confirmar la misma reserva otra vez.
    if (reservaConfirmada) return;

    const nuevaReserva = {

      codigo:
        codigoReserva,

      cliente: {

        nombre:
          nombre,

        celular:
          celular,

        correo:
          correo

      },

      fecha:
        fecha,

      hora:
        hora,

      personas:
        personas,

      zona:
        zona,

      mesa:
        mesa,

      // El panel y los reportes podrán distinguir las modalidades.
      tipoReserva:
        tipoReserva,

      garantiaReserva:
        montoGarantia,

      consumos:
        consumosGastronomicos,

      totalConsumos:
        esCarta ? 0 : totalConsumos,

      adicionales:
        adicionales,

      total:
        totalFinal,

      preferenciasRegistradas:
        preferenciasRegistradas,

      comensales:
        preferenciasRegistradas
          ? comensales
          : [],

      observaciones:
        observaciones,

      requerimientos: {

        accesible:
          accesible,

        sillaNino:
          sillaNino

      },

      pago: {

        estado:
          pago.estado,

        metodo:
          pago.metodo,

        ultimos4:
          pago.ultimos4,

        monto:
          pago.monto

      },

      comprobante:
        comprobante,

      estado:
        'Confirmada',

      fechaRegistro:
        new Date().toISOString()

    };


    /* =========================
       LEER RESERVAS EXISTENTES
    ========================= */

    const reservasGuardadas =
      JSON.parse(
        localStorage.getItem(
          'reservasMayta'
        )
      ) || [];


    /* =========================
       EVITAR DUPLICADOS
    ========================= */

    const yaExiste =
      reservasGuardadas.some(
        reserva =>
          reserva.codigo ===
          codigoReserva
      );


    if (!yaExiste) {

      const nuevasReservas = [
        nuevaReserva,
        ...reservasGuardadas
      ];


      localStorage.setItem(
        'reservasMayta',
        JSON.stringify(
          nuevasReservas
        )
      );

    }


    setReservaConfirmada(true);

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
              {esCarta
                ? 'Tu garantía fue procesada correctamente. Revisa tu reserva antes de finalizar.'
                : 'Tu pago fue procesado correctamente. Revisa la información antes de finalizar.'}
            </p>

          </div>



          {/* ==================================================
              PASO 5 DE 5
          ================================================== */}

          <div className="reserva-pasos">

            <span className="paso activo">1</span>
            <span className="linea"></span>

            <span className="paso activo">2</span>
            <span className="linea"></span>

            <span className="paso activo">3</span>
            <span className="linea"></span>

            <span className="paso activo">4</span>
            <span className="linea"></span>

            <span className="paso activo">5</span>

          </div>



          {/* ==================================================
              CLIENTE
          ================================================== */}

          <div className="confirmacion-resumen">


            <div className="confirmacion-cliente">

              <span>
                RESPONSABLE DE LA RESERVA
              </span>


              <strong>
                {nombre}
              </strong>


              <p>
                {correo}
              </p>


              <p>
                {celular}
              </p>

            </div>



            {/* ==================================================
                FECHA / HORA / PERSONAS / ZONA / MESA
            ================================================== */}

            <div className="confirmacion-datos-grid confirmacion-cinco">


              <div>

                <span>
                  FECHA
                </span>

                <strong>
                  {fecha}
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


          </div>



          {/* ==================================================
              CONSUMO / GARANTÍA SEGÚN MODALIDAD
          ================================================== */}

          <div className="confirmacion-seccion">

            <h3>
              {esCarta
                ? 'GARANTÍA DE RESERVA - CARTA AL LLEGAR'
                : 'DETALLE DE EXPERIENCIAS'}
            </h3>

            <div className="confirmacion-consumo">

              {esCarta ? (
                <div className="confirmacion-consumo-item">
                  <div>
                    <strong>Garantía de reserva - Carta al llegar</strong>
                    <span>
                      {personas} × S/ 25 por persona
                    </span>
                  </div>
                  <strong>S/ {formatoSoles(montoGarantia)}</strong>
                </div>
              ) : (
                consumosGastronomicos.map((consumo) => (
                  <div
                    className="confirmacion-consumo-item"
                    key={consumo.id}
                  >
                    <div>
                      <strong>{consumo.nombre}</strong>
                      <span>
                        {consumo.cantidad} × S/{' '}
                        {formatoSoles(consumo.precioUnitario)}
                      </span>
                    </div>
                    <strong>
                      S/ {formatoSoles(consumo.subtotal)}
                    </strong>
                  </div>
                ))
              )}

              {adicionales.libroMayta && (
                <div className="confirmacion-consumo-item">
                  <div>
                    <strong>Libro de Mayta</strong>
                    <span>1 unidad</span>
                  </div>
                  <strong>
                    S/ {formatoSoles(adicionales.precioLibro)}
                  </strong>
                </div>
              )}

            </div>

            {esCarta && (
              <p className="confirmacion-demo-nota">
                La garantía de S/25 por persona será descontada
                del consumo final en el restaurante. Los platos
                y bebidas se elegirán al llegar.
              </p>
            )}

            <div className="confirmacion-total">
              <span>
                {esCarta ? 'TOTAL PAGADO (GARANTÍA Y ADICIONALES)' : 'TOTAL PAGADO'}
              </span>
              <strong>S/ {formatoSoles(totalFinal)}</strong>
            </div>

          </div>



          {/* ==================================================
              PAGO
          ================================================== */}

          <div className="confirmacion-seccion">

            <h3>
              PAGO
            </h3>


            <div className="confirmacion-pago">


              <div>

                <span>
                  ESTADO
                </span>

                <strong className="estado-pagado">
                  ✓ {pago.estado}
                </strong>

              </div>



              <div>

                <span>
                  MÉTODO
                </span>

                <strong>
                  {pago.metodo}
                </strong>

              </div>



              <div>

                <span>
                  TARJETA
                </span>

                <strong>
                  •••• {pago.ultimos4}
                </strong>

              </div>



              <div>

                <span>
                  MONTO
                </span>

                <strong>
                  S/{' '}
                  {
                    pago.monto
                      .toLocaleString(
                        'es-PE'
                      )
                  }
                </strong>

              </div>


            </div>

          </div>



          {/* ==================================================
              COMPROBANTE
          ================================================== */}

          <div className="confirmacion-seccion">

            <h3>
              COMPROBANTE
            </h3>


            <div className="confirmacion-comprobante">


              <div>

                <span>
                  TIPO
                </span>

                <strong>
                  {comprobante.tipo}
                </strong>

              </div>



              {
                comprobante.documento && (

                  <div>

                    <span>
                      DOCUMENTO
                    </span>

                    <strong>
                      {comprobante.documento}
                    </strong>

                  </div>

                )
              }



              {
                comprobante.razonSocial && (

                  <div>

                    <span>
                      RAZÓN SOCIAL
                    </span>

                    <strong>
                      {comprobante.razonSocial}
                    </strong>

                  </div>

                )
              }



              {
                comprobante.correo && (

                  <div>

                    <span>
                      ENVÍO
                    </span>

                    <strong>
                      {comprobante.correo}
                    </strong>

                  </div>

                )
              }


            </div>

          </div>



          {/* ==================================================
              COMENSALES
          ================================================== */}

          {
            preferenciasRegistradas &&
            comensales.length > 0 && (

              <div className="confirmacion-seccion">

                <h3>
                  INFORMACIÓN DE COMENSALES
                </h3>


                <div className="confirmacion-comensales">


                  {
                    comensales.map(
                      comensal => (

                        <div
                          className="confirmacion-comensal"
                          key={comensal.id}
                        >

                          <div className="confirmacion-comensal-titulo">

                            <strong>
                              COMENSAL {comensal.id}
                            </strong>


                            <span>
                              {comensal.tipo}
                            </span>

                          </div>



                          <p>

                            <strong>
                              Restricciones:
                            </strong>

                            {' '}

                            {
                              comensal
                                .restricciones
                                .length > 0

                                ? comensal
                                    .restricciones
                                    .join(', ')

                                : 'Ninguna registrada'
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



          {/* ==================================================
              OBSERVACIONES
          ================================================== */}

          <div className="confirmacion-observaciones">

            <span>
              OBSERVACIONES
            </span>


            <p>

              {
                observaciones.trim() !== ''

                  ? observaciones

                  : 'Sin observaciones adicionales.'
              }

            </p>

          </div>



          {/* ==================================================
              AVISO
          ================================================== */}

          <div className="confirmacion-aviso">

            <div>
              ✓
            </div>


            <p>
              {esCarta
                ? 'Tu garantía está pagada. Al confirmar, la reserva de tu mesa quedará registrada. Podrás elegir la carta al llegar.'
                : 'Tu pago está aprobado. Al confirmar, la reserva quedará registrada definitivamente.'}
            </p>

          </div>



          {/* ==================================================
              BOTONES
          ================================================== */}

          <div className="acciones-confirmacion">


            <button
              type="button"

              className="btn btn-volver"

              onClick={() =>
                navigate(
                  '/pago-reserva',
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

              className="btn btn-confirmar-reserva"

              onClick={
                confirmarReserva
              }
            >
              CONFIRMAR RESERVA
            </button>


          </div>


        </div>

      </div>



      {/* ==================================================
          TICKET FINAL
      ================================================== */}

      {
        reservaConfirmada && (

          <div className="modal-reserva-fondo">

            <div className="modal-reserva">


              <div className="modal-check">
                ✓
              </div>


              <span className="modal-subtitulo">
                RESERVA CONFIRMADA
              </span>


              <h2>
                ¡TODO LISTO!
              </h2>


              <p>
                {esCarta
                  ? 'Tu mesa está reservada. Podrás solicitar la carta al llegar.'
                  : 'Tu experiencia MAYTA ha sido registrada correctamente.'}
              </p>



              {/* CÓDIGO */}

              <div className="codigo-reserva">

                <span>
                  CÓDIGO DE RESERVA
                </span>


                <strong>
                  {codigoReserva}
                </strong>

              </div>



              {/* RESUMEN */}

              <div className="modal-resumen">

                <span>
                  <strong>Modalidad:</strong>{' '}
                  {esCarta ? 'Carta al llegar' : 'Experiencia gastronómica'}
                </span>

                <span>
                  <strong>Fecha:</strong>
                  {' '}
                  {fecha}
                </span>


                <span>
                  <strong>Hora:</strong>
                  {' '}
                  {hora}
                </span>


                <span>
                  <strong>Personas:</strong>
                  {' '}
                  {personas}
                </span>


                <span>
                  <strong>Mesa:</strong>
                  {' '}
                  {mesa}
                </span>


                {esCarta && (
                  <span>
                    <strong>Garantía descontable:</strong>{' '}
                    S/ {formatoSoles(montoGarantia)}
                  </span>
                )}

                <span>
                  <strong>Total pagado:</strong>
                  {' '}
                  S/{' '}
                  {
                    totalFinal
                      .toLocaleString(
                        'es-PE'
                      )
                  }
                </span>

              </div>



              {/* NOTIFICACIONES */}

              <div className="confirmacion-notificaciones">

                <span>
                  CONFIRMACIÓN ENVIADA
                </span>


                <p>
                  ✓ Correo enviado a
                  {' '}
                  <strong>
                    {correo}
                  </strong>
                </p>


                <p>
                  ✓ WhatsApp enviado a
                  {' '}
                  <strong>
                    {celular}
                  </strong>
                </p>

              </div>



              <p className="confirmacion-demo-nota">
                En este prototipo académico
                las notificaciones son simuladas.
              </p>



              <button
                type="button"

                className="btn btn-finalizar"

                onClick={() =>
                  navigate('/')
                }
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