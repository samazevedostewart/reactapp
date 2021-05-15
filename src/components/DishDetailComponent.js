import React, { Component } from 'react';
import {
    Card, CardImg, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Row, Label, ModalHeader, ModalBody, Col, Button, Modal
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);


class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleComment = this.handleComment.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleComment(values) {
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div>
                            <Button outline onClick={this.toggleModal}>
                                <span className="fa fa-pencil"></span> Submit Comment
                            </Button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-9">
                            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                                <ModalBody>
                                    <LocalForm onSubmit={(values) => this.handleComment(values)}>
                                        <Row className="form-group">
                                            <Label htmlFor="rating" md={2}>Rating</Label>
                                            <Col md={10}>
                                                <Control.select model=".rating" id="rating" name="rating"
                                                    className="form-control">
                                                    <option value="1" >1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </Control.select>
                                            </Col>
                                        </Row>
                                        <Row className="form-group">
                                            <Label htmlFor="yourname" md={2}>Your Name</Label>
                                            <Col md={10}>
                                                <Control.text model=".yourname" id="fullname" name="yourname"
                                                    className="form-control"
                                                    placeholder=" Your Name"
                                                    validators={{
                                                        required,
                                                        minLength: minLength(3),
                                                        maxLength: maxLength(15)
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".yourname"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required',
                                                        minLength: 'Must be greater than 2 characters',
                                                        maxLength: 'Must be 15 characters or less',
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="form-group">
                                            <Label htmlFor="comment" md={2}>Comment</Label>
                                            <Col md={10}>
                                                <Control.textarea model=".comment" id="comment" name="comment"
                                                    className="form-control"
                                                    row="12"
                                                    validators={{
                                                        required,
                                                        minLength: minLength(1),
                                                        maxLength: maxLength(100)
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".firstname"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required',
                                                        minLength: 'Must be greater than 2 characters',
                                                        maxLength: 'Must be 100 characters or less',
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="form-group">
                                            <Label htmlFor="message" md={2}>Submit</Label>
                                            <Col md={{ size: 10, offset: 2 }}>
                                                <Button type="submit" color="primary">
                                                    Submit
                                        </Button>
                                            </Col>
                                        </Row>
                                    </LocalForm>
                                </ModalBody>
                            </Modal>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function RenderDish({ dish }) {
    return (
        <div>
            <Card>
                <CardImg width="100" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                </CardBody>
            </Card>
        </div>
    );
}


function RenderComments({ comments }) {


    const comnts = comments.map(com => {
        return (
            <React.Fragment>
                <div>
                    <ul className="list-unstyled">
                        <li>{com.comment}</li>
                        <li>{com.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(com.date)))}</li><br />
                    </ul>
                </div>
            </React.Fragment>
        );
    });
    return (
        <div>
            <h4>Comments</h4>
            {comnts}
        </div>
    );
}

const DishDetail = (props) => {
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                        <CommentForm />
                    </div>
                </div>
            </div>
        );
    }
    else
        return (
            <div></div>
        );
}


export default DishDetail;