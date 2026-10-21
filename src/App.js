import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import { Navegacion } from './components/Navegacion';
import { Footer } from './components/Footer';

import { Inicio } from './pages/Inicio';
import { Carta } from './pages/Carta';
import { Reserva } from './pages/Reserva';
import { Disponibilidad } from './pages/Disponibilidad';
import { DatosCliente } from './pages/DatosCliente';
import { Confirmacion } from './pages/Confirmacion';
import { Login } from './pages/Login';
import { Panel } from './pages/Panel';
import { Mesas } from './pages/Mesas';
import { Horarios } from './pages/Horarios';
import { Reportes } from './pages/Reportes';
import './App.css';


const Contenido = () => {

  const location = useLocation();

  const ocultarPublico =
    location.pathname === '/login' ||
    location.pathname.startsWith('/panel');

  return (
    <>

      {!ocultarPublico && <Navegacion />}

      <Routes>

        <Route path="/" element={<Inicio />} />

        <Route path="/carta" element={<Carta />} />

        <Route path="/reserva" element={<Reserva />} />

        <Route
          path="/disponibilidad"
          element={<Disponibilidad />}
        />

        <Route
          path="/datos-cliente"
          element={<DatosCliente />}
        />

        <Route
          path="/confirmacion"
          element={<Confirmacion />}
        />

        <Route path="/login" element={<Login />} />

        <Route path="/panel" element={<Panel />} />

        <Route
          path="/panel/mesas"
          element={<Mesas />}
        />

        <Route
          path="/panel/horarios"
          element={<Horarios />}
        />

        <Route
          path="/panel/reportes"
          element={<Reportes />}
        />

      </Routes>

      {!ocultarPublico && <Footer />}

    </>
  );
};


function App() {

  return (
    <Router>

      <Contenido />

    </Router>
  );
}

export default App;