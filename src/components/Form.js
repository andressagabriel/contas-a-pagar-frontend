import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

const Form = ({ getContas, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const conta = ref.current;

            conta.nome.value = onEdit.nome;
            conta.valor.value = onEdit.valor;
            conta.taxaJuros.value = onEdit.taxaJuros;
            conta.vencimento.value = onEdit.vencimento;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const conta = ref.current;

        if (
            !conta.nome.value ||
            !conta.valor.value ||
            !conta.taxaJuros.value ||
            !conta.vencimento.value
        ) {
            return toast.warn("Preencha todos os campos.");
        }

        const date = new Date(conta.vencimento.value);
        const vencimento = new Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(date);
        console.log(vencimento);

        if (onEdit) {
            await axios
                .put("http://localhost:8080/api/contas", {
                    codigo: onEdit.codigo,
                    nome: conta.nome.value,
                    valor: conta.valor.value,
                    taxaJuros: conta.taxaJuros.value,
                    vencimento: vencimento
                })
                .then(() => toast.success("Conta atualizada com sucesso."))
                .catch((err) => toast.error(err.response.data));
        } else {
            await axios
                .post("http://localhost:8080/api/contas", {
                    nome: conta.nome.value,
                    valor: conta.valor.value,
                    taxaJuros: conta.taxaJuros.value,
                    vencimento: vencimento
                })
                .then(() => toast.success("Conta inserida com sucesso."))
                .catch((err) => toast.error(err.response.data));
        }

        conta.nome.value = "";
        conta.valor.value = "";
        conta.taxaJuros.value = "";
        conta.vencimento.value = "";

        setOnEdit(null);
        getContas();
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome</Label>
                <Input name="nome" />
            </InputArea>
            <InputArea>
                <Label>Valor</Label>
                <Input name="valor" />
            </InputArea>
            <InputArea>
                <Label>Taxa Juros</Label>
                <Input name="taxaJuros" />
            </InputArea>
            <InputArea>
                <Label>Vencimento</Label>
                <Input name="vencimento" type="date" />
            </InputArea>

            <Button type="submit">Salvar</Button>
        </FormContainer>
    );
};

export default Form;