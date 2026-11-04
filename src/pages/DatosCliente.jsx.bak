import { useState } from 'react';
import {
  useLocation,
  useNavigate
} from 'react-router-dom';


export const DatosCliente = () => {

  /* ==================================================
     NAVEGACIÓN
  ================================================== */

  const navigate = useNavigate();

  const location = useLocation();


  /* ==================================================
     DATOS RECIBIDOS DESDE DISPONIBILIDAD
  ================================================== */

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

    /*
      Estos datos ya fueron definidos
      en Reserva.jsx.
    */

    consumos = [],
    totalConsumos = 0

  } = datosReserva;



  /* ==================================================
     DATOS DEL RESPONSABLE
  ================================================== */

  const [nombre, setNombre] =
    useState(datosReserva.nombre || '');

  const [celular, setCelular] =
    useState(datosReserva.celular || '');

  const [correo, setCorreo] =
    useState(datosReserva.correo || '');

  const [observaciones, setObservaciones] =
    useState(datosReserva.observaciones || '');



  /* ==================================================
     PREFERENCIAS OPCIONALES

     Estas preferencias ya NO modifican el precio.
     El consumo fue seleccionado anteriormente.
  ================================================== */

  const [
    registrarPreferencias,
    setRegistrarPreferencias
  ] = useState(
    datosReserva.preferenciasRegistradas ?? false
  );



  /* ==================================================
     GENERAR COMENSALES

     Solo almacenamos:
     - Adulto / Menor
     - Restricciones

     NO volvemos a preguntar maridajes.
  ================================================== */

  const [comensales, setComensales] =
    useState(() => {

      /*
        Si regresamos desde Pago,
        recuperamos los datos anteriores.
      */

      if (
        datosReserva.comensales &&
        datosReserva.comensales.length > 0
      ) {

        return datosReserva.comensales.map(
          (comensal, index) => ({

            id:
              comensal.id ||
              index + 1,

            tipo:
              comensal.tipo ||
              'Adulto',

            restricciones:
              comensal.restricciones ||
              []

          })
        );

      }


      /*
        Si es la primera vez,
        generamos según la cantidad
        de personas.
      */

      return Array.from(
        { length: personas },
        (_, index) => ({

          id: index + 1,

          tipo: 'Adulto',

          restricciones: []

        })
      );

    });



  /* ==================================================
     CAMBIAR ADULTO / MENOR
  ================================================== */

  const cambiarTipo = (
    id,
    nuevoTipo
  ) => {

    const nuevosComensales =
      comensales.map(
        (comensal) => {

          if (comensal.id === id) {

            return {

              ...comensal,

              tipo:
                nuevoTipo

            };

          }


          return comensal;

        }
      );


    setComensales(
      nuevosComensales
    );

  };



  /* ==================================================
     AGREGAR / QUITAR RESTRICCIÓN
  ================================================== */

  const cambiarRestriccion = (
    id,
    restriccion
  ) => {

    const nuevosComensales =
      comensales.map(
        (comensal) => {


          if (comensal.id === id) {

            const existe =
              comensal.restricciones.includes(
                restriccion
              );


            return {

              ...comensal,

              restricciones:
                existe

                  ? comensal.restricciones.filter(
                      item =>
                        item !== restriccion
                    )

                  : [
                      ...comensal.restricciones,
                      restriccion
                    ]

            };

          }


          return comensal;

        }
      );


    setComensales(
      nuevosComensales
    );

  };



  /* ==================================================
     CONTINUAR A PAGO
  ================================================== */

  const continuar = () => {


    /* DATOS OBLIGATORIOS */

    if (
      nombre.trim() === '' ||
      celular.trim() === '' ||
      correo.trim() === ''
    ) {

      alert(
        'Completa los datos de contacto'
      );

      return;

    }



    /* VALIDACIÓN BÁSICA DE CORREO */

    if (!correo.includes('@')) {

      alert(
        'Ingresa un correo electrónico válido'
      );

      return;

    }



    /* ==================================================
       PASAMOS A PAGO

       Conservamos:
       - consumos
       - totalConsumos
       - mesa
       - horario
       - cliente
       - restricciones
       - observaciones
    ================================================== */

    navigate(
      '/pago-reserva',
      {

        state: {

          ...datosReserva,

          fecha: fecha,

          hora: hora,

          personas: personas,

          zona: zona,

          mesa: mesa,

          capacidadMesa:
            capacidadMesa,

          accesible:
            accesible,

          sillaNino:
            sillaNino,

          consumos:
            consumos,

          totalConsumos:
            totalConsumos,

          nombre:
            nombre,

          celular:
            celular,

          correo:
            correo,

          preferenciasRegistradas:
            registrarPreferencias,

          /*
            Si decide no registrar preferencias,
            no enviamos información individual.
          */

          comensales:
            registrarPreferencias
              ? comensales
              : [],

          observaciones:
            observaciones

        }

      }
    );

  };



  return (

    <section className="datos-page">

      <div className="container">

        <div className="datos-box">


          {/* ==================================================
              CABECERA
          ================================================== */}

          <div className="datos-header">

            <span>
              RESERVAS MAYTA
            </span>


            <h1>
              DATOS DE LA RESERVA
            </h1>


            <p>
              Completa los datos de la persona
              responsable de la reserva.
            </p>

          </div>



          {/* ==================================================
              PROGRESO - PASO 3 DE 5
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


            <span className="paso">
              4
            </span>

            <span className="linea"></span>


            <span className="paso">
              5
            </span>

          </div>



          {/* ==================================================
              RESUMEN
          ================================================== */}

          <div className="datos-resumen datos-resumen-cinco">


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
              TOTAL DE CONSUMO

              Es solo informativo.
              Aquí ya no se modifica.
          ================================================== */}

          <div className="datos-total-consumo">

            <div>

              <span>
                CONSUMO SELECCIONADO
              </span>

              <p>
                {personas}
                {' '}
                {
                  personas === 1
                    ? 'experiencia asignada'
                    : 'experiencias asignadas'
                }
              </p>

            </div>


            <div>

              <span>
                TOTAL ESTIMADO
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
              DATOS DE CONTACTO
          ================================================== */}

          <div className="datos-seccion">

            <h2>
              DATOS DE CONTACTO
            </h2>


            <p>
              Información de la persona
              responsable de la reserva.
            </p>



            <div className="datos-grid">


              {/* NOMBRE */}

              <div>

                <label>
                  Nombres y apellidos *
                </label>

                <input
                  type="text"
                  className="form-control"

                  value={nombre}

                  onChange={(e) =>
                    setNombre(
                      e.target.value
                    )
                  }
                />

              </div>



              {/* CELULAR */}

              <div>

                <label>
                  Celular *
                </label>

                <input
                  type="tel"
                  className="form-control"

                  value={celular}

                  onChange={(e) =>
                    setCelular(
                      e.target.value
                    )
                  }
                />

              </div>



              {/* CORREO */}

              <div className="campo-completo">

                <label>
                  Correo electrónico *
                </label>

                <input
                  type="email"
                  className="form-control"

                  value={correo}

                  onChange={(e) =>
                    setCorreo(
                      e.target.value
                    )
                  }
                />

              </div>


            </div>

          </div>



          {/* ==================================================
              INFORMACIÓN OPCIONAL
          ================================================== */}

          <div className="datos-seccion preferencias-opcionales">


            <div className="preferencias-titulo">

              <span>
                OPCIONAL
              </span>


              <h2>
                INFORMACIÓN DE LOS COMENSALES
              </h2>


              <p>
                Si conoces alguna restricción
                alimentaria o necesitas identificar
                adultos y menores,
                puedes registrarlo ahora.
              </p>

            </div>



            {/* PREGUNTA */}

            <div className="preferencias-pregunta">

              <strong>
                ¿Deseas agregar información
                de los comensales?
              </strong>


              <p>
                Esta información es opcional
                y no modifica el precio
                de la reserva.
              </p>



              <div className="preferencias-botones">


                <button
                  type="button"

                  className={
                    registrarPreferencias
                      ? 'preferencia-opcion activa'
                      : 'preferencia-opcion'
                  }

                  onClick={() =>
                    setRegistrarPreferencias(
                      true
                    )
                  }
                >
                  SÍ, AGREGAR INFORMACIÓN
                </button>



                <button
                  type="button"

                  className={
                    !registrarPreferencias
                      ? 'preferencia-opcion activa'
                      : 'preferencia-opcion'
                  }

                  onClick={() =>
                    setRegistrarPreferencias(
                      false
                    )
                  }
                >
                  NO, CONTINUAR SIN INFORMACIÓN
                </button>


              </div>

            </div>



            {/* ==================================================
                COMENSALES OPCIONALES
            ================================================== */}

            {
              registrarPreferencias && (

                <div className="comensales-opcionales">


                  <div className="comensales-opcionales-header">

                    <h3>
                      DETALLE DE LOS COMENSALES
                    </h3>


                    <p>
                      Puedes completar solamente
                      la información que conozcas.
                    </p>

                  </div>



                  {
                    comensales.map(
                      (comensal) => (

                        <div
                          className="comensal-card"
                          key={comensal.id}
                        >


                          {/* CABECERA */}

                          <div className="comensal-header">

                            <strong>
                              COMENSAL {comensal.id}
                            </strong>



                            <select
                              value={
                                comensal.tipo
                              }

                              onChange={(e) =>
                                cambiarTipo(
                                  comensal.id,
                                  e.target.value
                                )
                              }
                            >

                              <option value="Adulto">
                                Adulto
                              </option>

                              <option value="Menor">
                                Menor
                              </option>

                            </select>

                          </div>



                          {/* RESTRICCIONES */}

                          <div className="comensal-bloque">

                            <strong>
                              Restricciones alimentarias
                            </strong>


                            <p className="preferencias-ayuda">
                              Selecciona solamente
                              las que correspondan.
                            </p>



                            <div className="restricciones-grid">


                              {
                                [
                                  'Alergia a mariscos',
                                  'Lactosa',
                                  'Sin gluten',
                                  'Vegetariano'
                                ].map(
                                  (restriccion) => (

                                    <label
                                      key={
                                        restriccion
                                      }
                                    >

                                      <input
                                        type="checkbox"

                                        checked={
                                          comensal
                                            .restricciones
                                            .includes(
                                              restriccion
                                            )
                                        }

                                        onChange={() =>
                                          cambiarRestriccion(
                                            comensal.id,
                                            restriccion
                                          )
                                        }
                                      />

                                      {restriccion}

                                    </label>

                                  )
                                )
                              }


                            </div>

                          </div>


                        </div>

                      )
                    )
                  }


                </div>

              )
            }


          </div>



          {/* ==================================================
              OBSERVACIONES GENERALES

              SIEMPRE DISPONIBLE
          ================================================== */}

          <div className="datos-seccion observaciones-reserva">

            <h2>
              OBSERVACIONES GENERALES
            </h2>


            <p>
              Celebraciones, requerimientos especiales,
              alergias conocidas u otra información
              importante para el restaurante.
            </p>


            <textarea
              className="form-control"

              rows="4"

              value={
                observaciones
              }

              onChange={(e) =>
                setObservaciones(
                  e.target.value
                )
              }

              placeholder="Ejemplo: cumpleaños, celebración especial o alguna indicación..."
            />

          </div>



          {/* ==================================================
              ACCIONES
          ================================================== */}

          <div className="acciones-datos">


            <button
              type="button"

              className="btn btn-volver"

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
              VOLVER
            </button>



            <button
              type="button"

              className="btn btn-continuar"

              onClick={
                continuar
              }
            >
              CONTINUAR AL PAGO
            </button>


          </div>


        </div>

      </div>

    </section>

  );

};