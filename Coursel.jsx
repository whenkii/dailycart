import React from 'react'
import praveenimg from '../images/Praveen.jpeg'
import styled from 'styled-components'

export default function Coursel() {
    return (
        <div>
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                <Images className="d-block w-100" src={praveenimg}  alt="First slide" />
                </div>
                <div className="carousel-item">
                <Images className="d-block w-100" src={praveenimg}  alt="Second slide" />
                </div>
                <div className="carousel-item">
                <Images className="d-block w-100" src={praveenimg}  alt="Third slide" />
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
            </div>      
        </div>
    )
}

const Images = styled.img`
// position:relative;
margin-top:30rem;
width:10rem;
height:50rem;
`
