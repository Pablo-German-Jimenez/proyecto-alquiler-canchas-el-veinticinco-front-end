import { Container, Card, Row, Col, Button } from "react-bootstrap";
import PaulaCabana from "../../img/PaulaCabana.jpg";
import MaximilianoGuerrero from "../../img/MaximilianoGuerrero.jpg";
import IgnacioLedesma from "../../img/IgnacioLedesma.jpg";
import GermanJimenez from "../../img/GermanJimenez.jpg";
import JoaquinAlbornoz from "../../img/JoaquinAlbornoz.jpg";
import "../../styles/nosotros.css";
import { Link } from "react-router-dom";

const Nosotros = () => {
  return (
    <section id="nosotros" className="container">
      <h2 className="text-center h2Nosotros mt-5 mb-3 mx-3">
        ⚽ Cancheros: El Punto de Encuentro del Deporte y la Pasión
      </h2>

      <p>
        <Link to="/" className="text-decoration-none marca fw-bold">
          Cancheros
        </Link>{" "}
        nace con la misión de ser la{" "}
        <strong>plataforma integral de referencia</strong> para todos los
        entusiastas del fútbol y el deporte. Entendemos la pasión que mueve a
        millones de personas a disfrutar de este deporte, y por eso,
        simplificamos y enriquecemos cada aspecto de esa experiencia.
      </p>

      <p>
        Nuestro portal no solo facilita el acceso a la cancha, sino que
        entretiene e informa a nuestros usuarios sobre las diferentes
        alternativas para practicar su deporte favorito. En un solo lugar, los
        usuarios pueden:
      </p>

      <ul>
        <li>
          <strong>Encontrar y Reservar:</strong> Localizar rápidamente los datos
          de canchas, complejos deportivos y/o torneos.
        </li>
        <li>
          <strong>Decidir:</strong> Obtener información relevante para tomar la
          mejor decisión sobre cuándo, dónde, cómo y con quién jugar, sin
          importar su nivel de habilidad.
        </li>
      </ul>

      <h2 className="text-center h2Nosotros mt-5 mb-3 mx-3">
        🛍️ Tu Equipo en la Cancha: El E-commerce de Cancheros
      </h2>

      <p>
        La experiencia deportiva completa requiere el equipo adecuado. Por eso,{" "}
        <Link to="/" className="text-decoration-none marca fw-bold">
          Cancheros
        </Link>{" "}
        extiende su plataforma para convertirse en tu fuente confiable de
        artículos deportivos de alta calidad.
      </p>

      <p>
        Nuestro e-commerce está impulsado por la pasión por el juego y te
        ofrece:
      </p>

      <ul>
        <li>
          <strong>Todo el Equipamiento Necesario:</strong> Desde indumentaria
          técnica y calzado hasta accesorios esenciales como pelotas, elementos
          de entrenamiento y más.
        </li>
        <li>
          <strong>Catálogo Especializad:</strong> Catálogos organizados por
          segmento (<strong>Masculino, Femenino, Niños</strong> y{" "}
          <strong>Accesorios</strong>) para que encuentres con precisión lo que
          necesitas para tu actividad.
        </li>
      </ul>

      <p className="mx-3">
        <Link to="/" className="text-decoration-none marca fw-bold">
          Cancheros
        </Link>{" "}
        es la única plataforma que{" "}
        <strong>
          te conecta con el lugar ideal para jugar y te provee el equipamiento
          para hacerlo
        </strong>
        , uniendo la logística de la reserva con la calidad del producto,
        siempre enfocado en tu rendimiento y disfrute.
      </p>

      <p className="display-6 text-center mx-5 mt-4 my-5">
        ¡Somos Cancheros, y estamos hechos para tu pasión por el deporte!
      </p>

      <section className="container-fluid bg-primary-subtle py-3 text-center mb-4">
        <h3>Conocé el equipo:</h3>
      </section>
      <Container className="mb-3">
        <Row className="row-gap-3 justify-content-center">
          {/*Nacho*/}
          <Col xs={10} md={5} lg={2}>
            <Card className="cardNosotros h-100">
              <Card.Img
                variant="top"
                className="imgCardNosotros mt-3"
                src={IgnacioLedesma}
                alt="José Ignacio Ledesma Padilla"
              />
              <Card.Body>
                <Card.Title className="nameCardNosotros">
                  Ignacio Ledesma
                </Card.Title>
                <Row>
                  <Col xs={6} className="text-center">
                    <a
                      href="https://github.com/ledesmapadilla"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-github iconoCard"></i>
                    </a>
                  </Col>
                  <Col xs={6} className="text-center">
                    <a href="*" target="_blank" rel="noopener noreferrer">
                      <i className="bi bi-linkedin iconoCard"></i>
                    </a>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          {/*Tali*/}
          <Col xs={10} md={5} lg={2}>
            <Card className="cardNosotros h-100">
              <Card.Img
                variant="top"
                className="imgCardNosotros mt-3"
                src={PaulaCabana}
                alt="Tali Cabana"
              />
              <Card.Body>
                <Card.Title className="nameCardNosotros">
                  Paula Cabana
                </Card.Title>
                <Row>
                  <Col xs={6} className="text-center">
                    <a
                      href="https://github.com/TaliCabana"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-github iconoCard"></i>
                    </a>
                  </Col>
                  <Col xs={6} className="text-center">
                    <a
                      href="https://www.linkedin.com/in/paula-cabana-ingenieraindustrial/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-linkedin iconoCard"></i>
                    </a>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          {/*Germán*/}
          <Col xs={10} md={5} lg={2}>
            <Card className="cardNosotros h-100">
              <Card.Img
                variant="top"
                className="imgCardNosotros mt-3"
                src={GermanJimenez}
                alt="Germán Jimenez"
              />
              <Card.Body>
                <Card.Title className="nameCardNosotros">
                  Germán Jiménez
                </Card.Title>
                <Row>
                  <Col xs={6} className="text-center">
                    <a
                      href="https://github.com/Pablo-German-Jimenez"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-github iconoCard"></i>
                    </a>
                  </Col>
                  <Col xs={6} className="text-center">
                    <a
                      href="https://www.linkedin.com/in/pablo-german-jimenez-0b706a200/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-linkedin iconoCard"></i>
                    </a>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          {/*Maxi*/}
          <Col xs={10} md={5} lg={2}>
            <Card className="cardNosotros h-100">
              <Card.Img
                variant="top"
                className="imgCardNosotros mt-3"
                src={MaximilianoGuerrero}
                alt="Maxi Guerrero"
              />
              <Card.Body>
                <Card.Title className="nameCardNosotros">
                  Maximiliano Guerrero
                </Card.Title>
                <Row>
                  <Col xs={6} className="text-center">
                    <a
                      href="https://github.com/maxiguerrero767"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-github iconoCard"></i>
                    </a>
                  </Col>
                  <Col xs={6} className="text-center">
                    <a href="*" target="_blank" rel="noopener noreferrer">
                      <i className="bi bi-linkedin iconoCard"></i>
                    </a>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          {/*Joaquín*/}
          <Col xs={10} md={5} lg={2}>
            <Card className="cardNosotros h-100">
              <Card.Img
                variant="top"
                className="imgCardNosotros mt-3"
                src={JoaquinAlbornoz}
                alt="Joaquín Albornoz"
              />
              <Card.Body>
                <Card.Title className="nameCardNosotros">
                  Joaquín Albornoz
                </Card.Title>
                <Row>
                  <Col xs={6} className="text-center">
                    <a
                      href="https://github.com/JQNPro10"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-github iconoCard"></i>
                    </a>
                  </Col>
                  <Col xs={6} className="text-center">
                    <a href="*" target="_blank" rel="noopener noreferrer">
                      <i className="bi bi-linkedin iconoCard"></i>
                    </a>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <div className="d-flex justify-content-center mb-4">
        <Button as={Link} to="/" className="boton-volver-inicio">
          <i className="bi bi-arrow-bar-left"> Volver al Inicio </i>
        </Button>
      </div>
    </section>
  );
};

export default Nosotros;
