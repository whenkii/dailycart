import React,{useContext} from 'react'
import {productContext} from '../contexts/products'
import styled from 'styled-components'
import praveenimg from '../images/Praveen.jpeg'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRupeeSign} from '@fortawesome/free-solid-svg-icons';
// import ProgressCircle from './ProgressCircle'
import {AllSpinners} from './Spinners'

export default function Products() {
const [cart,productAction,productsLoading,]=useContext(productContext);
    return (
            <ProductsList>
                {/* <MarginTop> </MarginTop> */}
                {!productsLoading ? 
                <div className="d-flex flex-wrap" >   
                {cart.map( ({ID:id,NAME:productname,STOCK:stock,PRICE:price,QTY:qty,INCART:inCart}) => 
                <div key={id} className="card">
                    <div className={`d-flex justify-content-between card-header`} 
                    // style={{background: "linear-gradient(45deg,var(--darkWhite) 70%,var(--bsRed) 30%)",color:"var(--csBlue)"}}
                    style={inCart === "Y" ? {backgroundColor: "var(--csBlue)",color:"white"}: {background: ("linear-gradient(to right,var(--darkWhite) 70%,var(--csRed) 30%)"),color:"var(--csBlue)"}}
                    >
                        <div className="font-weight-bold text-center ">{productname} </div>
                        <div className="font-weight-bold"><FontAwesomeIcon className="mx-1" icon={faRupeeSign}/>{price}</div>
                    </div>
                <img className="card-img" src={praveenimg} alt="name"></img>
                <div className="card-footer d-flex justify-content-around" style={inCart === "Y" ? {backgroundColor: "var(--csBlue)",color:"white"}:null}>
                    <div className="btn btn-success btnCart" onClick={() => productAction({type:"ADD",prodid:id})}>+</div>
                    <div className="font-weight-bold align-self-center m-2">{qty}</div>
                    <div className="btn btn-danger btnCart" onClick={() => productAction({type:"REMOVE",prodid:id})}>-</div>
                </div>
                </div>  
                )}
                </div>
                :
                <AllSpinners value={""}/>}
            </ProductsList>
          )
}

// const MarginTop = styled.div`
// height:100px;
// width:100vw;
// background:var(--csBlue);
// `

const ProductsList = styled.div`
text-transform:uppercase;
.card{
    width:20rem;
    margin:1rem;
    transition:all 1s;
 :hover{
        box-shadow: 0 0 0.8rem 0.25rem rgba(0,0,0,0.3);
    }
}
.btn{
    width:3rem !important;
    transition:all 0.5s;
 :hover{
        box-shadow: 0 0 0.8rem;
    }
}
.btn-danger{
    transition:all 0.5s;
 :hover{
        box-shadow: 0 0 0.8rem;
    }
}
.card-header{
    overflow:hidden;
}
.btnCart{
    width:7rem;
}
`
