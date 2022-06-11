//signin container 

import React from 'react'
import SignInForm from './SigInForm/SigInForm'
import classes from './signIn.module.css'

export default function SignIn(props) {

    return (
        <div className={classes.root}>
            <SignInForm isSignUp={props.isSignUp} />
        </div>
    )
}
