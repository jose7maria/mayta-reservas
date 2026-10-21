import { Link } from 'react-router-dom';

export const Navegacion = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-mayta">
      <div className="container">

        {/* LOGO */}
        <Link className="navbar-brand" to="/">
          MAYTA
        </Link>


        {/* BOTÓN MOBILE */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuMayta"
          aria-controls="menuMayta"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>


        {/* MENÚ */}
        <div
          className="collapse navbar-collapse"
          id="menuMayta"
        >
          <div className="navbar-nav ms-auto align-items-lg-center gap-2">

            {/* INICIO */}
            <Link
              className="nav-link"
              to="/"
            >
              INICIO
            </Link>


            {/* EXPERIENCIA */}
            <Link
              className="nav-link"
              to="/experiencia"
            >
              EXPERIENCIA
            </Link>


            {/* CARTA */}
            <Link
              className="nav-link"
              to="/carta"
            >
              CARTA
            </Link>


            {/* RESTAURANTE */}
            <Link
              className="nav-link"
              to="/restaurante"
            >
              RESTAURANTE
            </Link>


            {/* CHEF */}
            <Link
              className="nav-link"
              to="/chef"
            >
              CHEF
            </Link>


            {/* CONTACTO */}
            <Link
              className="nav-link"
              to="/contacto"
            >
              CONTACTO
            </Link>


            {/* RESERVA */}
            <Link
              className="btn btn-reserva"
              to="/reserva"
            >
              RESERVA
            </Link>


            {/* INTRANET */}
            <Link
              className="btn btn-intranet"
              to="/login"
            >
              INTRANET
            </Link>

          </div>
        </div>

      </div>
    </nav>
  );
};