import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import axios from "axios";
import styled from "styled-components";
import userContext from "../context/userContext";

export default function SignInPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { token, setToken, setUserInfo } = useContext(userContext);
	const navigate = useNavigate();

	function login(e) {
		e.preventDefault();
		const url = `${process.env.REACT_APP_API_URL}/login`;
		const body = {
			email,
			password,
		};
		axios
			.post(url, body)
			.then((r) => {
				setToken(r.data);
				localStorage.setItem("token", r.data);
				navigate("/home");
			})
			.catch(() => {
				alert("Email ou senha inválidos");
			});
	}
	useEffect(() => {
		const body = {
			email,
			password,
		};
		axios
			.post(`${process.env.REACT_APP_API_URL}/usuarios`, body)
			.then((r) => setUserInfo(r))
			.catch((e) => console.log(e));
	}, []);

	return (
		<SingInContainer>
			<form onSubmit={login}>
				<MyWalletLogo />
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
				<button type="submit">Entrar</button>
			</form>

			<Link to={"/cadastro"}>Primeira vez? Cadastre-se!</Link>
		</SingInContainer>
	);
}

const SingInContainer = styled.section`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
