import { Link } from 'react-router-dom';

import experiencia1 from '../assets/img/experiencia-1.jpg';
import experiencia2 from '../assets/img/experiencia-2.jpg';
import experiencia3 from '../assets/img/experiencia-3.jpg';


export const Experiencia = () => {

  return (
    <>

      {/* HERO */}

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



      {/* INTRO */}

      <section className="exp-intro">

        <div className="container">

          <div className="exp-intro-grid">

            <div>

              <span className="exp-etiqueta">
                EL RECORRIDO
              </span>

              <h2>
                DIEZ TIEMPOS.
                <br />
                UN TERRITORIO.
              </h2>

            </div>


            <div className="exp-intro-texto">

              <p>
                Cada momento de Bitácora Amazónica
                nace de la exploración del territorio,
                sus ingredientes y sus historias.
              </p>

              <p>
                La experiencia propone descubrir la
                Amazonía desde una mirada contemporánea,
                donde cada ingrediente es comprendido
                antes de ser transformado.
              </p>

            </div>

          </div>

        </div>

      </section>



      {/* EXPERIENCIA PRINCIPAL */}

      <section className="exp-opciones">

        <div className="container">

          <div className="exp-titulo">

            <span>
              ELIGE CÓMO VIVIRLA
            </span>

            <h2>
              UNA EXPERIENCIA,
              <br />
              DIFERENTES RECORRIDOS
            </h2>

          </div>


          <div className="exp-grid">


            {/* OPCIÓN 1 */}

            <div className="exp-card">

              <div className="exp-card-imagen">

                <img
                  src={experiencia1}
                  alt="Bitácora Amazónica"
                />

                <span>
                  01
                </span>

              </div>


              <div className="exp-card-contenido">

                <h3>
                  BITÁCORA AMAZÓNICA
                </h3>

                <h4>
                  MENÚ · 10 TIEMPOS
                </h4>

                <p>
                  El recorrido gastronómico principal
                  de MAYTA inspirado en la Amazonía peruana.
                </p>

              </div>

            </div>



            {/* OPCIÓN 2 */}

            <div className="exp-card">

              <div className="exp-card-imagen">

                <img
                  src={experiencia2}
                  alt="Maridaje MAYTA"
                />

                <span>
                  02
                </span>

              </div>


              <div className="exp-card-contenido">

                <h3>
                  MARIDAJE
                </h3>

                <h4>
                  VINOS · TERRITORIO · ARMONÍA
                </h4>

                <p>
                  Una selección pensada para acompañar
                  cada etapa del menú degustación.
                </p>

              </div>

            </div>



            {/* OPCIÓN 3 */}

            <div className="exp-card">

              <div className="exp-card-imagen">

                <img
                  src={experiencia3}
                  alt="Maridaje sin alcohol"
                />

                <span>
                  03
                </span>

              </div>


              <div className="exp-card-contenido">

                <h3>
                  SIN ALCOHOL
                </h3>

                <h4>
                  BEBIDAS · FERMENTOS · BOTÁNICOS
                </h4>

                <p>
                  Una alternativa sin alcohol creada
                  para acompañar la experiencia completa.
                </p>

              </div>

            </div>


          </div>

        </div>

      </section>



      {/* CIERRE */}

      <section className="exp-final">

        <div className="exp-final-contenido">

          <span>
            MAYTA · LIMA
          </span>

          <h2>
            LA EXPERIENCIA
            <br />
            EMPIEZA MUCHO ANTES
            <br />
            DEL PRIMER PLATO
          </h2>

          <Link
            to="/reserva"
            className="btn btn-exp-final"
          >
            RESERVAR MESA
          </Link>

        </div>

      </section>

    </>
  );

};