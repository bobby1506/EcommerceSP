import React, { forwardRef } from "react";

const Input = forwardRef(({type,className,id,placeholder,name,value,onChange,errors,label,style},ref) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="ownerName" className="form-label w-100">
         {label}
        <input
          type={type}
          className={className}
          id={id}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          style={style}
          ref={ref}
        />
        {errors?errors[name] && <p className="text-danger">{errors[name]}</p>:""}
        </label>
      </div>
    </>
  );
})

export default Input;
