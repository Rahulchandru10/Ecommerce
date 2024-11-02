import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
const Allproducts = () => {
    const [products, setProducts] = useState([]);
    const [active, setActive] = useState(1);
    const [itemsPerPage] = useState(8);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await axios.get('http://localhost:3001/view/products');
                setProducts(data.data.products);
            } catch (e) {
                console.error(e);
            }
        };
        fetchProducts();
    }, []);

    const handleSelect = (number) => {
        setActive(number);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setActive(1);
    };

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        const matchesPrice = (
            (minPrice === '' || product.price >= minPrice) &&
            (maxPrice === '' || product.price <= maxPrice)
        );
        return matchesCategory && matchesPrice;
    });

    const paginationItems = [];
    const totalFiltered = filteredProducts.length; 
    const totalPagesFiltered = Math.ceil(totalFiltered / itemsPerPage);
    
    for (let number = 1; number <= totalPagesFiltered; number++) {
        paginationItems.push(
            <Pagination.Item key={number} active={number === active} onClick={() => handleSelect(number)}>
                {number}
            </Pagination.Item>,
        );
    }

    const startIndex = (active - 1) * itemsPerPage;
    const currentItems = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    return (
        <Container>
            <h2 className="text-center mt-4 mb-4">Product Listings</h2>
            <div className="d-flex justify-content-between mb-4">
                <Dropdown onSelect={handleCategorySelect} className="mr-3">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {selectedCategory ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) : "Filter by Category"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="">All Products</Dropdown.Item>
                        <Dropdown.Item eventKey="mobiles">Mobiles</Dropdown.Item>
                        <Dropdown.Item eventKey="laptops">Laptops</Dropdown.Item>
                        <Dropdown.Item eventKey="shirts">Shirts</Dropdown.Item>
                        <Dropdown.Item eventKey="toys">Toys</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <div>
                    <Form inline>
                        <Form.Group controlId="minPrice" className="mr-3">
                            <Form.Label className="mr-2">Min Price:</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="0" 
                                value={minPrice} 
                                onChange={(e) => setMinPrice(e.target.value)} 
                                style={{ width: '100px' }} 
                            />
                        </Form.Group>
                        <Form.Group controlId="maxPrice">
                            <Form.Label className="mr-2">Max Price:</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="1000" 
                                value={maxPrice} 
                                onChange={(e) => setMaxPrice(e.target.value)} 
                                style={{ width: '100px' }} 
                            />
                        </Form.Group>
                    </Form>
                </div>
            </div>

            <Row>
                {currentItems.map((product) => (
                    <Col xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <Card className="mb-4 shadow-sm" style={{ height: '450px', transition: 'transform 0.2s' }}>
                            <Card.Img variant="top" src={product.image} style={{ height: '250px', objectFit: 'cover' }} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>
                                    <div>Price: {product.price.toFixed(2)}</div>
                                    <div>Discount: {product.discount}</div>
                                    <div>Description: {product.description}</div>
                                    <div>Stocks left: {product.stock}</div>
                                </Card.Text>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button variant="primary">Buy Now</Button>
                                    </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Pagination style={{ justifyContent: 'center' }}>{paginationItems}</Pagination>
        </Container>
    );
};

export default Allproducts;
