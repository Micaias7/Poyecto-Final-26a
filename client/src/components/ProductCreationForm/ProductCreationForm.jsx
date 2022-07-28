import "./ProductCreationForm";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import FileBase from "react-file-base64";
//   {
//         "name": "Bochas",
//         "description": "Encontrá estas bochas en nuestro local o compralas por nuestra tienda virtual para poder potenciar tu entrenamiento al máximo",
//         "price": 500,
//         "rating": 5,
//         "color": "rosa",
//         "image": "https://i.pinimg.com/originals/8c/64/12/8c64122297b0ea576b1d9fdbf0673875.jpg",
//         "categories": [
//             {
//                 "name": "Equipamento deportivo"
//             }
//         ],
//         "product_values": [
//             {
//                 "size": "único",
//                 "stock": 40
//             }
//         ]
//     }
export function validate() {

}

export default function ProductCreationForm() {
    const history = useHistory();
    const stockArray = [];
    for (let i = 0; i <= 100; i++) { stockArray.push(i) }
    const categoriesArray = useSelector((state) => state.categories);
    const sizesArray = ["xs", "s", "l", "m", "xl", "xxl", "xxxl", "único"]
    // console.log(categoriesArray);
    const [input, setInput] = useState({
        name: "",
        price: 0,
        description: "",
        color: "",
        image: "",
        image2: "",
        image3: "",
        image4: "",
        stock: 0,
        status: "",
        categories: [],
        products_values: [],
    })

    // const [errors, setErrors] = useState({});
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "size") {
            setInput({ ...input, products_values: [...input.products_values, { "size": value }] })
        }
        if (name === "stock") {
            // const stock = { "stock": value }
            // input.products_values[input.products_values.length - 1].stock = value;
            setInput({ ...input, products_values: [...input.products_values, input.products_values[input.products_values.length - 1].stock = value] })
        }
    }
    // console.log(input.image);
    /*
    0: {size: 'xxl', stock: '77'}
    1: {size: 'xxxl', stock: '98'}
    2: {size: 'l', stock: '100'}
    3: {size: 'm' , stock: '50'}
    4: '50'
    */
    const handleSubmit = (e) => {


        history.push("/admin/home")
    }

    // console.log(input.products_values);


    return (
        <div>
            <div className="login">
                <section id="login-window">
                    <h1>Product Creation Form</h1>
                    <p className="error">
                        {/* { && <span className="Error"></span>} */}
                    </p>
                    <form onSubmit={((e) => handleSubmit(e))}>
                        <input
                            className="form-input"
                            type="text"
                            placeholder="Your product's name..."
                            name="name"
                            onChange={(e) => setInput({ ...input, name: e.target.value })}
                        ></input>
                        <input
                            className="form-input"
                            type="number"
                            placeholder="Your product's price..."
                            name="price"
                            min="0"
                            max="50000"
                            onChange={(e) => setInput({ ...input, price: e.target.value })}
                        ></input>
                        <input
                            className="form-input"
                            type="text"
                            placeholder="Your product's color..."
                            name="color"
                            onChange={(e) => setInput({ ...input, color: e.target.value })}
                        ></input>
                        <label >Image 1: </label>
                        <FileBase
                            // name="image1"
                            type="image"
                            multiple={false}
                            onDone={({ base64 }) => setInput({ ...input, image: base64 })}
                        />
                        <label >Image 2: </label>
                        <FileBase
                            name="image2"
                            type="image"
                            multiple={false}
                            onDone={({ base64 }) => setInput({ ...input, image2: base64 })}
                        />
                        <label >Image 3: </label>
                        <FileBase
                            name="image3"
                            type="image"
                            multiple={false}
                            onDone={({ base64 }) => setInput({ ...input, image3: base64 })}
                        />
                        <label >Image 4: </label>
                        <FileBase
                            name="image4"
                            type="image"
                            multiple={false}
                            onDone={({ base64 }) => setInput({ ...input, image4: base64 })}
                        />

                        <label>Categories:</label>
                        <select
                            className="form-input"
                            name="categories"
                            onChange={(e) => setInput({ ...input, categories: [...input.categories, { "name": e.target.value }] })}>
                            <option key={"21a"}>--Choose categories--</option>
                            {
                                categoriesArray && categoriesArray?.map((elm, index) => {
                                    return (
                                        <option
                                            value={elm}
                                            key={index}
                                        >
                                            {elm}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        <label>Size:</label>
                        <select
                            className="form-input"
                            name="size"
                            onChange={(e) => handleInputChange(e)}>
                            <option key={"22a"}>--Choose sizes--</option>
                            {
                                sizesArray && sizesArray?.map((elm, index) => {
                                    return (
                                        <option
                                            value={elm}
                                            key={index}
                                        >
                                            {elm}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        <label>Stock:</label>
                        <select
                            className="form-input"
                            name="stock"
                            onChange={(e) => handleInputChange(e)}
                        >
                            {
                                stockArray && stockArray.map((elm, index) => {
                                    return (
                                        <option key={index}>
                                            {elm}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        <ul className="sizeStock">
                            {
                                input.products_values && input.products_values.map(elm => {
                                    if (elm.stock === undefined) {
                                        return (<li> size: {elm.size}</li>)
                                    } else {
                                        return (
                                            <li>The size {elm.size} has {elm.stock} units. </li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </form>
                </section>
            </div >
            <div className="photos">
                {input.image && <img src={input.image} alt="algo" className="photo" id="image1" />}
                {input.image2 && <img src={input.image2} alt="algo" className="photo" id="image2" />}
                {input.image3 && <img src={input.image3} alt="algo" className="photo" id="image3" />}
                {input.image4 && <img src={input.image4} alt="algo" className="photo" id="image4" />}
            </div>
        </div>
    )
}
