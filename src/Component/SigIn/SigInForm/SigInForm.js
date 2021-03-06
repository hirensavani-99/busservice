//sign in and signup are in one file showing them  with different checks  

import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { LoginHandler } from '../../../redux/action/index'

//style
import { Card, Form, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './signInForm.module.css'


export default function SignInForm(props) {

    const [admin, setAdmin] = useState(false)

    const emailInputRef = useRef("")
    const passwordInputRef = useRef("")
    const userNameInputRef = useRef("")

    const dispatch = useDispatch()
    const navigate = useNavigate()



    const authSubmitHandler = async (e) => {
        e.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredUserName = userNameInputRef.current.value;

        let data = {
            name: enteredUserName,
            email: enteredEmail,
            password: enteredPassword
        }

        try {

            const url = props.isSignUp ? "http://localhost:8000/user/register" : admin ? "http://localhost:8000/admin/login" : "http://localhost:8000/user/login"

            const response = await axios.post(url, data)


            if (response.status === 200) {
                toast.success(props.isSignUp ? "registration is successfully done " : "Logged In")

                await localStorage.setItem('userData', JSON.stringify(response.data));
                await dispatch(LoginHandler(response.data))
                response.data.isAdmin ? navigate("/admin") : navigate("/")
            } else {
                toast.warning("something went wrong")
            }
        } catch (e) {
            toast.error(e)
        }

    }

    return (
        <>

            <div className={classes.root}>
                <ToastContainer />
                <Card className={classes.container} >
                    {!props.isSignUp && <h2 className={classes.title}>Si<span className={classes.span}>g</span>nIn</h2>}
                    {props.isSignUp && <h2 className={classes.title}>Si<span className={classes.span}>g</span>nUp</h2>}
                    <hr />
                    <Card.Body>

                        <Card.Text>
                            <Form className={classes.form}>
                                {props.isSignUp && <Form.Group className="mb-3" controlId="text">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter user" ref={userNameInputRef}  data-testid="name-input"/>

                                </Form.Group>
                                }
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" ref={emailInputRef} data-testid="email-input" />

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" ref={passwordInputRef} data-testid="password-input" />
                                </Form.Group>
                                {!props.isSignUp && <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Login as a admin" onChange={(e) => { setAdmin(e.target.checked) }} />
                                </Form.Group>}

                                <Button type="submit" className={classes.button} onClick={authSubmitHandler} data-testid="submit-button">
                                    Submit
                                </Button>
                            </Form>
                        </Card.Text >

                    </Card.Body >
                </Card >
            </div >
        </>



    )
}
