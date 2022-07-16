import React, {useState, useEffect} from 'react'
import  { useNavigate , Link, useLocation } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import Loader from "../components/Loader";
import Message from "../components/Message";
import { register } from '../actions/userActions'


const RegisterScreen = ({history, match}) => {
   
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [officeName, setOfficeName] = useState('')

    const navigate = useNavigate();

    const dispatch = useDispatch()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    let search = window.location.search;
    let params = new URLSearchParams(search);
    const account_type = searchParams.get('account_type');
    console.log(params);
    console.log(account_type);
    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister
    
    useEffect(() => {
        if(userInfo){
            navigate("/");
        }
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('officeName', officeName);
        formData.append('account_type', account_type);
        dispatch(register(formData));
    }

  return (
    <div>
        <div className="bg-white py-3">
            <div className="container">
                <h4 style={{color: '#1c6bb0'}}>Register New Account</h4>
                {error && <Message color='primary'>{error}</Message>}
                {loading && <Loader />}
                <form onSubmit={submitHandler} method="POST">
                <div className="mb-3 row">
                    <label htmlFor="inputUsername" className="col-sm-2 col-form-label fw-bold">Username</label>
                    <div className="col-sm-10">
                    <input type="text" value={username}  onChange={(e) => setUsername(e.target.value)} required className="form-control" name="username" id="username" />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputEmail" className="col-sm-2 col-form-label fw-bold">Email</label>
                    <div className="col-sm-10">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-control" name="email" id="email" />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputFirstName" className="col-sm-2 col-form-label fw-bold">First Name</label>
                    <div className="col-sm-10">
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-control" name="first_name" id="first_name" />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputLastName" className="col-sm-2 col-form-label fw-bold">Last Name</label>
                    <div className="col-sm-10">
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control" name="last_name" id="last_name" />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputLastName" className="col-sm-2 col-form-label fw-bold">Office Name</label>
                    <div className="col-sm-10">
                    <input type="text" value={officeName} required onChange={(e) => setOfficeName(e.target.value)} className="form-control" name="office_name" id="office_name" />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label fw-bold">Password</label>
                    <div className="col-sm-10">
                    <input type="password" value={password} required onChange={(e) => setPassword(e.target.value)} className="form-control" name="password1" id="password1" />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label fw-bold">Confirm Password</label>
                    <div className="col-sm-10">
                    <input type="password" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" name="password2" id="password2" />
                    </div>
                </div>
                <button className="btn btn-primary" type="submit">Register</button>
                </form>
            </div>
        </div>
        
      </div>
  )
}

export default RegisterScreen