import { useState } from 'react';
import { Link } from 'react-router-dom';

/* =========================
   COMPONENTES
========================= */

import { ExperienciaModal } from '../components/ExperienciaModal';


/* =========================
   PREMIOS
========================= */

import premio1 from '../assets/img/premio1.png';
import premio2 from '../assets/img/premio2.png';
import premio3 from '../assets/img/premio3.png';
import premio4 from '../assets/img/premio4.png';


/* =========================
   LOGO
========================= */

import logoMayta from '../assets/img/logo-mayta.png';


/* =========================
   AMAZONÍA
========================= */

import amazonia from '../assets/img/amazonia.jpg';


/* =========================
   EXPERIENCIAS
========================= */

import experiencia1 from '../assets/img/experiencia-1.jpg';
import experiencia2 from '../assets/img/experiencia-2.jpg';
import experiencia3 from '../assets/img/experiencia-3.jpg';


/* =========================
   VIDEO HERO
========================= */

import videoCTA from '../assets/video/ctafinal-comprimido.mp4';



export const Inicio = () => {


  /* ==================================================
     EXPERIENCIA SELECCIONADA

     Empieza en null porque al cargar la página
     no queremos mostrar ningún modal.
  ================================================== */

  const [
    experienciaSeleccionada,
    setExperienciaSeleccionada
  ] = useState(null);



  /* ==================================================
     INFORMACIÓN DE LAS EXPERIENCIAS

     Usaremos este mismo arreglo para crear
     las tres tarjetas dinámicamente.
  ================================================== */

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
        'Esta opción ofrece acompañamientos sin alcohol para quienes desean vivir la experiencia completa mediante bebidas y combinaciones alternativas.',

      tipo: 'sin-alcohol'
    }

  ];



  return (

    <>

      {/* ==================================================
          HERO PRINCIPAL
          Video + logo MAYTA
      ================================================== */}

      <section className="hero-mayta">


        {/* VIDEO DE FONDO */}

        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
        >

          <source
            src={videoCTA}
            type="video/mp4"
          />

        </video>



        {/* CAPA OSCURA */}

        <div className="hero-overlay"></div>



        {/* CONTENIDO PRINCIPAL */}

        <div className="hero-contenido">


          {/* LOGO MAYTA */}

          <img
            src={logoMayta}
            alt="MAYTA - Jaime Pesaque"
            className="hero-logo"
          />


          <h1>
            BITÁCORA AMAZÓNICA
          </h1>


          <p>
            Un recorrido gastronómico por la Amazonía peruana
          </p>


          <p className="hero-detalle">
            10 tiempos
          </p>



          {/* BOTONES */}

          <div className="hero-botones">


            <Link
              to="/experiencia"
              className="btn btn-hero-secundario"
            >
              DESCUBRIR LA EXPERIENCIA
            </Link>


            <Link
              to="/reserva"
              className="btn btn-hero-principal"
            >
              RESERVA
            </Link>


            <Link
              to="/carta"
              className="btn btn-hero-secundario"
            >
              VER CARTA
            </Link>


          </div>

        </div>

      </section>



      {/* ==================================================
          PREMIOS Y RECONOCIMIENTOS
      ================================================== */}

      <section className="premios-mayta">

        <div className="container">


          <h2>
            PREMIOS Y RECONOCIMIENTOS
          </h2>



          <div className="premios-grid">


            {/* PREMIO 1 */}

            <div className="premio-item">

              <img
                src={premio1}
                alt="Premio MAYTA 1"
              />

            </div>



            {/* PREMIO 2 */}

            <div className="premio-item">

              <img
                src={premio2}
                alt="Premio MAYTA 2"
              />

            </div>



            {/* PREMIO 3 */}

            <div className="premio-item">

              <img
                src={premio3}
                alt="Premio MAYTA 3"
              />

            </div>



            {/* PREMIO 4 */}

            <div className="premio-item">

              <img
                src={premio4}
                alt="Premio MAYTA 4"
              />

            </div>


          </div>

        </div>

      </section>



      {/* ==================================================
          LA AMAZONÍA ANTES DEL PLATO
      ================================================== */}

      <section className="amazonia-mayta">

        <div className="container">

          <div className="row align-items-center g-5">


            {/* =========================
                IMAGEN
            ========================= */}

            <div className="col-lg-6">

              <div className="amazonia-imagen-contenedor">


                <img
                  src={amazonia}
                  alt="Ingredientes amazónicos utilizados en la experiencia MAYTA"
                  className="amazonia-img"
                />


                <div className="amazonia-etiqueta">
                  ORIGEN · AMAZONÍA PERUANA
                </div>


              </div>

            </div>



            {/* =========================
                TEXTO
            ========================= */}

            <div className="col-lg-6">

              <div className="amazonia-texto">


                <span className="amazonia-subtitulo">
                  NUESTRA FILOSOFÍA
                </span>


                <h2>
                  LA AMAZONÍA
                  <br />
                  ANTES DEL PLATO
                </h2>


                <p className="amazonia-intro">
                  Antes de transformar un ingrediente,
                  buscamos comprender de dónde viene.
                </p>



                {/* CONCEPTOS */}

                <div className="amazonia-conceptos">


                  {/* TERRITORIO */}

                  <div className="concepto">

                    <span className="concepto-numero">
                      01
                    </span>


                    <div>

                      <h3>
                        Territorio
                      </h3>

                      <p>
                        El origen y el entorno forman parte
                        de cada experiencia.
                      </p>

                    </div>

                  </div>



                  {/* INGREDIENTE */}

                  <div className="concepto">

                    <span className="concepto-numero">
                      02
                    </span>


                    <div>

                      <h3>
                        Ingrediente
                      </h3>

                      <p>
                        Productos amazónicos seleccionados
                        por su identidad y sabor.
                      </p>

                    </div>

                  </div>



                  {/* INVESTIGACIÓN */}

                  <div className="concepto">

                    <span className="concepto-numero">
                      03
                    </span>


                    <div>

                      <h3>
                        Investigación
                      </h3>

                      <p>
                        Conocer el ingrediente antes
                        de convertirlo en un plato.
                      </p>

                    </div>

                  </div>


                </div>

              </div>

            </div>


          </div>

        </div>

      </section>



      {/* ==================================================
          NUESTRA EXPERIENCIA
      ================================================== */}

      <section
        className="experiencias-mayta"
        id="experiencia"
      >

        <div className="container">


          {/* ENCABEZADO */}

          <div className="experiencias-encabezado">

            <span>
              DESCUBRE MAYTA
            </span>


            <h2>
              NUESTRA EXPERIENCIA
            </h2>


            <p>
              Diferentes formas de recorrer nuestra propuesta gastronómica.
            </p>

          </div>



          {/* ==================================================
              TARJETAS INTERACTIVAS

              map() recorre el arreglo "experiencias"
              y genera automáticamente las tres tarjetas.
          ================================================== */}

          <div className="row g-4">


            {experiencias.map((experiencia) => (

              <div
                className="col-lg-4 col-md-6"
                key={experiencia.id}
              >


                <button
                  type="button"

                  className="experiencia-card experiencia-card-boton"

                  onClick={() =>
                    setExperienciaSeleccionada(experiencia)
                  }

                  aria-label={`Ver detalles de ${experiencia.nombre}`}
                >


                  {/* IMAGEN */}

                  <div className="experiencia-card-imagen">

                    <img
                      src={experiencia.imagen}
                      alt={experiencia.nombre}
                    />


                    {/* APARECE AL PASAR EL MOUSE */}

                    <div className="experiencia-card-overlay">

                      <span>
                        VER DETALLE
                      </span>

                    </div>

                  </div>



                  {/* INFORMACIÓN */}

                  <div className="experiencia-contenido">


                    <span className="experiencia-numero">
                      {experiencia.numero}
                    </span>


                    <h3>
                      {experiencia.nombre}
                    </h3>


                    <h4>
                      {experiencia.subtitulo}
                    </h4>


                    <p>
                      {experiencia.descripcion}
                    </p>


                    <span className="experiencia-descubrir">
                      DESCUBRIR +
                    </span>


                  </div>


                </button>

              </div>

            ))}


          </div>



          {/* =========================
              CARTA COMPLETA
          ========================= */}

          <div className="experiencias-boton">

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
          CTA FINAL
      ================================================== */}

      <section className="cta-mayta">


        {/* CAPA OSCURA */}

        <div className="cta-overlay"></div>



        {/* CONTENIDO */}

        <div className="container cta-contenido">


          <span className="cta-subtitulo">
            MAYTA · LIMA
          </span>


          <h2>
            LA EXPERIENCIA COMIENZA
            <br />
            ANTES DEL PRIMER PLATO
          </h2>


          <p>
            Reserva tu mesa y déjate llevar por un recorrido
            gastronómico extraordinario.
          </p>


          <Link
            to="/reserva"
            className="btn btn-cta-reserva"
          >
            RESERVAR MESA
          </Link>


        </div>

      </section>



      {/* ==================================================
          MODAL REUTILIZABLE

          Si experienciaSeleccionada es null,
          el componente no muestra nada.

          Cuando hacemos click en una tarjeta,
          guarda la experiencia y abre el modal.
      ================================================== */}

      <ExperienciaModal
        experiencia={experienciaSeleccionada}

        onCerrar={() =>
          setExperienciaSeleccionada(null)
        }
      />


    </>

  );

};