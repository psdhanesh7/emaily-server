import React from "react";
import { Alert } from "react-bootstrap";
import "../AlertSuccess/AlertSuccess.css";
import Nav from '../../Navigationbar/Navigationbar'

export default function AlertFailure() {
  return (
    <div>
      <Nav />
      <Alert variant="danger" className="alert">
        Error Sending Mail
        <br />
        <Alert.Link href="/home">Go to Home</Alert.Link>
      </Alert>
    </div>
  );
}
