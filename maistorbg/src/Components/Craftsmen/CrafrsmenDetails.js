import { useParams } from 'react-router-dom';
import React, { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

function CraftsmenDetails() {
    const { id } = useParams();
    // id is the selected craftsman's ID from the URL parameter

    const craftsmen = JSON.parse(localStorage.getItem('users'));
    const selectedCraftsmen = craftsmen.find((c) => c.id === parseInt(id));

    useEffect(() => {

    }, []);

    if (!selectedCraftsmen) {
        return <div>No craftsmen found with the selected ID</div>;
    }

    const allReviews = JSON.parse(localStorage.getItem('allReviews'));
    const selectedCraftsmenReviews = allReviews.filter((r) => r.craftsmanId === parseInt(id));

    return (
        <div className='crafrsmenDetails'>
        <Container >
            <Row>
                <Col md={12}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <Card.Img variant="top" src={selectedCraftsmen.photo} alt={selectedCraftsmen.name}  style={{ width: "300px", height: "350px" }}/>
                                </Col>
                                <Col md={8}>
                                    <Card.Title>{selectedCraftsmen.name}</Card.Title>
                                    <Card.Text>
                                        Имайл адрес: {selectedCraftsmen.email}
                                    </Card.Text>
                                    <Card.Text>
                                        Телефонен номер: {selectedCraftsmen.phoneNumber}
                                    </Card.Text>
                                    {selectedCraftsmenReviews.length > 0 ? (
                                        <div>
                                            <h3>Ревюта:</h3>
                                            {selectedCraftsmenReviews.slice(0, 3).map((r) => (
                                                <div key={r.id}>
                                                    <p>Рейтинг: {r.rating}</p>
                                                    <p>Ревю: {r.review}</p>
                                                </div>
                                            ))}
                                            {/* {selectedCraftsmenReviews.length < 3 && (
                                                <p>This craftsman has less than 3 reviews</p>
                                            )} */}
                                        </div>
                                    ) : (
                                        <p>This craftsman does not have any reviews yet</p>
                                    )}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </div>
    );
}

export default CraftsmenDetails;






// import { useParams } from 'react-router-dom';
// import React, { useEffect } from "react";

// function CraftsmenDetails() {
//     const { id } = useParams();
//     // id is the selected craftsman's ID from the URL parameter


//     const craftsmen = JSON.parse(localStorage.getItem('users'));
//     const selectedCraftsmen = craftsmen.find((c) => c.id === parseInt(id));
//     // console.log(craftsmen)

//     useEffect(() => {
  
//     },[]);

//     if (!selectedCraftsmen) {
//         return <div>No craftsmen found with the selected ID</div>;
//     }

//     const allReviews = JSON.parse(localStorage.getItem('allReviews'));
//     const selectedCraftsmenReviews = allReviews.filter((r) => r.craftsmanId === parseInt(id));

//     return (
//         <div>
            
//             <img src={selectedCraftsmen.photo} alt={selectedCraftsmen.name} />
//             <h2>{selectedCraftsmen.name}</h2>
//             <p>Email: {selectedCraftsmen.email}</p>
//             <p>Phone Number: {selectedCraftsmen.phoneNumber}</p>

//             {selectedCraftsmenReviews.length > 0 ? (
//                 <div>
//                     <h3>Reviews:</h3>
//                     {selectedCraftsmenReviews.slice(0, 3).map((r) => (
//                         <div key={r.id}>
//                             <p>Rating: {r.rating}</p>
//                             <p>Review: {r.review}</p>
//                         </div>
//                     ))}
//                     {/* {selectedCraftsmenReviews.length < 3 && (
//                         <p>This craftsman has less than 3 reviews</p>
//                     )} */}
//                 </div>
//             ) : (
//                 <p>This craftsman does not have any reviews yet</p>
//             )}
//         </div>
//     );
// }


// export default CraftsmenDetails;