import React from 'react'
import styled from 'styled-components'

export default function Notfound() {
    return (
        <NotfoundHome className="d-flex align-items-center justify-content-center container">
           <h1 className="text-danger">PAGE NOT FOUND</h1> 
        </NotfoundHome>
    )
}

const NotfoundHome = styled.div`
height:100vh;
width:100%`
