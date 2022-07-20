import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
const Footer = () => {
    return (
        <div class="container pb-4">
            <footer style={{ marginTop: "50px" }}>
                <Row>
                    <Col className="d-flex" sm={12} md={7} lg={7}>
                        <h6 className="footer-icons" style={{ marginRight: "10px", whiteSpace: "nowrap", fontSize: "15px", fontWeight: "400" }}>Home</h6>
                        <h6 className="footer-icons" style={{ marginRight: "10px", whiteSpace: "nowrap", fontSize: "15px", fontWeight: "400" }}>About Us</h6>
                        <h6 className="footer-icons" style={{ marginRight: "10px", whiteSpace: "nowrap", fontSize: "15px", fontWeight: "400" }}>Attorney Information</h6>
                        <h6 className="footer-icons" style={{ marginRight: "10px", whiteSpace: "nowrap", fontSize: "15px", fontWeight: "400" }}>Medical Providers - List Your Office For Free</h6>
                        <h6 className="footer-icons" style={{ marginRight: "10px", whiteSpace: "nowrap", fontSize: "15px", fontWeight: "400" }}>Marketer</h6>
                    </Col>
                    <Col className="d-flex">
                        <h6 className="footer-icons" style={{ marginRight: "10px", whiteSpace: "nowrap", fontSize: "15px", fontWeight: "400" }}>Privacy Policy</h6>
                        <h6 className="footer-icons" style={{ marginRight: "10px", whiteSpace: "nowrap", fontSize: "15px", fontWeight: "400" }}>Contact Us</h6>
                    </Col>
                </Row>
            </footer>
        </div>
    )
}

export default Footer
