import logoMayta from '../assets/img/logo-mayta.png';

export const Footer = () => {
  return (
    <footer className="footer-mayta" id="contacto">

      <div className="container">

        <div className="row gy-4">

          {/* MAYTA */}
          <div className="col-md-4">

            <img
              src={logoMayta}
              alt="MAYTA"
              className="footer-logo"
            />

            <p className="footer-frase">
              Una experiencia gastronómica inspirada
              en el territorio peruano.
            </p>

          </div>


          {/* CONTACTO */}
          <div className="col-md-4">

            <h4>CONTACTO</h4>

            <p>Miraflores · Lima, Perú</p>
            <p>Reservas y consultas</p>
            <p>contacto@mayta.pe</p>

          </div>


          {/* ENLACES */}
          <div className="col-md-4">

            <h4>SÍGUENOS</h4>

            <div className="footer-redes">

              <a href="#instagram">
                Instagram
              </a>

              <a href="#facebook">
                Facebook
              </a>

              <a href="#tiktok">
                TikTok
              </a>

            </div>

          </div>

        </div>


        <div className="footer-linea"></div>


        <div className="footer-inferior">

          <span>
            © 2026 MAYTA
          </span>

          <span>
            Sistema de Reservas
          </span>

        </div>

      </div>

    </footer>
  );
};