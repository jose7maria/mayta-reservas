import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Contacto = () => {

  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    celular: '',
    motivo: 'Consulta general',
    mensaje: ''
  });

  const [enviado, setEnviado] = useState(false);


  const actualizarCampo = (e) => {

    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });

  };


  const enviarFormulario = (e) => {

    e.preventDefault();

    if (
      formulario.nombre.trim() === '' ||
      formulario.correo.trim() === '' ||
      formulario.mensaje.trim() === ''
    ) {
      alert('Completa los campos obligatorios');
      return;
    }

    setEnviado(true);

    setFormulario({
      nombre: '',
      correo: '',
      celular: '',
      motivo: 'Consulta general',
      mensaje: ''
    });

  };


  return (
    <>

      {/* =====================================
          HERO CONTACTO
      ===================================== */}

      <section className="contacto-hero">

        <div className="contacto-overlay"></div>


        <div className="container contacto-contenedor">

          <div className="contacto-grid">


            {/* =============================
                INFORMACIÓN
            ============================= */}

            <div className="contacto-presentacion">

              <span className="contacto-etiqueta">
                MAYTA · LIMA
              </span>

              <h1>
                HABLEMOS
              </h1>

              <p className="contacto-frase">
                Una experiencia también comienza
                con una conversación.
              </p>


              <div className="contacto-linea"></div>


              <div className="contacto-dato">

                <span>
                  RESERVAS
                </span>

                <strong>
                  Reserva tu experiencia en MAYTA
                </strong>

              </div>


              <div className="contacto-dato">

                <span>
                  CONSULTAS
                </span>

                <strong>
                  Eventos, experiencias y atención
                </strong>

              </div>


              <div className="contacto-dato">

                <span>
                  UBICACIÓN
                </span>

                <strong>
                  Lima · Perú
                </strong>

              </div>


              <Link
                to="/reserva"
                className="btn contacto-btn-reserva"
              >
                RESERVAR UNA MESA
              </Link>

            </div>



            {/* =============================
                FORMULARIO
            ============================= */}

            <div className="contacto-card">

              <span className="contacto-card-etiqueta">
                CONTACTO
              </span>

              <h2>
                ESCRÍBENOS
              </h2>

              <p>
                Déjanos tus datos y cuéntanos
                cómo podemos ayudarte.
              </p>


              {enviado && (

                <div className="contacto-exito">

                  <strong>
                    ✓ MENSAJE ENVIADO
                  </strong>

                  <span>
                    Gracias por comunicarte con MAYTA.
                  </span>

                </div>

              )}


              <form onSubmit={enviarFormulario}>


                {/* NOMBRE */}

                <div className="contacto-grupo">

                  <label>
                    Nombre y apellidos *
                  </label>

                  <input
                    type="text"
                    name="nombre"
                    value={formulario.nombre}
                    onChange={actualizarCampo}
                    placeholder="Tu nombre"
                  />

                </div>



                {/* CORREO + CELULAR */}

                <div className="contacto-doble">

                  <div className="contacto-grupo">

                    <label>
                      Correo electrónico *
                    </label>

                    <input
                      type="email"
                      name="correo"
                      value={formulario.correo}
                      onChange={actualizarCampo}
                      placeholder="correo@ejemplo.com"
                    />

                  </div>


                  <div className="contacto-grupo">

                    <label>
                      Celular
                    </label>

                    <input
                      type="tel"
                      name="celular"
                      value={formulario.celular}
                      onChange={actualizarCampo}
                      placeholder="999 999 999"
                    />

                  </div>

                </div>



                {/* MOTIVO */}

                <div className="contacto-grupo">

                  <label>
                    Motivo de contacto
                  </label>

                  <select
                    name="motivo"
                    value={formulario.motivo}
                    onChange={actualizarCampo}
                  >

                    <option>
                      Consulta general
                    </option>

                    <option>
                      Reserva
                    </option>

                    <option>
                      Evento privado
                    </option>

                    <option>
                      Experiencia gastronómica
                    </option>

                    <option>
                      Prensa
                    </option>

                  </select>

                </div>



                {/* MENSAJE */}

                <div className="contacto-grupo">

                  <label>
                    Mensaje *
                  </label>

                  <textarea
                    name="mensaje"
                    value={formulario.mensaje}
                    onChange={actualizarCampo}
                    rows="5"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                  />

                </div>



                <button
                  type="submit"
                  className="btn contacto-btn-enviar"
                >
                  ENVIAR MENSAJE
                </button>


              </form>

            </div>

          </div>

        </div>

      </section>



      {/* =====================================
          INFORMACIÓN RÁPIDA
      ===================================== */}

      <section className="contacto-info">

        <div className="container">

          <div className="contacto-info-grid">


            <div>

              <span>
                01
              </span>

              <h3>
                RESERVAS
              </h3>

              <p>
                Gestiona directamente tu experiencia
                desde nuestro sistema de reservas.
              </p>

            </div>


            <div>

              <span>
                02
              </span>

              <h3>
                UBICACIÓN
              </h3>

              <p>
                Lima · Perú
              </p>

            </div>


            <div>

              <span>
                03
              </span>

              <h3>
                ATENCIÓN
              </h3>

              <p>
                Consultas, experiencias privadas
                y eventos especiales.
              </p>

            </div>


          </div>

        </div>

      </section>



      {/* =====================================
          CTA FINAL
      ===================================== */}

      <section className="contacto-final">

        <div>

          <span>
            VIVE MAYTA
          </span>

          <h2>
            ¿PREFIERES RESERVAR
            <br />
            DIRECTAMENTE?
          </h2>

        </div>


        <Link
          to="/reserva"
          className="btn contacto-final-btn"
        >
          RESERVAR MESA
        </Link>

      </section>

    </>
  );

};