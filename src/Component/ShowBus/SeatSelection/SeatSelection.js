import React, { useState } from 'react'

import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import classes from './SeatSelection.module.css'


export default function SeatSelection(props) {

    const [seatSelected1, setSeatSelected1] = useState([])


    let array = [...props.seats]
    const middleIndex = Math.ceil(array.length / 2)
    const lowerDeck = array.splice(0, middleIndex);
    const upperDeck = array.splice(-middleIndex);


    const handleSelectSeat = (index) => {
        setSeatSelected1(prv => [...prv, index])
    }

    return (

        <div className={classes.rootSeat}>
            <>

                <div className={classes.busArea}>
                    <PersonOutlineIcon className={classes.driver} />
                    <hr />

                    <div className={classes.seatContainer}>
                        <div>
                            {lowerDeck.map((seat, index) => index % 2 === 0 && <p key={index} className={seat === 0 ? seatSelected1.includes(index) ? classes.seat2 : classes.seat : classes.seat1} onClick={() => handleSelectSeat(index)}> <BedroomChildIcon /></p>)}

                        </div>
                        <div>

                            {lowerDeck.map((seat, index) => index % 2 !== 0 && <p key={index} className={seat === 0 ? seatSelected1.includes(index) ? classes.seat2 : classes.seat : classes.seat1} onClick={() => handleSelectSeat(index)}> <BedroomChildIcon /></p>)}

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
                            {upperDeck.map((seat, index) => index % 2 === 0 && <p key={index + middleIndex} className={seat === 0 ? seatSelected1.includes(index + middleIndex) ? classes.seat2 : classes.seat : classes.seat1} onClick={() => handleSelectSeat(index + middleIndex)}> <BedroomChildIcon /></p>)}

                        </div>
                        <div>

                            {upperDeck.map((seat, index) => index % 2 !== 0 && <p key={index + middleIndex} className={seat === 0 ? seatSelected1.includes(index + middleIndex) ? classes.seat2 : classes.seat : classes.seat1} onClick={() => handleSelectSeat(index + middleIndex)}> <BedroomChildIcon /></p>)}

                        </div>

                    </div>
                    <p>upperDeck</p>
                </div>
            </>

            <div className={classes.details}>

            </div>
        </div >
    )
}
