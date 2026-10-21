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
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENÚ */}
        <div
          className="collapse navbar-collapse"
          id="menuMayta"
        >
          <div className="navbar-nav ms-auto align-items-lg-center gap-2">

            <Link className="nav-link" to="/">
              INICIO
            </Link>

            <a className="nav-link" href="/#experiencia">
              EXPERIENCIA
            </a>

            <Link className="nav-link" to="/carta">
              CARTA
            </Link>

            <a className="nav-link" href="/#restaurante">
              RESTAURANTE
            </a>

            <a className="nav-link" href="/#chef">
              CHEF
            </a>

            <a className="nav-link" href="/#contacto">
              CONTACTO
            </a>

            <Link className="btn btn-reserva" to="/reserva">
              RESERVA
            </Link>

            <Link className="btn btn-intranet" to="/login">
              INTRANET
            </Link>

          </div>
        </div>

      </div>
    </nav>
  );
};