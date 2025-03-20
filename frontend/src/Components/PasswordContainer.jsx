import React from 'react'

function PasswordContainer({value, setPassword}) {
  
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  return (
    <div className='password-container'>
        <input
            type='password'
            name='password'
            placeholder='Password'
            className='input-field'
            value={value}
            onChange={handlePassword}
        />
    </div>
  )
}

export default PasswordContainer