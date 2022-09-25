import logo from './logo.svg';
import './App.css';
import { NavbarBrand, Navbar, Container, Row, Col, 
    Nav, NavItem, NavLink, FormGroup,Input, Button,
    TabContent, TabPane } from 'reactstrap';
import React, {useState} from 'react';
import ProductList from './components/ProductList';
import { useFormik } from 'formik';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
// import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';

function App() {
  const [active_tab, setActiveTab] = useState('1');
  const toggleTab = (tab) => {
    if (active_tab !== tab) {
      setActiveTab(tab);
    }
  }

  const [products, setProducts] = useState([
    {name: 'iPhone 14', price: 'RM 5000'},
    {name: 'iPhone X', price: 'RM 3000'},
    {name: 'Samsung S10', price: 'RM 3000'},
    {name: 'iPhone 13 Pro', price: 'RM 5000'},
    {name: 'iPad 6', price: 'RM 3000'},
    {name: 'iWatch 6 Series', price: 'RM 1999'},
    {name: 'iPhone 11 Pro', price: 'RM 3400'},
    {name: 'iPhone XR', price: 'RM 2500'},

  ]);

  const [category_list, setCategoryList] = useState([
    {name: 'Phone', price: 'RM 5000'},
    {name: 'Laptop', price: 'RM 3000'},
    {name: 'Headset', price: 'RM 3000'},
  ]);

  const [brand_list, setBrandList] = useState([
    {name: 'Apple', price: 'RM 5000'},
    {name: 'Samsung', price: 'RM 3000'},
    {name: 'Huawei', price: 'RM 3000'},
    {name: 'LG', price: 'RM 3000'},
    {name: 'Xiaomi', price: 'RM 3000'},
  ]);


  const [color_list, setColorList] = useState([
    {name: 'Black', price: 'RM 5000'},
    {name: 'White', price: 'RM 3000'},
    {name: 'Maroon', price: 'RM 3000'},
    {name: 'Green', price: 'RM 3000'},
    {name: 'Blue', price: 'RM 3000'},
  ]);

  const validate = values => {
    const errors = {};
    if (!values.product_name) {
      errors.product_name = 'Name is Required';
    }

    if (!values.product_category) {
      errors.product_category = 'Category is Required';
    }

    if (!values.product_brand) {
      errors.product_brand = 'Brand is Required';
    }

    if (!values.product_color) {
      errors.product_color = 'Color is Required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
        product_name: '',
        product_category: '',
        product_brand: '',
        product_color: '',
    },
    validate,
    onSubmit: (values) => {
        //onClickSubmit(values);
    },
  });

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total" style={{ 'fontSize':'12px'}}>
      Showing { from } to { to } of { size } entries
    </span>
  );

  const pagination = paginationFactory({
    //paginationTotalRenderer: customTotal,
    showTotal: true,
  });

  const NoDataIndication = () => (
      <div>
        No Data Available
      </div>
  );

  // const { SearchBar } = Search;

  const [reports_table, setReportsTable] = useState([
      { order_id: 111, 
        product_id: 'P1111',
        product_name: 'iPhone 11',
        product_color: 'black',
        order_status: 'delivered',
        order_datetime: new Intl.DateTimeFormat("en-MY", {
          year: "numeric",
          month: "long",
          day: "2-digit",
          hour: '2-digit', 
          minute: '2-digit', second: '2-digit',
          hour12: true,
        }).format(new Date().getTime()),
        action: 'Set Completed'
      },
      {
        order_id: 222, 
        product_id: 'P2222',
        product_name: 'iPhone 14',
        product_color: 'grey',
        order_status: 'shipping',
        order_datetime: new Intl.DateTimeFormat("en-MY", {
          year: "numeric",
          month: "long",
          day: "2-digit",
          hour: '2-digit', 
          minute: '2-digit', second: '2-digit',
          hour12: true,
        }).format(new Date().getTime()),
        action: 'Set Completed'

      }
  ]);

  const columns = [{
    dataField: 'order_id',
    text: 'Order ID',
    sort: true,
  }, {
    dataField: 'product_id',
    text: 'Product ID',
    sort: true
  }, {
    dataField: 'product_name',
    text: 'Product Name',
    sort: true
  },
  {
    dataField: 'product_color',
    text: 'Product Color',
    sort: true
  },
  {
    dataField: 'order_status',
    text: 'Order Status',
    sort: true
  },
  {
      dataField: 'order_datetime',
      text: 'Order Date Time',
      sort: true
  },
  {
    dataField: 'action',
    text: 'Action',
    sort: true,
    formatter: (cell, row, rowIndex, extraData) => {
      return(
          <>
            <Button className="btn btn-icon m-auto btn-sm"  
                type="button" color="primary">
                <span className="btn-inner--text">{row.action}</span>
            </Button>
          </>
      )  
    }
  }];



  return (
    <div className="App">
      <Navbar
        color="secondary"
        dark
      >
        <NavbarBrand href="/">
          <img
            alt="logo"
            src={logo}
            style={{
              height: 40,
              width: 40
            }}
          />
          eStore
        </NavbarBrand>
      </Navbar>
      <Container>
        <Row className="justify-content-center mt-5" >
            <Col lg="12" md="12">
              <Nav
                tabs
                pills
                justified
              >
                <NavItem>
                  <NavLink
                    className={active_tab === '1' ? 'active' : ''}
                    onClick={() => toggleTab('1')}
                  >
                    Product Listing
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink 
                    className={active_tab === '2' ? 'active' : ''}
                    onClick={() => toggleTab('2')}>
                    Order History
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={active_tab} style={{ marginTop: `1rem` }}>
                <TabPane tabId="1">
                  <Row>
                    <Col lg="12">
                      <Row style={{ borderTop: `1px solid #0d6efd` }}>
                        <Col lg="3" xl="2" md="3" style={{ borderRight: `1px solid #0d6efd` }}>
                          <h3 className='mt-2'>Search Filter</h3>
                          <div style={{textAlign: 'left', marginTop: '15px'}}>
                            <form onSubmit={formik.handleSubmit}>
                              <div>
                                <Row>
                                  <Col lg="12" xl="12" md="12">
                                      <FormGroup>
                                          <label htmlFor="product_name"
                                              className="form-control-label text-xs" 
                                          >
                                              Product Name
                                          </label>
                                          <Input type="text" placeholder="Enter Product Name" name="product_name" id="product_name" 
                                              bsSize="sm" className="form-control" 
                                              //className={formik.touched.product_name && formik.errors.product_name ? 'is-invalid' : ''} 
                                              onChange={ (e) => {
                                                  formik.handleChange(e);
                                                  //onDivisionChange(e);
                                              }} 
                                              onBlur={formik.handleBlur}
                                              value={formik.values.product_name}>
                                              
                                          </Input> 
                                          {formik.touched.product_name && formik.errors.product_name ? (
                                              <div className="invalid-feedback form_error text-xs">{formik.errors.product_name}</div>
                                          ) : null} 
                                      </FormGroup>
                                  </Col>
                                  <Col lg="12" xl="12" md="12">
                                      <FormGroup>
                                          <label htmlFor="product_category"
                                              className="form-control-label text-xs" 
                                          >
                                              Category
                                          </label>
                                          <Input type="select" placeholder="Select Product Category" name="product_category" id="product_category" 
                                                bsSize="sm" className="form-control"
                                                //className={formik.touched.division_id && formik.errors.division_id ? 'is-invalid' : ''} 
                                                onChange={ (e) => {
                                                    formik.handleChange(e);
                                                    //onDivisionChange(e);
                                                }} 
                                                onBlur={formik.handleBlur}
                                                value={formik.values.product_category}>
                                                <option value="select">---Select Category---</option>
                                                {category_list.map( (d, key) => {
                                                    return (
                                                        <option key={key} value={d.name}>{d.name}</option>
                                                    );
                                                })}
                                          </Input>    
                                          {formik.touched.product_category && formik.errors.product_category ? (
                                              <div className="invalid-feedback form_error text-xs">{formik.errors.product_category}</div>
                                          ) : null} 
                                      </FormGroup>
                                  </Col>
                                  <Col lg="12" xl="12" md="12">
                                      <FormGroup>
                                          <label htmlFor="product_brand"
                                              className="form-control-label text-xs" 
                                          >
                                              Brand
                                          </label>
                                          <Input type="select" placeholder="Select Product Brand" name="product_brand" id="product_brand" 
                                                bsSize="sm" className="form-control"
                                                //className={formik.touched.division_id && formik.errors.division_id ? 'is-invalid' : ''} 
                                                onChange={ (e) => {
                                                    formik.handleChange(e);
                                                    //onDivisionChange(e);
                                                }} 
                                                onBlur={formik.handleBlur}
                                                value={formik.values.product_brand}>
                                                <option value="select">---Select Brand---</option>
                                                {brand_list.map( (d, key) => {
                                                    return (
                                                        <option key={key} value={d.name}>{d.name}</option>
                                                    );
                                                })}
                                          </Input>
                                          {formik.touched.product_brand && formik.errors.product_brand ? (
                                              <div className="invalid-feedback form_error text-xs">{formik.errors.product_brand}</div>
                                          ) : null} 
                                      </FormGroup>
                                  </Col>
                                  <Col lg="12" xl="12" md="12">
                                      <FormGroup>
                                          <label htmlFor="product_color"
                                              className="form-control-label text-xs" 
                                          >
                                              Color
                                          </label>
                                          <Input type="select" placeholder="Select Product Color" name="product_color" id="product_color" 
                                                bsSize="sm" className="form-control"
                                                //className={formik.touched.division_id && formik.errors.division_id ? 'is-invalid' : ''} 
                                                onChange={ (e) => {
                                                    formik.handleChange(e);
                                                    //onDivisionChange(e);
                                                }} 
                                                onBlur={formik.handleBlur}
                                                value={formik.values.product_color}>
                                                <option value="select">---Select Color---</option>
                                                {color_list.map( (d, key) => {
                                                    return (
                                                        <option key={key} value={d.name}>{d.name}</option>
                                                    );
                                                })}
                                          </Input>
                                          {formik.touched.product_color && formik.errors.product_color ? (
                                              <div className="invalid-feedback form_error text-xs">{formik.errors.product_color}</div>
                                          ) : null} 
                                      </FormGroup>
                                  </Col>
                                  <Col lg="12" xl="12" md="12">
                                      <Button className="btn btn-icon m-auto" style={{display:'block', width: '100%'}} 
                                          type="submit" color="primary">
                                          <span className="btn-inner--text">Search</span>
                                      </Button>
                                  </Col>
                                </Row>
                              </div>
                            </form>
                          </div>
                        </Col>
                        <Col lg="9" xl="10" md="9">
                            <ProductList products={products}></ProductList>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col lg="12">
                      <div className="table-overflow">
                        <BootstrapTable className="table align-items-center" responsive 
                            keyField='order_id'
                            data={ reports_table }
                            columns={ columns }
                            pagination={ pagination } 
                            noDataIndication={ () => <NoDataIndication /> }
                        />
                      </div>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Col>
        </Row>
      </Container>
      
    </div>
  );
}

export default App;