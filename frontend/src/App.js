import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    {/* Página de boas-vindas */}
                    <Route
                        path="/"
                        element={
                            <div id='App'>
                                <h1>Bem-vindo à Iara Noivas!</h1>
                                <p>Aluguel de vestidos de festas, formatura e casamento.</p>
                                <button>
                                    <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
                                        Ir para a Loja
                                    </Link>
                                </button>
                            </div>
                        }
                    />

                    {/* Página principal (HomePage) */}
                    <Route path="/home" element={<HomePage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
