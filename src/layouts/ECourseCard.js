import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

function ECourseCard(props) {
    let path = `/courses/${props.obj.id}/lessons/`
    if(props.type == 'lesson') {
        path = `/lessons/${props.obj.id}/`
    }

    return (
        <>
            <Col md={4} xs={12}>
                <Card> 
                    <Link to={path}>
                        <Card.Img variant="top" style={{width: '100%', maxHeight: '400px'}} src={props.obj.image} />
                    </Link>
                    <Card.Body>
                        <Card.Title>{props.obj.name}</Card.Title>
                        <Card.Text>
                            Ngày tạo: {props.obj.created_date}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}

export default ECourseCard