//This component is usefull for creating new bus for admin with submiting form 
//-----------------------------------------------------------------------------

import React, { useRef, useState } from 'react'
import axios from 'axios'

//styles
import { Form, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import classes from './admin.module.css'



export default function AddBus(props) {

    const [schedule, setschedule] = useState([])    // getting schedule object 

    // initializing all refs for geting values 
    const agencyNameInputref = useRef('')
    const busTypeInputref = useRef('')
    const dateInputref = useRef('')
    const priceInputref = useRef('')

    //refs for schedule 
    const destinationInputRef = useRef('')
    const timeScheduleInputRef = useRef('')
    const pickUpScheduleInputRef = useRef('')

    //sending request to backend for register new bus 
    const handleBus = async (e) => {
        e.preventDefault()

        //getting current values of input field
        const agencyName = agencyNameInputref.current.value;
        const busType = busTypeInputref.current.value;
        const date = dateInputref.current.value;
        const price = priceInputref.current.value;

        //triming input field and checking it is not empty 
        if (agencyName.trim() !== '' && busType.trim() !== '' && date.trim() !== '' && price.trim() !== '') {

            //data to be sent
            const data = {
                agencyName: agencyName,
                busType: busType,
                date: date,
                price: price,
                travelSchedule: schedule
            }
            try {
                //execution of post request 
                const response = await axios.post('http://localhost:8000/admin/addBus', data)
                console.log(response);
                if (response.status === 201) {
                    toast.success("student added successfully")
                }
            } catch (e) {
                toast.error(e.message)
            }

        } else {
            toast.info("field can not be empty")

        }
    }

    //setting new object of city in schedule state
    const scheduleHandler = (e) => {
        e.preventDefault()

        //getting current values of input field
        const destination = destinationInputRef.current.value;
        const time = timeScheduleInputRef.current.value;
        const pickup = pickUpScheduleInputRef.current.value;

        //triming input field and checking it is not empty 
        if (destination.trim() !== 0 && time.trim() !== 0 && pickup.trim !== 0) {
            
            //data to be stored in schedule state 
            let data = {
                destination: destination,
                time: time,
                pickup: pickup
            }

            setschedule(prv => [...prv, data])
            console.log(schedule);

        }

        //after storing in to state making it empty so new value 
        destinationInputRef.current.value = ""
        timeScheduleInputRef.current.value = ""
        pickUpScheduleInputRef.current.value = ""


    }


    return (
        <div className={classes.formroot}>
            <ToastContainer   //respone animation after getting response 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <h1>Add Bus</h1>
            <Form >
                <Form.Group className={classes.fieldContainer} >
                    <>

                        <Form.Control className={classes.field} type="text" placeholder="agency name" ref={agencyNameInputref} />
                    </>
                    <>

                        <Form.Control type="text" className={classes.field} placeholder="bus type" ref={busTypeInputref} />
                    </>

                </Form.Group>
                <Form.Group className={classes.fieldContainer}>
                    <>
                        <Form.Control className={classes.field} type="date" ref={dateInputref} />
                    </>
                    <>
                        <Form.Control className={classes.field} type="number" placeholder="Enter Price" ref={priceInputref} />
                    </>
                </Form.Group>

                <Form.Group className={classes.fieldContainer}>
                    <>
                        <Form.Control className={classes.field} type="text" placeholder="destination" ref={destinationInputRef} />
                    </>
                    <>
                        <Form.Control className={classes.field} type="time" placeholder="time" ref={timeScheduleInputRef} />
                    </>
                    <>
                        <Form.Control className={classes.field} type="text" placeholder="pick up" ref={pickUpScheduleInputRef} />
                    </>
                </Form.Group>

                <div className={classes.btn}>
                    <Button variant="primary" onClick={scheduleHandler}>
                        Add to Schedule
                    </Button>

                    <Button variant="primary" onClick={handleBus}>
                        submit
                    </Button>
                </div>

            </Form>
        </div >
    )
}
