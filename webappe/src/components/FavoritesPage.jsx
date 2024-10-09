import React from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FavoritesPage = () => {
    const { favorites, toggleFavorite } = useFavorites();

    return (
        <Container>
            <Title>Your Favorites</Title>
            {favorites.length === 0 ? (
                <Message>No favorites yet!</Message>
            ) : (
                <ProductList>
                    {favorites.map((product, index) => (
                        <ProductItem key={index}>
                            <Link to={`/product/${product.id}`}>
                                <ProductImage src={product.image} alt={product.title} />
                                <ProductTitle>{product.title}</ProductTitle>
                                <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
                            </Link>
                            <RemoveButton onClick={() => toggleFavorite(product)}>
                                Remove from Favorites
                            </RemoveButton>
                        </ProductItem>
                    ))}
                </ProductList>
            )}
        </Container>
    );
};

const Container = styled.div`
    padding: 20px;
    background-color: #f8f9fa;
    min-height: 100vh;
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
`;

const Message = styled.p`
    text-align: center;
`;

const ProductList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
`;

const ProductItem = styled.div`
    border: 1px solid #dee2e6;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.2s;
    text-align: center;

    &:hover {
        transform: scale(1.05);
    }
`;

const ProductImage = styled.img`
    width: 100%;
    height: 150px;
    object-fit: cover;
`;

const ProductTitle = styled.h2`
    font-size: 16px;
    padding: 10px;
`;

const ProductPrice = styled.p`
    font-size: 14px;
    padding: 0 10px;
`;

const RemoveButton = styled.button`
    margin: 10px;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: #dc3545;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #c82333;
    }
`;

export default FavoritesPage;
