import { isFocusable } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react";
import AdminHeader from "./adminheader";

const ManageProduct = () => {
    const [product, updateProduct] = useState([]);

    const getProduct = () => {
        fetch("http://localhost:1234/productlist")
            .then(response => response.json())
            .then(serverResponse => {
                if (serverResponse.length > 0) {
                    updateProduct(serverResponse.reverse());
                }
            })
    }

    useEffect(() => {
        getProduct()
    }, [1]);

    let [pname, pickName] = useState("");
    let [pprice, pickPrice] = useState("");
    let [pphoto, pickPhoto] = useState("");
    let [pdetails, pickDetails] = useState("");
    let [message, updateMessage] = useState("");

    let [errorlist, updateError] = useState("");
    const save = () => {
        let allerror = {};
        var formStatus = true;
        if (pname == "") {
            allerror['nameError'] = "Invalid Product Name !";
            formStatus = false;
        } else {
            allerror['nameError'] = "";
        }

        //price Validation
        if (pprice == "" || pprice < 1) {
            allerror['priceError'] = "Invalid Product Price !";
            formStatus = false;
        } else {
            allerror['priceError'] = "";
        }

        // Photo Validation
        if (pphoto == "") {
            allerror['photoError'] = "Invalid Product Photo";
            formStatus = false;
        } else {
            allerror['photoError'] = "";
        }

        // Details Validation
        if (pdetails == "") {
            allerror['detailsError'] = "Invalid Details !";
            formStatus = false;
        } else {
            allerror['detailsError'] = "";
        }

        // Write before this line
        updateError(allerror);

        if (formStatus == true) {
            updateMessage("Please Wait Submitting to Server....");
            var url = "http://localhost:1234/productlist";
            var data = { "name": pname, "price": pprice, "photo": pphoto, "details": pdetails };
            var postOption = {
                method: "POST",
                headers: { 'Content-Type': 'Application/json' },
                body: JSON.stringify(data)
            };
            fetch(url, postOption)
            .then(response=>response.json())
            .then(serRes=>{
                updateMessage(pname + " Uploaded Successfully !");
                getProduct(); //reload product list by calling back getProduct();
                pickName("");
                pickPrice("");
                pickPhoto("");
                pickDetails("");
            })
        }

    }

    const deleteCart = (pid) =>{
        const postData = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {"id":pid} )
        };
        var url = "http://localhost:1234/productlist/"+pid;
        fetch(url, postData)
        .then(response=> response.json())
        .then(serverResponse=>{
            updateMessage(  "Item Deleted From productlist");
            updateProduct( [] );
            getProduct();
        })
    }

    return (
        <>
            <AdminHeader />
            <div className="container mt-5">
                <diV className="row">
                    <div className="col-lg-3">
                        <h3 classNames="text-center"> Add Product </h3>
                        <div className="mb-3">
                            <label> Product Name </label>
                            <input type="text" className="form-control"
                                onChange={obj => pickName(obj.target.value)} value={pname} />
                            <i className="text-danger"> {errorlist.nameError} </i>
                        </div>
                        <div className="mb-3">
                            <label> Product Price </label>
                            <input type="number" className="form-control"
                                onChange={obj => pickPrice(obj.target.value)} value={pprice} />
                            <i className="text-danger"> {errorlist.priceError} </i>
                        </div>
                        <div className="mb-3">
                            <label> Product Photo </label>
                            <input type="text" className="form-control"
                                onChange={obj => pickPhoto(obj.target.value)} value={pphoto}/>
                            <i className="text-danger"> {errorlist.photoError} </i>
                        </div>
                        <div className="mb-3">
                            <label> More Details</label>
                            <textarea className="form-control" onChange={obj => pickDetails(obj.target.value)} value={pdetails}></textarea>
                            <i className="text-danger"> {errorlist.detailsError} </i>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary" onClick={save}>Upload Product</button>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <h3 className="text-center"> Available Product: {product.length} </h3>
                        <p className="text-center text-danger"> {message} </p>
                        <table className="table table-ordered mt-3 shadow rounded">
                            <thead>
                                <tr>
                                    <th>PID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Details</th>
                                    <th>Photo</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    product.map((pdata, index) => {
                                        return (
                                            <tr key={index}>
                                                <td> {pdata.id} </td>
                                                <td> {pdata.name} </td>
                                                <td> {pdata.price} </td>
                                                <td> {pdata.details} </td>
                                                <td>
                                                    <img src={pdata.photo} height="50" width="80" />
                                                </td>
                                                <td>
                                                    <button className="btn btn-danger btn-sm" 
                                                     onClick={deleteCart.bind(this,pdata.id)}>
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </diV>
            </div>
        </>
    )
}

export default ManageProduct;