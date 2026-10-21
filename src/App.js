import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './App.css';


/* =========================================
   COMPONENTES GENERALES
========================================= */

import { Navegacion } from './components/Navegacion';
import { Footer } from './components/Footer';


/* =========================================
   PÁGINAS PÚBLICAS
========================================= */

import { Inicio } from './pages/Inicio';
import { Experiencia } from './pages/Experiencia';
import { Carta } from './pages/Carta';
import { Restaurante } from './pages/Restaurante';
import { Chef } from './pages/Chef';
import { Contacto } from './pages/Contacto';


/* =========================================
   SISTEMA DE RESERVAS
========================================= */

import { Reserva } from './pages/Reserva';
import { Disponibilidad } from './pages/Disponibilidad';
import { DatosCliente } from './pages/DatosCliente';
import { Confirmacion } from './pages/Confirmacion';


/* =========================================
   ADMINISTRACIÓN
========================================= */

import { Login } from './pages/Login';
import { Panel } from './pages/Panel';
import { Mesas } from './pages/Mesas';
import { Horarios } from './pages/Horarios';
import { Reportes } from './pages/Reportes';



/* =========================================
   CONTENIDO PRINCIPAL
========================================= */

const Contenido = () => {

  const location = useLocation();


  /*
    Ocultamos Navbar y Footer públicos
    cuando estamos en Login o Panel Admin.
  */

  const ocultarPublico =
    location.pathname === '/login' ||
    location.pathname.startsWith('/panel');


  return (
    <>

      {/* NAVBAR PÚBLICO */}

      {!ocultarPublico && <Navegacion />}


      {/* RUTAS */}

      <Routes>


        {/* =====================================
            PÁGINAS PÚBLICAS
        ===================================== */}

        <Route
          path="/"
          element={<Inicio />}
        />


        <Route
          path="/experiencia"
          element={<Experiencia />}
        />


        <Route
          path="/carta"
          element={<Carta />}
        />


        <Route
          path="/restaurante"
          element={<Restaurante />}
        />


        <Route
          path="/chef"
          element={<Chef />}
        />


        <Route
          path="/contacto"
          element={<Contacto />}
        />



        {/* =====================================
            RESERVAS
        ===================================== */}

        <Route
          path="/reserva"
          element={<Reserva />}
        />


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



        {/* =====================================
            ADMINISTRACIÓN
        ===================================== */}

        <Route
          path="/login"
          element={<Login />}
        />


        <Route
          path="/panel"
          element={<Panel />}
        />


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


      {/* FOOTER PÚBLICO */}

      {!ocultarPublico && <Footer />}

    </>
  );
};



/* =========================================
   APP
========================================= */

function App() {

  return (
    <Router>

      <Contenido />

    </Router>
  );

}


export default App;