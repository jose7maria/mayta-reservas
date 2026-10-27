import { useState } from 'react';
import {
  useLocation,
  useNavigate
} from 'react-router-dom';


export const DatosCliente = () => {

  /* =========================
     NAVEGACIÓN
  ========================= */

  const navigate = useNavigate();

  const location = useLocation();


  /* =========================
     DATOS RECIBIDOS
     DESDE DISPONIBILIDAD
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
    sillaNino = false
  } = datosReserva;



  /* ==================================================
     DATOS DEL RESPONSABLE

     Si el usuario vuelve desde Confirmación,
     conservamos la información anterior.
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

     false = no desea registrar preferencias
     true  = desea registrar preferencias
  ================================================== */

  const [
    registrarPreferencias,
    setRegistrarPreferencias
  ] = useState(
    datosReserva.preferenciasRegistradas || false
  );



  /* ==================================================
     GENERAR COMENSALES

     Creamos automáticamente tantos comensales
     como personas tenga la reserva.
  ================================================== */

  const [comensales, setComensales] = useState(() => {

    /*
      Si venimos de Confirmación y ya existen
      comensales, conservamos esos datos.
    */

    if (
      datosReserva.comensales &&
      datosReserva.comensales.length > 0
    ) {

      return datosReserva.comensales;

    }


    /* Crear comensales nuevos */

    return Array.from(
      { length: personas },
      (_, index) => ({

        id: index + 1,

        tipo: 'Adulto',

        acompanamiento: 'Sin maridaje',

        restricciones: []

      })
    );

  });



  /* ==================================================
     CAMBIAR TIPO
     Adulto / Menor
  ================================================== */

  const cambiarTipo = (id, nuevoTipo) => {

    const nuevosComensales =
      comensales.map((comensal) => {

        if (comensal.id === id) {

          /*
            Si cambia a Menor y tenía Maridaje,
            cambiamos automáticamente a Sin alcohol.
          */

          return {

            ...comensal,

            tipo: nuevoTipo,

            acompanamiento:
              nuevoTipo === 'Menor' &&
              comensal.acompanamiento === 'Maridaje'
                ? 'Sin alcohol'
                : comensal.acompanamiento

          };

        }

        return comensal;

      });


    setComensales(nuevosComensales);

  };



  /* ==================================================
     CAMBIAR ACOMPAÑAMIENTO
  ================================================== */

  const cambiarAcompanamiento = (
    id,
    nuevoAcompanamiento
  ) => {

    const nuevosComensales =
      comensales.map((comensal) => {

        if (comensal.id === id) {

          return {

            ...comensal,

            acompanamiento:
              nuevoAcompanamiento

          };

        }

        return comensal;

      });


    setComensales(nuevosComensales);

  };



  /* ==================================================
     CAMBIAR RESTRICCIONES
  ================================================== */

  const cambiarRestriccion = (
    id,
    restriccion
  ) => {

    const nuevosComensales =
      comensales.map((comensal) => {

        if (comensal.id === id) {

          const existe =
            comensal.restricciones.includes(
              restriccion
            );


          return {

            ...comensal,

            restricciones: existe

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

      });


    setComensales(nuevosComensales);

  };



  /* ==================================================
     VALIDAR Y CONTINUAR
  ================================================== */

  const continuar = () => {


    /* Campos obligatorios */

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


    /* Validación básica de correo */

    if (!correo.includes('@')) {

      alert(
        'Ingresa un correo electrónico válido'
      );

      return;

    }



    /* =========================================
       PASAR A CONFIRMACIÓN
    ========================================= */

    navigate('/confirmacion', {

      state: {

        fecha: fecha,

        hora: hora,

        personas: personas,

        zona: zona,

        mesa: mesa,

        capacidadMesa: capacidadMesa,

        accesible: accesible,

        sillaNino: sillaNino,

        nombre: nombre,

        celular: celular,

        correo: correo,

        preferenciasRegistradas:
          registrarPreferencias,

        /*
          Solo enviamos los comensales
          si el cliente decidió registrarlos.
        */

        comensales:
          registrarPreferencias
            ? comensales
            : [],

        observaciones: observaciones

      }

    });

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
              Completa tus datos y,
              si lo deseas, las preferencias
              de los comensales.
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

            <span className="paso">
              4
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
                    setNombre(e.target.value)
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
                    setCelular(e.target.value)
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
                    setCorreo(e.target.value)
                  }
                />

              </div>


            </div>

          </div>



          {/* ==================================================
              PREFERENCIAS OPCIONALES
          ================================================== */}

          <div className="datos-seccion preferencias-opcionales">


            <div className="preferencias-titulo">

              <span>
                OPCIONAL
              </span>

              <h2>
                PREFERENCIAS DE LOS COMENSALES
              </h2>

              <p>
                Si conoces las preferencias o
                restricciones de tus acompañantes,
                puedes registrarlas ahora.
              </p>

            </div>



            {/* PREGUNTA */}

            <div className="preferencias-pregunta">

              <strong>
                ¿Deseas registrar información
                adicional de los comensales?
              </strong>


              <p>
                Esto nos ayudará a preparar mejor
                la experiencia, pero no es obligatorio.
              </p>



              <div className="preferencias-botones">


                {/* SÍ */}

                <button
                  type="button"

                  className={
                    registrarPreferencias
                      ? 'preferencia-opcion activa'
                      : 'preferencia-opcion'
                  }

                  onClick={() =>
                    setRegistrarPreferencias(true)
                  }
                >
                  SÍ, AGREGAR PREFERENCIAS
                </button>



                {/* NO */}

                <button
                  type="button"

                  className={
                    !registrarPreferencias
                      ? 'preferencia-opcion activa'
                      : 'preferencia-opcion'
                  }

                  onClick={() =>
                    setRegistrarPreferencias(false)
                  }
                >
                  NO, CONTINUAR SIN PREFERENCIAS
                </button>


              </div>

            </div>



            {/* ==================================================
                COMENSALES

                Solo aparece cuando el usuario
                selecciona "Sí".
            ================================================== */}

            {
              registrarPreferencias && (

                <div className="comensales-opcionales">


                  <div className="comensales-opcionales-header">

                    <h3>
                      INFORMACIÓN DE LOS COMENSALES
                    </h3>

                    <p>
                      Puedes indicar el tipo de
                      comensal, acompañamiento y
                      restricciones alimentarias.
                    </p>

                  </div>



                  {comensales.map((comensal) => (

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
                          value={comensal.tipo}

                          onChange={(e) =>
                            cambiarTipo(
                              comensal.id,
                              e.target.value
                            )
                          }
                        >

                          <option>
                            Adulto
                          </option>

                          <option>
                            Menor
                          </option>

                        </select>

                      </div>



                      {/* MENÚ */}

                      <div className="comensal-menu">

                        <span>
                          MENÚ
                        </span>

                        <strong>
                          Bitácora Amazónica · 10 tiempos
                        </strong>

                      </div>



                      {/* ACOMPAÑAMIENTO */}

                      <div className="comensal-bloque">

                        <strong>
                          Acompañamiento
                        </strong>


                        <div className="opciones-acompanamiento">


                          <label>

                            <input
                              type="radio"

                              name={`acompanamiento-${comensal.id}`}

                              checked={
                                comensal.acompanamiento ===
                                'Sin maridaje'
                              }

                              onChange={() =>
                                cambiarAcompanamiento(
                                  comensal.id,
                                  'Sin maridaje'
                                )
                              }
                            />

                            Sin maridaje

                          </label>



                          {/* MARIDAJE SOLO PARA ADULTOS */}

                          {
                            comensal.tipo === 'Adulto' && (

                              <label>

                                <input
                                  type="radio"

                                  name={`acompanamiento-${comensal.id}`}

                                  checked={
                                    comensal.acompanamiento ===
                                    'Maridaje'
                                  }

                                  onChange={() =>
                                    cambiarAcompanamiento(
                                      comensal.id,
                                      'Maridaje'
                                    )
                                  }
                                />

                                Maridaje

                              </label>

                            )
                          }



                          <label>

                            <input
                              type="radio"

                              name={`acompanamiento-${comensal.id}`}

                              checked={
                                comensal.acompanamiento ===
                                'Sin alcohol'
                              }

                              onChange={() =>
                                cambiarAcompanamiento(
                                  comensal.id,
                                  'Sin alcohol'
                                )
                              }
                            />

                            Sin alcohol

                          </label>


                        </div>

                      </div>



                      {/* RESTRICCIONES */}

                      <div className="comensal-bloque">

                        <strong>
                          Restricciones alimentarias
                        </strong>


                        <div className="restricciones-grid">


                          {[
                            'Alergia a mariscos',
                            'Lactosa',
                            'Sin gluten',
                            'Vegetariano'
                          ].map((restriccion) => (

                            <label key={restriccion}>

                              <input
                                type="checkbox"

                                checked={
                                  comensal.restricciones.includes(
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

                          ))}


                        </div>

                      </div>


                    </div>

                  ))}


                </div>

              )
            }


          </div>



          {/* ==================================================
              OBSERVACIONES GENERALES

              SIEMPRE VISIBLE
          ================================================== */}

          <div className="datos-seccion observaciones-reserva">

            <h2>
              OBSERVACIONES GENERALES
            </h2>

            <p>
              Puedes indicarnos una celebración,
              alergia conocida, requerimiento especial
              u otra información importante.
            </p>


            <textarea
              className="form-control"

              rows="4"

              value={observaciones}

              onChange={(e) =>
                setObservaciones(e.target.value)
              }

              placeholder="Ejemplo: celebración especial, alergia conocida o alguna indicación..."
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
                    state: datosReserva
                  }
                )
              }
            >
              VOLVER
            </button>



            <button
              type="button"

              className="btn btn-continuar"

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