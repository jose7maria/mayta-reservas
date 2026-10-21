import { useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';


export const Reportes = () => {

  const [tipoReporte, setTipoReporte] =
    useState('Reservas');

  const [reporteGenerado, setReporteGenerado] =
    useState(false);


  const generarReporte = () => {

    setReporteGenerado(true);

  };


  const cambiarReporte = (tipo) => {

    setTipoReporte(tipo);

    setReporteGenerado(false);

  };


  return (
    <AdminLayout>


      {/* ENCABEZADO */}

      <div className="admin-pagina-header">

        <span>
          PANEL ADMINISTRATIVO
        </span>

        <h1>
          Reportes
        </h1>

        <p>
          Consulta información resumida
          sobre la operación del restaurante.
        </p>

      </div>



      {/* TIPOS DE REPORTE */}

      <div className="reportes-admin-grid">


        <button
          type="button"
          className={
            tipoReporte === 'Reservas'
              ? 'reporte-card activo'
              : 'reporte-card'
          }
          onClick={() =>
            cambiarReporte('Reservas')
          }
        >

          <span>
            01
          </span>

          <strong>
            RESERVAS
          </strong>

          <p>
            Reservas realizadas y estados.
          </p>

        </button>



        <button
          type="button"
          className={
            tipoReporte === 'Ocupación'
              ? 'reporte-card activo'
              : 'reporte-card'
          }
          onClick={() =>
            cambiarReporte('Ocupación')
          }
        >

          <span>
            02
          </span>

          <strong>
            OCUPACIÓN
          </strong>

          <p>
            Uso y disponibilidad de mesas.
          </p>

        </button>



        <button
          type="button"
          className={
            tipoReporte === 'Horarios'
              ? 'reporte-card activo'
              : 'reporte-card'
          }
          onClick={() =>
            cambiarReporte('Horarios')
          }
        >

          <span>
            03
          </span>

          <strong>
            HORARIOS
          </strong>

          <p>
            Horarios con mayor demanda.
          </p>

        </button>



        <button
          type="button"
          className={
            tipoReporte === 'Experiencias'
              ? 'reporte-card activo'
              : 'reporte-card'
          }
          onClick={() =>
            cambiarReporte('Experiencias')
          }
        >

          <span>
            04
          </span>

          <strong>
            EXPERIENCIAS
          </strong>

          <p>
            Preferencias de los comensales.
          </p>

        </button>


      </div>



      {/* GENERAR */}

      <div className="admin-modulo mt-4">


        <div className="reporte-generar">

          <div>

            <span>
              REPORTE SELECCIONADO
            </span>

            <h2>
              {tipoReporte}
            </h2>

          </div>


          <button
            type="button"
            className="btn-generar-reporte-final"
            onClick={generarReporte}
          >
            GENERAR REPORTE
          </button>

        </div>


      </div>



      {/* RESULTADO */}

      {reporteGenerado && (

        <div className="admin-modulo mt-4">

          <div className="reporte-resultado-header">

            <div>

              <span>
                REPORTE GENERADO
              </span>

              <h2>
                {tipoReporte}
              </h2>

            </div>


            <span className="reporte-demo">
              DEMOSTRATIVO
            </span>

          </div>



          {/* RESERVAS */}

          {tipoReporte === 'Reservas' && (

            <div className="reporte-estadisticas">

              <div>
                <span>TOTAL</span>
                <strong>12</strong>
              </div>

              <div>
                <span>CONFIRMADAS</span>
                <strong>8</strong>
              </div>

              <div>
                <span>PENDIENTES</span>
                <strong>2</strong>
              </div>

              <div>
                <span>EN ESPERA</span>
                <strong>1</strong>
              </div>

            </div>

          )}



          {/* OCUPACIÓN */}

          {tipoReporte === 'Ocupación' && (

            <div className="reporte-estadisticas">

              <div>
                <span>MESAS</span>
                <strong>8</strong>
              </div>

              <div>
                <span>DISPONIBLES</span>
                <strong>5</strong>
              </div>

              <div>
                <span>OCUPADAS</span>
                <strong>3</strong>
              </div>

              <div>
                <span>OCUPACIÓN</span>
                <strong>38%</strong>
              </div>

            </div>

          )}



          {/* HORARIOS */}

          {tipoReporte === 'Horarios' && (

            <div className="reporte-lista">

              <div>
                <span>7:00 PM</span>
                <strong>3 reservas</strong>
              </div>

              <div>
                <span>7:30 PM</span>
                <strong>5 reservas</strong>
              </div>

              <div>
                <span>8:00 PM</span>
                <strong>8 reservas</strong>
              </div>

              <div>
                <span>8:30 PM</span>
                <strong>6 reservas</strong>
              </div>

            </div>

          )}



          {/* EXPERIENCIAS */}

          {tipoReporte === 'Experiencias' && (

            <div className="reporte-lista">

              <div>
                <span>Sin maridaje</span>
                <strong>9 comensales</strong>
              </div>

              <div>
                <span>Maridaje</span>
                <strong>7 comensales</strong>
              </div>

              <div>
                <span>Sin alcohol</span>
                <strong>5 comensales</strong>
              </div>

            </div>

          )}


        </div>

      )}


    </AdminLayout>
  );

};