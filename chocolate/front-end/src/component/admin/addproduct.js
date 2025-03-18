import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios'
import './addproduct.css'
const AddProduct = () => {
    const [name, setName] = useState('');
    const [img, setImg] = useState('');
    const [brand, setBrand] = useState('');
    const [editPrice, setEditPrice] = useState('');
    const [imgLoading, setImgLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            handleAddProduct();
        }
    };
    const controllImage = (e) => {
   
        setImgLoading(true);
        const image = e.target.files[0];

        const formData = new FormData();
        formData.set("image", image);

        axios
            .post(
                "https://api.imgbb.com/1/upload?key=07085926acfdb00ac6b8cf01330f8ea5",
                formData
            )
            .then((res) => {
                setImg(
                    res.data.data.display_url,
                );
                setImgLoading(false);
                // setImgUploadLoding(false)
                console.log("get img : ", res.data.data.display_url)
            })
            .catch((error) => {
                setImgLoading(false);
                console.log("error")
            });

        // var reader = new FileReader();
        // reader.readAsDataURL(e.target.files[0]);
        // reader.onload = () => {
        //     setImg(reader.result);
        // };
        // reader.onerror = error =>{
        //     console.log("Error: ",error);
        // }
    }
    const handleAddProduct = async () => {
        try {
            let price = '₹' + editPrice
            let data = await fetch(`https://chocolate-vert.vercel.app/admin/addProduct`, {
                method: 'post',
                body: JSON.stringify({ name, img, price, brand }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            data = await data.json();
            if (data) {
                Swal.fire({
                    title: "Product is Successfully added!",
                    text: "Click ok button to countiue!",
                    icon: "success",
                    confirmButtonColor: "#0d6efd",
                }).then((result) => {
                    if (result) {
                        navigate('/admin')
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form className='row g-3 formpage form' style={{ margin: "10px auto" }} onSubmit={handleSubmit}>
                <div className='col-md-8 position-relative'>
                    <label htmlFor='validationTooltipUsername' className='form-label'>
                        Chocolate Name:
                    </label>
                    <div className='input-group has-validation'>
                        <input
                            type='text'
                            className='form-control'
                            value={name}
                            id='validationTooltipUsername'
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className='col-12'>
                    {imgLoading ? <>
                        <div class="loader"></div>
                    </>
                        : <>
                            <div className='col-12'>
                                <label htmlFor='validationTextarea' className='form-label'>
                                    Image:
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={img}
                                    id='validationTooltip03'
                                    required
                                    onChange={(e) => setImg(e.target.value)}
                                />
                            </div>
                            <input accept="image/*" className='col-3' type="file" onChange={controllImage} />
                            {img == "" || img == null ? "" : <img className='ps-5' width={300} height={200} src={img} />}
                        </>

                    }
                    {/* {img == "" || img == null ? "" : <img className='ps-5' width={300} height={200} src={img} />} */}

                </div>
                <div className='col-md-10 position-relative'>
                    <label htmlFor='validationTooltip03' className='form-label'>
                        Chocolate Brand:
                    </label>
                    <input
                        type='text'
                        className='form-control'
                        value={brand}
                        id='validationTooltip03'
                        required
                        onChange={(e) => setBrand(e.target.value)}
                    />
                </div>
                <div className='col-md-3 position-relative'>
                    <label htmlFor='validationTooltip05' className='form-label'>
                        Price:
                    </label>
                    <input
                        type='number'
                        min='0'
                        className='form-control'
                        value={editPrice}
                        id='validationTooltip05'
                        required
                        onChange={(e) => setEditPrice(e.target.value)}
                    />
                </div>
                <div className='col-12'>
                    <button className='btn btn-outline-primary'>
                        Add Product
                    </button>
                </div>
            </form>
        </>
    );
};

export default AddProduct;
