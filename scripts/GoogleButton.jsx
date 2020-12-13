import * as React from 'react';
import { Socket } from './Socket';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import { MessagingSystem } from './MessagingSystem';

function responseGoogle(response) {
    let url = response.profileObj.imageUrl;
    let email = response.profileObj.email;
    let name = response.profileObj.name;

     Socket.emit('new name', {
        'name': name,
    });

    Socket.emit('new email', {
        'email': email,
    });
    
    Socket.emit('new image', {
        'image': url,
    });

    ReactDOM.render(<MessagingSystem />, document.getElementById('content'));
}

export function GoogleButton() {
  return( 
      <GoogleLogin
      className="googleButton"
      clientId="#addyourclientId"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}/>
      );
}

