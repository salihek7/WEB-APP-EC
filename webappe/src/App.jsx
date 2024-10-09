import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FavoritesProvider } from './contexts/FavoritesContext';
import SearchPage from './components/SearchPage';
import ProductDetail from './components/ProductDetail';
import FavoritesPage from './components/FavoritesPage';

const App = () => {
    return (
        <FavoritesProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<SearchPage />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                </Routes>
            </Router>
        </FavoritesProvider>
    );
};

export default App;
