import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";
import styled from "styled-components";
import axios from "axios";

export default function HomePage() {
	const { token, userInfo, setTransInfo } = useContext(userContext);
	const [userTransactions, setUserTransactions] = useState([]);
	const navigate = useNavigate();

	let balance = userTransactions
		.reduce((accumulator, transaction) => {
			if (transaction.type === "entrada") {
				return accumulator + Number(transaction.value);
			} else {
				return accumulator - Number(transaction.value);
			}
		}, 0)
		.toFixed(2);

	useEffect(() => {
		const url = `${process.env.REACT_APP_API_URL}/transacoes`;
		if (!token) {
			navigate("/");
		}
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axios
			.get(url, config)
			.then((r) => {
				setUserTransactions(r.data);
			})
			.catch((e) => console.log(e));
		const tokenLocal = localStorage.getItem("token");
		if (!tokenLocal) {
			navigate("/");
		}
	}, [setUserTransactions]);

	function addTransaction(e) {
		e.preventDefault();
		navigate("/nova-transacao/entrada");
		setTransInfo("entrada");
	}
	function exitTransaction(e) {
		e.preventDefault();
		navigate("/nova-transacao/saida");
		setTransInfo("saida");
	}
	function exit() {
		localStorage.removeItem("token");
		navigate("/");
	}

	return (
		<HomeContainer>
			<Header>
				<h1>Olá, {userInfo.data.name}</h1>
				<BiExit onClick={exit} />
			</Header>

			<TransactionsContainer>
				<ul>
					{userTransactions.length > 0 ? (
						userTransactions.reverse().map((t, index) => (
							<ListItemContainer key={index}>
								<div>
									<span>{t.date}</span>
									<strong>{t.description}</strong>
								</div>
								<Value color={t.type}>{Number(t.value).toFixed(2)}</Value>
							</ListItemContainer>
						))
					) : (
						<Span>Nenhuma transação</Span>
					)}
				</ul>
				<article>
					<strong>Saldo</strong>
					<Value color={balance < 0 ? "" : "entrada"}>{balance}</Value>
				</article>
			</TransactionsContainer>

			<ButtonsContainer>
				<button onClick={addTransaction}>
					<AiOutlinePlusCircle />
					<p>
						Nova <br /> entrada
					</p>
				</button>
				<button onClick={exitTransaction}>
					<AiOutlineMinusCircle />
					<p>
						Nova <br />
						saída
					</p>
				</button>
			</ButtonsContainer>
		</HomeContainer>
	);
}

const HomeContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: calc(100vh - 50px);
`;
const Header = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 2px 5px 2px;
	margin-bottom: 15px;
	font-size: 26px;
	color: white;
`;
const TransactionsContainer = styled.article`
	flex-grow: 1;
	background-color: #fff;
	color: #000;
	border-radius: 5px;
	padding: 16px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	article {
		display: flex;
		justify-content: space-between;
		strong {
			font-weight: 700;
			text-transform: uppercase;
		}
	}
`;
const ButtonsContainer = styled.section`
	margin-top: 15px;
	margin-bottom: 0;
	display: flex;
	gap: 15px;

	button {
		width: 50%;
		height: 115px;
		font-size: 22px;
		text-align: left;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		p {
			font-size: 18px;
		}
	}
`;
const Value = styled.div`
	font-size: 16px;
	text-align: right;
	color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`;
const ListItemContainer = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 8px;
	color: #000000;
	margin-right: 10px;
	div span {
		color: #c6c6c6;
		margin-right: 10px;
	}
`;
const Span = styled.span`
	font-family: "Raleway";
	font-style: normal;
	font-weight: 400;
	font-size: 20px;
	line-height: 23px;
	text-align: center;
	color: #868686;
`;
