import { Link } from 'react-router-dom';

import cartaMayta from '../docs/CARTA-MAYTA-ESP-Feb26.pdf';


export const Carta = () => {

  return (
    <>

      {/* =========================
          ENCABEZADO
      ========================= */}

      <section className="carta-hero">

        <span>
          MAYTA · LIMA
        </span>

        <h1>
          NUESTRA CARTA
        </h1>

        <p>
          Descubre nuestra propuesta gastronómica,
          inspirada en el territorio y los ingredientes del Perú.
        </p>

      </section>



      {/* =========================
          VISOR
      ========================= */}

      <section className="carta-contenido">

        <div className="container">


          <div className="carta-acciones">

            <a
              href={cartaMayta}
              target="_blank"
              rel="noreferrer"
              className="btn btn-carta-abrir"
            >
              ABRIR CARTA
            </a>


            <a
              href={cartaMayta}
              download="Carta-MAYTA.pdf"
              className="btn btn-carta-descargar"
            >
              DESCARGAR PDF
            </a>

          </div>



          <div className="carta-visor">

            <iframe
              src={cartaMayta}
              title="Carta MAYTA"
            />

          </div>


        </div>

      </section>



      {/* =========================
          CIERRE
      ========================= */}

      <section className="carta-final">

        <span>
          ¿LISTO PARA VIVIR MAYTA?
        </span>

        <h2>
          ELIGE TU EXPERIENCIA
          <br />
          Y RESERVA TU MESA
        </h2>

        <Link
          to="/reserva"
          className="btn btn-carta-reservar"
        >
          RESERVAR MESA
        </Link>

      </section>

    </>
  );

};