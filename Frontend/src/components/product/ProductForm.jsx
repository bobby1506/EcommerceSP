import React, { useState } from 'react'

const ProductForm = () => {
    const [formData,setFormData]=useState({
        productName:"",
        category:"",
        description:"",
        price:"", 
        stocks:"",
    })
    const [pimage,setPimage]=useState(null);
  
    const handleOnChange=(e)=>{
    const {name,value}=e.target;
    setFormData({...formData,[name]:value});
    }

    const handleOnSubmit=(e)=>{
        e.preventDefault();
        const productData={...formData,productImage:pimage}
        console.log(productData)
    }
   
  return (
    <>
    <div className="container mt-5">
      <h2 className="mb-4">Add Product</h2>
      <form onSubmit={handleOnSubmit}>
        {/* Product Name */}
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            id="productName"
            placeholder="Enter product name"
            name='productName'
            value={formData.productName}
            onChange={handleOnChange}
          />
        </div>

        {/* Category */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select className="form-select" id="category" name='category' value={formData.category} onChange={handleOnChange}>
            <option value="">Select category</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="grocery">Grocery</option>
            <option value="home-appliances">Home Appliances</option>
          </select>
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder="Enter product description"
            name='description'
            value={formData.description}
            onChange={handleOnChange}
          ></textarea>
        </div>

        {/* Price */}
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            placeholder="Enter product price"
            name='price'
            value={formData.price}
            onChange={handleOnChange}
          />
        </div>

        {/* Stocks/Inventory */}
        <div className="mb-3">
          <label htmlFor="stocks" className="form-label">
            Stocks/Inventory
          </label>
          <input
            type="number"
            className="form-control"
            id="stocks"
            placeholder="Enter available stocks"
            name='stocks'
            value={formData.stocks}
            onChange={handleOnChange}
          />
        </div>

        {/* Product Image */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Product Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            name='pimage'
            onChange={(e)=>{setPimage(e.target.files[0])}}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
    </>
  )
}

export default ProductForm