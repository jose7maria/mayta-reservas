import { useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';


export const Mesas = () => {

  const [mesas, setMesas] = useState([
    {
      id: 1,
      nombre: 'M1',
      capacidad: 2,
      estado: 'Disponible'
    },
    {
      id: 2,
      nombre: 'M2',
      capacidad: 4,
      estado: 'Ocupada'
    },
    {
      id: 3,
      nombre: 'M3',
      capacidad: 2,
      estado: 'Disponible'
    },
    {
      id: 4,
      nombre: 'M4',
      capacidad: 6,
      estado: 'Ocupada'
    },
    {
      id: 5,
      nombre: 'M5',
      capacidad: 4,
      estado: 'Disponible'
    },
    {
      id: 6,
      nombre: 'M6',
      capacidad: 4,
      estado: 'Disponible'
    },
    {
      id: 7,
      nombre: 'M7',
      capacidad: 2,
      estado: 'Disponible'
    },
    {
      id: 8,
      nombre: 'M8',
      capacidad: 6,
      estado: 'Ocupada'
    }
  ]);


  const cambiarEstado = (id) => {

    const nuevasMesas = mesas.map((mesa) => {

      if (mesa.id === id) {

        return {
          ...mesa,

          estado:
            mesa.estado === 'Disponible'
              ? 'Ocupada'
              : 'Disponible'
        };

      }

      return mesa;

    });


    setMesas(nuevasMesas);

  };


  const disponibles =
    mesas.filter(
      mesa => mesa.estado === 'Disponible'
    ).length;


  const ocupadas =
    mesas.filter(
      mesa => mesa.estado === 'Ocupada'
    ).length;


  return (
    <AdminLayout>

      {/* TÍTULO */}

      <div className="admin-pagina-header">

        <span>
          PANEL ADMINISTRATIVO
        </span>

        <h1>
          Gestión de Mesas
        </h1>

        <p>
          Consulta el estado y disponibilidad
          de las mesas del restaurante.
        </p>

      </div>



      {/* RESUMEN */}

      <div className="row g-3 mb-4">

        <div className="col-md-6">

          <div className="mesas-resumen disponible">

            <div>

              <span>
                MESAS DISPONIBLES
              </span>

              <p>
                Listas para nuevas reservas.
              </p>

            </div>

            <strong>
              {disponibles}
            </strong>

          </div>

        </div>


        <div className="col-md-6">

          <div className="mesas-resumen ocupada">

            <div>

              <span>
                MESAS OCUPADAS
              </span>

              <p>
                Actualmente asignadas.
              </p>

            </div>

            <strong>
              {ocupadas}
            </strong>

          </div>

        </div>

      </div>



      {/* MAPA DE MESAS */}

      <div className="admin-modulo">

        <div className="mesas-header">

          <div>

            <h2>
              ESTADO DEL SALÓN
            </h2>

            <p>
              Selecciona una mesa para cambiar
              su estado de forma demostrativa.
            </p>

          </div>


          <div className="mesas-leyenda">

            <span>

              <i className="mesa-indicador disponible"></i>

              Disponible

            </span>


            <span>

              <i className="mesa-indicador ocupada"></i>

              Ocupada

            </span>

          </div>

        </div>



        <div className="mesas-grid">

          {mesas.map((mesa) => (

            <button
              key={mesa.id}
              type="button"

              className={
                mesa.estado === 'Disponible'
                  ? 'mesa-card disponible'
                  : 'mesa-card ocupada'
              }

              onClick={() =>
                cambiarEstado(mesa.id)
              }
            >

              <span className="mesa-numero">
                {mesa.nombre}
              </span>

              <strong>
                {mesa.capacidad}
              </strong>

              <small>
                personas
              </small>

              <div className="mesa-estado">

                <i
                  className={
                    mesa.estado === 'Disponible'
                      ? 'mesa-indicador disponible'
                      : 'mesa-indicador ocupada'
                  }
                ></i>

                {mesa.estado}

              </div>

            </button>

          ))}

        </div>

      </div>

    </AdminLayout>
  );

};