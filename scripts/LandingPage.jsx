import * as React from 'react';
import { Socket } from './Socket';

function handleSubmit(event) {
    let input = document.getElementById("input");
    
    Socket.emit('new input', {
        'message': input.value,
    });

    console.log('Sent the input data '+ input.value + ' to the server!');
    
    event.preventDefault();
}

export function LandingPage() {
    return (
        <form onSubmit={handleSubmit}>
            <input id="input" placeholder="Type a message"></input>
            <div id="sendPosition">
            <button>Send</button>
            </div>
        </form>
    );
}