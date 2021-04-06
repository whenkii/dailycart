// import {useContext} from 'react'
// import {productContext} from '../contexts/products'
import axios from 'axios'

export const GetSQLOutput = props => {
    let outPut;
    console.log("Inside GetSQLOutput")
    axios.get(`http://localhost:7000/dailycart/getSqlresult/${props}`)
    .then(({data}) => {
            let {rows} = data;
            outPut = rows;
            console.log(rows);
                     })
    .catch((e) => {
                    console.log(e);
                    })
    return outPut;
}
