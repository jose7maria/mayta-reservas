import { useState } from 'react';
import {
  useLocation,
  useNavigate
} from 'react-router-dom';


export const PagoReserva = () => {

  /* =========================
     NAVEGACIÓN
  ========================= */

  const navigate = useNavigate();

  const location = useLocation();


  /* =========================
     DATOS DE LA RESERVA
  ========================= */

  const datosReserva = location.state || {};


 const {
  fecha = '',
  hora = '',
  personas = 2,
  zona = 'Sin preferencia',
  mesa = 'Asignación automática',
  nombre = '',

  consumos = [],
  totalConsumos = 0

} = datosReserva;



  /* =========================
     DATOS DE PAGO
     SOLO DEMOSTRATIVOS
  ========================= */

  const [titular, setTitular] =
    useState('');

  const [numeroTarjeta, setNumeroTarjeta] =
    useState('');

  const [vencimiento, setVencimiento] =
    useState('');

  const [cvv, setCvv] =
    useState('');

  const [aceptaTerminos, setAceptaTerminos] =
    useState(false);

  const [mostrarTerminos, setMostrarTerminos] =
    useState(false);

  const [pagoProcesando, setPagoProcesando] =
    useState(false);



  /* ==================================================
     FORMATEAR NÚMERO DE TARJETA

     1234567890123456
     pasa a:
     1234 5678 9012 3456
  ================================================== */

  const cambiarNumeroTarjeta = (e) => {

    const soloNumeros =
      e.target.value
        .replace(/\D/g, '')
        .slice(0, 16);


    const formateado =
      soloNumeros
        .replace(/(.{4})/g, '$1 ')
        .trim();


    setNumeroTarjeta(formateado);

  };



  /* ==================================================
     VENCIMIENTO

     Ejemplo:
     1228 -> 12/28
  ================================================== */

  const cambiarVencimiento = (e) => {

    let valor =
      e.target.value
        .replace(/\D/g, '')
        .slice(0, 4);


    if (valor.length >= 3) {

      valor =
        `${valor.slice(0, 2)}/${valor.slice(2)}`;

    }


    setVencimiento(valor);

  };



  /* ==================================================
     REALIZAR PAGO SIMULADO
  ================================================== */

  const realizarPago = () => {


    /* CAMPOS OBLIGATORIOS */

    if (
      titular.trim() === '' ||
      numeroTarjeta.replace(/\s/g, '').length !== 16 ||
      vencimiento.length !== 5 ||
      cvv.length !== 3
    ) {

      alert(
        'Completa correctamente los datos de pago'
      );

      return;

    }


    /* TÉRMINOS OBLIGATORIOS */

    if (!aceptaTerminos) {

      alert(
        'Debes aceptar los términos y condiciones'
      );

      return;

    }



    /*
      SIMULAMOS UN PEQUEÑO PROCESO.

      No existe una pasarela real.
    */

    setPagoProcesando(true);


    /* ÚLTIMOS 4 DÍGITOS */

    const tarjetaLimpia =
      numeroTarjeta.replace(/\s/g, '');

    const ultimos4 =
      tarjetaLimpia.slice(-4);



    /*
      En este prototipo NO enviamos
      número completo ni CVV.

      Solo enviamos información segura
      para mostrar en Confirmación.
    */

    navigate('/confirmacion', {

      state: {

        ...datosReserva,

       pago: {

  estado: 'Pagado',

  metodo: 'Tarjeta',

  ultimos4: ultimos4,

  monto: 998

},

        terminosAceptados: true

      }

    });

  };



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
              Completa el pago demostrativo
              para asegurar tu experiencia.
            </p>

          </div>



          {/* ==================================================
              PROGRESO - PASO 4 DE 5
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
              IMPORTE
          ================================================== */}

          <div className="pago-detalle-consumo">


  {/* CABECERA */}

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
        TOTAL A PAGAR
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



  {/* LISTADO */}

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



  {/* TOTAL FINAL */}

  <div className="pago-detalle-total">

    <span>
      TOTAL
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

          {/* ==================================================
              DATOS DE LA TARJETA
          ================================================== */}

          <div className="pago-seccion">

            <h2>
              DATOS DE PAGO
            </h2>

            <p>
              Información utilizada únicamente
              para simular el proceso de pago.
            </p>


            <div className="pago-grid">


              {/* TITULAR */}

              <div className="pago-campo-completo">

                <label>
                  Titular de la tarjeta *
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre como aparece en la tarjeta"
                  value={titular}
                  onChange={(e) =>
                    setTitular(e.target.value)
                  }
                />

              </div>



              {/* NÚMERO */}

              <div className="pago-campo-completo">

                <label>
                  Número de tarjeta *
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  className="form-control"
                  placeholder="0000 0000 0000 0000"
                  value={numeroTarjeta}
                  onChange={cambiarNumeroTarjeta}
                />

              </div>



              {/* VENCIMIENTO */}

              <div>

                <label>
                  Vencimiento *
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  className="form-control"
                  placeholder="MM/AA"
                  value={vencimiento}
                  onChange={cambiarVencimiento}
                />

              </div>



              {/* CVV */}

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
                        .replace(/\D/g, '')
                        .slice(0, 3)
                    )
                  }
                />

              </div>


            </div>


            {/* AVISO DEMO */}

            <div className="pago-demo-aviso">

              <span>
                i
              </span>

              <p>
                Pago demostrativo para fines académicos.
                No se procesa ni almacena información
                bancaria real.
              </p>

            </div>

          </div>



          {/* ==================================================
              TÉRMINOS
          ================================================== */}

          <div className="pago-terminos">

            <label>

              <input
                type="checkbox"
                checked={aceptaTerminos}
                onChange={(e) =>
                  setAceptaTerminos(
                    e.target.checked
                  )
                }
              />

              <span>
                He leído y acepto los términos
                y condiciones de la reserva.
              </span>

            </label>


            <button
              type="button"
              className="btn-ver-terminos"
              onClick={() =>
                setMostrarTerminos(true)
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
                    state: datosReserva
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
              onClick={realizarPago}
            >
              {
                pagoProcesando
                  ? 'PROCESANDO...'
                  : 'REALIZAR PAGO'
              }
            </button>

          </div>


        </div>

      </div>



      {/* ==================================================
          MODAL DE TÉRMINOS
      ================================================== */}

      {
        mostrarTerminos && (

          <div
            className="terminos-modal-fondo"
            onClick={() =>
              setMostrarTerminos(false)
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
                  setMostrarTerminos(false)
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
                  Confirmación de la reserva
                </h3>

                <p>
                  La reserva se considera confirmada
                  una vez completado el proceso de pago.
                </p>


                <h3>
                  Cancelaciones
                </h3>

                <p>
                  Las cancelaciones realizadas con
                  al menos 48 horas de anticipación
                  podrán solicitar el reembolso
                  correspondiente.
                </p>


                <h3>
                  Reembolso
                </h3>

                <p>
                  El reembolso será procesado dentro
                  de un plazo de hasta 72 horas hábiles,
                  sujeto al medio de pago utilizado.
                </p>


                <h3>
                  Cancelaciones tardías
                </h3>

                <p>
                  Las cancelaciones realizadas dentro
                  de las 48 horas previas a la reserva
                  podrían no ser reembolsables.
                </p>


                <h3>
                  Tolerancia
                </h3>

                <p>
                  La reserva contará con 15 minutos
                  de tolerancia respecto de la hora
                  seleccionada.
                </p>


                <p className="terminos-nota">
                  Política utilizada únicamente con
                  fines demostrativos para este prototipo
                  académico.
                </p>

              </div>


              <button
                type="button"
                className="btn btn-aceptar-terminos"
                onClick={() => {

                  setAceptaTerminos(true);

                  setMostrarTerminos(false);

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