import { useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';


export const Platos = () => {

  const [platos, setPlatos] = useState([

    {
      id: 1,
      nombre: 'Amazonía I',
      experiencia: 'Bitácora Amazónica',
      restriccion: 'Sin gluten',
      estado: 'Activo'
    },

    {
      id: 2,
      nombre: 'Amazonía II',
      experiencia: 'Bitácora Amazónica',
      restriccion: 'Contiene mariscos',
      estado: 'Activo'
    },

    {
      id: 3,
      nombre: 'Territorio',
      experiencia: 'Menú degustación',
      restriccion: 'Contiene lactosa',
      estado: 'Activo'
    },

    {
      id: 4,
      nombre: 'Origen',
      experiencia: 'Menú degustación',
      restriccion: 'Vegetariano',
      estado: 'Inactivo'
    }

  ]);


  /* =========================
     CAMBIAR ESTADO
  ========================= */

  const cambiarEstado = (id) => {

    const platosActualizados = platos.map((plato) => {

      if (plato.id === id) {

        return {
          ...plato,

          estado:
            plato.estado === 'Activo'
              ? 'Inactivo'
              : 'Activo'
        };

      }

      return plato;

    });


    setPlatos(platosActualizados);

  };


  const activos =
    platos.filter(
      plato => plato.estado === 'Activo'
    ).length;


  return (
    <AdminLayout>


      {/* =========================
          ENCABEZADO
      ========================= */}

      <div className="admin-pagina-header">

        <span>
          PANEL ADMINISTRATIVO
        </span>

        <h1>
          Gestión de Platos
        </h1>

        <p>
          Consulta los platos, experiencias y
          restricciones registradas.
        </p>

      </div>



      {/* =========================
          RESUMEN
      ========================= */}

      <div className="row g-3 mb-4">

        <div className="col-md-6">

          <div className="platos-resumen">

            <span>
              PLATOS REGISTRADOS
            </span>

            <strong>
              {platos.length}
            </strong>

          </div>

        </div>


        <div className="col-md-6">

          <div className="platos-resumen activos">

            <span>
              PLATOS ACTIVOS
            </span>

            <strong>
              {activos}
            </strong>

          </div>

        </div>

      </div>



      {/* =========================
          TABLA
      ========================= */}

      <div className="admin-modulo">


        <div className="platos-toolbar">

          <div>

            <h2>
              LISTADO DE PLATOS
            </h2>

            <p>
              Información utilizada en las experiencias MAYTA.
            </p>

          </div>


          <button
            type="button"
            className="btn btn-sm btn-plato-nuevo"
          >
            + NUEVO PLATO
          </button>

        </div>



        <div className="table-responsive">

          <table className="table admin-tabla">

            <thead>

              <tr>

                <th>Plato</th>

                <th>Experiencia</th>

                <th>Restricción / Alérgeno</th>

                <th>Estado</th>

                <th>Acciones</th>

              </tr>

            </thead>


            <tbody>

              {platos.map((plato) => (

                <tr key={plato.id}>

                  <td>

                    <strong>
                      {plato.nombre}
                    </strong>

                  </td>


                  <td>
                    {plato.experiencia}
                  </td>


                  <td>

                    <span className="plato-restriccion">

                      {plato.restriccion}

                    </span>

                  </td>


                  <td>

                    <span
                      className={
                        plato.estado === 'Activo'
                          ? 'admin-estado activa'
                          : 'admin-estado inactiva'
                      }
                    >

                      {plato.estado}

                    </span>

                  </td>


                  <td>

                    <button
                      type="button"
                      className="btn btn-sm admin-btn-editar"
                    >
                      Editar
                    </button>


                    <button
                      type="button"
                      className="btn btn-sm admin-btn-estado"
                      onClick={() =>
                        cambiarEstado(plato.id)
                      }
                    >

                      {
                        plato.estado === 'Activo'
                          ? 'Desactivar'
                          : 'Activar'
                      }

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


      </div>

    </AdminLayout>
  );

};