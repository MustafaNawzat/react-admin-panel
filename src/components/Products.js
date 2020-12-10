import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export default class Products extends Component {

    state = {
        singleCategory: [],
        allProducts: [],
        productName: '',
        productLogo: 'https://via.placeholder.com/150?text=',
        productPrice: ''
    }


    fetchProducts(id) {

        fetch(`http://localhost:5000/products/`)
            .then((response) => response.json())
            .then(products => {
                let filteredProducts = products.filter((item) => {
                    return item.category_id === id
                });
                this.setState({ allProducts: filteredProducts });
            })
    }

    fetchCategories(id) {
        fetch(`http://localhost:5000/categories/${id}`)
            .then((response) => response.json())
            .then(category => {
                this.setState({ singleCategory: category });
            })

    }


    componentDidMount() {
        let { id } = this.props.match.params;
        id = parseInt(id)
        this.fetchProducts(id)
        this.fetchCategories(id)
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:5000/products/`, {

            name: this.state.productName,
            image: this.state.productLogo,
            price: parseInt(this.state.productPrice),
            category_id: parseInt(this.props.match.params.id),
            id: Date.now()
        })
            .then(res => {
                console.log(res.data);
                const { newProduct } = res.data
                this.setState((prevState, newProduct) => {
                    return {
                        newProduct,
                        ...prevState

                    };
                });
            })
    }


    render() {
        const { productName, productLogo, productPrice } = this.state

        return (
            <Container>
                <Row>
                    <Col>
                        <h2 className="my-5">Add Products to {this.state.singleCategory.name} category</h2>
                        <form onSubmit={this.submitHandler}>
                            <div className="form-group">
                                <input className="form-control form-control-lg" type="text" name="productName" value={productName} placeholder="product Name" onChange={this.changeHandler}></input>
                            </div>
                            <div className="form-group">
                                <input className="form-control form-control-lg" type="text" name="productLogo" value={productLogo} placeholder="product Logo" onChange={this.changeHandler}></input>
                            </div>
                            <div className="form-group">
                                <input className="form-control form-control-lg" type="text" name="productPrice" value={productPrice} placeholder="product Price" onChange={this.changeHandler}></input>
                            </div>
                            <input className="btn btn-primary btn-lg btn-block" type="submit" value="Submit"></input>
                        </form>
                    </Col>
                </Row>
                <h3 className="my-5">Available Products:</h3>
                <Row>

                    {

                        this.state.allProducts.length ? this.state.allProducts.map(product => (
                            <Col md={4}>
                                <div className="card" >
                                    <div className="card-body">
                                        <h2>{product.name}</h2>
                                        <h3>{product.price} IQD</h3>
                                        <img className="card-img-top" src={product.image} alt="" />
                                    </div>
                                </div>
                            </Col>
                        ))
                            :
                            "No products"
                    }
                </Row>
            </Container>
        )
    }
}
