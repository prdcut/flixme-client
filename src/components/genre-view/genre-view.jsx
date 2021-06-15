import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export class GenreView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { genre, onClick } = this.props;


    return (
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card className="p-3 mb-3" border="warning" text="secondary">
            <Card.Body>
              <Card.Title className="text-center p-3">
                <h3 className="text-warning">{genre.Name}</h3>
              </Card.Title>
              <Card.Subtitle className="mb-2 text-dark">Description</Card.Subtitle>
              <Card.Text className="text-justify">{genre.Description}</Card.Text>
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

GenreView.propTypes = {
  movie: PropTypes.shape({
    Genre: {
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }
  })
}