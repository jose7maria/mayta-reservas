import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* =========================
   IMÁGENES DE LAS ZONAS
========================= */

import zonaSalon from '../assets/img/experiencia-1.jpg';
import zonaTerraza from '../assets/img/experiencia-2.jpg';
import zonaBarra from '../assets/img/experiencia-3.jpg';
import zonaPrivada from '../assets/img/hero-mayta.jpg';


export const Reserva = () => {

  /* =========================
     NAVEGACIÓN
  ========================= */

  const navigate = useNavigate();


  /* =========================
     ESTADOS DEL FORMULARIO
  ========================= */

  const [fecha, setFecha] = useState('');

  const [personas, setPersonas] = useState(2);

  const [zona, setZona] = useState('Sin preferencia');

  const [accesible, setAccesible] = useState(false);

  const [sillaNino, setSillaNino] = useState(false);


  /* =========================
     ZONAS DEL RESTAURANTE
  ========================= */

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
        'Un espacio abierto y rodeado de naturaleza para una experiencia más relajada.',

      imagen: zonaTerraza
    },

    {
      nombre: 'Barra',

      descripcion:
        'Una experiencia cercana al servicio, los vinos y la preparación de bebidas.',

      imagen: zonaBarra
    },

    {
      nombre: 'Salón privado',

      descripcion:
        'Un ambiente más reservado, ideal para grupos o celebraciones especiales.',

      imagen: zonaPrivada
    }

  ];


  /* =========================
     AUMENTAR PERSONAS
  ========================= */

  const aumentarPersonas = () => {

    if (personas < 10) {

      setPersonas(personas + 1);

    }

  };


  /* =========================
     DISMINUIR PERSONAS
  ========================= */

  const disminuirPersonas = () => {

    if (personas > 1) {

      setPersonas(personas - 1);

    }

  };


  /* =========================
     BUSCAR DISPONIBILIDAD
  ========================= */

  const buscarDisponibilidad = () => {

    /* Validamos que exista una fecha */

    if (fecha === '') {

      alert('Selecciona una fecha');

      return;

    }


    /* Enviamos los datos a Disponibilidad */

    navigate('/disponibilidad', {

      state: {

        fecha: fecha,

        personas: personas,

        zona: zona,

        accesible: accesible,

        sillaNino: sillaNino

      }

    });

  };


  return (

    <section className="reserva-page">

      <div className="container">

        <div className="reserva-box">


          {/* =========================
              CABECERA
          ========================= */}

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



          {/* =========================
              PROGRESO
          ========================= */}

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



          {/* =========================
              FECHA
          ========================= */}

          <div className="reserva-grupo">

            <label>
              Fecha
            </label>

            <input
              type="date"
              value={fecha}
              onChange={(e) =>
                setFecha(e.target.value)
              }
              className="form-control"
            />

          </div>



          {/* =========================
              PERSONAS
          ========================= */}

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
              PREFERENCIA DE UBICACIÓN
          ================================================== */}

          <div className="reserva-grupo">

            <label>
              ¿Dónde te gustaría vivir la experiencia?
            </label>


            <p className="reserva-ayuda">
              Conoce los ambientes y selecciona
              el que prefieras para tu reserva.
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
                setZona('Sin preferencia')
              }
            >

              <div>

                <strong>
                  SIN PREFERENCIA
                </strong>

                <span>
                  Permite que MAYTA asigne
                  la mejor ubicación disponible.
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



            {/* TARJETAS DE ZONAS */}

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
                    setZona(opcion.nombre)
                  }
                >


                  {/* IMAGEN */}

                  <div className="zona-reserva-imagen">

                    <img
                      src={opcion.imagen}
                      alt={opcion.nombre}
                    />


                    {/* CHECK CUANDO ESTÁ SELECCIONADO */}

                    {zona === opcion.nombre && (

                      <span className="zona-check">
                        ✓
                      </span>

                    )}

                  </div>



                  {/* INFORMACIÓN */}

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



          {/* =========================
              NECESIDADES ESPECIALES
          ========================= */}

          <div className="reserva-opciones">


            {/* ACCESIBILIDAD */}

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



            {/* SILLA PARA NIÑO */}

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



          {/* =========================
              CONTINUAR
          ========================= */}

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