import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



/* =========================
   IMÁGENES DE LOS AMBIENTES
========================= */

import zonaSalon from '../assets/img/salonjpg.jpg';
import zonaTerraza from '../assets/img/terrazaext.jpg';
import zonaBarra from '../assets/img/barra.jpg';
import zonaPrivada from '../assets/img/privado.jpg';



export const Reserva = () => {

  /* =========================
     NAVEGACIÓN
  ========================= */

  const navigate = useNavigate();


  /* =========================
     DATOS DE LA RESERVA
  ========================= */

  const [fecha, setFecha] = useState('');

  const [personas, setPersonas] = useState(2);

  const [zona, setZona] = useState('Sin preferencia');

  const [mesaSeleccionada, setMesaSeleccionada] =
    useState(null);

  const [accesible, setAccesible] = useState(false);

  const [sillaNino, setSillaNino] = useState(false);



  /* ==================================================
     AMBIENTES DEL RESTAURANTE
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

     Cada ambiente mostrará estas mismas 6 mesas.
     Para el parcial no necesitamos una base de datos.
  ================================================== */

  const mesas = [

    {
      id: 1,
      nombre: 'M1',
      capacidad: 2,
      descripcion: 'Mesa íntima para una experiencia en pareja.'
    },

    {
      id: 2,
      nombre: 'M2',
      capacidad: 2,
      descripcion: 'Mesa tranquila ubicada en un sector lateral.'
    },

    {
      id: 3,
      nombre: 'M3',
      capacidad: 4,
      descripcion: 'Mesa cómoda para grupos pequeños.'
    },

    {
      id: 4,
      nombre: 'M4',
      capacidad: 4,
      descripcion: 'Ubicación central con fácil acceso al servicio.'
    },

    {
      id: 5,
      nombre: 'M5',
      capacidad: 6,
      descripcion: 'Mesa amplia para familias o grupos.'
    },

    {
      id: 6,
      nombre: 'M6',
      capacidad: 10,
      descripcion: 'Mesa amplia para grupos y celebraciones.'
    }

  ];



  /* ==================================================
     OBTENER LOS DATOS DEL AMBIENTE SELECCIONADO
  ================================================== */

  const zonaSeleccionada = zonas.find(
    (item) => item.nombre === zona
  );



  /* =========================
     CAMBIAR CANTIDAD
  ========================= */

  const aumentarPersonas = () => {

    if (personas < 10) {

      const nuevaCantidad = personas + 1;

      setPersonas(nuevaCantidad);


      /*
        Si ya había una mesa elegida y deja
        de tener capacidad suficiente,
        quitamos automáticamente la selección.
      */

      if (
        mesaSeleccionada &&
        mesaSeleccionada.capacidad < nuevaCantidad
      ) {
        setMesaSeleccionada(null);
      }

    }

  };


  const disminuirPersonas = () => {

    if (personas > 1) {
      setPersonas(personas - 1);
    }

  };



  /* ==================================================
     SELECCIONAR AMBIENTE
  ================================================== */

  const seleccionarZona = (nombreZona) => {

    setZona(nombreZona);

    /*
      Al cambiar de ambiente,
      eliminamos cualquier mesa anterior.
    */

    setMesaSeleccionada(null);

  };



  /* ==================================================
     BUSCAR DISPONIBILIDAD
  ================================================== */

  const buscarDisponibilidad = () => {


    /* FECHA OBLIGATORIA */

    if (fecha === '') {

      alert('Selecciona una fecha');

      return;

    }


    /*
      Si eligió un ambiente específico,
      debe seleccionar una mesa.

      Si eligió "Sin preferencia",
      MAYTA asignará una automáticamente.
    */

    if (
      zona !== 'Sin preferencia' &&
      !mesaSeleccionada
    ) {

      alert('Selecciona una mesa');

      return;

    }



    /* =========================
       PASAR AL PASO 2
    ========================= */

    navigate('/disponibilidad', {

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

        accesible: accesible,

        sillaNino: sillaNino

      }

    });

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
              Selecciona cuándo y dónde deseas
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
                setFecha(e.target.value)
              }
            />

          </div>



          {/* ==================================================
              NÚMERO DE PERSONAS
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
                {personas} personas
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
              AMBIENTE
          ================================================== */}

          <div className="reserva-grupo">

            <label>
              ¿Dónde te gustaría vivir la experiencia?
            </label>


            <p className="reserva-ayuda">
              Puedes dejar que MAYTA asigne tu ubicación
              o seleccionar uno de nuestros ambientes.
            </p>



            {/* =========================
                SIN PREFERENCIA
            ========================= */}

            <button
              type="button"

              className={
                zona === 'Sin preferencia'
                  ? 'zona-sin-preferencia seleccionada'
                  : 'zona-sin-preferencia'
              }

              onClick={() =>
                seleccionarZona('Sin preferencia')
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



            {/* =========================
                AMBIENTES
            ========================= */}

            <div className="zonas-reserva-grid">

              {zonas.map((opcion) => (

                <button
                  type="button"

                  key={opcion.nombre}

                  className={
                    zona === opcion.nombre
                      ? 'zona-reserva-card seleccionada'
                      : 'zona-reserva-card'
                  }

                  onClick={() =>
                    seleccionarZona(opcion.nombre)
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

              ))}

            </div>

          </div>



          {/* ==================================================
              MESAS

              Solamente aparecen cuando el usuario
              selecciona un ambiente específico.
          ================================================== */}

          {
            zona !== 'Sin preferencia' &&
            zonaSeleccionada && (

              <div className="reserva-grupo mesas-cliente-seccion">


                {/* ENCABEZADO */}

                <div className="mesas-cliente-header">

                  <span>
                    MESAS DISPONIBLES
                  </span>

                  <h2>
                    {zona}
                  </h2>

                  <p>
                    Selecciona la mesa que prefieras.
                  </p>

                </div>



                {/* =========================
                    LISTA DE MESAS
                ========================= */}

                <div className="mesas-cliente-lista">

                  {mesas.map((mesa) => {


                    const capacidadInsuficiente =
                      personas > mesa.capacidad;


                    const seleccionada =
                      mesaSeleccionada?.id === mesa.id;


                    return (

                      <button
                        type="button"

                        key={mesa.id}

                        disabled={capacidadInsuficiente}

                        onClick={() =>
                          setMesaSeleccionada(mesa)
                        }

                        className={`
                          mesa-cliente-card
                          ${seleccionada ? 'seleccionada' : ''}
                          ${capacidadInsuficiente ? 'bloqueada' : ''}
                        `}
                      >


                        {/* IMAGEN */}

                        <div className="mesa-cliente-imagen">

                          <img
                            src={zonaSeleccionada.imagen}
                            alt={`${mesa.nombre} - ${zona}`}
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
                            {mesa.capacidad} personas
                          </small>

                        </div>



                        {/* ACCIÓN */}

                        <div className="mesa-cliente-accion">

                          {
                            capacidadInsuficiente ? (

                              <span className="mesa-capacidad-error">
                                NO DISPONIBLE
                              </span>

                            ) : seleccionada ? (

                              <>
                                <span className="mesa-check-simple">
                                  ✓
                                </span>

                                <strong>
                                  SELECCIONADA
                                </strong>
                              </>

                            ) : (

                              <strong>
                                SELECCIONAR
                              </strong>

                            )
                          }

                        </div>


                      </button>

                    );

                  })}

                </div>



                {/* =========================
                    RESUMEN SELECCIONADO
                ========================= */}

                {
                  mesaSeleccionada && (

                    <div className="mesa-cliente-confirmacion">

                      <span>
                        ✓
                      </span>


                      <div>

                        <strong>
                          {mesaSeleccionada.nombre} seleccionada
                        </strong>

                        <p>
                          {zona} · Para tu reserva de{' '}
                          {personas} personas.
                        </p>

                      </div>

                    </div>

                  )
                }


              </div>

            )
          }



          {/* ==================================================
              NECESIDADES ADICIONALES
          ================================================== */}

          <div className="reserva-opciones">

            <label>

              <input
                type="checkbox"
                checked={accesible}
                onChange={(e) =>
                  setAccesible(e.target.checked)
                }
              />

              Requiero acceso para silla de ruedas

            </label>


            <label>

              <input
                type="checkbox"
                checked={sillaNino}
                onChange={(e) =>
                  setSillaNino(e.target.checked)
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
            onClick={buscarDisponibilidad}
          >
            BUSCAR DISPONIBILIDAD
          </button>


        </div>

      </div>

    </section>

  );

};