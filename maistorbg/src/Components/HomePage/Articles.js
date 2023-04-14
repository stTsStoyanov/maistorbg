import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./TopCraftsmen.scss";

const Articles = () => {
    // Retrieve the array of objects from local storage
    const data = JSON.parse(localStorage.getItem("articles")) || [];

    const renderCardContent = (name, content) => {
        const paragraphs = Object.keys(content)
            .filter((key) => key.startsWith("paragraph"))
            .sort((a, b) => Number(a.slice(9)) - Number(b.slice(9)))
            .map((key, index) => <Card.Text key={index}>{content[key]}</Card.Text>);

        const images = Object.keys(content)
            .filter((key) => key.startsWith("image"))
            .map((key, index) => (
                <Card.Img variant="bottom" src={content[key]} key={index} className="mt-3" />
            ));

        const contentElements = [];
        for (let i = 0; i < paragraphs.length || i < images.length; i++) {
            if (i < paragraphs.length) {
                contentElements.push(paragraphs[i]);
            }
            if (i < images.length) {
                contentElements.push(images[i]);
            }
        }

        return (
            <>
                <Card.Title>{name}</Card.Title>
                {contentElements}
            </>
        );
    };

    return (
        <Container style={{ border: "1px solid black", padding: "20px" }} className="mx-md-5 my-5">
            <h2 className="text-center">Top 3 Items</h2>
            <Row>
                {data.slice(0, 3).map((item, index) => (
                    <Col sm={12} md={6} lg={4} key={index}>
                        <Card className="mb-3">
                            <Card.Body>{renderCardContent(item.name, item)}</Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Articles;



// import React from "react";
// import { Card, Col, Container, Row } from "react-bootstrap";
// import "./TopCraftsmen.scss";

// const Articles = () => {
//     // Retrieve the array of objects from local storage
//     const data = JSON.parse(localStorage.getItem("articles")) || [];

//     const renderCardContent = (name, content) => {
//         const paragraphs = Object.keys(content)
//             .filter((key) => key.startsWith("paragraph"))
//             .sort((a, b) => Number(a.slice(9)) - Number(b.slice(9)))
//             .map((key, index) => <Card.Text key={index}>{content[key]}</Card.Text>);

//         const images = Object.keys(content)
//             .filter((key) => key.startsWith("image"))
//             .map((key, index) => (
//                 <Card.Img variant="bottom" src={content[key]} key={index} className="mt-3" />
//             ));

//         return (
//             <>
//                 <Card.Title>{name}</Card.Title>
//                 {paragraphs}
//                 {images}
//             </>
//         );
//     };

//     return (
//         <Container style={{ border: "1px solid black", padding: "20px" }} className="mx-md-5 my-5">
//             <h2 className="text-center">Top 3 Items</h2>
//             <Row>
//                 {data.slice(0, 3).map((item, index) => (
//                     <Col sm={12} md={6} lg={4} key={index}>
//                         <Card className="mb-3">
//                             <Card.Body>{renderCardContent(item.name, item)}</Card.Body>
//                         </Card>
//                     </Col>
//                 ))}
//             </Row>
//         </Container>
//     );
// };

// export default Articles;




// import React from "react";
// import { Card, Col, Container, Row } from "react-bootstrap";
// import "./TopCraftsmen.scss";

// const Articles = () => {
//     // Retrieve the array of objects from local storage
//     const objects = JSON.parse(localStorage.getItem("articles")) || [];

//     return (
//         <Container style={{ border: "1px solid black", padding: "20px" }} className="mx-md-5 my-5">
//             <h2 className="text-center">Top 3 Objects</h2>
//             <Row>
//                 {objects.slice(0, 3).map((object, index) => (
//                     <Col sm={12} md={6} lg={4} key={index}>
//                         <Card className="mb-3">
//                             <Card.Body>
//                                 <Card.Title>{object.name}</Card.Title>
//                                 <Card.Text>
//                                     {object.paragraph1}
//                                 </Card.Text>
//                                 {object.paragraph2 && (
//                                     <Card.Text>
//                                         {object.paragraph2}
//                                     </Card.Text>
//                                 )}
//                                 {object.paragraph3 && (
//                                     <Card.Text>
//                                         {object.paragraph3}
//                                     </Card.Text>
//                                 )}
//                                 {object.image1 && (
//                                     <Card.Img src={object.image1} alt="object image" />
//                                 )}
//                                 {object.image2 && (
//                                     <Card.Img src={object.image2} alt="object image" />
//                                 )}
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                 ))}
//             </Row>
//         </Container>
//     );
// };

// export default Articles;
