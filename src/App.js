import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import TransactionsPage from "./pages/TransactionPage";
import userContext from "./context/userContext";
import { useState } from "react";

export default function App() {
	const [token, setToken] = useState([]);
	const [userInfo, setUserInfo] = useState([]);
	const [transInfo, setTransInfo] = useState("");

	const info = {
		token,
		setToken,
		userInfo,
		setUserInfo,
		transInfo,
		setTransInfo,
	};

	return (
		<userContext.Provider value={info}>
			<PagesContainer>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<SignInPage />} />
						<Route path="/cadastro" element={<SignUpPage />} />
						<Route path="/home" element={<HomePage />} />
						<Route
							path="/nova-transacao/:tipo"
							element={<TransactionsPage />}
						/>
					</Routes>
				</BrowserRouter>
			</PagesContainer>
		</userContext.Provider>
	);
}

const PagesContainer = styled.main`
	background-color: #8c11be;
	width: calc(100vw - 50px);
	max-height: 100vh;
	padding: 25px;
`;
