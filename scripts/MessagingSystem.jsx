    
import * as React from 'react';
import { Socket } from './Socket';
import ReactDOM from 'react-dom';
import { AuthPage } from './AuthPage';
import { LandingPage } from './LandingPage';

export function MessagingSystem() {
    const [message, setMessages] = React.useState([]);
    const [image, setImage] = React.useState([]);
    const [email, setEmail] = React.useState([]);
    const [name, setName] = React.useState([]);
    
     
    function logout(){
         ReactDOM.render(<AuthPage />, document.getElementById('content'));
    }
    
    function getNewMessage() {
        React.useEffect(() => {
            Socket.on('message received', updateMessages);
            
        });
    }
    function updateMessages(data) {
        console.log("Received addresses from server: " + data['allMessages']);
        setMessages(data['allMessages']);
    }
    
    getNewMessage();
    
     function getName() {
        React.useEffect(() => {
            Socket.on('realname', (data) => {
                 console.log("Received user name from server: " + data['name']);
                 setName(data['name']);
            })
        });
    }
    getName();
    
    function getEmail() {
        React.useEffect(() => {
            Socket.on('emailAddress', (data) => {
                 console.log("Received user email address from server: " + data['email']);
                 setEmail(data['email']);
            })
        });
    }
    getEmail();

    function getImage() {
        React.useEffect(() => {
            Socket.on('imageLinks', (data) => {
                 console.log("Received user image from server: " + data['image']);
                 setImage(data['image']);
            })
        });
    }
    getImage();


    return (
        <div>
              <h2>My Messaging System </h2>
                <ol>
                    {
                    message.map((message, index)=>
                        <div key={index}>{message} </div>)
                    }
                </ol>
                <div class="info">
                <img src={image} width="90" height="90"/>
                <p>{email}</p>
                <p1>{name}</p1>
                <form onSubmit={logout}>
                <button id="hi">Sign Out</button>
                </form>
                </div>
            <LandingPage />
        </div>
    );
}