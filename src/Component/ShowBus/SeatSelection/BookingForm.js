import React, { useRef } from 'react'

import { useSelector } from 'react-redux';

import { Form } from 'react-bootstrap'

export default function BookingForm() {

    const userData = useSelector(state => state.handleUser)

    console.log(userData.user.name);
    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
            </Form>
        </div>
    )
}
