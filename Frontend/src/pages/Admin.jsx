const Admin = ({children}) => {
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      {/* Sidebar */}
      <div
        className="bg-light text-danger p-3"
        style={{ width: "250px", minHeight: "100%" }}
      >
        <h4 className="text-center mb-4">Admin Panel</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a href="#dashboard" className="nav-link text-black">
              <i className="bi bi-speedometer2"></i> Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a href="#orders" className="nav-link text-black">
              <i className="bi bi-cart-check"></i> All Orders
            </a>
          </li>
          <li className="nav-item">
            <a href="#products" className="nav-link text-black">
              <i className="bi bi-box-seam"></i> All Products
            </a>
          </li>
          <li className="nav-item">
            <a href="#withdraw" className="nav-link text-black">
              <i className="bi bi-cash"></i> Withdraw Money
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow-1 p-4">
       {children}
      </div>
    </div>
  );
};

export default Admin;
