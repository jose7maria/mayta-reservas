import {
  useEffect,
  useState
} from 'react';

import {
  useLocation,
  useNavigate
} from 'react-router-dom';


export const PagoReserva = () => {

  /* ==================================================
     NAVEGACIÓN Y DATOS RECIBIDOS
  ================================================== */

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

    consumos = [],
    totalConsumos = 0,

    preferenciasRegistradas = false,
    comensales = [],
    observaciones = ''

  } = datosReserva;



  /* ==================================================
     PRE-RESERVA

     Para el parcial:
     2 minutos = 120 segundos.
  ================================================== */

  const DURACION_PRE_RESERVA = 120;

  const [
    segundosRestantes,
    setSegundosRestantes
  ] = useState(
    DURACION_PRE_RESERVA
  );


  const [codigoPreReserva] =
    useState(() => {

      const ultimos =
        String(Date.now()).slice(-4);

      return `TMP-${ultimos}`;

    });



  /* ==================================================
     CONTADOR
  ================================================== */

  useEffect(() => {

    const temporizador =
      setInterval(() => {

        setSegundosRestantes(
          (segundos) => {

            if (segundos <= 1) {

              clearInterval(
                temporizador
              );

              return 0;

            }


            return segundos - 1;

          }
        );

      }, 1000);


    return () =>
      clearInterval(
        temporizador
      );

  }, []);



  const tiempoExpirado =
    segundosRestantes === 0;



  /* ==================================================
     FORMATEAR CONTADOR
  ================================================== */

  const formatearTiempo = (
    segundos
  ) => {

    const minutos =
      Math.floor(
        segundos / 60
      );

    const segundosFinales =
      segundos % 60;


    return `${String(minutos).padStart(2, '0')}:${String(segundosFinales).padStart(2, '0')}`;

  };



  /* ==================================================
     LIBRO MAYTA
  ================================================== */

  const PRECIO_LIBRO = 249;

  const [
    agregarLibro,
    setAgregarLibro
  ] = useState(false);



  /* ==================================================
     TOTAL FINAL
  ================================================== */

  const totalFinal =
    totalConsumos +
    (
      agregarLibro
        ? PRECIO_LIBRO
        : 0
    );



  /* ==================================================
     DATOS DE TARJETA
     SOLO DEMOSTRATIVOS
  ================================================== */

  const [
    titular,
    setTitular
  ] = useState(
    nombre
  );

  const [
    numeroTarjeta,
    setNumeroTarjeta
  ] = useState('');

  const [
    vencimiento,
    setVencimiento
  ] = useState('');

  const [
    cvv,
    setCvv
  ] = useState('');



  /* ==================================================
     COMPROBANTE
  ================================================== */

  const [
    tipoComprobante,
    setTipoComprobante
  ] = useState(
    'Boleta'
  );


  const [
    dni,
    setDni
  ] = useState('');


  const [
    ruc,
    setRuc
  ] = useState('');


  const [
    razonSocial,
    setRazonSocial
  ] = useState('');


  const [
    correoComprobante,
    setCorreoComprobante
  ] = useState(
    correo
  );



  /* ==================================================
     TÉRMINOS
  ================================================== */

  const [
    aceptaTerminos,
    setAceptaTerminos
  ] = useState(false);


  const [
    mostrarTerminos,
    setMostrarTerminos
  ] = useState(false);


  const [
    pagoProcesando,
    setPagoProcesando
  ] = useState(false);



  /* ==================================================
     FORMATEAR TARJETA

     4111111111111111
     ->
     4111 1111 1111 1111
  ================================================== */

  const cambiarNumeroTarjeta = (
    e
  ) => {

    const numeros =
      e.target.value
        .replace(/\D/g, '')
        .slice(0, 16);


    const formateado =
      numeros
        .replace(
          /(.{4})/g,
          '$1 '
        )
        .trim();


    setNumeroTarjeta(
      formateado
    );

  };



  /* ==================================================
     FORMATEAR VENCIMIENTO
  ================================================== */

  const cambiarVencimiento = (
    e
  ) => {

    let valor =
      e.target.value
        .replace(/\D/g, '')
        .slice(0, 4);


    if (
      valor.length >= 3
    ) {

      valor =
        `${valor.slice(0, 2)}/${valor.slice(2)}`;

    }


    setVencimiento(
      valor
    );

  };



  /* ==================================================
     VALIDAR COMPROBANTE
  ================================================== */

  const validarComprobante =
    () => {


      /* BOLETA */

      if (
        tipoComprobante ===
        'Boleta'
      ) {

        if (
          dni.length !== 8
        ) {

          alert(
            'Ingresa un DNI válido de 8 dígitos'
          );

          return false;

        }

      }



      /* FACTURA */

      if (
        tipoComprobante ===
        'Factura'
      ) {

        if (
          ruc.length !== 11 ||
          razonSocial.trim() === ''
        ) {

          alert(
            'Completa correctamente los datos de facturación'
          );

          return false;

        }

      }



      /* CORREO */

      if (
        tipoComprobante !==
          'No solicitar' &&
        !correoComprobante.includes('@')
      ) {

        alert(
          'Ingresa un correo válido para el comprobante'
        );

        return false;

      }


      return true;

    };



  /* ==================================================
     REALIZAR PAGO
  ================================================== */

  const realizarPago = () => {


    /* RESERVA EXPIRADA */

    if (tiempoExpirado) {

      alert(
        'La pre-reserva ha expirado'
      );

      return;

    }



    /* TARJETA */

    const tarjetaLimpia =
      numeroTarjeta.replace(
        /\s/g,
        ''
      );


    if (
      titular.trim() === '' ||
      tarjetaLimpia.length !== 16 ||
      vencimiento.length !== 5 ||
      cvv.length !== 3
    ) {

      alert(
        'Completa correctamente los datos de la tarjeta'
      );

      return;

    }



    /* COMPROBANTE */

    if (
      !validarComprobante()
    ) {

      return;

    }



    /* TÉRMINOS */

    if (!aceptaTerminos) {

      alert(
        'Debes aceptar los términos y condiciones'
      );

      return;

    }



    setPagoProcesando(true);



    /* ÚLTIMOS 4 */

    const ultimos4 =
      tarjetaLimpia.slice(-4);



    /* ==================================================
       DATOS DEL COMPROBANTE
    ================================================== */

    let comprobante = {

      tipo:
        tipoComprobante

    };


    if (
      tipoComprobante ===
      'Boleta'
    ) {

      comprobante = {

        tipo:
          'Boleta',

        documento:
          dni,

        nombre:
          nombre,

        correo:
          correoComprobante,

        estado:
          'Pendiente de envío'

      };

    }


    if (
      tipoComprobante ===
      'Factura'
    ) {

      comprobante = {

        tipo:
          'Factura',

        documento:
          ruc,

        razonSocial:
          razonSocial,

        correo:
          correoComprobante,

        estado:
          'Pendiente de envío'

      };

    }


    if (
      tipoComprobante ===
      'No solicitar'
    ) {

      comprobante = {

        tipo:
          'No solicitado'

      };

    }



    /* ==================================================
       SIMULAMOS APROBACIÓN

       No guardamos:
       - tarjeta completa
       - CVV
    ================================================== */

    setTimeout(
      () => {

        navigate(
          '/confirmacion',
          {

            state: {

              ...datosReserva,

              consumos:
                consumos,

              totalConsumos:
                totalConsumos,

              adicionales: {

                libroMayta:
                  agregarLibro,

                precioLibro:
                  agregarLibro
                    ? PRECIO_LIBRO
                    : 0

              },

              totalFinal:
                totalFinal,

              preReserva: {

                codigo:
                  codigoPreReserva,

                estado:
                  'Pagada'

              },

              pago: {

                estado:
                  'Pagado',

                metodo:
                  'Tarjeta',

                ultimos4:
                  ultimos4,

                monto:
                  totalFinal

              },

              comprobante:
                comprobante,

              terminosAceptados:
                true,

              preferenciasRegistradas:
                preferenciasRegistradas,

              comensales:
                comensales,

              observaciones:
                observaciones

            }

          }
        );

      },
      700
    );

  };



  /* ==================================================
     SI EXPIRÓ

     Dejamos de mostrar el formulario.
  ================================================== */

  if (tiempoExpirado) {

    return (

      <section className="pago-page">

        <div className="container">

          <div className="pago-box">


            <div className="pago-expirado">


              <div className="pago-expirado-icono">
                !
              </div>


              <span>
                PRE-RESERVA
              </span>


              <h1>
                TIEMPO FINALIZADO
              </h1>


              <p>
                El tiempo de retención
                de tu mesa ha expirado.
              </p>


              <div className="pago-expirado-detalle">

                <strong>
                  {zona}
                </strong>

                <span>
                  {mesa}
                  {' · '}
                  {hora}
                </span>

              </div>


              <p>
                La mesa y el horario
                quedan nuevamente disponibles.
              </p>


              <button
                type="button"
                className="btn btn-pagar-reserva"

                onClick={() =>
                  navigate(
                    '/disponibilidad',
                    {
                      state:
                        datosReserva
                    }
                  )
                }
              >
                VOLVER A DISPONIBILIDAD
              </button>


            </div>


          </div>

        </div>

      </section>

    );

  }



  return (

    <section className="pago-page">

      <div className="container">

        <div className="pago-box">


          {/* ==================================================
              CABECERA
          ================================================== */}

          <div className="pago-header">

            <span>
              RESERVAS MAYTA
            </span>


            <h1>
              GARANTIZA TU RESERVA
            </h1>


            <p>
              Revisa el detalle y completa
              el pago para confirmar
              tu experiencia.
            </p>

          </div>



          {/* ==================================================
              PASO 4 DE 5
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

            <span className="paso">5</span>

          </div>



          {/* ==================================================
              PRE-RESERVA + CONTADOR
          ================================================== */}

          <div className="pre-reserva-box">

            <div>

              <span>
                PRE-RESERVA
              </span>


              <strong>
                {codigoPreReserva}
              </strong>


              <p>
                Estamos reteniendo temporalmente
                tu mesa y horario.
              </p>

            </div>


            <div className="pre-reserva-tiempo">

              <span>
                TIEMPO RESTANTE
              </span>


              <strong>
                {
                  formatearTiempo(
                    segundosRestantes
                  )
                }
              </strong>

            </div>

          </div>



          {/* ==================================================
              RESUMEN
          ================================================== */}

          <div className="pago-resumen">

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



          {/* ==================================================
              DETALLE DE CONSUMO
          ================================================== */}

          <div className="pago-detalle-consumo">


            <div className="pago-detalle-header">

              <div>

                <span>
                  DETALLE DE TU RESERVA
                </span>

                <h2>
                  EXPERIENCIAS SELECCIONADAS
                </h2>

              </div>


              <div className="pago-total-principal">

                <span>
                  CONSUMO
                </span>

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

            </div>



            <div className="pago-detalle-lista">


              {
                consumos.map(
                  (consumo) => (

                    <div
                      className="pago-detalle-item"
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
                            consumo
                              .precioUnitario
                              .toLocaleString(
                                'es-PE'
                              )
                          }

                        </span>

                      </div>


                      <strong>

                        S/{' '}

                        {
                          consumo
                            .subtotal
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
              ADICIONAL - LIBRO MAYTA
          ================================================== */}

          <div className="pago-adicional">

            <label>

              <input
                type="checkbox"

                checked={
                  agregarLibro
                }

                onChange={(e) =>
                  setAgregarLibro(
                    e.target.checked
                  )
                }
              />


              <div>

                <strong>
                  Libro de Mayta
                </strong>


                <span>
                  Adicional opcional
                </span>

              </div>


              <strong>
                S/249
              </strong>

            </label>

          </div>



          {/* ==================================================
              TOTAL DEFINITIVO
          ================================================== */}

          <div className="pago-total-final">

            <div>

              <span>
                TOTAL A PAGAR
              </span>

              <p>
                Consumo
                {
                  agregarLibro
                    ? ' + Libro de Mayta'
                    : ''
                }
              </p>

            </div>


            <strong>

              S/{' '}

              {
                totalFinal
                  .toLocaleString(
                    'es-PE'
                  )
              }

            </strong>

          </div>



          {/* ==================================================
              TARJETA
          ================================================== */}

          <div className="pago-seccion">

            <h2>
              DATOS DE PAGO
            </h2>


            <p>
              Pago demostrativo.
              No ingreses datos bancarios reales.
            </p>



            <div className="pago-grid">


              <div className="pago-campo-completo">

                <label>
                  Titular de la tarjeta *
                </label>

                <input
                  type="text"
                  className="form-control"

                  value={titular}

                  onChange={(e) =>
                    setTitular(
                      e.target.value
                    )
                  }
                />

              </div>



              <div className="pago-campo-completo">

                <label>
                  Número de tarjeta *
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  className="form-control"

                  placeholder="0000 0000 0000 0000"

                  value={
                    numeroTarjeta
                  }

                  onChange={
                    cambiarNumeroTarjeta
                  }
                />

              </div>



              <div>

                <label>
                  Vencimiento *
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  className="form-control"

                  placeholder="MM/AA"

                  value={
                    vencimiento
                  }

                  onChange={
                    cambiarVencimiento
                  }
                />

              </div>



              <div>

                <label>
                  CVV *
                </label>

                <input
                  type="password"
                  inputMode="numeric"
                  className="form-control"

                  placeholder="***"

                  value={cvv}

                  maxLength="3"

                  onChange={(e) =>
                    setCvv(
                      e.target.value
                        .replace(
                          /\D/g,
                          ''
                        )
                        .slice(
                          0,
                          3
                        )
                    )
                  }
                />

              </div>


            </div>



            <div className="pago-demo-aviso">

              <span>
                i
              </span>

              <p>
                Este formulario simula una
                pasarela de pago únicamente
                para fines académicos.
              </p>

            </div>

          </div>



          {/* ==================================================
              COMPROBANTE
          ================================================== */}

          <div className="pago-seccion">

            <h2>
              COMPROBANTE DE PAGO
            </h2>


            <p>
              Selecciona el comprobante
              que deseas recibir.
            </p>



            <div className="comprobante-opciones">


              {[
                'Boleta',
                'Factura',
                'No solicitar'
              ].map(
                (tipo) => (

                  <button
                    type="button"

                    key={tipo}

                    className={
                      tipoComprobante === tipo
                        ? 'comprobante-opcion activa'
                        : 'comprobante-opcion'
                    }

                    onClick={() =>
                      setTipoComprobante(
                        tipo
                      )
                    }
                  >

                    {tipo}

                  </button>

                )
              )}


            </div>



            {/* BOLETA */}

            {
              tipoComprobante ===
              'Boleta' && (

                <div className="comprobante-datos">

                  <div>

                    <label>
                      DNI *
                    </label>

                    <input
                      type="text"
                      inputMode="numeric"
                      className="form-control"

                      maxLength="8"

                      value={dni}

                      onChange={(e) =>
                        setDni(
                          e.target.value
                            .replace(
                              /\D/g,
                              ''
                            )
                            .slice(
                              0,
                              8
                            )
                        )
                      }
                    />

                  </div>



                  <div>

                    <label>
                      Correo para envío *
                    </label>

                    <input
                      type="email"
                      className="form-control"

                      value={
                        correoComprobante
                      }

                      onChange={(e) =>
                        setCorreoComprobante(
                          e.target.value
                        )
                      }
                    />

                  </div>

                </div>

              )
            }



            {/* FACTURA */}

            {
              tipoComprobante ===
              'Factura' && (

                <div className="comprobante-datos">


                  <div>

                    <label>
                      RUC *
                    </label>

                    <input
                      type="text"
                      inputMode="numeric"
                      className="form-control"

                      maxLength="11"

                      value={ruc}

                      onChange={(e) =>
                        setRuc(
                          e.target.value
                            .replace(
                              /\D/g,
                              ''
                            )
                            .slice(
                              0,
                              11
                            )
                        )
                      }
                    />

                  </div>



                  <div>

                    <label>
                      Razón social *
                    </label>

                    <input
                      type="text"
                      className="form-control"

                      value={
                        razonSocial
                      }

                      onChange={(e) =>
                        setRazonSocial(
                          e.target.value
                        )
                      }
                    />

                  </div>



                  <div className="comprobante-correo">

                    <label>
                      Correo para envío *
                    </label>

                    <input
                      type="email"
                      className="form-control"

                      value={
                        correoComprobante
                      }

                      onChange={(e) =>
                        setCorreoComprobante(
                          e.target.value
                        )
                      }
                    />

                  </div>


                </div>

              )
            }


            {
              tipoComprobante !==
                'No solicitar' && (

                <p className="comprobante-nota">
                  El comprobante será enviado
                  al correo registrado una vez
                  procesado el pago.
                </p>

              )
            }


          </div>



          {/* ==================================================
              TÉRMINOS
          ================================================== */}

          <div className="pago-terminos">

            <label>

              <input
                type="checkbox"

                checked={
                  aceptaTerminos
                }

                onChange={(e) =>
                  setAceptaTerminos(
                    e.target.checked
                  )
                }
              />

              <span>
                He leído y acepto
                los términos y condiciones
                de la reserva.
              </span>

            </label>



            <button
              type="button"

              className="btn-ver-terminos"

              onClick={() =>
                setMostrarTerminos(
                  true
                )
              }
            >
              VER TÉRMINOS Y CONDICIONES
            </button>

          </div>



          {/* ==================================================
              ACCIONES
          ================================================== */}

          <div className="acciones-pago">

            <button
              type="button"

              className="btn btn-volver"

              onClick={() =>
                navigate(
                  '/datos-cliente',
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

              className="btn btn-pagar-reserva"

              disabled={
                !aceptaTerminos ||
                pagoProcesando
              }

              onClick={
                realizarPago
              }
            >

              {
                pagoProcesando
                  ? 'PROCESANDO...'
                  : `PAGAR S/ ${totalFinal.toLocaleString('es-PE')}`
              }

            </button>

          </div>


        </div>

      </div>



      {/* ==================================================
          MODAL TÉRMINOS
      ================================================== */}

      {
        mostrarTerminos && (

          <div
            className="terminos-modal-fondo"

            onClick={() =>
              setMostrarTerminos(
                false
              )
            }
          >

            <div
              className="terminos-modal"

              onClick={(e) =>
                e.stopPropagation()
              }
            >


              <button
                type="button"

                className="terminos-cerrar"

                onClick={() =>
                  setMostrarTerminos(
                    false
                  )
                }
              >
                ×
              </button>



              <span className="terminos-etiqueta">
                MAYTA · RESERVAS
              </span>


              <h2>
                TÉRMINOS Y CONDICIONES
              </h2>



              <div className="terminos-contenido">


                <h3>
                  Confirmación
                </h3>

                <p>
                  La reserva queda confirmada
                  una vez completado
                  el proceso de pago.
                </p>



                <h3>
                  Cancelaciones
                </h3>

                <p>
                  Las cancelaciones realizadas
                  con al menos 48 horas
                  de anticipación podrán
                  solicitar el reembolso.
                </p>



                <h3>
                  Reembolsos
                </h3>

                <p>
                  El reembolso será procesado
                  dentro de un plazo
                  de hasta 72 horas hábiles,
                  sujeto al medio de pago.
                </p>



                <h3>
                  Cancelaciones tardías
                </h3>

                <p>
                  Las cancelaciones realizadas
                  dentro de las 48 horas previas
                  podrían no ser reembolsables.
                </p>



                <h3>
                  Tolerancia
                </h3>

                <p>
                  La reserva cuenta
                  con 15 minutos de tolerancia.
                </p>



                <p className="terminos-nota">
                  Política demostrativa
                  utilizada únicamente
                  para este prototipo académico.
                </p>


              </div>



              <button
                type="button"

                className="btn btn-aceptar-terminos"

                onClick={() => {

                  setAceptaTerminos(
                    true
                  );

                  setMostrarTerminos(
                    false
                  );

                }}
              >
                ACEPTAR TÉRMINOS
              </button>


            </div>

          </div>

        )
      }


    </section>

  );

};