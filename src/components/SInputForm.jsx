import React from "react";
import "../css/SInputForm.css";

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
        <div className="sform-group">
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