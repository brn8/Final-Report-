import * as React from 'react';
import { Socket } from './Socket';
import { GoogleButton } from './GoogleButton';

export function AuthPage() {
    return (
       <div>
            <h1>Sign in via Google Account to enjoy Messaging System</h1>
            <GoogleButton />
            <a href="https://accounts.google.com/signup/v2/webcreateaccount?hl=en&flowName=GlifWebSignIn&flowEntry=SignUp"><button>Sign Up</button></a>
        </div>
    );
}