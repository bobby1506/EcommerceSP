<div className="container mt-4">
<h2>Profile Page</h2>
<div className="mb-3">
  <label className="form-label">Name</label>
  <input type="text" className="form-control" name="name" value={userData.name} onChange={handleChange} />
</div>
<div className="mb-3">
  <label className="form-label">Email</label>
  <input type="email" className="form-control" name="email" value={userData.email} onChange={handleChange} />
</div>
{/* <div className="mb-3">
  <label className="form-label">Store Name</label>
  <input type="text" className="form-control" name="storeName" value={userData.storeName} onChange={handleChange} />
</div> */}
{/* <div className="mb-3">
  <label className="form-label">Store Image</label>
  <input type="text" className="form-control" name="storeImage" value={userData.storeImage} onChange={handleChange} />
</div> */}
<div className="mb-3">
  <label className="form-label">UPI ID</label>
  <input type="text" className="form-control" name="upiId" value={userData.upiId} onChange={handleChange} />
</div>
<div className="mb-3">
  <label className="form-label">GST Number</label>
  <input type="text" className="form-control" name="gstNumber" value={userData.gstNumber} onChange={handleChange} />
</div>
<label className="form-label">Social Media Links</label>
{userData.socialMediaLinks.map((socialMedia, index) => (
  <div className="row mb-2" key={index}>
    <div className="col">
      <input
        type="text"
        className="form-control"
        placeholder="Social Media Name"
        value={socialMedia.platform}
        onChange={(e) => handleSocialMediaChange(index, "platform", e.target.value)}
      />
    </div>
    <div className="col">
      <input
        type="text"
        className="form-control"
        placeholder="Social Media Link"
        value={socialMedia.link}
        onChange={(e) => handleSocialMediaChange(index, "link", e.target.value)}
      />
    </div>
  </div>
))}

<button className="btn btn-primary mt-5" onClick={handleSubmit}>Update Profile</button>
</div>