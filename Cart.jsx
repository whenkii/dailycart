import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import styled from 'styled-components'
import {productContext} from '../contexts/products'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faShoppingCart,
        faRupeeSign,
        faTrashAlt
} from '@fortawesome/free-solid-svg-icons';

export default function Cart() {
var history = useHistory();
const [cart,productAction,,isCartEmpty]=useContext(productContext);
const inCartItems = cart.filter(a => a.QTY > 0);
const cartReduce = inCartItems.reduce((prev,{PRICE,QTY}) => prev+PRICE*QTY,0);
const createOrder = () => {
                            productAction({type:"CREATE_ORDER"})
                            if ( isCartEmpty ) { 
                                history.push("/") }
                            }
// productAction({type:"CREATE_ORDER"}
    return (
        <CartContainer>
            <div className="card container">
                <h1 className="card-header text-center text-white bg-success font-italic">MyCart <FontAwesomeIcon className="mx-1" icon={faShoppingCart}/> </h1>
                {cartReduce === 0 ? null :
                <div className="row text-center font-weight-bold m-2">
                    <div className="col">NAME</div>
                    <div className="col">PRICE</div>    
                    <div className="col">QTY</div>    
                    <div className="col">Total</div> 
                    <div className="col"></div> 
                </div>
                }
                {inCartItems.map(({ID,NAME,PRICE,QTY}) => 
                <div key={ID}className="card-body">
                    <div className="row">
                    <div className="col align-self-center">{NAME}</div>
                    <div className="col align-self-center"><FontAwesomeIcon className="mx-1" icon={faRupeeSign}/>{`${PRICE}/KG`}</div>
                    <div className="col align-self-center">{QTY}</div>
                    <div className="col align-self-center"><FontAwesomeIcon className="mx-1" icon={faRupeeSign}/>{QTY*PRICE}</div>                
                    <div className="col">
                        <span className="btn btn-sm btn-danger" onClick={() => productAction({type:"REMOVE",prodid:ID})}>-</span>
                        <span className="btn btn-sm" onClick={() => productAction({type:"DELETE",prodid:ID})}>
                            <FontAwesomeIcon className="text-warning font-weight-bold trashBtn" icon={faTrashAlt}/></span>
                        <span className="btn btn-sm btn-success px-2" onClick={() => productAction({type:"ADD",prodid:ID})}>+</span>
                    </div>
                    </div>
                </div>
                )
                }
                {isCartEmpty ? 
                <h2 className="text-danger text-center my-4"> Cart is empty</h2> :
                <div>
                    <div className="cartTotal text-center text-danger font-weight-bold m-2">
                        <span className="ml-auto">Total:</span> 
                        <span><FontAwesomeIcon className="mx-1" icon={faRupeeSign}/>{inCartItems.reduce((prev,{PRICE,QTY}) => prev+PRICE*QTY,0)}</span>
                    </div>

                    <div className="d-flex justify-content-around m-4">
                        <div className="btn btn-danger" onClick={() => productAction({type:"CLEAR"})}>EmptyCart</div>
                        <Link to="/"><div className="btn btn-warning">Continue Shopping</div></Link>
                        <div className="btn btn-success" onClick={createOrder}>PROCEED</div>
                    </div>
                </div>
                }
                {/* If Cart is empty include continue shopping */}
                 {isCartEmpty ?
                 <Link to="/" className="text-center">
                     <div className="btn btn-success m-4">Continue Shopping</div>
                 </Link>
                 : null
                 }
            </div>

        </CartContainer>
    )
}

const CartContainer = styled.div`
.card{
    transition: 0.5s all;
    margin-top:5rem !important;
    :hover{
    box-shadow:0 0 0.25rem rgb(0,0,0);
     }
}
.card-header{
    font-weight:bold;
}
.col{
    text-align:center;
}
.trashBtn{
    font-size:180%;
}
.cartTotal{
    font-size:160%;
}
`