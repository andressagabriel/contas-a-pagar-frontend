import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit, FaPaypal } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
    width: 100%;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 800px;
    margin: 20px auto;
    word-break: break-all;
    background-color: #fff;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;
`;

export const Td = styled.td`
    padding-top: 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")};
`;

const Grid = ({ contas, setContas, setOnEdit, getContas }) => {
    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const handleDelete = async (codigo) => {
        await axios
            .delete("http://localhost:8080/api/contas/" + codigo)
            .then(({ data }) => {
                const array = contas.filter((conta) => conta.codigo !== codigo);

                setContas(array);
                toast.success(data);
            })
            .catch((err) => toast.error(err.response.data));

        setOnEdit(null);
    };

    const handlePay = async (codigo) => {
        await axios
            .put("http://localhost:8080/api/contas/pagar/" + codigo)
            .then(() => {
                
                toast.success("Conta paga com sucesso.");
            })
            .catch((err) => toast.error(err.response.data));

        setOnEdit(null);
        getContas();
    };
    
    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Nome</Th>
                    <Th>Vencimento</Th>
                    <Th>Taxa</Th>
                    <Th>Atraso</Th>
                    <Th>Valor</Th>
                    <Th>Juros</Th>
                    <Th>Total</Th>

                    <Th>Pago</Th>

                    <Th></Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {contas.map((item, i) => (
                    <Tr key={i}>
                        <Td width="17%">{item.nome}</Td>
                        <Td width="17%">{item.vencimento}</Td>
                        <Td width="8%">{item.taxaJuros}</Td>
                        <Td width="10%">{item.diasAtraso}</Td>
                        <Td width="10%">{item.valor}</Td>
                        <Td width="10%">{item.juros}</Td>
                        <Td width="10%">{item.valorTotal}</Td>
                        <Td width="8%">{item.paga ? "Sim" : "Não"}</Td>
                        
                        <Td  alignCenter width="4%">
                            {item.paga ? "" : <FaEdit onClick={() => handleEdit(item)} /> }
                        </Td>
                        <Td alignCenter width="4%">
                            <FaTrash onClick={() => handleDelete(item.codigo)} />
                        </Td>
                        <Td alignCenter width="4%">
                            <FaPaypal onClick={() => handlePay(item.codigo)} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid;