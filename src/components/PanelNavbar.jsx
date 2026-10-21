import { useNavigate } from 'react-router-dom';

export const PanelNavbar = () => {

  const navigate = useNavigate();


  const cerrarSesion = () => {

    navigate('/login');

  };


  return (

    <header className="panel-navbar">

      <div>

        <span className="panel-navbar-subtitulo">
          PANEL ADMINISTRATIVO
        </span>

      </div>


      <div className="panel-usuario">

        <div className="panel-avatar">
          A
        </div>

        <div>

          <strong>
            Administrador
          </strong>

          <span>
            MAYTA
          </span>

        </div>


        <button
          type="button"
          onClick={cerrarSesion}
          className="btn-cerrar-sesion"
        >
          Salir
        </button>

      </div>

    </header>

  );

};