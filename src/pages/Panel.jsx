import { PanelSidebar } from '../components/PanelSidebar';
import { PanelNavbar } from '../components/PanelNavbar';

export const Panel = () => {

  const reservasHoy = [

    {
      hora: '7:00 PM',
      cliente: 'Carlos Torres',
      personas: 2,
      mesa: 'M1',
      estado: 'Confirmada'
    },

    {
      hora: '7:30 PM',
      cliente: 'Andrea López',
      personas: 4,
      mesa: 'M6',
      estado: 'Pendiente'
    },

    {
      hora: '8:00 PM',
      cliente: 'José Ramírez',
      personas: 6,
      mesa: 'M4',
      estado: 'Confirmada'
    }

  ];


  const mesas = [

    {
      numero: 'M1',
      estado: 'Disponible'
    },

    {
      numero: 'M2',
      estado: 'Ocupada'
    },

    {
      numero: 'M3',
      estado: 'Disponible'
    },

    {
      numero: 'M4',
      estado: 'Ocupada'
    }

  ];


  return (

    <div className="panel-layout">


      {/* SIDEBAR */}

      <PanelSidebar />



      {/* CONTENIDO */}

      <div className="panel-principal">


        {/* NAVBAR */}

        <PanelNavbar />



        {/* DASHBOARD */}

        <main className="panel-contenido">


          <div className="panel-titulo">

            <div>

              <span>
                MAYTA
              </span>

              <h1>
                PANEL DE RESERVAS
              </h1>

            </div>


            <p>
              Resumen general del restaurante.
            </p>

          </div>



          {/* CONTADORES */}

          <div className="panel-estadisticas">


            <div className="estadistica-card">

              <span>
                RESERVAS
              </span>

              <strong>
                12
              </strong>

              <p>
                Reservas de hoy
              </p>

            </div>



            <div className="estadistica-card">

              <span>
                CONFIRMADAS
              </span>

              <strong>
                8
              </strong>

              <p>
                Reservas confirmadas
              </p>

            </div>



            <div className="estadistica-card">

              <span>
                PENDIENTES
              </span>

              <strong>
                2
              </strong>

              <p>
                Por confirmar
              </p>

            </div>



            <div className="estadistica-card">

              <span>
                EN ESPERA
              </span>

              <strong>
                1
              </strong>

              <p>
                Cliente en espera
              </p>

            </div>


          </div>



          {/* MESAS */}

          <div className="panel-mesas-resumen">

            <div className="mesa-resumen disponible">

              <span>
                MESAS DISPONIBLES
              </span>

              <strong>
                5
              </strong>

            </div>


            <div className="mesa-resumen ocupada">

              <span>
                MESAS OCUPADAS
              </span>

              <strong>
                3
              </strong>

            </div>

          </div>



          {/* BLOQUE CENTRAL */}

          <div className="panel-grid-principal">


            {/* CALENDARIO */}

            <div className="panel-card">

              <div className="panel-card-header">

                <h2>
                  CALENDARIO
                </h2>

                <span>
                  OCTUBRE 2026
                </span>

              </div>


              <div className="calendario-simple">

                <div>L</div>
                <div>M</div>
                <div>M</div>
                <div>J</div>
                <div>V</div>
                <div>S</div>
                <div>D</div>


                {Array.from(
                  { length: 31 },
                  (_, index) => (

                    <div
                      key={index}
                      className={
                        index + 1 === 21
                          ? 'dia-calendario hoy'
                          : 'dia-calendario'
                      }
                    >
                      {index + 1}
                    </div>

                  )
                )}

              </div>

            </div>



            {/* ESTADO DE MESAS */}

            <div className="panel-card">

              <div className="panel-card-header">

                <h2>
                  ESTADO DE MESAS
                </h2>

              </div>


              <div className="estado-mesas-lista">

                {mesas.map((mesa) => (

                  <div
                    className="estado-mesa-item"
                    key={mesa.numero}
                  >

                    <strong>
                      {mesa.numero}
                    </strong>


                    <span
                      className={
                        mesa.estado === 'Disponible'
                          ? 'estado-punto verde'
                          : 'estado-punto rojo'
                      }
                    ></span>


                    <span>
                      {mesa.estado}
                    </span>

                  </div>

                ))}

              </div>

            </div>


          </div>



          {/* RESERVAS DE HOY */}

          <div className="panel-card panel-reservas">

            <div className="panel-card-header">

              <h2>
                RESERVAS DE HOY
              </h2>

              <button type="button">
                VER TODAS
              </button>

            </div>


            <table className="tabla-reservas">

              <thead>

                <tr>

                  <th>Hora</th>
                  <th>Cliente</th>
                  <th>Personas</th>
                  <th>Mesa</th>
                  <th>Estado</th>
                  <th>Acciones</th>

                </tr>

              </thead>


              <tbody>

                {reservasHoy.map((reserva, index) => (

                  <tr key={index}>

                    <td>
                      {reserva.hora}
                    </td>

                    <td>
                      {reserva.cliente}
                    </td>

                    <td>
                      {reserva.personas}
                    </td>

                    <td>
                      {reserva.mesa}
                    </td>


                    <td>

                      <span
                        className={
                          reserva.estado === 'Confirmada'
                            ? 'estado-reserva confirmada'
                            : 'estado-reserva pendiente'
                        }
                      >
                        {reserva.estado}
                      </span>

                    </td>


                    <td className="acciones-tabla">

                      <button>
                        Ver
                      </button>

                      <button>
                        Editar
                      </button>

                      <button>
                        Cancelar
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>



          {/* REPORTES */}

          <div className="panel-card reportes-resumen">

            <div className="panel-card-header">

              <h2>
                REPORTES
              </h2>

              <button className="btn-generar-reporte">
                GENERAR REPORTE
              </button>

            </div>


            <div className="reportes-opciones">

              <button>
                Reservas
              </button>

              <button>
                Ocupación de mesas
              </button>

              <button>
                Horarios
              </button>

              <button>
                Experiencias / Platos
              </button>

            </div>

          </div>


        </main>

      </div>

    </div>

  );

};