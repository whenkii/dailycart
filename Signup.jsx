import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

export default function Signup() {
    const submitSignupForm = (e) => {
        e.prevenDefault();
    }
    return (
        <SigninContainer className="container">
            <form className="text-center">
                <div className="card">
                    <div className="card-header text-center bg-success text-white text-uppercase font-weight-bold">Signup</div>
                    <div className="card-body text-uppercase text-success font-weight-bold">
                    
                    <div className="d-flex justify-content-center">

                        <div className="form-group col-4">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control text-center" id="inputAddress" placeholder="Email"/>
                        </div>

                    </div>

                    <div className="form-row">

                        <div className="form-group col ">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password1" placeholder="password"/>
                        </div>

                        <div className="form-group col">
                            <label htmlFor="Confirm password">Confirm Password</label>
                            <input type="password" className="form-control" id="password2" placeholder="cofirm password"/>
                        </div>
                     </div>

                    <div className="form-row justify-content-center">

                        <div className="form-group col">
                            <label htmlFor="city">CITY</label>
                            <input type="text" className="form-control" id="city" placeholder="city"/>
                        </div>

                        <div className="form-group col">
                            <label htmlFor="state" className="text-center">STATE</label>
                            <input type="text" className="form-control" id="state" placeholder="state"/>
                        </div>

                     </div>

                    </div>
                    <div className="justify-content-center">
                        <button className="div btn btn-success btn-inline-block m-2 " type="submit" onSubmit={submitSignupForm}>SignUp</button>
                        <Link to="/signin"><div className="div btn btn-warning btn-inline-block m-2 ">SignIn</div> </Link>
                    </div>
                </div>  
                
            </form>
        </SigninContainer>
    )
}


const SigninContainer= styled.div`
margin-top:30rem;
.btn  {width:10rem;
.form-group {
    text-align:center !important;
}
}
`