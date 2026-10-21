import { Link } from 'react-router-dom';

import premio1 from '../assets/img/premio1.png';
import premio2 from '../assets/img/premio2.png';
import premio3 from '../assets/img/premio3.png';
import premio4 from '../assets/img/premio4.png';

import amazonia from '../assets/img/amazonia.jpg';

import experiencia1 from '../assets/img/experiencia-1.jpg';
import experiencia2 from '../assets/img/experiencia-2.jpg';
import experiencia3 from '../assets/img/experiencia-3.jpg';


import videoCTA from '../assets/video/ctafinal.mp4';


export const Inicio = () => {

  return (
    <>

      {/* ==================================
          HERO PRINCIPAL - VIDEO
      ================================== */}

      <section className="hero-mayta">

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


        <div className="hero-overlay"></div>


        <div className="hero-contenido">

          <h1>
            BITÁCORA AMAZÓNICA
          </h1>

          <p>
            Un recorrido gastronómico por la Amazonía peruana
          </p>

          <p className="hero-detalle">
            10 tiempos
          </p>


          <div className="hero-botones">

            <a
              href="#experiencia"
              className="btn btn-hero-secundario"
            >
              DESCUBRIR LA EXPERIENCIA
            </a>


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



      {/* ==================================
          PREMIOS Y RECONOCIMIENTOS
      ================================== */}

      <section className="premios-mayta">

        <div className="container">

          <h2>
            PREMIOS Y RECONOCIMIENTOS
          </h2>


          <div className="premios-grid">

            <div className="premio-item">
              <img
                src={premio1}
                alt="Premio MAYTA 1"
              />
            </div>


            <div className="premio-item">
              <img
                src={premio2}
                alt="Premio MAYTA 2"
              />
            </div>


            <div className="premio-item">
              <img
                src={premio3}
                alt="Premio MAYTA 3"
              />
            </div>


            <div className="premio-item">
              <img
                src={premio4}
                alt="Premio MAYTA 4"
              />
            </div>

          </div>

        </div>

      </section>



      {/* ==================================
          LA AMAZONÍA ANTES DEL PLATO
      ================================== */}

      <section className="amazonia-mayta">

        <div className="container">

          <div className="row align-items-center g-5">


            {/* IMAGEN */}

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



            {/* TEXTO */}

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



      {/* ==================================
          NUESTRA EXPERIENCIA
      ================================== */}

      <section
        className="experiencias-mayta"
        id="experiencia"
      >

        <div className="container">


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



          <div className="row g-4">


            {/* EXPERIENCIA 1 */}

            <div className="col-lg-4 col-md-6">

              <div className="experiencia-card">

                <img
                  src={experiencia1}
                  alt="Bitácora Amazónica"
                />


                <div className="experiencia-contenido">

                  <span className="experiencia-numero">
                    01
                  </span>

                  <h3>
                    BITÁCORA AMAZÓNICA
                  </h3>

                  <h4>
                    Menú degustación · 10 tiempos
                  </h4>

                  <p>
                    Un recorrido gastronómico inspirado
                    en el territorio, el ingrediente
                    y la memoria.
                  </p>

                </div>

              </div>

            </div>



            {/* EXPERIENCIA 2 */}

            <div className="col-lg-4 col-md-6">

              <div className="experiencia-card">

                <img
                  src={experiencia2}
                  alt="Maridaje"
                />


                <div className="experiencia-contenido">

                  <span className="experiencia-numero">
                    02
                  </span>

                  <h3>
                    MARIDAJE
                  </h3>

                  <h4>
                    Selección de vinos y bebidas
                  </h4>

                  <p>
                    Una propuesta creada para acompañar
                    cada momento del menú degustación.
                  </p>

                </div>

              </div>

            </div>



            {/* EXPERIENCIA 3 */}

            <div className="col-lg-4 col-md-6">

              <div className="experiencia-card">

                <img
                  src={experiencia3}
                  alt="Maridaje sin alcohol"
                />


                <div className="experiencia-contenido">

                  <span className="experiencia-numero">
                    03
                  </span>

                  <h3>
                    SIN ALCOHOL
                  </h3>

                  <h4>
                    Bebidas y fermentos
                  </h4>

                  <p>
                    Una alternativa diseñada para acompañar
                    la experiencia sin bebidas alcohólicas.
                  </p>

                </div>

              </div>

            </div>


          </div>



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



      {/* ==================================
          CTA FINAL - IMAGEN
      ================================== */}

      <section className="cta-mayta">

        <div className="cta-overlay"></div>


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


      

    </>
  );

};