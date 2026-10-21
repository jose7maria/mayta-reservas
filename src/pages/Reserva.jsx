import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Reserva = () => {

  const navigate = useNavigate();

  const [fecha, setFecha] = useState('');
  const [personas, setPersonas] = useState(2);
  const [zona, setZona] = useState('Sin preferencia');
  const [accesible, setAccesible] = useState(false);
  const [sillaNino, setSillaNino] = useState(false);


  const aumentarPersonas = () => {
    if (personas < 10) {
      setPersonas(personas + 1);
    }
  };


  const disminuirPersonas = () => {
    if (personas > 1) {
      setPersonas(personas - 1);
    }
  };


const buscarDisponibilidad = () => {

  if (fecha === '') {
    alert('Selecciona una fecha');
    return;
  }

  navigate('/disponibilidad', {
    state: {
      fecha: fecha,
      personas: personas,
      zona: zona,
      accesible: accesible,
      sillaNino: sillaNino
    }
  });
};

  return (
    <section className="reserva-page">

      <div className="container">

        <div className="reserva-box">

          <div className="reserva-header">

            <span>RESERVAS MAYTA</span>

            <h1>RESERVA TU MESA</h1>

            <p>
              Selecciona cuándo deseas vivir la experiencia.
            </p>

          </div>


          {/* PROGRESO */}

          <div className="reserva-pasos">

            <span className="paso activo">1</span>
            <span className="linea"></span>
            <span className="paso">2</span>
            <span className="linea"></span>
            <span className="paso">3</span>
            <span className="linea"></span>
            <span className="paso">4</span>

          </div>


          {/* FECHA */}

          <div className="reserva-grupo">

            <label>
              Fecha
            </label>

            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="form-control"
            />

          </div>


          {/* PERSONAS */}

          <div className="reserva-grupo">

            <label>
              Número de personas
            </label>

            <div className="selector-personas">

              <button
                type="button"
                onClick={disminuirPersonas}
              >
                −
              </button>

              <span>
                {personas} personas
              </span>

              <button
                type="button"
                onClick={aumentarPersonas}
              >
                +
              </button>

            </div>

          </div>


          {/* ZONA */}

          <div className="reserva-grupo">

            <label>
              Preferencia de ubicación
            </label>

            <select
              className="form-select"
              value={zona}
              onChange={(e) => setZona(e.target.value)}
            >

              <option>Sin preferencia</option>
              <option>Salón principal</option>
              <option>Terraza / exterior</option>
              <option>Barra</option>
              <option>Salón privado</option>
              <option>Zona accesible</option>

            </select>

          </div>


          {/* NECESIDADES */}

          <div className="reserva-opciones">

            <label>

              <input
                type="checkbox"
                checked={accesible}
                onChange={(e) => setAccesible(e.target.checked)}
              />

              Requiero acceso para silla de ruedas

            </label>


            <label>

              <input
                type="checkbox"
                checked={sillaNino}
                onChange={(e) => setSillaNino(e.target.checked)}
              />

              Necesito silla para niño

            </label>

          </div>


          <button
            type="button"
            className="btn buscar-disponibilidad"
            onClick={buscarDisponibilidad}
          >
            BUSCAR DISPONIBILIDAD
          </button>

        </div>

      </div>

    </section>
  );
};


