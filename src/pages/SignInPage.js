import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import userContext from "../context/userContext";

export default function SignInPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { token, setToken, setUserInfo } = useContext(userContext);
	const navigate = useNavigate();

	function login(e) {
		e.preventDefault();
		const url = "https://mywallet-back-tcxg.onrender.com/login";
		const body = {
			email,
			password,
		};
		axios
			.post(url, body)
			.then((r) => {
				setToken(r.data);
				localStorage.setItem("token", token);
				navigate("/home");
			})
			.catch((e) => {
				alert(e.response.data);
			});
	}
	useEffect(() => {
		const body = {
			email,
			password,
		};
		axios
			.post("https://mywallet-back-tcxg.onrender.com/usuarios", body)
			.then((r) => setUserInfo(r))
			.catch((e) => console.log(e));
	}, [login]);

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
