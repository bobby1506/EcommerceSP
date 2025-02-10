import React from "react";

const SelectInput = ({
  options,
  label,
  className,
  id,
  name,
  value,
  onChange,
  errors,
}) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <select
          className={className}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
        >
          {options.map((option,index) => (
            <option value={option.value} key={index}>{option.text}</option>
          ))}
        </select>
        {errors[name] && <p className="text-danger">{errors[name]}</p>}
      </div>
    </>
  );
};

export default SelectInput;
