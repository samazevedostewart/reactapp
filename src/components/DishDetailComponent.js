import React from 'react';
import { Card, CardImg, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


function RenderDish({ dish }) {
    return (
        <div >
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
                <ul className="list-unstyled">
                    <li>{com.comment}</li>
                    <li>{com.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(com.date)))}</li><br />
                </ul>
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