import { useContext, useState } from "react";
import styled from "styled-components";
import userContext from "../context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TransactionsPage() {
	const [valueTransiction, setValueTransiction] = useState([]);
	const [transictionDescription, setTransictionDescription] = useState("");
	const { transInfo, token } = useContext(userContext);
	const navigate = useNavigate();

	function attTransaction(e) {
		e.preventDefault();

		const url = `https://mywallet-back-tcxg.onrender.com/nova-transacao/${transInfo}`;

		const body = {
			value: valueTransiction,
			description: transictionDescription,
		};
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const promise = axios.post(url, body, config);

		promise.then((r) => {
			navigate("/home");
			alert("Criado com sucesso");
		});
		promise.catch((e) => console.log(e));
	}

	return (
		<TransactionsContainer>
			<h1>Nova TRANSAÇÃO</h1>
			<form onSubmit={attTransaction}>
				<input
					placeholder="Valor"
					type="text"
					required
					value={valueTransiction}
					onChange={(e) => setValueTransiction(e.target.value)}
				/>
				<input
					placeholder="Descrição"
					type="text"
					required
					value={transictionDescription}
					onChange={(e) => setTransictionDescription(e.target.value)}
				/>
				<button type="submit">Salvar TRANSAÇÃO</button>
			</form>
		</TransactionsContainer>
	);
}

const TransactionsContainer = styled.main`
	height: calc(100vh - 50px);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;

	h1 {
		align-self: flex-start;
		margin-bottom: 40px;
	}
`;
