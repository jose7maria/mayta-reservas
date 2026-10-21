import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const Login = () => {

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);


  const iniciarSesion = (e) => {

  e.preventDefault();

  if (
    usuario.trim() === '' ||
    password.trim() === ''
  ) {
    setError('Completa todos los campos');
    return;
  }


  if (
    usuario === 'admin' &&
    password === 'mayta2026'
  ) {

    setError('');

    navigate('/panel');

  } else {

    setError('Usuario o contraseña incorrectos');

  }

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

                <div className="login-password">

  <input
    type={mostrarPassword ? 'text' : 'password'}
    className="form-control"
    placeholder="Ingrese su contraseña"
    value={password}
    onChange={(e) =>
      setPassword(e.target.value)
    }
  />

  <button
    type="button"
    className="btn-ver-password"
    onClick={() =>
      setMostrarPassword(!mostrarPassword)
    }
    aria-label={
      mostrarPassword
        ? 'Ocultar contraseña'
        : 'Mostrar contraseña'
    }
    title={
      mostrarPassword
        ? 'Ocultar contraseña'
        : 'Mostrar contraseña'
    }
  >

    {mostrarPassword ? (

      /* OJO CERRADO */
      <svg
        viewBox="0 0 24 24"
        width="21"
        height="21"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 3l18 18" />
        <path d="M10.6 10.6a2 2 0 002.8 2.8" />
        <path d="M9.9 4.2A10.7 10.7 0 0112 4c5 0 9 4 10 8a11.8 11.8 0 01-2.1 4.1" />
        <path d="M6.6 6.6C4.4 8 2.8 10 2 12c1 4 5 8 10 8a10.7 10.7 0 005.4-1.5" />
      </svg>

    ) : (

      /* OJO ABIERTO */
      <svg
        viewBox="0 0 24 24"
        width="21"
        height="21"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
      </svg>

    )}

  </button>

</div>

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