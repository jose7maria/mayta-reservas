import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* =========================
   IMÁGENES DE AMBIENTES
========================= */

import zonaSalon from '../assets/img/salonjpg.jpg';
import zonaTerraza from '../assets/img/terrazaext.jpg';
import zonaBarra from '../assets/img/barra.jpg';
import zonaPrivada from '../assets/img/privado.jpg';


export const Reserva = () => {

  const navigate = useNavigate();


  /* ==================================================
     DATOS PRINCIPALES
  ================================================== */

  const [fecha, setFecha] =
    useState('');

  const [personas, setPersonas] =
    useState(2);

  const [zona, setZona] =
    useState('Sin preferencia');

  const [
    mesaSeleccionada,
    setMesaSeleccionada
  ] = useState(null);

  const [accesible, setAccesible] =
    useState(false);

  const [sillaNino, setSillaNino] =
    useState(false);



  /* ==================================================
     OPCIONES DE CONSUMO

     Estos precios corresponden al precio
     completo por persona.
  ================================================== */

  const opcionesConsumo = [

    {
      id: 'sin-maridaje',
      nombre:
        'Bitácora Amazónica sin maridaje',
      detalle:
        'Experiencia Bitácora Amazónica · 10 tiempos',
      precio: 998
    },

    {
      id: 'parajes',
      nombre:
        'Bitácora Amazónica + Maridaje Parajes',
      detalle:
        'Experiencia con maridaje Parajes',
      precio: 1738
    },

    {
      id: 'artesanos',
      nombre:
        'Bitácora Amazónica + Maridaje Artesanos',
      detalle:
        'Experiencia con maridaje Artesanos',
      precio: 1683
    },

    {
      id: 'sin-alcohol',
      nombre:
        'Bitácora Amazónica + Maridaje sin alcohol',
      detalle:
        'Experiencia con bebidas sin alcohol',
      precio: 1343
    }

  ];



  /* ==================================================
     CANTIDADES SELECCIONADAS

     Ejemplo:
     sin-maridaje = 3
     parajes       = 2
  ================================================== */

  const [
    cantidadesConsumo,
    setCantidadesConsumo
  ] = useState({

    'sin-maridaje': 0,

    'parajes': 0,

    'artesanos': 0,

    'sin-alcohol': 0

  });



  /* ==================================================
     TOTAL DE PERSONAS ASIGNADAS
  ================================================== */

  const totalAsignados =
    Object
      .values(cantidadesConsumo)
      .reduce(
        (total, cantidad) =>
          total + cantidad,
        0
      );



  /* ==================================================
     TOTAL ECONÓMICO
  ================================================== */

  const totalConsumos =
    opcionesConsumo.reduce(
      (total, opcion) => {

        const cantidad =
          cantidadesConsumo[opcion.id];

        return (
          total +
          cantidad * opcion.precio
        );

      },
      0
    );



  /* ==================================================
     DETALLE QUE ENVIAREMOS
     AL RESTO DEL SISTEMA
  ================================================== */

  const consumosSeleccionados =
    opcionesConsumo

      .filter(
        opcion =>
          cantidadesConsumo[opcion.id] > 0
      )

      .map(
        opcion => {

          const cantidad =
            cantidadesConsumo[opcion.id];

          return {

            id: opcion.id,

            nombre: opcion.nombre,

            cantidad: cantidad,

            precioUnitario:
              opcion.precio,

            subtotal:
              cantidad *
              opcion.precio

          };

        }
      );



  /* ==================================================
     CAMBIAR CANTIDAD DE CONSUMO
  ================================================== */

  const cambiarCantidadConsumo = (
    id,
    cambio
  ) => {

    const cantidadActual =
      cantidadesConsumo[id];


    /* ------------------------------------------
       AUMENTAR
       No podemos superar personas.
    ------------------------------------------ */

    if (cambio === 1) {

      if (totalAsignados >= personas) {
        return;
      }


      setCantidadesConsumo({

        ...cantidadesConsumo,

        [id]:
          cantidadActual + 1

      });

    }



    /* ------------------------------------------
       DISMINUIR
    ------------------------------------------ */

    if (cambio === -1) {

      if (cantidadActual <= 0) {
        return;
      }


      setCantidadesConsumo({

        ...cantidadesConsumo,

        [id]:
          cantidadActual - 1

      });

    }

  };



  /* ==================================================
     AMBIENTES
  ================================================== */

  const zonas = [

    {
      nombre: 'Salón principal',

      descripcion:
        'Ambiente central y elegante para disfrutar la experiencia MAYTA.',

      imagen: zonaSalon
    },

    {
      nombre: 'Terraza / exterior',

      descripcion:
        'Espacio abierto y rodeado de naturaleza para una experiencia más relajada.',

      imagen: zonaTerraza
    },

    {
      nombre: 'Barra',

      descripcion:
        'Una experiencia cercana al servicio, los vinos y las bebidas.',

      imagen: zonaBarra
    },

    {
      nombre: 'Salón privado',

      descripcion:
        'Ambiente reservado, ideal para grupos o celebraciones especiales.',

      imagen: zonaPrivada
    }

  ];



  /* ==================================================
     MESAS SIMULADAS
  ================================================== */

  const mesas = [

    {
      id: 1,
      nombre: 'M1',
      capacidad: 2,
      disponible: true,
      descripcion:
        'Mesa íntima para una experiencia en pareja.'
    },

    {
      id: 2,
      nombre: 'M2',
      capacidad: 2,
      disponible: false,
      descripcion:
        'Mesa tranquila ubicada en un sector lateral.'
    },

    {
      id: 3,
      nombre: 'M3',
      capacidad: 4,
      disponible: true,
      descripcion:
        'Mesa cómoda para grupos pequeños.'
    },

    {
      id: 4,
      nombre: 'M4',
      capacidad: 4,
      disponible: false,
      descripcion:
        'Ubicación central con fácil acceso al servicio.'
    },

    {
      id: 5,
      nombre: 'M5',
      capacidad: 6,
      disponible: true,
      descripcion:
        'Mesa amplia para familias o grupos.'
    },

    {
      id: 6,
      nombre: 'M6',
      capacidad: 10,
      disponible: true,
      descripcion:
        'Mesa amplia para grupos y celebraciones.'
    }

  ];



  /* ==================================================
     AMBIENTE SELECCIONADO
  ================================================== */

  const zonaSeleccionada =
    zonas.find(
      item =>
        item.nombre === zona
    );



  /* ==================================================
     CAMBIAR NÚMERO DE PERSONAS
  ================================================== */

  const aumentarPersonas = () => {

    if (personas < 10) {

      setPersonas(
        personas + 1
      );

    }

  };


  const disminuirPersonas = () => {

    if (personas > 1) {

      const nuevaCantidad =
        personas - 1;


      setPersonas(
        nuevaCantidad
      );


      /*
        Si ya habíamos asignado más
        experiencias que personas,
        reiniciamos esa selección.
      */

      if (
        totalAsignados >
        nuevaCantidad
      ) {

        setCantidadesConsumo({

          'sin-maridaje': 0,

          'parajes': 0,

          'artesanos': 0,

          'sin-alcohol': 0

        });

      }



      /*
        Si la mesa deja de tener
        capacidad suficiente,
        también se elimina.
      */

      if (
        mesaSeleccionada &&
        mesaSeleccionada.capacidad >
        0 &&
        nuevaCantidad >
        mesaSeleccionada.capacidad
      ) {

        setMesaSeleccionada(
          null
        );

      }

    }

  };



  /* ==================================================
     SELECCIONAR ZONA
  ================================================== */

  const seleccionarZona = (
    nombreZona
  ) => {

    setZona(
      nombreZona
    );

    /*
      Cambiar de ambiente elimina
      la mesa anterior.
    */

    setMesaSeleccionada(
      null
    );

  };



  /* ==================================================
     BUSCAR DISPONIBILIDAD
  ================================================== */

  const buscarDisponibilidad = () => {


    /* FECHA */

    if (fecha === '') {

      alert(
        'Selecciona una fecha'
      );

      return;

    }



    /* EXPERIENCIAS */

    if (
      totalAsignados !== personas
    ) {

      alert(
        `Debes asignar una experiencia a las ${personas} personas`
      );

      return;

    }



    /* MESA */

    if (
      zona !== 'Sin preferencia' &&
      !mesaSeleccionada
    ) {

      alert(
        'Selecciona una mesa'
      );

      return;

    }



    /* ==================================================
       PASAR A DISPONIBILIDAD

       Aquí empieza a viajar también
       el detalle económico.
    ================================================== */

    navigate(
      '/disponibilidad',
      {

        state: {

          fecha: fecha,

          personas: personas,

          zona: zona,

          mesa:
            zona === 'Sin preferencia'

              ? 'Asignación automática'

              : mesaSeleccionada.nombre,

          capacidadMesa:
            mesaSeleccionada

              ? mesaSeleccionada.capacidad

              : null,

          accesible:
            accesible,

          sillaNino:
            sillaNino,

          consumos:
            consumosSeleccionados,

          totalConsumos:
            totalConsumos

        }

      }
    );

  };



  return (

    <section className="reserva-page">

      <div className="container">

        <div className="reserva-box">


          {/* ==================================================
              CABECERA
          ================================================== */}

          <div className="reserva-header">

            <span>
              RESERVAS MAYTA
            </span>

            <h1>
              RESERVA TU MESA
            </h1>

            <p>
              Selecciona cuándo y cómo deseas
              vivir la experiencia.
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

            <span className="paso">
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
              FECHA
          ================================================== */}

          <div className="reserva-grupo">

            <label>
              Fecha
            </label>

            <input
              type="date"

              className="form-control"

              value={fecha}

              onChange={(e) =>
                setFecha(
                  e.target.value
                )
              }
            />

          </div>



          {/* ==================================================
              PERSONAS
          ================================================== */}

          <div className="reserva-grupo">

            <label>
              Número de personas
            </label>


            <div className="selector-personas">

              <button
                type="button"
                onClick={disminuirPersonas}
              >
                −
              </button>


              <span>
                {personas}
                {' '}
                {
                  personas === 1
                    ? 'persona'
                    : 'personas'
                }
              </span>


              <button
                type="button"
                onClick={aumentarPersonas}
              >
                +
              </button>

            </div>

          </div>



          {/* ==================================================
              TIPO DE CONSUMO
          ================================================== */}

          <div className="reserva-grupo consumo-reserva-seccion">


            <div className="consumo-reserva-header">

              <div>

                <span>
                  EXPERIENCIA MAYTA
                </span>

                <h2>
                  Selecciona el tipo de consumo
                </h2>

                <p>
                  Asigna una experiencia
                  por cada persona de la reserva.
                </p>

              </div>



              <div
                className={
                  totalAsignados === personas

                    ? 'consumo-asignados completo'

                    : 'consumo-asignados'
                }
              >

                {
                  totalAsignados === personas
                    ? '✓ '
                    : ''
                }

                {totalAsignados}
                {' '}
                DE
                {' '}
                {personas}
                {' '}
                ASIGNADOS

              </div>

            </div>



            {/* OPCIONES */}

            <div className="consumo-opciones">


              {
                opcionesConsumo.map(
                  (opcion) => (

                    <div
                      className="consumo-opcion"
                      key={opcion.id}
                    >


                      {/* TEXTO */}

                      <div className="consumo-opcion-info">

                        <strong>
                          {opcion.nombre}
                        </strong>

                        <span>
                          {opcion.detalle}
                        </span>

                        <small>
                          S/{' '}
                          {
                            opcion.precio
                              .toLocaleString(
                                'es-PE'
                              )
                          }
                          {' '}
                          por persona
                        </small>

                      </div>



                      {/* SELECTOR */}

                      <div className="consumo-cantidad">

                        <button
                          type="button"

                          onClick={() =>
                            cambiarCantidadConsumo(
                              opcion.id,
                              -1
                            )
                          }

                          disabled={
                            cantidadesConsumo[
                              opcion.id
                            ] === 0
                          }
                        >
                          −
                        </button>


                        <strong>
                          {
                            cantidadesConsumo[
                              opcion.id
                            ]
                          }
                        </strong>


                        <button
                          type="button"

                          onClick={() =>
                            cambiarCantidadConsumo(
                              opcion.id,
                              1
                            )
                          }

                          disabled={
                            totalAsignados >=
                            personas
                          }
                        >
                          +
                        </button>

                      </div>


                    </div>

                  )
                )
              }


            </div>



            {/* ==================================================
                RESUMEN ECONÓMICO
            ================================================== */}

            <div className="consumo-total">


              <div>

                <span>
                  TOTAL ESTIMADO
                </span>

                <p>
                  El detalle completo volverá
                  a mostrarse antes del pago.
                </p>

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


          </div>



          {/* ==================================================
              AMBIENTE
          ================================================== */}

          <div className="reserva-grupo">

            <label>
              ¿Dónde te gustaría vivir la experiencia?
            </label>


            <p className="reserva-ayuda">
              Puedes dejar que MAYTA asigne
              tu ubicación o seleccionar
              uno de nuestros ambientes.
            </p>



            {/* SIN PREFERENCIA */}

            <button
              type="button"

              className={
                zona === 'Sin preferencia'

                  ? 'zona-sin-preferencia seleccionada'

                  : 'zona-sin-preferencia'
              }

              onClick={() =>
                seleccionarZona(
                  'Sin preferencia'
                )
              }
            >

              <div>

                <strong>
                  SIN PREFERENCIA
                </strong>

                <span>
                  MAYTA asignará automáticamente
                  la mejor mesa disponible.
                </span>

              </div>


              <span className="zona-radio">

                {
                  zona === 'Sin preferencia'
                    ? '✓'
                    : ''
                }

              </span>

            </button>



            {/* AMBIENTES */}

            <div className="zonas-reserva-grid">

              {
                zonas.map(
                  (opcion) => (

                    <button
                      type="button"

                      key={opcion.nombre}

                      className={
                        zona === opcion.nombre

                          ? 'zona-reserva-card seleccionada'

                          : 'zona-reserva-card'
                      }

                      onClick={() =>
                        seleccionarZona(
                          opcion.nombre
                        )
                      }
                    >


                      <div className="zona-reserva-imagen">

                        <img
                          src={opcion.imagen}
                          alt={opcion.nombre}
                        />


                        {
                          zona === opcion.nombre && (

                            <span className="zona-check">
                              ✓
                            </span>

                          )
                        }

                      </div>



                      <div className="zona-reserva-info">

                        <strong>
                          {opcion.nombre}
                        </strong>

                        <p>
                          {opcion.descripcion}
                        </p>

                        <span>

                          {
                            zona === opcion.nombre
                              ? 'SELECCIONADO'
                              : 'SELECCIONAR'
                          }

                        </span>

                      </div>


                    </button>

                  )
                )
              }

            </div>

          </div>



          {/* ==================================================
              MESAS

              Solo si eligió ambiente específico.
          ================================================== */}

          {
            zona !== 'Sin preferencia' &&
            zonaSeleccionada && (

              <div className="reserva-grupo mesas-cliente-seccion">


                <div className="mesas-cliente-header">

                  <span>
                    MESAS DISPONIBLES
                  </span>

                  <h2>
                    {zona}
                  </h2>

                  <p>
                    Selecciona la mesa
                    que prefieras.
                  </p>

                </div>



                <div className="mesas-cliente-lista">


                  {
                    mesas.map(
                      (mesa) => {


                        const capacidadInsuficiente =
                          personas >
                          mesa.capacidad;


                        const noDisponible =
                          !mesa.disponible ||
                          capacidadInsuficiente;


                        const seleccionada =
                          mesaSeleccionada?.id ===
                          mesa.id;


                        return (

                          <button
                            type="button"

                            key={mesa.id}

                            disabled={
                              noDisponible
                            }

                            onClick={() =>
                              setMesaSeleccionada(
                                mesa
                              )
                            }

                            className={`
                              mesa-cliente-card

                              ${
                                seleccionada
                                  ? 'seleccionada'
                                  : ''
                              }

                              ${
                                noDisponible
                                  ? 'bloqueada'
                                  : ''
                              }
                            `}
                          >


                            {/* FOTO */}

                            <div className="mesa-cliente-imagen">

                              <img
                                src={
                                  zonaSeleccionada.imagen
                                }

                                alt={
                                  `${mesa.nombre} - ${zona}`
                                }
                              />

                            </div>



                            {/* INFORMACIÓN */}

                            <div className="mesa-cliente-info">

                              <span>
                                MESA
                              </span>

                              <h3>
                                {mesa.nombre}
                              </h3>

                              <p>
                                {mesa.descripcion}
                              </p>

                              <small>
                                Capacidad máxima:
                                {' '}
                                {mesa.capacidad}
                                {' '}
                                personas
                              </small>

                            </div>



                            {/* ESTADO */}

                            <div className="mesa-cliente-accion">


                              {
                                !mesa.disponible ? (

                                  <span className="mesa-capacidad-error">
                                    OCUPADA
                                  </span>

                                )

                                : capacidadInsuficiente ? (

                                  <span className="mesa-capacidad-error">
                                    CAPACIDAD INSUFICIENTE
                                  </span>

                                )

                                : seleccionada ? (

                                  <>
                                    <span className="mesa-check-simple">
                                      ✓
                                    </span>

                                    <strong>
                                      SELECCIONADA
                                    </strong>
                                  </>

                                )

                                : (

                                  <strong>
                                    SELECCIONAR
                                  </strong>

                                )
                              }


                            </div>


                          </button>

                        );

                      }
                    )
                  }


                </div>



                {/* MESA ELEGIDA */}

                {
                  mesaSeleccionada && (

                    <div className="mesa-cliente-confirmacion">

                      <span>
                        ✓
                      </span>

                      <div>

                        <strong>
                          {
                            mesaSeleccionada.nombre
                          }
                          {' '}
                          seleccionada
                        </strong>

                        <p>
                          {zona}
                          {' · '}
                          {personas}
                          {' '}
                          personas
                        </p>

                      </div>

                    </div>

                  )
                }


              </div>

            )
          }



          {/* ==================================================
              REQUERIMIENTOS
          ================================================== */}

          <div className="reserva-opciones">

            <label>

              <input
                type="checkbox"

                checked={accesible}

                onChange={(e) =>
                  setAccesible(
                    e.target.checked
                  )
                }
              />

              Requiero acceso para silla de ruedas

            </label>


            <label>

              <input
                type="checkbox"

                checked={sillaNino}

                onChange={(e) =>
                  setSillaNino(
                    e.target.checked
                  )
                }
              />

              Necesito silla para niño

            </label>

          </div>



          {/* ==================================================
              BUSCAR DISPONIBILIDAD
          ================================================== */}

          <button
            type="button"

            className="btn buscar-disponibilidad"

            onClick={
              buscarDisponibilidad
            }

            disabled={
              totalAsignados !==
              personas
            }
          >
            BUSCAR DISPONIBILIDAD
          </button>


        </div>

      </div>

    </section>

  );

};