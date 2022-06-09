import React, { useState } from 'react'



import BookingForm from './BookingForm';

import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Backdrop from '@mui/material/Backdrop';

import { Table } from 'react-bootstrap'

import classes from './SeatSelection.module.css'


export default function SeatSelection(props) {

    const [seatSelected1, setSeatSelected1] = useState([])
    const [open, setOpen] = useState(false);
    const [updated, setUpdated] = useState([])

    let array = [...props.seats]
    const middleIndex = Math.ceil(array.length / 2)
    const lowerDeck = array.splice(0, middleIndex);
    const upperDeck = array.splice(-middleIndex);


    const handleSelectSeat = (index) => {

        if (seatSelected1.includes(index)) {
            setSeatSelected1(prv => {
                return prv.filter(seat => seat !== index)
            })
        }
        else {
            console.log(array);
            if (props.seats[index] === 0) {
                setSeatSelected1(prv => [...prv, index])
            }

        }



    }
    const handleClose = () => {
        setOpen(false);
    };

    const bookHandler = (e) => {
        e.preventDefault()
        setOpen(!open);
        let seats = [...lowerDeck, ...upperDeck]
        console.log(seats);
        for (let seat of seatSelected1) {
            seats[seat] = 1
        }
        setUpdated(seats)
    }

    return (

        <div className={classes.rootSeat}>
            <>

                <div className={classes.busArea}>
                    <PersonOutlineIcon className={classes.driver} />
                    <hr />

                    <div className={classes.seatContainer}>
                        <div>
                            {lowerDeck.map((seat, index) => index % 3 === 0 && <p key={index} className={seat === 0 ? seatSelected1.includes(index) ? classes.seat2 : classes.seat : classes.seat1} onClick={() => handleSelectSeat(index)}> <BedroomChildIcon /></p>)}

                        </div>
                        <div className={classes.seatContainer1}>
                            <div>
                                {lowerDeck.map((seat, index) => index % 2 === 0 && index % 3 !== 0 && <p key={index} className={seat === 0 ? seatSelected1.includes(index) ? classes.seat2 : classes.seat : classes.seat1} onClick={() => handleSelectSeat(index)}> <BedroomChildIcon /></p>)}
                            </div>

                            <div>
                                {lowerDeck.map((seat, index) => index % 2 !== 0 && index % 3 !== 0 && <p key={index} className={seat === 0 ? seatSelected1.includes(index) ? classes.seat2 : classes.seat : classes.seat1} onClick={() => handleSelectSeat(index)}> <BedroomChildIcon /></p>)}

                            </div>

                        </div>
                    </div>


                    <p>lowerDeck</p>

                </div>

            </>
            <>
                <div className={classes.busArea}>
                    <PersonOutlineIcon className={classes.driver} />
                    <hr />

                    <div className={classes.seatContainer}>
                        <div>
                            {upperDeck.map((seat, index) => index % 3 === 0 && <p key={index + middleIndex} className={seat === 0 ? seatSelected1.includes(index + middleIndex) ? classes.seat2 : classes.seat : classes.seat1} onClick={() => handleSelectSeat(index + middleIndex)}> <BedroomChildIcon /></p>)}

                        </div>
                        <div className={classes.seatContainer1}>
                            <div>{upperDeck.map((seat, index) => index % 2 === 0 && index % 3 !== 0 && <p key={index + middleIndex} className={seat === 0 ? seatSelected1.includes(index + middleIndex) ? classes.seat2 : classes.seat : classes.seat1} onClick={() => handleSelectSeat(index + middleIndex)}> <BedroomChildIcon /></p>)}</div>
                            <div>
                                {upperDeck.map((seat, index) => index % 2 !== 0 && index % 3 !== 0 && <p key={index + middleIndex} className={seat === 0 ? seatSelected1.includes(index + middleIndex) ? classes.seat2 : classes.seat : classes.seat1} onClick={() => handleSelectSeat(index + middleIndex)}> <BedroomChildIcon /></p>)}
                            </div>

                        </div>

                    </div>
                    <p>upperDeck</p>
                </div>
            </>

            <div className={classes.details}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>seat Number</th>
                            <th>price</th>

                        </tr>
                    </thead>
                    <tbody>
                        {seatSelected1.map(seatNumber =>
                            <tr>
                                <td>{seatNumber}</td>
                                <td>{props.price}</td>
                            </tr>)}
                    </tbody>
                </Table>
                <h3>Total : {props.price * seatSelected1.length}</h3>
                <button className={classes.btn1} disabled={seatSelected1.length === 0} onClick={bookHandler}>Book Now</button>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <BookingForm data={updated} openModel={setOpen} id={props.id} amount={props.price * seatSelected1.length} />
                </Backdrop>
            </div>
        </div >
    )
}
