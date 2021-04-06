import React,{useState,useEffect} from 'react'
import axios from 'axios';
import DisplayTableData from './DisplayTableData'
import styled from 'styled-components'
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {faRupeeSign,faTrashAlt} from '@fortawesome/free-solid-svg-icons';


export function Orders() {

    const query = "select id,email,sum(price) Total_Price,max(ts) time from orders group by email,id";
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
    }, [])
    //Unmount
    useEffect(() => () => {}, []) 
    return (
        <div className="container">
            <DataHeader className="text-center p-1">ORDERS</DataHeader>
            <DisplayTableData state={orderDetails} comp="ORDERS"/>
        </div>
    )
}


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
                       alert( `Couldn't get Orders from API\n ` + e);
                        })
    }, [query])
    //Unmount
    useEffect(() => () => {}, []) 
    return (
        <div className="container">
            <DataHeader className="text-center p-1">ORDER DETAILS</DataHeader>
            <DisplayTableData state={orderDetails}/>
        </div>
    )
}

const DataHeader = styled.h1`
background:var(--csBlue);
color:white;
border-radius:0.25rem;
box-shadow: 0 0 0.8rem 0.25rem rgba(0,0,0,0.3);
`






