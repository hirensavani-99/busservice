import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { LogoutHandler } from '../../redux/action/index'
import { AppBar, Toolbar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

import logo from '../../assets/logo.jpg'

import classes from './Header.module.css'


export default function Header(props) {
    const [checked, setChecked] = useState(false)
    const [toggaleMenu, setToggleMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const dispatch = useDispatch()

    const userData = useSelector(state => state.handleUser)


    useEffect(() => {
        setChecked(true)
    }, [])

    useEffect(() => {

        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener('resize', changeWidth)

        return () => {
            window.removeEventListener('resize', changeWidth)
        }

    }, [])

    const logoutHandler = () => {

        
        dispatch(LogoutHandler())
    }

    const toggalNav = () => {
        setToggleMenu(!toggaleMenu)
    }

    return (
        <div className={classes.root1} id="Header">
            <AppBar className={classes.appBar} color="transparent" elevation={0}>
                <Toolbar className={classes.appBarWrapper} color="inherit">
                    <div className={classes.appBarTitle}><NavLink to='/'><img className={classes.img} src={logo} /></NavLink></div>

                    {(toggaleMenu || screenWidth > 600) && <div className={classes.list}>


                        <NavLink exact activeClassName={classes.active} className={classes.iconDetail} to='/help'>Help</NavLink>
                        <NavLink exact activeClassName={classes.active} className={classes.iconDetail} to='/Partner'>AboutUs</NavLink>
                        {!userData.user && <NavLink exact activeClassName={classes.active} className={classes.iconDetail} to='/signin'>signIn</NavLink>}
                        {!userData.user && <NavLink exact activeClassName={classes.active} className={classes.iconDetail} to='/signup'>signUp</NavLink>}
                        {userData.user && <a className={classes.iconDetail} onClick={logoutHandler}>Logout</a>}


                    </div>}
                    <MenuIcon className={classes.dropdwnbtn} onClick={toggalNav} />
                </Toolbar>

            </AppBar>

        </div >
    )
}
