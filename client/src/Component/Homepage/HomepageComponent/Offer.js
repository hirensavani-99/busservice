import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


import classes from './HomepageComponent.module.css'


export default function Offer(props) {

 

    return (

        <div className={classes.container}>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={props.offerData.pic}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.offerData.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {props.offerData.body}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>


    );
}
