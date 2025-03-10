import { Button, Col, Container, Dropdown, Navbar, Row } from "react-bootstrap";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";

function App() {
  const [before, setBefore] = useState("");
  const [after, setAfter] = useState("");
  const [textOne, setTextOne] = useState("");
  const [result, setResult] = useState("")

  const clickHandlerOne = (e) => {

    const language = e.target.getAttribute("data-value");

    if (language) {
      setBefore(language);
    }
  };

  const clickHandlerTwo = (e) => {
    const language = e.target.getAttribute("data-value");

    if (language) {
      setAfter(language);
    }
  };

  const textTranslate = async () => {

    if (textOne.length < 1 || !before || !after) {
      toast('زبان ورودی و خروجی ومتن وارد کنید', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
        return;
    };

    try {
      const response = await axios.get(
        "https://api.mymemory.translated.net/get",
        {
          params: {
            q: textOne,
            langpair: `${before}|${after}`,
          },
        }
      );
      setResult(response.data.responseData.translatedText)
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <Navbar bg="success" data-bs-theme="dark" expand="lg">
        <Container>
          <Navbar.Brand>Translate App</Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="d-flex align-items-center justify-content-around mt-5 mb-5">
        <Row>
          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {before ? `Selected: ${before}` : "Selecte Language"}
              </Dropdown.Toggle>

              <Dropdown.Menu onClick={clickHandlerOne}>
                <Dropdown.Item data-value="en">English</Dropdown.Item>
                <Dropdown.Item data-value="fa">pesian</Dropdown.Item>
                <Dropdown.Item data-value="ar">Arabic</Dropdown.Item>
                <Dropdown.Item data-value="fr">France</Dropdown.Item>
                <Dropdown.Item data-value="de">Germany</Dropdown.Item>
                <Dropdown.Item data-value="es">Spain</Dropdown.Item>
                <Dropdown.Item data-value="ru">Russian</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <textarea
              placeholder="Please Write Here"
              className="mt-4 p-2"
              value={textOne}
              onChange={(e) => setTextOne(e.target.value)}
              rows={6}
              cols={50}
            ></textarea>
          </Col>
          <Col>
            <Button variant="success" onClick={textTranslate}>Translate</Button>
          </Col>
          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="danger" id="dropdown-basic">
                {after ? `Selected: ${after}` : "Selecte Language"}
              </Dropdown.Toggle>

              <Dropdown.Menu onClick={clickHandlerTwo}>
                <Dropdown.Item data-value="en">English</Dropdown.Item>
                <Dropdown.Item data-value="fa">pesian</Dropdown.Item>
                <Dropdown.Item data-value="ar">Arabic</Dropdown.Item>
                <Dropdown.Item data-value="fr">France</Dropdown.Item>
                <Dropdown.Item data-value="de">Germany</Dropdown.Item>
                <Dropdown.Item data-value="es">Spain</Dropdown.Item>
                <Dropdown.Item data-value="ru">Russian</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <textarea
              className="mt-4 p-2"
              value={result}
              rows={6}
              cols={50}
            ></textarea>
          </Col>
        </Row>
      </Container>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#198754"
          fill-opacity="1"
          d="M0,96L48,106.7C96,117,192,139,288,165.3C384,192,480,224,576,202.7C672,181,768,107,864,69.3C960,32,1056,32,1152,48C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      <div
        style={{
          backgroundColor: "#198754",
          textAlign: "center",
          color: "white",
          fontSize: "20px",
        }}
      >
        Developed By Hassan
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
