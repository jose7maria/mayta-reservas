import { NavLink } from 'react-router-dom';

export const PanelSidebar = () => {

  return (

    <aside className="panel-sidebar">

      <div className="panel-logo">
        MAYTA
      </div>


      <nav className="panel-menu">

        <NavLink
          to="/panel"
          end
          className={({ isActive }) =>
            isActive ? 'panel-link activo' : 'panel-link'
          }
        >
          Dashboard
        </NavLink>


        <NavLink
          to="/panel/calendario"
          className={({ isActive }) =>
            isActive ? 'panel-link activo' : 'panel-link'
          }
        >
          Calendario
        </NavLink>


        <NavLink
          to="/panel/reservas"
          className={({ isActive }) =>
            isActive ? 'panel-link activo' : 'panel-link'
          }
        >
          Reservas
        </NavLink>


        <NavLink
          to="/panel/mesas"
          className={({ isActive }) =>
            isActive ? 'panel-link activo' : 'panel-link'
          }
        >
          Mesas
        </NavLink>


        <NavLink
          to="/panel/platos"
          className={({ isActive }) =>
            isActive ? 'panel-link activo' : 'panel-link'
          }
        >
          Platos
        </NavLink>


        <NavLink
          to="/panel/horarios"
          className={({ isActive }) =>
            isActive ? 'panel-link activo' : 'panel-link'
          }
        >
          Horarios
        </NavLink>


        <NavLink
          to="/panel/reportes"
          className={({ isActive }) =>
            isActive ? 'panel-link activo' : 'panel-link'
          }
        >
          Reportes
        </NavLink>

      </nav>

    </aside>

  );

};