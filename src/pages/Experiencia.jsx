import { useState } from 'react';
import { Link } from 'react-router-dom';

/* =========================
   IMÁGENES
========================= */


import { ExperienciaModal } from '../components/ExperienciaModal';
import experiencia1 from '../assets/img/experiencia-1.jpg';
import experiencia2 from '../assets/img/experiencia-2.jpg';
import experiencia3 from '../assets/img/experiencia-3.jpg';


export const Experiencia = () => {

  /* =========================
     ESTADO DEL MODAL
  ========================= */

  const [experienciaSeleccionada, setExperienciaSeleccionada] =
    useState(null);


  /* =========================
     INFORMACIÓN DE EXPERIENCIAS
  ========================= */

  const experiencias = [

    {
      id: 1,

      numero: '01',

      nombre: 'BITÁCORA AMAZÓNICA',

      subtitulo: 'Menú degustación · 10 tiempos',

      descripcion:
        'Un recorrido gastronómico inspirado en el territorio, el ingrediente y la memoria.',

      imagen: experiencia1,

      detalle:
        'Bitácora Amazónica es la experiencia principal de MAYTA. Propone un recorrido de diez tiempos que permite descubrir diferentes momentos, sabores y técnicas dentro de una misma experiencia gastronómica.',

      tipo: 'bitacora'
    },


    {
      id: 2,

      numero: '02',

      nombre: 'MARIDAJE',

      subtitulo: 'Selección de vinos y bebidas',

      descripcion:
        'Una propuesta creada para acompañar cada momento del menú degustación.',

      imagen: experiencia2,

      detalle:
        'El maridaje acompaña los diferentes momentos de la experiencia mediante una selección de bebidas pensadas para complementar sabores, aromas y texturas del menú degustación.',

      tipo: 'maridaje'
    },


    {
      id: 3,

      numero: '03',

      nombre: 'SIN ALCOHOL',

      subtitulo: 'Bebidas y fermentos',

      descripcion:
        'Una alternativa diseñada para acompañar la experiencia sin bebidas alcohólicas.',

      imagen: experiencia3,

      detalle:
        'Esta opción ofrece acompañamientos sin alcohol para quienes desean vivir la experiencia completa mediante bebidas, preparaciones y combinaciones alternativas.',

      tipo: 'sin-alcohol'
    }

  ];


  /* =========================
     RECORRIDO DE 10 TIEMPOS
     Contenido demostrativo
  ========================= */

  


  return (
    <>

      {/* ==================================================
          HERO
      ================================================== */}

      <section className="exp-hero">

        <div className="exp-hero-overlay"></div>


        <div className="exp-hero-contenido">

          <span>
            MAYTA · EXPERIENCIA
          </span>

          <h1>
            BITÁCORA
            <br />
            AMAZÓNICA
          </h1>

          <p>
            Un recorrido gastronómico inspirado
            en lo vasto y profundo de la Amazonía peruana.
          </p>


          <Link
            to="/reserva"
            className="btn btn-exp-hero"
          >
            RESERVAR EXPERIENCIA
          </Link>

        </div>

      </section>



      {/* ==================================================
          INTRODUCCIÓN
      ================================================== */}

      <section className="exp-intro">

        <div className="container">

          <div className="exp-intro-grid">


            <div>

              <span className="exp-etiqueta">
                LA EXPERIENCIA
              </span>

              <h2>
                DIEZ TIEMPOS.
                <br />
                UN TERRITORIO.
              </h2>

            </div>


            <div className="exp-intro-texto">

              <p>
                MAYTA propone un recorrido gastronómico
                donde cada momento forma parte de una
                experiencia completa.
              </p>

              <p>
                El visitante puede complementar el menú
                con maridaje o elegir una alternativa
                sin alcohol.
              </p>

            </div>

          </div>

        </div>

      </section>



      {/* ==================================================
          EXPERIENCIAS
      ================================================== */}

      <section className="exp-opciones">

        <div className="container">


          {/* ENCABEZADO */}

          <div className="exp-titulo">

            <span>
              DESCUBRE MAYTA
            </span>

            <h2>
              NUESTRA EXPERIENCIA
            </h2>

            <p>
              Diferentes formas de recorrer
              nuestra propuesta gastronómica.
            </p>

          </div>



          {/* TARJETAS */}

          <div className="exp-grid">

            {experiencias.map((experiencia) => (

              <button
                type="button"

                className="exp-card exp-card-interactiva"

                key={experiencia.id}

                onClick={() =>
                  setExperienciaSeleccionada(experiencia)
                }
              >


                {/* IMAGEN */}

                <div className="exp-card-imagen">

                  <img
                    src={experiencia.imagen}
                    alt={experiencia.nombre}
                  />


                  <div className="exp-card-overlay">

                    <span>
                      VER DETALLE
                    </span>

                  </div>

                </div>



                {/* INFORMACIÓN */}

                <div className="exp-card-contenido">

                  <span className="exp-numero">
                    {experiencia.numero}
                  </span>


                  <h3>
                    {experiencia.nombre}
                  </h3>


                  <span className="exp-subtitulo">
                    {experiencia.subtitulo}
                  </span>


                  <p>
                    {experiencia.descripcion}
                  </p>


                  <span className="exp-ver-mas">
                    DESCUBRIR +
                  </span>

                </div>

              </button>

            ))}

          </div>



          {/* CARTA COMPLETA */}

          <div className="exp-carta-boton">

            <Link
              to="/carta"
              className="btn btn-carta-mayta"
            >
              VER CARTA COMPLETA
            </Link>

          </div>

        </div>

      </section>



      {/* ==================================================
          CIERRE
      ================================================== */}

      <section className="exp-final">

        <div className="exp-final-contenido">

          <span>
            MAYTA · LIMA
          </span>

          <h2>
            DESCUBRE EL RECORRIDO
          </h2>

          <p>
            Diez momentos para vivir
            una misma experiencia.
          </p>


          <Link
            to="/reserva"
            className="btn btn-exp-final"
          >
            RESERVAR
          </Link>

        </div>

      </section>



{/* =========================
    MODAL REUTILIZABLE
========================= */}

<ExperienciaModal
  experiencia={experienciaSeleccionada}
  onCerrar={() =>
    setExperienciaSeleccionada(null)
  }
/>
      

    </>
  );

};