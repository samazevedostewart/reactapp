import React from 'react';
import { Card, CardImg, CardText, CardBody, CardSubtitle, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';


function RenderCard({ item }) {
    return (
        <Card>
            <CardImg src={item.image} alt={item.name} />
            <CardBody>
                <CardTitle>{item.name}</CardTitle>
                {item.designation ? <CardSubtitle>{item.deisgnation}</CardSubtitle> : null}
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    );
}

function Home(props) {

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>Home</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h4>Home</h4>
                        <hr />
                    </div>
                </div>
                <div className="row align-items-start">
                    <div className="col-12 col-md m-1">
                        <RenderCard item={props.dish} />
                    </div>
                    <div className="col-12 col-md m-1">
                        <RenderCard item={props.promotion} />
                    </div>
                    <div className="col-12 col-md m-1">
                        <RenderCard item={props.leader} />
                    </div>
                </div>

            </div>
        </React.Fragment>

    );

}

export default Home;