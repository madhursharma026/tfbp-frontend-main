import React, {useEffect, useState} from 'react'
import { Navbar, Nav, Row, Col, Container, Form, Button, FormControl } from 'react-bootstrap'
import { Link } from "react-router-dom";
import Logo from '../content/images/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import Message from "../components/Message";
import Loader from '../components/Loader'
import {logout} from '../actions/userActions'


const Header = () => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()

    
    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(username, password))
    }

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header class="pb-0 pt-1 bg-white">
            <div class="container">
                {error && <Message color="primary">{error}</Message>}
                {loading && <Loader />}
                <div class="text-md-end">
                    {!userInfo && (
                        <>
                            <form onSubmit={submitHandler} method="POST" class="d-inline-flex flex-wrap">
                                <input class="form-control form-control-sm me-3" style={{width: '180px'}} type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="username" placeholder="Username" aria-label="default input example" />
                                <input class="form-control form-control-sm me-3" style={{width: '180px'}} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" name="password1" aria-label="default input example" />
                                <button class="btn btn-sm btn-primary me-2" type="submit"><i class="fas fa-lock"></i></button>
                            </form>
                            <a href="{% url 'reset_password' %}" class="topIcons me-2 text-decoration-none">Forgot Login Info?</a>
                            
                            <Link to="/createAccount" class="topIcons text-decoration-none" >Create Account</Link>
                        </>
                    )}
                    {userInfo && (
                        <div class="top-nav-sm d-flex flex-wrap justify-content-md-end" style={{paddingTop: '3px', paddingBottom: '4px'}}>
                        
                        {(userInfo.account_type === 'Provider' || userInfo.account_type == 'ProviderStaff') && (
                            <>
                                {userInfo.account_type == 'Provider' && (
                                    <Link to='/' style={{textDecoration:'none'}} >Welcome {userInfo.providerprofile.first_name} {userInfo.providerprofile.last_name} with {userInfo.providerprofile.office_name}!</Link>
                                )}
                                {userInfo.account_type == 'ProviderStaff' && (
                                    <Link to='/' style={{textDecoration:'none'}} >Welcome {userInfo.providerprofile.first_name} {userInfo.providerprofile.last_name} with {userInfo.providerprofile.office_name}!</Link>
                                )}
                                
                                <Link className='header-nav-items' to='/profile/'  >Account</Link>
                                <Link className='header-nav-items' to='/'  >Case Management</Link>
                                <Link className='header-nav-items' to='/'  >TFTodo</Link>
                                <Link className='header-nav-items' to='/'  >Request Update</Link>
                                <Link className='header-nav-items' to='/accounting/'  >Accounting</Link>
                                <Link className='header-nav-items' to='/'  >Reports</Link>
                                <Link className='header-nav-items' to='/' onClick={logoutHandler}  >Logout</Link>
                                
                            </>
                        )}


                    {(userInfo.account_type === 'Attorney' || userInfo.account_type == 'AttorneyStaff') && (
                        <>
                            {userInfo.account_type == 'Attorney' && (
                                <Link to='/' style={{textDecoration:'none'}} >Welcome {userInfo.attorneyprofile.first_name} {userInfo.attorneyprofile.last_name}</Link>
                            )}
                            {userInfo.account_type == 'AttorneyStaff' && (
                                <Link to='/' style={{textDecoration:'none'}} >Welcome {userInfo.attorneyprofile.first_name} {userInfo.attorneyprofile.last_name}</Link>
                            )}
                            
                            <Link className='header-nav-items' to='/'  >My Account</Link>
                            
                            <Link className='header-nav-items' to='/' onClick={logoutHandler}  >Logout</Link>
                            
                        </>
                    )}

                    {(userInfo.account_type === 'Marketer' || userInfo.account_type == 'MarketerStaff') && (
                        <>
                            {userInfo.account_type == 'Marketer' && (
                                <Link to='/' style={{textDecoration:'none'}} >Welcome {userInfo.marketerprofile.first_name} {userInfo.marketerprofile.last_name} of {userInfo.marketerprofile.office_name}</Link>
                            )}
                            {userInfo.account_type == 'MarketerStaff' && (
                                <Link to='/' style={{textDecoration:'none'}} >Welcome {userInfo.marketerprofile.first_name} {userInfo.marketerprofile.last_name} of {userInfo.marketerprofile.office_name}</Link>
                            )}
                            
                            <Link className='header-nav-items' to='/'  >Account</Link>
                            <Link className='header-nav-items' to='/'  >Marketer Code</Link>
                            <Link className='header-nav-items' to='/'  >Medical Providers Marketed</Link>
                            <Link className='header-nav-items' to='/' onClick={logoutHandler}  >Logout</Link>
                            
                        </>
                    )}
                        
                </div>
                    )}
                    
                </div>
            </div>
            <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
            <Link class="navbar-brand" to="/">
                <img src={Logo} style={{width: '200px'}} alt="" />
            </Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item navItems me-2">
                        <Link to="/" class="nav-link active" aria-current="page">Home</Link>
                    </li>
                    <li class="nav-item navItems me-2">
                        <Link to="/aboutus" class="nav-link">About Us</Link>
                    </li>
                    <li class="nav-item navItems me-2">
                        <Link to="/attorneyInfo" class="nav-link">Attorney Information</Link>
                    </li>
                    <li class="nav-item navItems me-2">
                        <Link to="/medicalProviders" class="nav-link">Medical Providers-List Your Office For Free!</Link>
                    </li>
                </ul>
            </div>
            </nav>
        </div>
        </header>
    )
}

export default Header
