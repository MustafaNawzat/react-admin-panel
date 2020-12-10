import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Catoegories from './Catoegories'
import axios from 'axios';



export default class Store extends Component {


    state = {
        singleStore: [],
        storeCategories: [],
        categoryName: '',
        categoryLogo: 'https://via.placeholder.com/150?text='
    }


    fetchStore(id) {
        fetch(`http://localhost:5000/stores/${id}`)
            .then((response) => response.json())
            .then(store => {
                this.setState({ singleStore: store });
            })
    }

    fetchCategories(id) {
        fetch(`http://localhost:5000/categories/`)
            .then((response) => response.json())
            .then(categories => {
                let filteredCategories = categories.filter((item) => {
                    return item.store_id === id
                });
                this.setState({ storeCategories: filteredCategories });
            })

    }

    componentDidMount() {
        let { id } = this.props.match.params;
        id = parseInt(id)
        this.fetchStore(id)
        this.fetchCategories(id)
    }


    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    submitHandler = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:5000/categories/`, {
            name: this.state.categoryName,
            image: this.state.categoryLogo,
            store_id: parseInt(this.props.match.params.id),
            id: Date.now()
        })
            .then(res => {
                console.log(res.data);
                const { newStore } = res.data
                this.setState((prevState, newStore) => {
                    return {
                        newStore,
                        ...prevState

                    };
                });
            })
    }



    render() {
        console.log(this.props.match.params.id)

        const { categoryName, categoryLogo } = this.state
        return (
            <Container className="text-center mt-5">
                <Row>
                    <Col>
                        <h2 className="my-5">From here, you can add categories to {this.state.singleStore.name} Store!</h2>
                        <form onSubmit={this.submitHandler}>
                            <div className="form-group">
                                <input className="form-control form-control-lg" type="text" name="categoryName" value={categoryName} placeholder="Category Name" onChange={this.changeHandler}></input>
                            </div>
                            <div className="form-group">
                                <input className="form-control form-control-lg" type="text" name="categoryLogo" value={categoryLogo} placeholder="Category logo" onChange={this.changeHandler}></input>
                            </div>
                            <input className="btn btn-primary btn-lg btn-block" type="submit" value="Submit"></input>
                        </form>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h3 className="mt-5 mb-3">The categories of this store are:</h3>
                    </Col>
                </Row>
                <Row>

                    {this.state.storeCategories.map(catoegory => (
                        <Catoegories catoegory={catoegory} />
                    ))}
                </Row>
            </Container>
        )
    }
}
