import { Link } from 'react-router-dom';


export const ExperienciaModal = ({
  experiencia,
  onCerrar
}) => {


  /* =========================
     RECORRIDO DE 10 TIEMPOS

     Solo se mostrará cuando
     abramos Bitácora Amazónica.
  ========================= */

  const tiempos = [

    {
      numero: '01',
      nombre: 'Bienvenida'
    },

    {
      numero: '02',
      nombre: 'Primer acercamiento'
    },

    {
      numero: '03',
      nombre: 'Entrada fría'
    },

    {
      numero: '04',
      nombre: 'Entrada caliente'
    },

    {
      numero: '05',
      nombre: 'Producto de mar'
    },

    {
      numero: '06',
      nombre: 'Producto de tierra'
    },

    {
      numero: '07',
      nombre: 'Transición'
    },

    {
      numero: '08',
      nombre: 'Plato principal'
    },

    {
      numero: '09',
      nombre: 'Prepostre'
    },

    {
      numero: '10',
      nombre: 'Cierre dulce'
    }

  ];


  /* =========================
     SI NO HAY EXPERIENCIA
     NO MOSTRAMOS NADA
  ========================= */

  if (!experiencia) {
    return null;
  }


  return (

    <div
      className="experiencia-modal-fondo"

      onClick={onCerrar}
    >


      {/* =========================
          CONTENEDOR DEL MODAL
      ========================= */}

      <div
        className="experiencia-modal"

        onClick={(e) =>
          e.stopPropagation()
        }
      >


        {/* =========================
            BOTÓN CERRAR
        ========================= */}

        <button
          type="button"

          className="experiencia-modal-cerrar"

          onClick={onCerrar}

          aria-label="Cerrar detalle"
        >
          ×
        </button>



        {/* =========================
            IMAGEN
        ========================= */}

        <div className="experiencia-modal-imagen">

          <img
            src={experiencia.imagen}
            alt={experiencia.nombre}
          />

        </div>



        {/* =========================
            CONTENIDO
        ========================= */}

        <div className="experiencia-modal-contenido">


          <span className="experiencia-modal-etiqueta">
            MAYTA · EXPERIENCIA
          </span>


          <h2>
            {experiencia.nombre}
          </h2>


          <h3>
            {experiencia.subtitulo}
          </h3>


          <p>
            {experiencia.detalle}
          </p>



          {/* ==================================================
              BITÁCORA AMAZÓNICA
              MOSTRAMOS LOS 10 TIEMPOS
          ================================================== */}

          {
            experiencia.tipo === 'bitacora' && (

              <div className="modal-tiempos">


                <div className="modal-tiempos-header">

                  <span>
                    EL RECORRIDO
                  </span>


                  <h3>
                    ¿QUÉ SIGNIFICAN LOS 10 TIEMPOS?
                  </h3>


                  <p>
                    La experiencia se desarrolla
                    progresivamente a través de
                    diez momentos gastronómicos.
                  </p>

                </div>



                {/* 10 TIEMPOS */}

                <div className="modal-tiempos-grid">

                  {tiempos.map((tiempo) => (

                    <div
                      className="modal-tiempo"

                      key={tiempo.numero}
                    >

                      <span>
                        {tiempo.numero}
                      </span>

                      <strong>
                        {tiempo.nombre}
                      </strong>

                    </div>

                  ))}

                </div>



                <p className="modal-nota">
                  La composición específica puede variar
                  de acuerdo con la propuesta gastronómica
                  disponible.
                </p>

              </div>

            )
          }



          {/* ==================================================
              MARIDAJE
          ================================================== */}

          {
            experiencia.tipo === 'maridaje' && (

              <div className="experiencia-modal-destacado">

                <span>
                  COMPLEMENTO DE LA EXPERIENCIA
                </span>

                <p>
                  Puede seleccionarse durante
                  el registro de cada comensal.
                </p>

              </div>

            )
          }



          {/* ==================================================
              SIN ALCOHOL
          ================================================== */}

          {
            experiencia.tipo === 'sin-alcohol' && (

              <div className="experiencia-modal-destacado">

                <span>
                  ALTERNATIVA SIN ALCOHOL
                </span>

                <p>
                  Pensada para quienes desean
                  acompañar el menú sin bebidas
                  alcohólicas.
                </p>

              </div>

            )
          }



          {/* =========================
              RESERVAR
          ========================= */}

          <Link
            to="/reserva"

            className="btn btn-modal-experiencia"

            onClick={onCerrar}
          >
            RESERVAR EXPERIENCIA
          </Link>

        </div>

      </div>

    </div>

  );

};