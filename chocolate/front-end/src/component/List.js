import { React, useContext } from 'react'
import choco from './Choco.json';
import { useNavigate} from 'react-router-dom';
import { AddToCartContext } from './Context';

const List = (props) => {
    const navigate = useNavigate();
    const {addToCart, setAddToCart} = useContext(AddToCartContext);
    const addToCartBtn = (index) => {
        let product = choco[index];
        console.log("ChocoIndex: "+choco[0])
        props.purchaseItem(product);
        console.log("product: "+product)
    }
    return (
        <>
            {choco.map((choco, index) => {
                return (
                    <>
                        <div className='col-sm-3'>
                            <div class="card text-center">
                                <div>
                                    <img class="card-img-top text-center" src={choco.img} alt="Card image" />
                                </div>
                                <div class="card-body">
                                    <h4 class="card-title">{choco.name}</h4>

                                    <p class="card-text"><h5>{choco.price}</h5></p><br />
                                    Quantity:<select id='QuaId'>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                    </select>
                                </div>
                                <div className='card-footer btn-footer'>
                                    <button href="#" class="btn btn-outline-dark" style={{ marginRight: "10px" }} onClick={() => {
                                        navigate('/detail/' + choco.id);
                                    }}>Detail</button>
                                    {/* <a href="#" class="btn btn-outline-dark" onClick={()=>addToCartBtn(index)} style={{ marginLeft: "10px" }}>Add to Cart</a> */}
                                    <button className='btn btn-warning' onClick={()=>{
                                        addToCartBtn(index)
                                        setAddToCart(addToCart+1)       
                                    }}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })}
        </>
    )
}

export default List;