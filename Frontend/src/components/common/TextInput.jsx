import React from "react";

const TextInput = ({label,className,id,rows,placeholder,name,value,onChange,errors}) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
         {label}
        </label>
        <textarea
          className={className}
          id={id}
          rows={rows}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        ></textarea>
        {errors[name] && (
          <p className="text-danger">{errors[name]}</p>
        )}
      </div>
    </>
  );
};

export default TextInput;
