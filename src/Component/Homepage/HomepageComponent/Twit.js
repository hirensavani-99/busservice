import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Rating from '@mui/material/Rating';


import classes from './HomepageComponent.module.css'


export default function Twit(props) {
    return (
        <div className={classes.twitContainer}>

            <Card sx={{ maxWidth: 550 }}>
                <CardActionArea>
                    <div className={classes.imgContainer}>
                        <CardMedia
                            component="img"
                            height="80"
                            image={props.offerData.url}
                            alt="green iguana"
                            className={classes.img}
                        />
                        <div>
                            <Typography gutterBottom variant="h6" component="div">
                                {props.offerData.name}
                                <Typography variant="body2" color="text.secondary">
                                    {props.offerData.date}
                                </Typography>
                                <Rating name="half-rating" defaultValue={props.offerData.rating} readOnly />
                            </Typography>
                        </div>
                    </div>

                    <CardContent>

                        <Typography variant="body2" color="text.secondary">
                            {props.offerData.body}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}
