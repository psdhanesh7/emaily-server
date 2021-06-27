import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Table } from "react-bootstrap";
import "./History.css";
import Nav from '../Navigationbar/Navigationbar'

export default function History({ token }) {

  const [mails, setMails] = useState([]);

  useEffect(async () => {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3000/api/emails/history',
      headers: {
        authorization: `BEARER ${token}`
      }
    });
    console.log(res.data);
    if(res.data.success) {
      setMails(res.data.emails)
    }
  }, [])

  return (
    <div className="container-fluid">
      <Nav/>
      <h2 className="heading">History</h2>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>To</th>
            <th>Subject</th>
            <th></th>
            <th></th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {mails.map((data, index) => (
            <tr key={index}>
              <td><a href="/selectedmailhistory"><button>{index + 1}</button></a></td>
              <td>
                {data.recipients.map((data, index) => (
                  <div key={index}>{data} </div>
                ))}
              </td>
              <td colSpan="3">{data.subject}</td>
              <td>{data.sentDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
