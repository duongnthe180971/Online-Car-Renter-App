import React, { useState } from "react";
import "../../styles/component/Filter.css";

const Filter = ({ onFilterChange, onFilterRemove }) => {
  const defaultFilters = 
  {
  type: "",
  gear: "",
  brand: "",
  location: "",
  minPrice: "",
  maxPrice: "",
}
  const [filterValues, setFilterValues] = useState(defaultFilters);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    onFilterChange({ [name]: value });
  };
  const handleRemove = (e) => {
    const { name, value } = e.target;
    setFilterValues(() => ({
      ...defaultFilters,
      [name]: value,
    }));

    // Notify parent about the changes
    onFilterRemove({ [name]: value });
  };

  return (
    <div className="filter-content">
      <h1>Filter</h1>
      <div className="filter-container">
        <select
          className="dropdown"
          name="type"
          value={filterValues.type}
          onChange={handleChange}
        >
          <option value="" hidden>Type</option>
          <option value="" >None</option>
          <option value="SUV">SUV</option>
          <option value="Van">Van</option>
          <option value="Sport">Sport</option>
        </select>

        <select
          className="dropdown"
          name="gear"
          value={filterValues.gear}
          onChange={handleChange}
        >
          <option value="" hidden>Gear</option>
          <option value="" >None</option>
          <option value="Auto">Auto</option>
          <option value="Semi-Auto">Semi-Auto</option>
          <option value="Manual">Manual</option>
        </select>

        <select
          className="dropdown"
          name="brand"
          value={filterValues.brand}
          onChange={handleChange}
        >
          <option value="" hidden> Brand</option>
          <option value="" >None</option>
          <option value="Toyota">Toyota</option>
          <option value="Bugatti">Bugatti</option>
          <option value="Lamborghini">Lamborghini</option>
        </select>

        <select
          className="dropdown"
          name="location"
          value={filterValues.location}
          onChange={handleChange}
        >
          <option value="" hidden>Location</option>
          <option value="" >None</option>
          <option value="Hoan Kiem">Hoan Kiem</option>
          <option value="Dong Da">Dong Da</option>
          <option value="Cau Giay">Cau Giay</option>
          <option value="Tay Ho">Tay Ho</option>
          <option value="Ba Dinh">Ba Dinh</option>
          onChange={handleChange}
        </select>

        <div className="filter-price">
          <h6>Min price:</h6>
          <input
            type="text"
            className="input"
            placeholder="lowest"
            name="minPrice"
            value={filterValues.minPrice}
            onChange={handleChange}
          />
        </div>

        <div className="filter-price">
          <h6>Max price:</h6>
          <input
            type="text"
            className="input"
            placeholder="highest"
            name="maxPrice"
            value={filterValues.maxPrice}
            onChange={handleChange}
          />
        </div>

        <button className="remove-btn" onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
};

export default Filter;