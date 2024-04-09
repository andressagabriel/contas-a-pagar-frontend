import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid.js";
import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
 
const Title = styled.h2``;

function App() {
  const [contas, setContas] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getContas = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/contas");
      setContas(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getContas();
  }, [setContas]); 

  return (
    <>
    <Container>
      <Title>CONTAS A PAGAR</Title>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getContas={getContas} />
      <Grid contas={contas} setContas={setContas} setOnEdit={setOnEdit} getContas={getContas} />
    </Container>
    <ToastContainer autoClose={3000} position={toast.BOTTOM_LEFT} />
    <GlobalStyle />
    </>
  );
}

export default App;
