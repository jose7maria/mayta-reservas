import { NavLink } from 'react-router-dom';

export const PanelSidebar = () => {

  return (
    <aside className="admin-sidebar">

      {/* LOGO */}
      <div className="admin-logo">
        MAYTA
      </div>


      {/* MENÚ */}
      <nav className="nav flex-column admin-menu">

        <NavLink
          to="/panel"
          end
          className="nav-link"
        >
          Dashboard
        </NavLink>


        <NavLink
          to="/panel/calendario"
          className="nav-link"
        >
          Calendario
        </NavLink>


        <NavLink
          to="/panel/reservas"
          className="nav-link"
        >
          Reservas
        </NavLink>


        <NavLink
          to="/panel/mesas"
          className="nav-link"
        >
          Mesas
        </NavLink>


        <NavLink
          to="/panel/platos"
          className="nav-link"
        >
          Platos
        </NavLink>


        <NavLink
          to="/panel/horarios"
          className="nav-link"
        >
          Horarios
        </NavLink>


        <NavLink
          to="/panel/reportes"
          className="nav-link"
        >
          Reportes
        </NavLink>

      </nav>

    </aside>
  );

};