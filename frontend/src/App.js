import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";
import AboutUs from "./pages/AboutUs";
import CollectionsPage from "./pages/CollectionsPage";
import MoodboardPage from "./pages/MoodboardPage";  
import { MoodboardProvider } from "./context/MoodboardContext"; 
import Collection_ID from "./pages/CollectionId";
import Contact from "./pages/Contact";
import { Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

function App() {
    return (
        <MoodboardProvider>  
            <Router>
                <ScrollToTop />
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" replace />} />
                        {/* Páginas principais */}
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/collections" element={<CollectionsPage />} />  
                        <Route path="/moodboard" element={<MoodboardPage />} />  {/* ✅ Adicionando a rota do Moodboard */}
                        <Route path="/collections/:id" element={<Collection_ID />} /> {/* ✅ Rota dinâmica */}
                        <Route path="/contact" element={<Contact />} />  
                    </Routes>
            </Router>
        </MoodboardProvider> 
    );
}

export default App;
