import { Link } from 'react-router-dom';

/* =========================
   IMÁGENES
========================= */

import heroMayta from '../assets/img/hero-mayta.jpg';
import experiencia1 from '../assets/img/experiencia-1.jpg';
import experiencia2 from '../assets/img/experiencia-2.jpg';
import experiencia3 from '../assets/img/experiencia-3.jpg';


export const Restaurante = () => {

  return (
    <>

      {/* =========================
          HERO RESTAURANTE
      ========================= */}

      <section className="rest-hero">

        <img
          src={heroMayta}
          alt="Restaurante MAYTA"
          className="rest-hero-imagen"
        />

        <div className="rest-hero-overlay"></div>


        <div className="rest-hero-contenido">

          <span>
            MAYTA · LIMA
          </span>

          <h1>
            UN ESPACIO
            <br />
            PARA DESCUBRIR
          </h1>

          <p>
            Cocina, territorio y hospitalidad
            reunidos en una misma experiencia.
          </p>

          <Link
            to="/reserva"
            className="btn btn-rest-hero"
          >
            RESERVAR MESA
          </Link>

        </div>

      </section>



      {/* =========================
          CONCEPTO
      ========================= */}

      <section className="rest-concepto">

        <div className="container">

          <div className="rest-concepto-grid">

            <div>

              <span className="rest-etiqueta">
                EL RESTAURANTE
              </span>

              <h2>
                MAYTA
                <br />
                DESDE ADENTRO
              </h2>

            </div>


            <div className="rest-concepto-texto">

              <p>
                MAYTA propone un espacio donde la cocina
                peruana contemporánea se encuentra con
                el territorio, los ingredientes y la
                investigación.
              </p>

              <p>
                Cada detalle acompaña el recorrido:
                desde el ambiente hasta el momento
                en que cada plato llega a la mesa.
              </p>

            </div>

          </div>

        </div>

      </section>



      {/* =========================
          GALERÍA
      ========================= */}

      <section className="rest-galeria">

        <div className="container">

          <div className="rest-galeria-titulo">

            <span>
              EL ESPACIO
            </span>

            <h2>
              UNA EXPERIENCIA
              <br />
              MÁS ALLÁ DEL PLATO
            </h2>

          </div>


          <div className="rest-galeria-grid">


            <div className="rest-foto rest-foto-grande">

              <img
                src={experiencia1}
                alt="Experiencia MAYTA"
              />

              <div className="rest-foto-texto">
                EXPERIENCIA
              </div>

            </div>


            <div className="rest-foto">

              <img
                src={experiencia2}
                alt="Ambiente MAYTA"
              />

              <div className="rest-foto-texto">
                ATMÓSFERA
              </div>

            </div>


            <div className="rest-foto">

              <img
                src={experiencia3}
                alt="Gastronomía MAYTA"
              />

              <div className="rest-foto-texto">
                GASTRONOMÍA
              </div>

            </div>


          </div>

        </div>

      </section>



      {/* =========================
          DATOS
      ========================= */}

      <section className="rest-datos">

        <div className="container">

          <div className="rest-datos-grid">

            <div>

              <span>
                01
              </span>

              <h3>
                UBICACIÓN
              </h3>

              <p>
                Lima · Perú
              </p>

            </div>


            <div>

              <span>
                02
              </span>

              <h3>
                EXPERIENCIA
              </h3>

              <p>
                Menú degustación
                <br />
                Bitácora Amazónica
              </p>

            </div>


            <div>

              <span>
                03
              </span>

              <h3>
                RESERVAS
              </h3>

              <p>
                Reserva previamente
                desde nuestro sistema.
              </p>

            </div>

          </div>

        </div>

      </section>



      {/* =========================
          CIERRE
      ========================= */}

      <section className="rest-final">

        <div>

          <span>
            MAYTA · LIMA
          </span>

          <h2>
            TU MESA
            <br />
            TE ESPERA
          </h2>

          <p>
            Vive MAYTA desde el primer momento.
          </p>

        </div>


        <Link
          to="/reserva"
          className="btn btn-rest-final"
        >
          RESERVAR EXPERIENCIA
        </Link>

      </section>

    </>
  );

};