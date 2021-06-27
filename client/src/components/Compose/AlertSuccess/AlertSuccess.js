import React from "react";
import { Alert } from "react-bootstrap";
import "./AlertSuccess.css"
import Nav from '../../Navigationbar/Navigationbar'

export default function AlertSuccess() {
  return (
    <div>
      <Nav />
      <Alert variant="success" className="alert">
        Email Sent Successfully
        <br />
        <Alert.Link href="/home">Go to Home</Alert.Link>
      </Alert>
    </div>
  );
}
