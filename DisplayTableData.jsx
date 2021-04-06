import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {AllSpinners} from './Spinners'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons';
import { CSVLink } from "react-csv";
// import { GiConsoleController } from 'react-icons/gi';

export default function DisplayTableData({state,comp}) {

let stateVarInitial = state;
let hyperLinks = {comp:"ORDERS",attr:"ID",link:"/orderdetails"}

const [stateVar,setOrderDetails]= useState(stateVarInitial);
const [sort,setSort]= useState({propertyName:"",mode:'ASC'});

const propComparator = (propName,type) => (a, b) => {

    if (type === 'ASC') 
    {
         if(a[propName] < b[propName]){
                    return -1;
            // a should come after b in the sorted order
            }else if(a[propName] > b[propName]){
                    return 1;
            // a and b are the same
            }
            else{
                    return 0;
            }
    }

    if (type === 'DSC') 
    {
        if(a[propName] > b[propName]){
                return -1;
        // a should come after b in the sorted order
        }else if(a[propName] < b[propName]){
                return 1;
        // a and b are the same
        }
        else{
                return 0;
        }
    }

};

const orderbyAttribute = (props) => {
    setSort(prevState => ({...prevState,propertyName:props,mode:sort.mode === 'ASC' ? 'DSC' : "ASC"}))
    // console.log(sort)
    let newOrders = stateVar.sort(propComparator(props,sort.mode));
    setOrderDetails(() => [...newOrders]);
    }       

useEffect(() => {
    setOrderDetails(stateVarInitial);
}, [stateVarInitial])
//Unmount
useEffect(() => {
  return () => setOrderDetails([]);
}, [])   

    return (
        <TableContainer>
             {stateVar.length > 0 ?
             <div>
                <div className="d-flex justify-content-end">
                         <CSVLink className="font-weight-bold text-danger" data={stateVar}>Export CSV</CSVLink>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover text-center border border-dark">
                        <thead className="thead">
                            <tr>
                                {Object.keys(stateVar[0]).map((item,index) => 
                                    <th key={index} className="border">
                                        <ButtonContainer onClick={() => orderbyAttribute(item)}>
                                            <div className="row">
                                                <div className="col text-white text-center font-weight-bold">{item}</div>  
                                                <span className="col">{sort.propertyName === item ? <FontAwesomeIcon className="text-white" icon={sort.mode === "ASC" ? faArrowUp : faArrowDown} /> :null}</span>
                                            </div>
                                        </ButtonContainer>
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                        {stateVar.map((dataArray,index) =>
                            <tr key={index}> 
                                {Object.keys(state[0]).map( (attrName,index) =>
                                    <th key={index} scope="row" className="border"> 
                                    { attrName === hyperLinks.attr && comp === hyperLinks.comp ?  <Link className="text-danger" to={`${hyperLinks.link}/${dataArray[attrName]}`}>{dataArray[attrName]}</Link> : dataArray[attrName]}
                                    </th>
                                )}
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
            : stateVar.length === 0 ? null : <AllSpinners />}
        </TableContainer>
    )
}


const TableContainer = styled.div`
.thead {
    background-color:var(--csBlue);
    color:white ;
    font-weight:bold;
}
.border{
    color:var(--csBlue);
    font-weight:none;
}
`

const ButtonContainer = styled.button`
background-color:transparent;
padding:none;
border:none;
`

