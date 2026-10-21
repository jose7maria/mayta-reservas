import { PanelSidebar } from './PanelSidebar';
import { PanelNavbar } from './PanelNavbar';

export const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">

      <PanelSidebar />

      <div className="admin-principal">

        <PanelNavbar />

        <main className="admin-contenido">
          {children}
        </main>

      </div>

    </div>
  );
};