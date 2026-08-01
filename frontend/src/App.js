import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import CollectionsPage from "./pages/CollectionsPage";
import MoodboardPage from "./pages/MoodboardPage";
import { MoodboardProvider } from "./context/MoodboardContext";
import CollectionSlugRouter from "./pages/CollectionSlugRouter";
import Contact from "./pages/Contact";
import { Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";






function App() {

   
    return (
        <HelmetProvider>
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
                            <Route path="/collections/:slug" element={<CollectionSlugRouter />} /> {/* categoria ou id de coleção */}
                            <Route path="/contact" element={<Contact />} />
                            <Route path="*" element={<Navigate to="/home" replace />}/>
                        </Routes>

                </Router>
            </MoodboardProvider>
        </HelmetProvider>
    );
}

export default App;
