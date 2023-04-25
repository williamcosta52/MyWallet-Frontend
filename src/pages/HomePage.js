import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import userContext from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
	const { token, userInfo, setTransInfo } = useContext(userContext);
	const [userTransactions, setUserTransactions] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const url = "https://mywallet-back-tcxg.onrender.com/transacoes";
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
				setUserTransactions(r);
			})
			.catch((e) => console.log(e));
	}, [userTransactions]);

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

	return (
		<HomeContainer>
			<Header>
				<h1>Olá, {userInfo.data.name}</h1>
				<BiExit />
			</Header>

			<TransactionsContainer>
				<ul>
					<ListItemContainer>
						<div>
							{/* {userTransactions.length === 0 ? (
								<span>Nenhuma transação encontrada</span>
							) : (
								userTransactions.map((t) => {
									return (
										<>
											<span>{t.date}</span>
											<strong>{t.description}</strong>
										</>
									);
								})
							)} */}
							<span>Nenhuma transação</span>
						</div>
						<Value color={"negativo"}>10 real</Value>
					</ListItemContainer>
				</ul>
				<article>
					<strong>Saldo</strong>
					<Value color={"positivo"}>2880,00</Value>
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
	color: ${(props) => (props.color === "positivo" ? "green" : "red")};
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
