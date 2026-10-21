import { PanelSidebar } from '../components/PanelSidebar';
import { PanelNavbar } from '../components/PanelNavbar';


export const Panel = () => {

  const reservasHoy = [
    {
      hora: '7:00 PM',
      cliente: 'Carlos Torres',
      personas: 2,
      mesa: 'M1',
      estado: 'Confirmado',
      accion: 'VER'
    },
    {
      hora: '7:30 PM',
      cliente: 'Andrea Chavez',
      personas: 4,
      mesa: 'M6',
      estado: 'Pendiente',
      accion: 'EDITAR'
    },
    {
      hora: '8:00 PM',
      cliente: 'Jose Mejia',
      personas: 6,
      mesa: 'M4',
      estado: 'Confirmado',
      accion: 'CANCELAR'
    }
  ];


  const mesas = [
    { mesa: 'MESA 1', estado: 'Disponible' },
    { mesa: 'MESA 2', estado: 'Ocupada' },
    { mesa: 'MESA 3', estado: 'Disponible' },
    { mesa: 'MESA 4', estado: 'Ocupada' }
  ];


  return (
    <div className="admin-layout">

      <PanelSidebar />


      <div className="admin-principal">

        <PanelNavbar />


        <main className="admin-contenido">

          {/* TÍTULO */}

          <h1 className="dashboard-titulo">
            PANEL DE RESERVAS
          </h1>



          {/* CONTADORES PRINCIPALES */}

          <div className="dashboard-contadores">

            <div>
              <strong>12</strong>
              <span>Reservas</span>
            </div>

            <div>
              <strong>8</strong>
              <span>Confirmadas</span>
            </div>

            <div>
              <strong>2</strong>
              <span>Pendientes</span>
            </div>

            <div>
              <strong>1</strong>
              <span>En espera</span>
            </div>

          </div>



          {/* CONTADORES MESAS */}

          <div className="dashboard-mesas-contadores">

            <div className="contador-disponible">
              <strong>5</strong>
              <span>Mesas disponibles</span>
            </div>

            <div className="contador-ocupado">
              <strong>3</strong>
              <span>Mesas ocupadas</span>
            </div>

          </div>



          {/* CALENDARIO + ESTADO MESAS */}

          <div className="dashboard-doble">


            {/* CALENDARIO */}

            <section className="dashboard-bloque">

              <h2>CALENDARIO</h2>

              <div className="dashboard-mes">
                <button>‹</button>

                <strong>
                  OCTUBRE 2026
                </strong>

                <button>›</button>
              </div>


              <div className="dashboard-calendario">

                <strong>L</strong>
                <strong>M</strong>
                <strong>M</strong>
                <strong>J</strong>
                <strong>V</strong>
                <strong>S</strong>
                <strong>D</strong>

                {Array.from(
                  { length: 31 },
                  (_, index) => (

                    <span
                      key={index}
                      className={
                        index + 1 === 21
                          ? 'dia-activo'
                          : ''
                      }
                    >
                      {index + 1}
                    </span>

                  )
                )}

              </div>

            </section>



            {/* ESTADO MESAS */}

            <section className="dashboard-bloque">

              <h2>
                ESTADO DE MESAS
              </h2>


              <div className="dashboard-lista-mesas">

                {mesas.map((item) => (

                  <div
                    className="dashboard-mesa"
                    key={item.mesa}
                  >

                    <strong>
                      {item.mesa}
                    </strong>

                    <span>
                      {item.estado}
                    </span>

                    <i
                      className={
                        item.estado === 'Disponible'
                          ? 'mesa-punto disponible'
                          : 'mesa-punto ocupada'
                      }
                    ></i>

                  </div>

                ))}

              </div>


              <div className="dashboard-leyenda">

                <span>
                  <i className="mesa-punto disponible"></i>
                  Disponible
                </span>

                <span>
                  <i className="mesa-punto ocupada"></i>
                  Ocupada
                </span>

              </div>

            </section>


          </div>



          {/* RESERVAS */}

          <section className="dashboard-bloque dashboard-reservas">

            <h2>
              RESERVAS DE HOY
            </h2>


            <div className="table-responsive">

              <table className="table dashboard-tabla">

                <thead>

                  <tr>
                    <th>Hora</th>
                    <th>Cliente</th>
                    <th>Pers.</th>
                    <th>Mesa</th>
                    <th>Estado</th>
                    <th>Acción</th>
                  </tr>

                </thead>


                <tbody>

                  {reservasHoy.map((reserva, index) => (

                    <tr key={index}>

                      <td>{reserva.hora}</td>

                      <td>{reserva.cliente}</td>

                      <td>{reserva.personas}</td>

                      <td>{reserva.mesa}</td>

                      <td>

                        <span
                          className={
                            reserva.estado === 'Confirmado'
                              ? 'reserva-estado confirmado'
                              : 'reserva-estado pendiente'
                          }
                        >
                          {reserva.estado}
                        </span>

                      </td>

                      <td>

                        <button className="btn-accion-dashboard">
                          {reserva.accion}
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>



          {/* REPORTES */}

          <section className="dashboard-bloque dashboard-reportes">

            <div className="dashboard-reportes-header">

              <h2>
                REPORTES
              </h2>

              <button className="btn-generar-dashboard">
                GENERAR REPORTE
              </button>

            </div>


            <div className="dashboard-reportes-botones">

              <button>
                RESERVAS
              </button>

              <button>
                OCUPACIÓN
              </button>

              <button>
                HORARIOS
              </button>

              <button>
                EXPERIENCIAS
              </button>

            </div>

          </section>


        </main>

      </div>

    </div>
  );

};