import { useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';


export const Horarios = () => {

  const [horarios, setHorarios] = useState([
    {
      id: 1,
      hora: '7:00 PM',
      estado: 'Disponible'
    },
    {
      id: 2,
      hora: '7:30 PM',
      estado: 'Disponible'
    },
    {
      id: 3,
      hora: '8:00 PM',
      estado: 'No disponible'
    },
    {
      id: 4,
      hora: '8:30 PM',
      estado: 'Disponible'
    },
    {
      id: 5,
      hora: '9:00 PM',
      estado: 'Disponible'
    },
    {
      id: 6,
      hora: '9:30 PM',
      estado: 'No disponible'
    }
  ]);


  /* =========================
     CAMBIAR ESTADO
  ========================= */

  const cambiarEstado = (id) => {

    const nuevosHorarios = horarios.map((horario) => {

      if (horario.id === id) {

        return {
          ...horario,

          estado:
            horario.estado === 'Disponible'
              ? 'No disponible'
              : 'Disponible'
        };

      }

      return horario;

    });


    setHorarios(nuevosHorarios);

  };


  /* =========================
     CONTADORES
  ========================= */

  const disponibles =
    horarios.filter(
      horario => horario.estado === 'Disponible'
    ).length;


  const noDisponibles =
    horarios.length - disponibles;


  return (
    <AdminLayout>


      {/* ENCABEZADO */}

      <div className="admin-pagina-header">

        <span>
          PANEL ADMINISTRATIVO
        </span>

        <h1>
          Gestión de Horarios
        </h1>

        <p>
          Administra los horarios disponibles
          para las reservas del restaurante.
        </p>

      </div>



      {/* RESUMEN */}

      <div className="row g-3 mb-4">


        <div className="col-md-6">

          <div className="horario-resumen disponible">

            <div>

              <span>
                HORARIOS DISPONIBLES
              </span>

              <p>
                Habilitados para reservas.
              </p>

            </div>

            <strong>
              {disponibles}
            </strong>

          </div>

        </div>


        <div className="col-md-6">

          <div className="horario-resumen bloqueado">

            <div>

              <span>
                NO DISPONIBLES
              </span>

              <p>
                Actualmente bloqueados.
              </p>

            </div>

            <strong>
              {noDisponibles}
            </strong>

          </div>

        </div>


      </div>



      {/* LISTADO */}

      <div className="admin-modulo">


        <div className="horarios-header">

          <div>

            <h2>
              HORARIOS DE ATENCIÓN
            </h2>

            <p>
              Activa o desactiva los horarios
              que podrán seleccionar los clientes.
            </p>

          </div>


          <button
            type="button"
            className="btn btn-sm btn-nuevo-horario"
          >
            + NUEVO HORARIO
          </button>

        </div>



        <div className="horarios-grid-admin">

          {horarios.map((horario) => (

            <div
              className={
                horario.estado === 'Disponible'
                  ? 'horario-admin-card disponible'
                  : 'horario-admin-card bloqueado'
              }
              key={horario.id}
            >

              <div>

                <span>
                  HORARIO
                </span>

                <strong>
                  {horario.hora}
                </strong>

              </div>


              <div className="horario-admin-estado">

                <i
                  className={
                    horario.estado === 'Disponible'
                      ? 'horario-punto disponible'
                      : 'horario-punto bloqueado'
                  }
                ></i>

                {horario.estado}

              </div>


              <button
                type="button"
                onClick={() =>
                  cambiarEstado(horario.id)
                }
              >

                {
                  horario.estado === 'Disponible'
                    ? 'Deshabilitar'
                    : 'Habilitar'
                }

              </button>

            </div>

          ))}

        </div>


      </div>

    </AdminLayout>
  );

};