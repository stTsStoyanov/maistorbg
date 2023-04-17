import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const OfferForm = ({ authorId, jobAdvertisementId, onSubmit }) => {
  const [offerText, setOfferText] = useState('');
  const [offeredSum, setOfferedSum] = useState('');
  const [offeredTerm, setOfferedTerm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (offerText && offeredSum && offeredTerm) {
      onSubmit(authorId, jobAdvertisementId, offerText, offeredSum, offeredTerm);
      setOfferText('');
      setOfferedSum('');
      setOfferedTerm('');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="offerText">
        <Form.Label>Offer Text:</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter offer text"
          value={offerText}
          onChange={(event) => setOfferText(event.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="offeredSum">
        <Form.Label>Offered Sum:</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter offered sum"
          value={offeredSum}
          onChange={(event) => setOfferedSum(event.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="offeredTerm">
        <Form.Label>Offered Term:</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter offered term"
          value={offeredTerm}
          onChange={(event) => setOfferedTerm(event.target.value)}
        />
      </Form.Group>
      <Button type="submit" variant="primary">Submit</Button>
    </Form>
  );
};

export default OfferForm;
