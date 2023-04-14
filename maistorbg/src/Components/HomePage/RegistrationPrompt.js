import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./TopCraftsmen.scss";
import "./RegistrationPrompt.scss"
import { Container } from 'react-bootstrap';

const RegistrationPrompt = () => {
    return (
        <Container style={{ border: "1px solid black", padding: "20px" }} className="mx-md-5 my-5">

            <div className='containerReminder'>
                <div className='register'>
                    <Col xs={12} md={6}>
                        <p>
                            If you do not have an account, you can create one by clicking the button:
                        </p>
                    </Col>
                    <Col xs={12} md={6}>
                        <Button href="/register" block className='b'>Register</Button>
                    </Col>
                </div>

                <div className='login'>
                    <Col xs={12} md={6}>
                        <p>
                            If you have an account, login by clicking the button:
                        </p>
                    </Col>
                    <Col xs={12} md={6}>
                        <Button href="/login" block className='b'>Login</Button>
                    </Col>
                </div>
            </div>

        </Container>
    );
};

export default RegistrationPrompt;


// import React from 'react';
// import Button from 'react-bootstrap/Button';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import "./TopCraftsmen.scss";
// import { Container } from 'react-bootstrap';

// const RegistrationPrompt = () => {
//     return (
//         <Container style={{ border: "1px solid black", padding: "20px" }} className="mx-md-5 my-5">
//             <Row>
//                 <Col xs={12} md={6}>
//                     <p>
//                         If you do not have an account, you can create one by clicking the button:
//                     </p>
//                 </Col>
//                 <Col xs={12} md={6}>
//                     <Button href="/register" block>Register</Button>
//                 </Col>
//             </Row>
//             <Row>
//                 <Col xs={12} md={6}>
//                     <p>
//                         If you have an account, login by clicking the button:
//                     </p>
//                 </Col>
//                 <Col xs={12} md={6}>
//                     <Button href="/login" block>Login</Button>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default RegistrationPrompt;
