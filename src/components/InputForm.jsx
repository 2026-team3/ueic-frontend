import React from "react";
import "../css/InputForm.css";

export default function InputForm({
    label,
    id,
    name,
    type = "text",
    value,
    onChange,
    placeholder = "",
}) {
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}