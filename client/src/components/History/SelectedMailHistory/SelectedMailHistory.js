import React from "react";
import { Badge, Button } from "react-bootstrap";
import "./SelectedMailHistory.css";
import Nav from '../../Navigationbar/Navigationbar'

export default function SelectedMailHistory() {
  const mail = {
    from: "from@gmail.com",
    recipients: ["to@gmail.com", "cc1@gmail.com", "cc2@gmail.com"],
    sentDate: "December 17, 2020 03:24:00",
    subject:
      "Subject of the mail-Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    body: "Body of mail Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    type: "yearly",
    count: 1,
  };
  return (
    <div className="container-fluid">
      <Nav />
      <div>
        <a href="/history">
        <Button variant="light" className="goBack">
          <i class="fas fa-long-arrow-alt-left"></i> Go Back
        </Button></a>
      </div>
      <div className="subject">
        <h4>{mail.subject}</h4>
        <Badge pill bg="primary" className="type">
          {mail.type}
        </Badge>
      </div>

      <hr />
      <div className="from">
        <h6>From: </h6>
        {mail.from}
      </div>
      <br />
      <div className="to">
        <h6>To: </h6>
        {mail.recipients.map((data, index) => (
          <div key={index}>{data} </div>
        ))}
      </div>
      <br />
      <div className="date">
        <h6>Date:</h6>
        {mail.sentDate}
      </div>

      <hr />
      <div className="body">{mail.body}</div>
    </div>
  );
}
