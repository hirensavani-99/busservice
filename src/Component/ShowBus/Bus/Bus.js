import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import SeatSelections from '../SeatSelection/SeatSelection';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';

import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import NetworkWifiIcon from '@mui/icons-material/NetworkWifi';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import NightlightIcon from '@mui/icons-material/Nightlight';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';


import classes from './Bus.module.css'

export default function Bus(props) {



    const [showSeats, setShowSeats] = useState(false)


    const handleSeats = () => {
        setShowSeats(!showSeats)
    }


    const availableSeat = (totalSeats) => {
        let emptySeats = 0;
        totalSeats.map(seat => {
            if (seat === 0) {
                emptySeats++
            }
        })

        return emptySeats;
    }


    return (
        <div className={classes.root} key={props.busService.root_Id}>
            <Card sx={{ maxWidth: 900 }}>
                <Box sx={{ p: 2, display: 'flex' }}>
                    <Avatar variant="rounded" src="https://thumbs.dreamstime.com/z/cartoon-school-bus-20777294.jpg" />
                    <Stack spacing={0.5} ml={3} mr={7}>
                        <Typography fontWeight={700}>{props.busService.agencyName}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {props.busService.busType}
                        </Typography>
                    </Stack>

                    <Stack spacing={0.5}>
                        <Typography variant="body2" color="text.secondary">
                            Departure
                        </Typography>
                        {
                            props.busService.travelSchedule.map(city => city.destination === props.searched[0][0].from &&
                                (<>
                                    <Typography fontWeight={700}>{city.time}</Typography>
                                    <Typography variant="body2" color="text.secondary">{city.pickup}</Typography>
                                </>))
                        }

                    </Stack>

                    <Stack spacing={0.5} ml={4} mr={4}>
                        <Typography variant="body2" color="text.secondary">
                            Duration
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            5h 30min
                        </Typography>
                    </Stack>

                    <Stack spacing={0.5}>
                        <Typography variant="body2" color="text.secondary">
                            Arrival
                        </Typography>
                        {
                            props.busService.travelSchedule.map(city => city.destination === props.searched[0][0].to &&
                                (<>

                                    <Typography fontWeight={700}>{city.time}</Typography>
                                    <Typography variant="body2" color="text.secondary">{city.pickup}</Typography>
                                </>))
                        }

                    </Stack>
                    <Stack spacing={0.5} ml={5} mr={7}>
                        <Typography variant="body2" color="text.secondary">
                            Rating
                        </Typography>
                        <Typography fontWeight={700}><Rating name="read-only" value={props.busService.rating} readOnly /></Typography>
                        <Typography variant="body2" color="text.secondary">
                            {(100 * props.busService.rating) - props.busService.price / 10}
                        </Typography>

                    </Stack>

                    <Stack spacing={0.5}>
                        <Typography variant="body2" color="text.secondary">
                            price
                        </Typography>
                        <Typography fontWeight={700}>{props.busService.price} INR</Typography>

                    </Stack>
                    <Stack spacing={0.5} ml={3} mr={7}>
                        <Typography variant="body2" color="text.secondary">
                            available
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {availableSeat(props.busService.seats_Available)} available
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {props.busService.seats_Available.length - availableSeat(props.busService.seats_Available)} Booked
                        </Typography>

                    </Stack>

                </Box>
                <Divider />
                <Box sx={{ p: 2, display: 'flex', justifyContent: "space-between" }}>
                    <Stack spacing={0.5} ml={1} direction="row">
                        <LocalCafeIcon />
                        <RestaurantIcon />
                        <NetworkWifiIcon />
                        <SingleBedIcon />
                        <ElectricalServicesIcon />
                        <NightlightIcon />
                        <ShareLocationIcon />
                        <SmartDisplayIcon />

                    </Stack>
                    <Button className={classes.btn1} onClick={handleSeats}>view seats</Button>

                </Box>

            </Card>
            {showSeats && <SeatSelections seats={props.busService.seats_Available} price={props.busService.price} id={props.busService.root_Id}/>}
        </div>
    )
}
