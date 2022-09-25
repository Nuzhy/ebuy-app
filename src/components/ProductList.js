import React from 'react';
import { Row, Col,Button} from 'reactstrap';

const ProductList = ({products}) => (
    <>
        
        <Row className='p-3'>
            {
                products.map( (prod, key) => (
                    <Col lg="3" xl="3" key={key} >
                        <div style={{ border: `1px solid #0d6efd`, margin: '0.5rem',  }} >
                            <div className='p-2'>
                                <h2>{prod.name}</h2>
                                <Button className="btn-icon btn-right" color="primary" type="button" 
                                >
                                    Place Order
                                </Button>
                            </div> 
                            
                        </div>
                    </Col>
                ))
            }
                            
        </Row>
        
        {/* {products.map( (prod, key) => (
        <Link className="article-list-item" key={key} to={`/article/${prod.name}`}>
             <h3 key={key}>{prod.title}</h3>
             <p>{prod.content[0].substr(0, 150)}...</p>
        </Link>
        ))} */}
    </>
);

export default ProductList;