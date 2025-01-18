import React, { useState } from "react";

const StoreForm = (props) => {
  const [formData, setFormData] = useState({
    storeName: "",
    ownerName: "",
    address: "",
    description: "",
    category: "",
    openTime: "",
    closeTime: "",
    gstNumber: "",
    upiId: "",
    isBranch:""
  });
  const [socialMediaLinks, setSocialMediaLinks] = useState([
    { platform: "", link: "" },
  ]);

  const addSocialMediaField = () => {
       setSocialMediaLinks([...socialMediaLinks,{platform:"",link:""}])
  };
  const [logo,setLogo]=useState(null)

  const handleSocialMediaChange = (index, field, value) => {
    const updatedLinks=[...socialMediaLinks];
    updatedLinks[index][field]=value;
    setSocialMediaLinks(updatedLinks)

  };

  const handleOnChange=(e)=>{
     const {name,value}=e.target;
     setFormData((prev)=>{
      return {...prev,[name]:value}
     })
  }
  const handleOnSubmit=(e)=>{
    e.preventDefault()
    const storeData={...formData,mediaLinks:socialMediaLinks,logo}
    console.log(storeData)
  }
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Store Information Form</h2>
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="storeName" className="form-label">
            Store Name
          </label>
          <input
            type="text"
            className="form-control"
            id="storeName"
            placeholder="Enter store name"
            name="storeName"
            value={formData.storeName}
            onChange={handleOnChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ownerName" className="form-label">
            Owner Name
          </label>
          <input
            type="text"
            className="form-control"
            id="ownerName"
            placeholder="Enter owner name"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleOnChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <textarea
            className="form-control"
            id="address"
            rows="3"
            placeholder="Enter address"
            name="address"
            value={formData.address}
            onChange={handleOnChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder="Enter description"
            name="description"
            value={formData.description}
            onChange={handleOnChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select className="form-select" id="category" name="category" value={formData.category} onChange={handleOnChange}>
            <option value="">
              Select category
            </option>
            <option value="Retail">Retail</option>
            <option value="Food">Food</option>
            <option value="Electronics">Electronics</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Timing</label>
          <div className="row">
            <div className="col">
            <label htmlFor="openTime" className="form-label">Open Time</label>
              <input
                type="time"
                className="form-control"
                placeholder="Open Time"
                name="openTime"
                value={formData.openTime}
                onChange={handleOnChange}
              />
            </div>
            <div className="col">
            <label htmlFor="closeTime" className="form-label">Close Time</label>
              <input
                type="time"
                className="form-control"
                placeholder="Close Time"
                name="closeTime"
                value={formData.closeTime}
                onChange={handleOnChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Social Media Links</label>
          {socialMediaLinks.map((socialMedia, index) => (
            <div className="row mb-2" key={index}>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Social Media Name"
                  value={socialMedia.platform}
                  onChange={(e) =>
                    handleSocialMediaChange(index, "platform", e.target.value)
                  }
                />
              </div>
              <div className="col">
                <input
                  type="url"
                  className="form-control"
                  placeholder="Link"
                  value={socialMedia.link}
                  onChange={(e) =>
                    handleSocialMediaChange(index, "link", e.target.value)
                
                  }
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={addSocialMediaField}
          >
            Add
          </button>
        </div>

        <div className="mb-3">
          <label htmlFor="gstNumber" className="form-label">
            GST Number
          </label>
          <input
            type="text"
            className="form-control"
            id="gstNumber"
            placeholder="Enter GST number"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleOnChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Is Branch?</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="isBranch"
                id="isBranchYes"
                value="yes"
                onChange={handleOnChange}
              />
              <label className="form-check-label" htmlFor="isBranchYes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="isBranch"
                id="isBranchNo"
                value="no"
                onChange={handleOnChange}
              />
              <label className="form-check-label" htmlFor="isBranchNo">
                No
              </label>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="upiId" className="form-label">
            UPI ID
          </label>
          <input
            type="text"
            className="form-control"
            id="upiId"
            placeholder="Enter UPI ID"
            name="upiId"
            value={formData.upiId}
            onChange={handleOnChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="uploadLogo" className="form-label">
            UPLOAD LOGO
          </label>
          <input type="file" className="form-control" id="uploadLogo" onChange={(e)=>{setLogo(e.target.files[0])}} />
        </div>

        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};

export default StoreForm;
