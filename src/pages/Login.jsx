import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const iniciarSesion = (e) => {

    e.preventDefault();

    if (
      usuario.trim() === '' ||
      password.trim() === ''
    ) {
      setError('Completa todos los campos');
      return;
    }

    setError('');

    // Login simulado para el parcial
    navigate('/panel');
  };


  return (

    <section className="login-page">

      <div className="login-contenedor">


        {/* LADO IZQUIERDO */}

        <div className="login-imagen">

          <div className="login-overlay"></div>

          <div className="login-marca">

            <span>
              MAYTA
            </span>

            <h1>
              GESTIÓN DE
              <br />
              RESERVAS
            </h1>

            <p>
              Panel administrativo del restaurante.
            </p>

          </div>

        </div>



        {/* FORMULARIO */}

        <div className="login-formulario">

          <div className="login-box">

            <span className="login-subtitulo">
              INTRANET MAYTA
            </span>

            <h2>
              INICIAR SESIÓN
            </h2>

            <p className="login-texto">
              Ingresa tus credenciales para acceder
              al panel administrativo.
            </p>


            <form onSubmit={iniciarSesion}>


              {/* USUARIO */}

              <div className="login-grupo">

                <label>
                  Usuario
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese su usuario"
                  value={usuario}
                  onChange={(e) =>
                    setUsuario(e.target.value)
                  }
                />

              </div>



              {/* CONTRASEÑA */}

              <div className="login-grupo">

                <label>
                  Contraseña
                </label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

              </div>



              {/* ERROR */}

              {error && (

                <div className="login-error">
                  {error}
                </div>

              )}



              {/* BOTÓN */}

              <button
                type="submit"
                className="btn btn-login"
              >
                INGRESAR AL PANEL
              </button>


            </form>


            <button
              type="button"
              className="login-volver"
              onClick={() => navigate('/')}
            >
              ← Volver al sitio web
            </button>

          </div>

        </div>


      </div>

    </section>

  );

};