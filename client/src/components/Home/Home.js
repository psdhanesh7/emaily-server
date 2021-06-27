import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./Home.css";
import Nav from '../Navigationbar/Navigationbar'

export default function Home(props) {

  const [mails, setMails] = useState([]);

  useEffect(async () => {
    console.log(props);
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3000/api/emails/scheduled',
      headers: {
        authorization: `BEARER ${props.token}`
      }
    });
    console.log(res.data);
    if(res.data.success) {
      setMails(res.data.emails)
    }
  }, [])

  //Filtering mails based on count. if count>0, then it is already sent.
  //Only those mails are needed to be displayed
  //const home_mail = mail.filter((data, index) => data.count == 0);

  return (
    <div className="container-fluid">
      <Nav />
      <h2 className="heading">Home</h2>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>To</th>
            <th>Subject</th>
            <th></th>
            <th></th>
            <th>To be sent on</th>
          </tr>
        </thead>
        <tbody>
          {mails.map((data, index) => (
            <tr key={index}>
              <td><a href="/selectedmailhome"><button>{index + 1}</button></a></td>
              <td>
                {data.recipients.map((data, index) => (
                  <div key={index}>{data} </div>
                ))}
              </td>
              <td colSpan="3">{data.subject}</td>
              <td>
                {(() => {
                  if (data.type == "weekly") {
                    return (
                      <div>
                        {data.schedule.day}
                        {",  "}
                        {data.schedule.time}
                      </div>
                    );
                  } else if (data.type == "monthly") {
                    return (
                      <div>
                        {data.schedule.date}
                        {",  "}
                        {data.schedule.time}
                      </div>
                    );
                  } else {
                    return (
                      <div>
                        {data.schedule.date}
                        {"/"}
                        {data.schedule.month}
                        {",  "}
                        {data.schedule.time}
                      </div>
                    );
                  }
                })()}
              </td>
            </tr>
            
          ))}
        </tbody>
      </Table>
    </div>
  );
}
