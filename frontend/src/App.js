import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";
import AboutUs from "./components/sections/AboutUs";
import Header from "./components/Header";
import CollectionsPage from "./pages/CollectionsPage";
import MoodboardPage from "./pages/MoodboardPage";  
import { MoodboardProvider } from "./context/MoodboardContext"; 
import Collection_ID from "./pages/Collection_ID";



function App() {
    return (
        <MoodboardProvider>  
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
                                    <button id="go-to-store">
                                        <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
                                            Ir para a Loja
                                        </Link>
                                    </button>
                                </div>
                            }
                        />

                        {/* Páginas principais */}
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/about" element={
                            <>
                                <Header />
                                <AboutUs />
                            </>
                        } />
                        <Route path="/collections" element={<CollectionsPage />} />  
                        <Route path="/moodboard" element={<MoodboardPage />} />  {/* ✅ Adicionando a rota do Moodboard */}
                        <Route path="/collections/:id" element={<Collection_ID />} /> {/* ✅ Rota dinâmica */}
                        
                    </Routes>
                </div>
            </Router>
        </MoodboardProvider> 
    );
}

export default App;
