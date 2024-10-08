import "../../styles/component/Filter.css";

const Filter = () => {
    return (
      <div className="filter-content">
        <h1>Filter</h1>
        <div className="filter-container">
        <select className="dropdown">
          <option>Type</option>
        </select>
        <select className="dropdown">
          <option>Gear</option>
        </select>
        <select className="dropdown">
          <option>Brand</option>
        </select>
        <select className="dropdown">
          <option>Location</option>
        </select>
        <div className="filter-price"> 
            <h6>Min price:</h6>
            <input type="text" className="input" placeholder="100000" />
        </div>
        <div className="filter-price"> 
            <h6>Max price:</h6>
            <input type="text" className="input" placeholder="500000" />
        </div>
        
        <button className="remove-btn">Remove Filter</button>
        <button className="find-btn">Find</button>
      </div>
      </div>
      
    );
  };

  export default Filter;