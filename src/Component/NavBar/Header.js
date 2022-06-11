// component -> NavBar 
//--------------------

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { LogoutHandler } from '../../redux/action/index'

//style
import { AppBar, Toolbar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../../assets/logo.jpg'
import classes from './Header.module.css'


export default function Header(props) {
    //state
    const [toggaleMenu, setToggleMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    //redux
    const dispatch = useDispatch()
    const userData = useSelector(state => state.handleUser)
    
    useEffect(() => {

        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener('resize', changeWidth)

        return () => {
            window.removeEventListener('resize', changeWidth)
        }

    }, [])

    //logout via redux -> clearing direct local storage 
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

                        {userData.user && userData.user.isAdmin ?   // if userdata is available and in that data admin is theere (only for admin)
                            <>
                                <NavLink exact className={classes.iconDetail} to='/admin'>Admin</NavLink>
                                <NavLink exact className={classes.iconDetail} to='/addbus'>Add Bus</NavLink>
                                <a className={classes.iconDetail} >chat</a>
                            </>
                            :
                            <>
                                <NavLink exact className={classes.iconDetail} to='/help'>Help</NavLink>
                                <NavLink exact className={classes.iconDetail} to='/Partner'>AboutUs</NavLink>
                            </>
                        }

                        {!userData.user &&  
                            <>
                                <NavLink exact className={classes.iconDetail} to='/signin'>signIn</NavLink>
                                <NavLink exact className={classes.iconDetail} to='/signup'>signUp</NavLink>
                            </>}
                        {userData.user && <a className={classes.iconDetail} onClick={logoutHandler}>Logout</a>}



                    </div>}
                    <MenuIcon className={classes.dropdwnbtn} onClick={toggalNav} />
                </Toolbar>

            </AppBar>

        </div >
    )
}
