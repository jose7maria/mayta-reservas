import { useNavigate } from 'react-router-dom';

export const PanelNavbar = () => {

  const navigate = useNavigate();


  const cerrarSesion = () => {
    navigate('/login');
  };


  return (
    <header className="admin-navbar">

      {/* PARTE IZQUIERDA */}
      <div>

        <span className="admin-navbar-subtitulo">
          PANEL ADMINISTRATIVO
        </span>

        <h2>
          Gestión de Reservas
        </h2>

      </div>


      {/* PARTE DERECHA */}
      <div className="admin-usuario">

        <div className="admin-avatar">
          A
        </div>


        <div className="admin-usuario-datos">

          <strong>
            Administrador
          </strong>

          <span>
            MAYTA
          </span>

        </div>


        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={cerrarSesion}
        >
          Cerrar sesión
        </button>

      </div>

    </header>
  );

};