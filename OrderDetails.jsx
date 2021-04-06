import React,{useState,useEffect} from 'react'
import axios from 'axios';
import DisplayTableData from './DisplayTableData'
import styled from 'styled-components'

export function OrderDetails(props) {
    const query = `select * from orders where id= `+props.match.params.id ;
    const [orderDetails,setOrderDetails]= useState([]);

    //Mount - Get Orders details
    useEffect(() => {
        axios.get(`http://localhost:7000/dailycart/getSqlresult/${query}`)
        .then((result) => {
            let {data} = result;
            let {rows} = data;
    //Set state once data is returned from AXIOS
        setOrderDetails(rows);
                         })
        .catch((e) => {
                       alert( `Couldn't get Orders\n ` + e);
                        })
    }, [query])
    //Unmount
    useEffect(() => () => {}, []) 
    return (
        <div className="container">
            <DataHeader className="text-center m-1">PRODUCT Details</DataHeader>
            <DisplayTableData state={orderDetails}/>
        </div>
    )
}


const DataHeader = styled.h1`
background:var(--lightBlue);
color:white;
border-radius:0.25rem;
box-shadow: 0 0 0.8rem 0.25rem rgba(0,0,0,0.3);
`