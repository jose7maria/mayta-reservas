import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const DatosCliente = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const datosReserva = location.state;

  const cantidadPersonas = Number(datosReserva?.personas || 1);


  /* =========================
     DATOS DEL RESPONSABLE
  ========================= */

  const [nombre, setNombre] = useState('');
  const [celular, setCelular] = useState('');
  const [correo, setCorreo] = useState('');
  const [observaciones, setObservaciones] = useState('');


  /* =========================
     COMENSALES
  ========================= */

  const [comensales, setComensales] = useState(() => {

    return Array.from(
      { length: cantidadPersonas },
      (_, index) => ({
        id: index + 1,
        tipo: 'Adulto',
        acompanamiento: 'Sin maridaje',
        restricciones: []
      })
    );

  });


  /* =========================
     CAMBIAR DATOS COMENSAL
  ========================= */

  const actualizarComensal = (id, campo, valor) => {

    setComensales(

      comensales.map((comensal) => {

        if (comensal.id !== id) {
          return comensal;
        }


        /* Si cambia a menor y tenía maridaje,
           automáticamente lo quitamos */

        if (
          campo === 'tipo' &&
          valor === 'Menor' &&
          comensal.acompanamiento === 'Maridaje'
        ) {

          return {
            ...comensal,
            tipo: valor,
            acompanamiento: 'Sin maridaje'
          };

        }


        return {
          ...comensal,
          [campo]: valor
        };

      })

    );

  };


  /* =========================
     RESTRICCIONES
  ========================= */

  const cambiarRestriccion = (id, restriccion) => {

    setComensales(

      comensales.map((comensal) => {

        if (comensal.id !== id) {
          return comensal;
        }


        const existe =
          comensal.restricciones.includes(restriccion);


        return {
          ...comensal,

          restricciones: existe

            ? comensal.restricciones.filter(
                item => item !== restriccion
              )

            : [
                ...comensal.restricciones,
                restriccion
              ]
        };

      })

    );

  };


  /* =========================
     CONTINUAR
  ========================= */

  const continuar = () => {

    if (
      nombre.trim() === '' ||
      celular.trim() === '' ||
      correo.trim() === ''
    ) {

      alert('Completa los datos de contacto');
      return;

    }


    navigate('/confirmacion', {

      state: {

        ...datosReserva,

        nombre,
        celular,
        correo,
        observaciones,

        comensales

      }

    });

  };


  /* =========================
     SI ENTRAN DIRECTO
  ========================= */

  if (!datosReserva) {

    return (

      <section className="datos-page">

        <div className="container">

          <div className="datos-box text-center">

            <h2>
              Primero debes realizar una reserva.
            </h2>

            <button
              className="btn btn-continuar mt-4"
              onClick={() => navigate('/reserva')}
            >
              IR A RESERVAR
            </button>

          </div>

        </div>

      </section>

    );

  }


  return (

    <section className="datos-page">

      <div className="container">

        <div className="datos-box">


          {/* ENCABEZADO */}

          <div className="datos-header">

            <span>
              RESERVAS MAYTA
            </span>

            <h1>
              DATOS DE LA RESERVA
            </h1>

            <p>
              Completa tus datos y las preferencias de los comensales.
            </p>

          </div>



          {/* PASOS */}

          <div className="reserva-pasos">

            <span className="paso activo">
              1
            </span>

            <span className="linea"></span>

            <span className="paso activo">
              2
            </span>

            <span className="linea"></span>

            <span className="paso activo">
              3
            </span>

            <span className="linea"></span>

            <span className="paso">
              4
            </span>

          </div>



          {/* RESUMEN */}

          <div className="datos-resumen">

            <div>
              <span>FECHA</span>
              <strong>
                {datosReserva.fecha}
              </strong>
            </div>

            <div>
              <span>HORA</span>
              <strong>
                {datosReserva.horario}
              </strong>
            </div>

            <div>
              <span>PERSONAS</span>
              <strong>
                {datosReserva.personas}
              </strong>
            </div>

            <div>
              <span>UBICACIÓN</span>
              <strong>
                {datosReserva.zona}
              </strong>
            </div>

          </div>



          {/* DATOS DEL RESPONSABLE */}

          <div className="datos-seccion">

            <h3>
              DATOS DE CONTACTO
            </h3>

            <p className="texto-ayuda">
              Información de la persona responsable de la reserva.
            </p>


            <div className="datos-grid">

              <div>

                <label>
                  Nombres y apellidos *
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={nombre}
                  onChange={(e) =>
                    setNombre(e.target.value)
                  }
                />

              </div>


              <div>

                <label>
                  Celular *
                </label>

                <input
                  type="tel"
                  className="form-control"
                  value={celular}
                  onChange={(e) =>
                    setCelular(e.target.value)
                  }
                />

              </div>


              <div className="campo-completo">

                <label>
                  Correo electrónico *
                </label>

                <input
                  type="email"
                  className="form-control"
                  value={correo}
                  onChange={(e) =>
                    setCorreo(e.target.value)
                  }
                />

              </div>

            </div>

          </div>



          {/* COMENSALES */}

          <div className="datos-seccion">

            <h3>
              INFORMACIÓN DE LOS COMENSALES
            </h3>

            <p className="texto-ayuda">
              Indica el tipo de comensal, acompañamiento y
              restricciones alimentarias.
            </p>


            <div className="lista-comensales">

              {comensales.map((comensal) => (

                <div
                  className="comensal-card"
                  key={comensal.id}
                >


                  {/* CABECERA */}

                  <div className="comensal-header">

                    <h4>
                      COMENSAL {comensal.id}
                    </h4>


                    <select
                      value={comensal.tipo}
                      onChange={(e) =>
                        actualizarComensal(
                          comensal.id,
                          'tipo',
                          e.target.value
                        )
                      }
                    >

                      <option value="Adulto">
                        Adulto
                      </option>

                      <option value="Menor">
                        Menor
                      </option>

                    </select>

                  </div>



                  {/* MENÚ */}

                  <div className="menu-comensal">

                    <span>
                      MENÚ
                    </span>

                    <strong>
                      Bitácora Amazónica · 10 tiempos
                    </strong>

                  </div>



                  {/* ACOMPAÑAMIENTO */}

                  <div className="acompanamiento-comensal">

                    <p>
                      Acompañamiento
                    </p>


                    <div className="opciones-acompanamiento">


                      <label>

                        <input
                          type="radio"
                          name={`acompanamiento-${comensal.id}`}
                          value="Sin maridaje"

                          checked={
                            comensal.acompanamiento ===
                            'Sin maridaje'
                          }

                          onChange={(e) =>
                            actualizarComensal(
                              comensal.id,
                              'acompanamiento',
                              e.target.value
                            )
                          }
                        />

                        Sin maridaje

                      </label>



                      {/* SOLO ADULTOS */}

                      {comensal.tipo === 'Adulto' && (

                        <label>

                          <input
                            type="radio"
                            name={`acompanamiento-${comensal.id}`}
                            value="Maridaje"

                            checked={
                              comensal.acompanamiento ===
                              'Maridaje'
                            }

                            onChange={(e) =>
                              actualizarComensal(
                                comensal.id,
                                'acompanamiento',
                                e.target.value
                              )
                            }
                          />

                          Maridaje

                        </label>

                      )}



                      <label>

                        <input
                          type="radio"
                          name={`acompanamiento-${comensal.id}`}
                          value="Sin alcohol"

                          checked={
                            comensal.acompanamiento ===
                            'Sin alcohol'
                          }

                          onChange={(e) =>
                            actualizarComensal(
                              comensal.id,
                              'acompanamiento',
                              e.target.value
                            )
                          }
                        />

                        Sin alcohol

                      </label>

                    </div>

                  </div>



                  {/* RESTRICCIONES */}

                  <div className="restricciones-comensal">

                    <p>
                      Restricciones alimentarias
                    </p>


                    <div className="restricciones-grid">

                      {[
                        'Alergia a mariscos',
                        'Lactosa',
                        'Sin gluten',
                        'Vegetariano'
                      ].map((restriccion) => (

                        <label key={restriccion}>

                          <input
                            type="checkbox"

                            checked={
                              comensal.restricciones.includes(
                                restriccion
                              )
                            }

                            onChange={() =>
                              cambiarRestriccion(
                                comensal.id,
                                restriccion
                              )
                            }
                          />

                          {restriccion}

                        </label>

                      ))}

                    </div>

                  </div>


                </div>

              ))}

            </div>

          </div>



          {/* OBSERVACIONES */}

          <div className="datos-seccion">

            <label>
              Observaciones generales
            </label>

            <textarea
              className="form-control"
              rows="4"
              placeholder="Celebración especial, alergia específica u otra indicación..."
              value={observaciones}
              onChange={(e) =>
                setObservaciones(e.target.value)
              }
            />

          </div>



          {/* BOTONES */}

          <div className="acciones-datos">

            <button
              type="button"
              className="btn btn-volver"

              onClick={() =>
                navigate('/disponibilidad', {
                  state: datosReserva
                })
              }
            >
              VOLVER
            </button>


            <button
              type="button"
              className="btn btn-continuar"
              onClick={continuar}
            >
              CONTINUAR
            </button>

          </div>


        </div>

      </div>

    </section>

  );

};