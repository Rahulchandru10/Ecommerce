import React, { useState, useContext, useEffect,useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import electimg from '../images/laptops.jpg';
import toy from '../images/toy.png';
import shirt from '../images/shirt.jpg';
import hmapp from '../images/homeappliances.webp';
import gadget from '../images/gadget.jpeg';
import Mobiles from '../images/Mobiles.avif';
import Laptop from '../images/laptops.jpg';
import books from '../images/books.avif';
import airpods from '../images/airpods.jpg';
import personalcare from '../images/personalcare.jpg';
import accessories from '../images/accessories.avif';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { AuthContext } from '../authcontext/AuthContext'

const Home = () => {
  const { isLoggedIn, logout } = useContext(AuthContext); 
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    setSearchQuery(value);
  };

  const handleSearch = useCallback(async () => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await axios.get('http://localhost:3001/search', { params: { name: searchQuery } });
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error searching:', error);
    }
  }, [searchQuery]);

  useEffect(()=>{
    handleSearch()
  },[handleSearch])

  return (
    <div className=''>
      <div style={{ width: '70%', marginTop: '2%', marginLeft: '17%' }}>
        <Form className="d-flex justify-content-between align-items-center">
          <div className="d-flex" style={{ flex: 1 }}>
            <Form.Control
              style={{ width: '70%' }}
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={handleInputChange}
            />
            <Button variant="outline-success" onClick={handleSearch}>Search</Button>
          </div>
          <div className='d-flex justify-content-between'>
            <Link to="/Signup">
              <Button variant="outline-success" className="ms-2">Signup</Button>
            </Link>
            {!isLoggedIn ? (
              <Link to="/Login">
                <Button variant="outline-success" className="ms-2">Login</Button>
              </Link>
            ) : (
              <Button variant="outline-success" className="ms-2" onClick={logout}>Logout</Button>
            )}
          </div>
        </Form>
      </div>
      
      {searchResults.length > 0 && (
        <Container style={{ marginTop: '2%' }}>
          <h2>Search Results:</h2>
          <Row>
            {searchResults.map((product) => (
                <Col xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <Card style={{ margin: '10px' }}>
                      <Card.Img variant="top" src={product.image} style={{ height: '250px'}} />
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
      )}

      <div style={{marginLeft : '18%'}}>
        <h1 style={{marginBottom:'3%'}}>Categories</h1>
        <Container >
          <Row>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={electimg} alt="Electronics category"/>
                  <Card.Body>
                    <Card.Title>Electronics</Card.Title>
                    <Card.Text>
                      Grab the products as soon as possible!!!
                    </Card.Text>
                    <Link to='/Electronics'><Button variant="primary">Go!!</Button></Link>
                  </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={toy} alt="toy category"/>
                <Card.Body>
                  <Card.Title>Toys</Card.Title>
                  <Card.Text>
                    Make your child happy with our products !!!
                  </Card.Text>
                  <Link to='/Toys'><Button variant="primary">Go!!</Button></Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={shirt} alt="shirt category"/>
                  <Card.Body>
                    <Card.Title>Shirts</Card.Title>
                    <Card.Text>
                       Branded shirts and t-shirts at low price ever !!!
                    </Card.Text>
                    <Link to='/Shirts'><Button variant="primary">Go!!</Button></Link>
                  </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={gadget} />
                <Card.Body>
                  <Card.Title>Gadgets</Card.Title>
                  <Card.Text>
                    Check out the gadgets collection !!!
                  </Card.Text>
                  <Link to='/Gadgets'><Button variant="primary">Go!!</Button></Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={hmapp} alt='homeappliances category'/>
                <Card.Body>
                  <Card.Title>Homeappliances</Card.Title>
                  <Card.Text>
                    All homeappliances are available here. No worries about transport and delivery!!!
                  </Card.Text>
                  <Link to='/Homeappliances'><Button variant="primary">Go!!</Button></Link>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={accessories} alt="accessories category"/>
                <Card.Body>
                  <Card.Title>Accessories</Card.Title>
                  <Card.Text>
                    Make yourself look stylish !!!
                  </Card.Text>
                  <Link to='/Accessories'><Button variant="primary">Go!!</Button></Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        <Container >
          <Row>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={Mobiles} alt="mobiles category"/>
                  <Card.Body>
                    <Card.Title>Mobiles</Card.Title>
                    <Card.Text>
                       Control everything from your hand.Make it simple!!!
                    </Card.Text>
                    <Link to='/Mobiles'><Button variant="primary">Go!!</Button></Link>
                  </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={Laptop} alt="laptop category"/>
                <Card.Body>
                  <Card.Title>Laptop</Card.Title>
                  <Card.Text>
                    Wanna experience multitasking? Try this.
                  </Card.Text>
                  <Link to='/Laptops'><Button variant="primary">Go!!</Button></Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        <Container >
          <Row>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={airpods} alt="airpods category"/>
                  <Card.Body>
                    <Card.Title>Airpods</Card.Title>
                    <Card.Text>
                      Buy airpods, enjoy hearing songs and Keep your surrounding silent !!!
                    </Card.Text>
                    <Link to='/Airpods'><Button variant="primary">Go!!</Button></Link>
                  </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={books} alt="Books category"/>
                <Card.Body>
                  <Card.Title>Books</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Link to='/Books'><Button variant="primary">Go!!</Button></Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        <Container >
          <Row>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={personalcare} alt="personalcare category"/>
                  <Card.Body>
                    <Card.Title>Personalcare</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the
                      bulk of the card's content.
                    </Card.Text>
                    <Link to='/Personalcare'><Button variant="primary">Go!!</Button></Link>
                  </Card.Body>
              </Card>
            </Col>
            
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={Laptop} alt="allproducts category"/>
                  <Card.Body>
                    <Card.Title>Allproducts</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the
                      bulk of the card's content.
                    </Card.Text>
                    <Link to='/Allproducts'><Button variant="primary">Go!!</Button></Link>
                  </Card.Body>
              </Card>
            </Col>

          </Row>
        </Container>
      </div>    
    </div>
  );
};

export default Home;
