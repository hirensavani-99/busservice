import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { searchedBus} from '../../../redux/action/index'

//style
import { Form } from 'react-bootstrap'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ToastContainer, toast } from 'react-toastify';
import classes from './BookingForm.module.css'

export default function BookingForm(props) {

    const dispatch = useDispatch()


    const onToken = async (token) => {
        let data = {
            seats_Available: props.data
        }
        try {
            const response = await axios.put(`http://localhost:8000/ticketBooking/${props.id}`, data)
            if (response.status === 200) {
                dispatch(searchedBus(response.data))
                toast.success("Thank you ! Your ticket is booked successfully , will be available in your email in few minutes!")
            } else {
                toast.warn('we are sorry! somethingwent wrong try again')
            }
        } catch (err) {
            toast.error('service unavailable')
        }

    }


    const btnBackHandler = (e) => {
        e.preventDefault()
        props.openModel(false)
    }




    return (
        <div className={classes.root}>
            <ToastContainer />
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="userName" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>special requirement</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <button className={classes.btn1} onClick={btnBackHandler}>{<ArrowBackIcon />}go back</button>


            </Form>
            <StripeCheckout
                stripeKey
                token={onToken}
                name="Buy your Ticket"
                amount={props.amount * 100}>
                <button className={classes.btn1}>{`payable amount: ${props.amount}  `}</button>
            </StripeCheckout>
        </div>
    )
}
