import { Link } from 'react-router-dom';

import chefMayta from '../assets/img/ChefMayta.png';


export const Chef = () => {

  return (
    <>

      {/* ==============================
          CHEF HERO
      ============================== */}

      <section className="chef-hero">

        <div className="chef-grid">


          {/* IMAGEN */}

          <div className="chef-imagen">

            <img
              src={chefMayta}
              alt="Chef Jaime Pesaque"
            />

            <div className="chef-imagen-etiqueta">
              CHEF · FUNDADOR
            </div>

          </div>



          {/* HISTORIA */}

          <div className="chef-contenido">

            <span className="chef-subtitulo">
              HISTORIA
            </span>


            <h1>
              JAIME
              <br />
              PESAQUE
            </h1>


            <div className="chef-linea"></div>


            <h2>
              COCINA PERUANA
              <br />
              CONTEMPORÁNEA
            </h2>


            <p>
              Chef y fundador de MAYTA, una propuesta
              gastronómica donde los productos locales,
              el territorio y las técnicas contemporáneas
              se encuentran en una misma experiencia.
            </p>


            <p className="chef-texto-secundario">
              Desde Lima, su cocina explora el origen
              de los ingredientes peruanos para transformarlos
              en una propuesta moderna y personal.
            </p>


            <Link
              to="/reserva"
              className="btn btn-chef"
            >
              VIVIR LA EXPERIENCIA
            </Link>

          </div>


        </div>

      </section>



      {/* ==============================
          HISTORIA MAYTA
      ============================== */}

      <section className="chef-historia">

        <div className="container">

          <div className="chef-historia-header">

            <span>
              EL RECORRIDO
            </span>

            <h2>
              MAYTA A TRAVÉS DEL TIEMPO
            </h2>

          </div>


          <div className="chef-timeline">


            <div className="chef-anio">

              <strong>
                2008
              </strong>

              <span></span>

              <h3>
                NACE MAYTA
              </h3>

              <p>
                Jaime Pesaque funda MAYTA en Lima.
              </p>

            </div>



            <div className="chef-anio">

              <strong>
                2019
              </strong>

              <span></span>

              <h3>
                LATIN AMERICA'S 50 BEST
              </h3>

              <p>
                MAYTA ingresa al reconocido ranking.
              </p>

            </div>



            <div className="chef-anio">

              <strong>
                2020
              </strong>

              <span></span>

              <h3>
                HIGHEST CLIMBER
              </h3>

              <p>
                Un nuevo reconocimiento para su evolución.
              </p>

            </div>



            <div className="chef-anio">

              <strong>
                2022
              </strong>

              <span></span>

              <h3>
                WORLD'S 50 BEST
              </h3>

              <p>
                MAYTA entra a The World's 50 Best Restaurants.
              </p>

            </div>


          </div>

        </div>

      </section>



      {/* ==============================
          CIERRE
      ============================== */}

      <section className="chef-final">

        <span>
          MAYTA · LIMA
        </span>

        <h2>
          EL TERRITORIO COMO PUNTO
          <br />
          DE PARTIDA
        </h2>

        <p>
          Descubre una experiencia gastronómica
          inspirada en el Perú contemporáneo.
        </p>

        <Link
          to="/reserva"
          className="btn btn-chef-final"
        >
          RESERVAR MESA
        </Link>

      </section>

    </>
  );

};