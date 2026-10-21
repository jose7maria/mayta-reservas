import { useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';

export const Calendario = () => {

  const [diaSeleccionado, setDiaSeleccionado] = useState(21);

  const dias = [
    null,
    null,
    null,
    1, 2, 3, 4,
    5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31
  ];


  const reservas = {
    21: [
      {
        hora: '7:00 PM',
        cliente: 'Carlos Torres',
        personas: 2
      },
      {
        hora: '8:00 PM',
        cliente: 'Jose Mejia',
        personas: 6
      }
    ],

    22: [
      {
        hora: '7:30 PM',
        cliente: 'Andrea Chavez',
        personas: 4
      }
    ]
  };


  const reservasDelDia =
    reservas[diaSeleccionado] || [];


  return (
    <AdminLayout>

      {/* TÍTULO */}

      <div className="admin-pagina-header">

        <div>

          <span>
            PANEL ADMINISTRATIVO
          </span>

          <h1>
            Calendario de Reservas
          </h1>

          <p>
            Consulta las reservas programadas por fecha.
          </p>

        </div>

      </div>


      <div className="row g-4">


        {/* CALENDARIO */}

        <div className="col-lg-7">

          <div className="admin-modulo">

            <div className="admin-modulo-header">

              <button>
                ‹
              </button>

              <h2>
                OCTUBRE 2026
              </h2>

              <button>
                ›
              </button>

            </div>


            <div className="calendario-admin">

              <strong>L</strong>
              <strong>M</strong>
              <strong>M</strong>
              <strong>J</strong>
              <strong>V</strong>
              <strong>S</strong>
              <strong>D</strong>


              {dias.map((dia, index) => (

                dia === null

                  ? (
                    <div
                      key={index}
                      className="calendario-vacio"
                    ></div>
                  )

                  : (

                    <button
                      key={index}
                      type="button"
                      className={
                        diaSeleccionado === dia
                          ? 'calendario-dia seleccionado'
                          : 'calendario-dia'
                      }
                      onClick={() =>
                        setDiaSeleccionado(dia)
                      }
                    >

                      {dia}


                      {reservas[dia] && (

                        <span className="indicador-reserva">
                        </span>

                      )}

                    </button>

                  )

              ))}

            </div>

          </div>

        </div>



        {/* RESERVAS DEL DÍA */}

        <div className="col-lg-5">

          <div className="admin-modulo">

            <div className="reservas-dia-header">

              <div>

                <span>
                  RESERVAS DEL DÍA
                </span>

                <h2>
                  {diaSeleccionado} OCTUBRE
                </h2>

              </div>

              <strong>
                {reservasDelDia.length}
              </strong>

            </div>


            <div className="reservas-dia-lista">

              {reservasDelDia.length > 0 ? (

                reservasDelDia.map((reserva, index) => (

                  <div
                    className="reserva-dia-card"
                    key={index}
                  >

                    <div>

                      <strong>
                        {reserva.hora}
                      </strong>

                      <span>
                        {reserva.cliente}
                      </span>

                    </div>


                    <span>
                      {reserva.personas} personas
                    </span>

                  </div>

                ))

              ) : (

                <div className="sin-reservas">

                  No hay reservas programadas
                  para esta fecha.

                </div>

              )}

            </div>

          </div>

        </div>


      </div>

    </AdminLayout>
  );
};