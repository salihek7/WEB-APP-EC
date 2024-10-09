import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import styled from 'styled-components';

const ProductDetail = () => {
    const { id } = useParams();
    const { favorites, toggleFavorite } = useFavorites();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            const data = await response.json();
            setProduct(data);
        };

        fetchProduct();
    }, [id]);

    if (!product) return <LoadingText>Loading...</LoadingText>;

    const isFavorite = favorites.includes(product);

    return (
        <Container>
            <Link to="/">Back to Search</Link>
            <ProductImage src={product.image} alt={product.title} />
            <ProductTitle>{product.title}</ProductTitle>
            <ProductDescription>{product.description}</ProductDescription>
            <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
            <FavoriteButton onClick={() => toggleFavorite(product)}>
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </FavoriteButton>
            <Link to="/favorites">
                <NavigateButton>Go to Favorites</NavigateButton>
            </Link>
        </Container>
    );
};

const Container = styled.div`
    padding: 20px;
    background-color: #ffffff;
    text-align: center;
    min-height: 100vh;
`;

const LoadingText = styled.p`
    text-align: center;
`;

const ProductImage = styled.img`
    width: 100%;
    max-width: 300px;
    height: auto;
`;

const ProductTitle = styled.h1`
    font-size: 24px;
    margin: 15px 0;
`;

const ProductDescription = styled.p`
    font-size: 16px;
    margin: 15px 0;
`;

const ProductPrice = styled.p`
    font-size: 20px;
    color: #28a745;
    margin: 10px 0;
`;

const FavoriteButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const NavigateButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

export default ProductDetail;
