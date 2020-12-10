import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class Catoegories extends Component {



    render() {
        return (
            <Col md={4}>
                <div className="card" >
                    <img className="card-img-top" src={this.props.catoegory.image} alt="Card image cap" />
                    <div className="card-body">
                        <h5>{this.props.catoegory.name}</h5>
                        <Link className="btn btn-primary" to={"/store/" + this.props.catoegory.store_id + "/" + this.props.catoegory.id}>
                            See Products
                        </Link>
                    </div>
                </div>

            </Col>


        )
    }
}
