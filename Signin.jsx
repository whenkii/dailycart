import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

export default function Signin() {
    const submitSignInForm = (e) => {
        e.prevenDefault();
    }
    return (
        <SigninContainer className="container">
            <form className="text-center">
                <div className="card">
                    <div className="card-header text-center bg-success text-white text-uppercase font-weight-bold">Signin</div>
                    <div className="card-body text-uppercase text-success font-weight-bold">
                    
                        <div className="d-flex justify-content-center">

                            <div className="form-group col-4">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control text-center" id="inputAddress" placeholder="Email"/>
                            </div>

                            <div className="form-group col-4">
                                <div className="form-group col ">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="password"/>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <div className="d-flex justify-content-center">
                        <button className="div btn btn-danger btn-inline-block m-2 " type="submit" onSubmit={submitSignInForm}>Signin</button>
                        <Link to="/signup"><div className="div btn btn-success btn-inline-block m-2 " type="submit">SignUp</div></Link>
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