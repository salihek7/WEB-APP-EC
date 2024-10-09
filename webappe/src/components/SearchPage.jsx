import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SearchPage = () => {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <Container>
            <Title>Product Search</Title>
            <SearchInput
                type="text"
                placeholder="Search for products..."
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <ButtonContainer>
                <Link to="/favorites">
                    <FavoritesButton>Go to Favorites</FavoritesButton>
                </Link>
            </ButtonContainer>
            <ProductList>
                {filteredProducts.map(product => (
                    <ProductItem key={product.id}>
                        <Link to={`/product/${product.id}`}>
                            <ProductImage src={product.image} alt={product.title} />
                            <ProductTitle>{product.title}</ProductTitle>
                            <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
                        </Link>
                    </ProductItem>
                ))}
            </ProductList>
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

const SearchInput = styled.input`
    width: 100%;
    padding: 12px;
    margin-bottom: 20px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 16px;
`;

const ButtonContainer = styled.div`
    text-align: center;
    margin-bottom: 20px;
`;

const FavoritesButton = styled.button`
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

export default SearchPage;
