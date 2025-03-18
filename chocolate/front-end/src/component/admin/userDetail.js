import React, { useEffect, useState } from "react";
import axios from "axios";
import './userDetail.css'
const UserDetail = () => {
    const [data, setData] = useState([]);
    const getUserData = async () => {
        try {
            let result = await axios.get('https://chocolate-vert.vercel.app/admin/userDetail')
            if (result.status == 200) {
                setData(result.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        getUserData();
    });
    // console.log(data)
    return (
        <>
            <div class="scroll-container mt-3">
                <table class="tables scroll">
                    <thead>
                        <tr>
                            <td className="header">Index</td>
                            <td className="header">Email</td>
                            <td className="header">Address</td>
                            <td className="header">City</td>
                            <td className="header">State</td>
                            <td className="header">Mobile No.</td>
                            <td className="header">Price</td>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <td>1.</td>
                            <td>The Shawshank Redemption</td>
                            <td>Drama</td>
                            <td>1994</td>
                            <td>Frank Darabont</td>
                            <td>Frank Darabont</td>
                        </tr> */}
                        {
                            data.map((res, index) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{res.email}</td>
                                            <td>{res.address}</td>
                                            <td>{res.city}</td>
                                            <td>{res.state}</td>
                                            <td>{res.phoneNumber}</td>
                                            <td>{res.price}</td>
                                        </tr>
                                    </>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default UserDetail;