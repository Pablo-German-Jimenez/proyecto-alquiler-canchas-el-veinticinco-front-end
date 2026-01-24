import { Link } from "react-router-dom";
import "../../styles/footer.css";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <Container fluid>
      <Row className="links-section bg-black text-white pt-4">
        <div className="container">
          <div className="row text-center text-md-start pb-2">
            {/* Columna Contactanos */}
            <div className="col-md-3 mb-3 text-center">
              <h6 className="titulos-redes fw-bold mb-1">Contactanos</h6>
              <div className="d-flex justify-content-center gap-3 social-icons">
                <a
                  href="https://web.whatsapp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-whatsapp"></i>
                </a>
                <Link to="contacto">
                  <i className="bi bi-envelope"></i>
                </Link>
                <a
                  href="https://maps.app.goo.gl/Nt4DT2jjkq47mHa59"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="bi bi-geo-alt"></i>
                </a>
              </div>
            </div>

            {/* Columna Nosotros */}
            <div className="col-md-3 mb-3 text-center">
              <h6 className="titulos-redes fw-bold mb-1">Nosotros</h6>
              <div className="d-flex justify-content-center gap-3 social-icons">
                <Link to="nosotros">
                  <i className="bi bi-person-hearts"></i>
                </Link>
              </div>
            </div>

            {/* Columna Redes */}
            <div className="col-md-3 mb-3 text-center">
              <h6 className="titulos-redes fw-bold mb-1">Nuestras redes</h6>
              <div className="d-flex justify-content-center gap-3 social-icons">
                <a
                  href="https://www.instagram.com/rollingcodeschool/#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-instagram"></i>
                </a>
                <a
                  href="https://www.facebook.com/RollingCodeSchool"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-facebook"></i>
                </a>
                <a
                  href="https://www.linkedin.com/school/rollingcodeschool/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>

            {/* Columna Descarga */}
            <div className="col-md-3 mb-1 text-center">
              <h6 className="titulos-redes fw-bold mb-1">Descargá la app</h6>
              <div className="d-flex justify-content-center gap-3 social-icons">
                <Link to="*">
                  <i className="bi bi-apple"></i>
                </Link>
                <Link to="*">
                  <i className="bi bi-google-play"></i>{" "}
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mb-4 pt-3 border-top border-secondary">
            <small className="text-muted">
              © Copyright 2025. Todos los derechos reservados.
            </small>
          </div>
        </div>
      </Row>

      {/* BOTÓN FLOTANTE WHATSAPP */}
      <a
        href="https://wa.me/"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="bi bi-whatsapp"></i>
      </a>
    </Container>
  );
};

export default Footer;
