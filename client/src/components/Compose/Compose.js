import React , {useEffect, useState} from 'react'
import './Compose.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Nav from '../Navigationbar/Navigationbar'


export default function Compose({token}) {

    useEffect((token) => {
        console.log('Token', token);
    })

    const [input, setinput] = useState({
        to:'',
        cc:[],
        subject:'',
        type:'',
        mailbody:'',
        day:'',
        date:'',
        month:'',
        time: ''
      });

    const scheduleMails = async (url, schedule) => {

        const options = {
            headers: { authorization: `BEARER ${token}`}
        };

        const res = await axios.post(url, {
                recipients: `${input.to}, ${input.cc}`,
                subject: input.subject,
                body: input.mailbody,
                schedule 
            },
            options
        );

        console.log(res);


        if(res.data && res.data.success) {
            console.log('Mail send success');
            console.log(res.data);
            window.location.assign('compose/alertsuccess')
        } else {
            // failure redirect
            console.log(res);
            window.location.assign('compose/alertfailure')
        }

        console.log(res);
    }
    
     const onSubmit = (e) => {
        console.log(input);
        e.preventDefault();
        {/* --- METHOD TO SEND THE MAIL --- */}

        switch(input.t) {
            case 'recurring':
                // do the processing here
                scheduleMails('http://localhost:3000/api/emails/recurring', { timeGap: 30 });
                break;
            case 'weekly':
                return scheduleMails(
                    'http://localhost:3000/api/emails/weekly', 
                    { 
                        day: input.day, 
                        time: input.time 
                    }
                );
                break;
            case 'monthly':
                scheduleMails(
                    'https:localhost:3000/api/emails/monthly', 
                    { 
                        date: input.date,
                        time: input.time 
                    }
                );
                break;
            case 'yearly':
                scheduleMails(
                    'http://localhost:3000/api/emails/yearlyy', 
                    { 
                        month: input.month, 
                        date: input.date, 
                        time: input.time 
                    }
                );
                break;
            default:
                console.log('Select type');
        }        
      };
    
      const handleChange = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value });
        
      };
    //   const handleChangecc = (e) =>{
    //     setinput({ ...input, [e.target.name]: e.target.value.split(',').map(s => s.trim()) });

    //   };
      const s = (t) =>{
          if(t == 'monthly'){
              
              
              return(<div className="sch">
                  <div id="sc">
                  <label>Date</label>
                    <input id="i"  type="text" name="date" onChange={handleChange} value={input.date}></input>
                    </div>
                    <div id="sc">
                    <label>Time</label>
                            <input id="i"type="text" name='time' onChange={handleChange} value={input.time}></input>
                            </div>
              </div>);}
           if(t == 'weekly'){
               return(
                <div className="sch">
                    <div id="sc">
                    <label>Day</label>
                    <input id="i" type="text" name='day' onChange={handleChange} value={input.day}></input>
                    </div>
                    <div id="sc">
                    <label>Time</label>
                            <input id="i" type="text" name='time' onChange={handleChange} value={input.time}></input>               
                    </div>
                </div>
               );
           } 
           if(t=='yearly'){
               return(
                   <div className="sch">
                       <div id="sc">
                    <label>Date</label>
                    <input id="i" type="text" name="date" onChange={handleChange} value={input.date}></input>
                    </div>
                    <div id="sc">
                    <label>Month</label>
                    <input id="i" type="text" name='month' onChange={handleChange} value={input.month}></input>
                    </div>
                    <div id="sc">
                    <label>Time</label>
                            <input id="i" type="text" name='time' onChange={handleChange} value={input.time}></input>
                            </div>
                   </div>
               )
           }

          
      };
    return (
        

        <div>
            <Nav />
            <div class="col-md-6 b">
                <div class="panel panel-default">
                    <div class="panel-body message">
                        <p class="text-center">New Message</p>
                        <form class="form-horizontal" role="form">
                            <div class="form-group" className="input">
                                <label for="to" class="col-sm-1 control-label">To:</label>
                                <div class="col-sm-11">
                                    <input type="email" class="form-control select2-offscreen" id="to" placeholder="Type email" tabindex="-1" name="to" value={input.to} onChange={handleChange}/>
                                </div>
                            </div>
                            <div class="form-group" className="input">
                                <label for="cc" class="col-sm-1 control-label">CC:</label>
                                <div class="col-sm-11">
                                    <input type="email" class="form-control select2-offscreen" id="cc" placeholder="Type email" tabindex="-1" name="cc" value={input.cc}
                            onChange={handleChange}/>
                                </div>
                            </div>
                            <div class="form-group" className="input">
                                <label for="bcc" class="col-sm-1 control-label">Sub:</label>
                                <div class="col-sm-11">
                                    <input type="email" class="form-control select2-offscreen" id="bcc" placeholder="Subject" tabindex="-1" name="subject" value={input.subject}
                            onChange={handleChange}/>
                                </div>
                            </div>
                        
                        </form>
                        
                        <div class="col-sm-11 col-sm-offset-1">
                            
                            
                            

                            <div className="schedule">
                                <p>Schedule:</p>
                            <div class="form-group" id="w">
                                <select name ='t'  onChange={handleChange}  value={input.t}>
                                <option name = 't' value="----">----</option>
                                <option name = 't' value="weekly">Weekly</option>
                                <option name = 't' value="monthly">Monthly</option>
                                <option name = 't'  value="yearly">Yearly</option>
                                <option name = 't'  value="recurring">Recurring</option>
                                </select>
                            </div>
                            {s(input.t)}
                            </div>
                        
                            
                            <div class="form-group" className="mailbody">
                                <textarea class="form-control" id="message" name="mailbody" rows="12" placeholder="Click here to reply" value={input.mailbody}
                            onChange={handleChange}></textarea>
                            </div>
                            
                            <div class="form-group" className='send'>	
                                <button type="submit" class="btn btn-success" onClick={onSubmit}>Send</button>
                                
                            </div>
                        </div>	
                </div>	
            </div>	
        </div>
    </div>
    )
}
