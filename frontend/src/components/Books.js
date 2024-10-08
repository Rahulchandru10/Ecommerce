import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

const Books = () => {
    let [products, setProducts] = useState([]);
    const [totalpage, setTotalPage] = useState();
    const [active, setActive] = useState(1);
    const [itemsPerPage] = useState(4);
    const totalPages = Math.ceil(totalpage / itemsPerPage);

    useEffect(() => {
        const fetchproduct = async () => {
            try {
                const data = await axios.get('http://localhost:3001/view/products');
                const filtered = data.data.products.filter(product => product.category === 'books');
                setTotalPage(filtered.length);
                setProducts(filtered);
                console.log(filtered);
            } catch (e) {
                console.error(e);
            }
        };
        fetchproduct();
    }, []);

    const handleSelect = (number) => {
        setActive(number);
    };

    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item key={number} active={number === active} onClick={() => handleSelect(number)}>
                {number}
            </Pagination.Item>,
        );
    }

    const startIndex = (active - 1) * itemsPerPage;
    const currentItems = products.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div>
            <Container style={{ marginTop: '3%' }}>
                <Row>
                    {currentItems.map((product) => (
                        <Col xs={12} sm={6} md={4} lg={3} key={product.id}>
                            <Card style={{ margin: '10px' }}>
                                <Card.Img variant="top" src={product.image} style={{ height: '250px' }} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>
                                        <div>Price: {product.price}</div>
                                        <div>Discount: {product.discount}</div>
                                        <div>Description: {product.description}</div>
                                        <div>Stocks left: {product.stock}</div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Pagination style={{ justifyContent: 'center' }}>{paginationItems}</Pagination>
        </div>
    );
};

export default Books;
