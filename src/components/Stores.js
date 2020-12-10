import React, { Component } from 'react'
import { Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Stores extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allStores: [],
            storeName: 'Red tag',
            sotreLogo: 'https://redtag-stores.com/en/wp-content/uploads/Redtag.png',
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/stores')
            .then(storesList => {
                const allStores = storesList.data
                this.setState({ allStores });
            });
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    submitHandler = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:5000/stores/`, {
            name: this.state.storeName,
            logo: this.state.sotreLogo,
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

        const { storeName, sotreLogo } = this.state
        return (
            <>
                <Container>

                    <Row>
                        <Col>
                            <h2 className="text-center my-5">You can create as many stores as you want!</h2>
                            <form onSubmit={this.submitHandler}>
                                <div className="form-group">
                                    <input className="form-control form-control-lg" type="text" name="storeName" value={storeName} placeholder="store name" onChange={this.changeHandler}></input>
                                </div>
                                <div className="form-group">
                                    <input className="form-control form-control-lg" type="text" name="sotreLogo" value={sotreLogo} placeholder="store logo" onChange={this.changeHandler}></input>
                                </div>
                                <input className="btn btn-primary btn-lg btn-block" type="submit" value="Submit"></input>
                            </form>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <h2 className="text-center my-5">Your Current Stores:</h2>
                        </Col>
                    </Row>

                    <Row className="my-5 text-center">
                        {
                            this.state.allStores ? this.state.allStores.map((store) => (
                                <Col className="mb-5 col-3" key={store.id}>
                                    <Link to={"/store/" + store.id}>{store.name}
                                        <div><img className="img-fluid" src={store.logo} alt="item" /></div>
                                    </Link>
                                </Col>
                            ))
                                : "No Stores yet"
                        }

                    </Row>

                </Container>

            </>
        )
    }
}
