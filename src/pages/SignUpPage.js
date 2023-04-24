import { Link } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
	const [email, setEmail] = useState([]);
	const [password, setPassword] = useState([]);
	const [confirmPassword, setConfirmPassword] = useState([]);
	const [name, setName] = useState([]);
	const navigate = useNavigate();

	function sendInfoSignup(e) {
		e.preventDefault();

		if (password !== confirmPassword) return alert("As senhas não coincidem!");

		const body = {
			name,
			email,
			password,
		};

		const url = "https://mywallet-back-tcxg.onrender.com/cadastro";

		const promise = axios
			.post(url, body)
			.then((res) => {
				alert("Conta Criada com sucesso!");
				navigate("/");
			})
			.catch((err) => alert(err.response.data));
	}

	return (
		<SingUpContainer>
			<form onSubmit={sendInfoSignup}>
				<MyWalletLogo />
				<input
					placeholder="Nome"
					type="text"
					required
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					placeholder="E-mail"
					type="email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					placeholder="Senha"
					type="password"
					autoComplete="new-password"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input
					placeholder="Confirme a senha"
					type="password"
					autoComplete="new-password"
					required
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				<button type="submit">Cadastrar</button>
			</form>

			<Link to={"/"}>Já tem uma conta? Entre agora!</Link>
		</SingUpContainer>
	);
}

const SingUpContainer = styled.section`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
