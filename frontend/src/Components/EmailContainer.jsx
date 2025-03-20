import React from 'react'
import validator from "validator";
function EmailContainer({value, setEmail, setErr}) {
  
  const validateEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    if (!validator.isEmail(email)) {  
        setErr("Please enter a valid Email!");
    } else {
        setErr("");
    }
  };
  return (
    <div className="email-container">
        <input 
            type="email"
            name="email"
            placeholder="Email"
            className='input-field'
            value={value}
            onChange={validateEmail}
        />
       
    </div>
  )
}

export default EmailContainer