import React from "react"
import { Card } from "react-bootstrap"

export default function CraftsmanPresentingCard({craftsman}) {

    return (
        <Card className="author-card">
            <Card.Body className="d-flex align-items-center background-color">
                <img
                    className="mr-3 author-photo"
                    src={craftsman.photo}
                    alt={craftsman.name}
                    width="100"
                    height="100"
                />
                <div style={{marginLeft: "15px"}}>
                    <strong>{craftsman.name}</strong>
                    <p><strong>{craftsman.skills.join(", ")}</strong></p>
                </div>
            </Card.Body>
        </Card>
    )
}