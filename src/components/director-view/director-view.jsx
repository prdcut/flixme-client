import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export class DirectorView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { director, onClick } = this.props;

    console.log(this.props)

    return (
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card className="p-3 m-3" border="warning" text="secondary">
            <Card.Body>
              <Card.Title className="text-center p-3">
                <h3 className="text-warning">{director.Name}</h3>
              </Card.Title>
              <Card.Subtitle className="mb-2 text-dark">Born</Card.Subtitle>
              <Card.Text>{director.Birth}</Card.Text>
              <Card.Subtitle className="mb-2 text">Biography</Card.Subtitle>
              <Card.Text className="text-justify">{director.Bio}</Card.Text>
              <Row className="justify-content-md-center">
                <Col md={4}>
                  <Button onClick={() => { onClick(); }} variant="warning" className="text-white" block>Back</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row >
    )
  }
}

DirectorView.propTypes = {
  movie: PropTypes.shape({
    Director: {
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    },
  })
};