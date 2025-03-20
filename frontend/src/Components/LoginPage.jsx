import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/Loginpage.css'
import errImg from '../assets/errImg.png'
import loginPageImg from '../assets/illustration.png'
import EmailContainer from './EmailContainer';
import PasswordContainer from './PasswordContainer';
function LoginPage() {
    const [loginActive, setLoginActive] = useState(true)
    const [err, setErr] = useState("")
    const [email, setEmail] = useState("")
    const [fullName, setFullName] = useState("")
    const [password, setPassword] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
        if (token) {
          navigate("/dashboard"); 
        }
      }, []);

    const handleCheckbox = (e) => {
        setRememberMe(e.target.checked);
    };

    const handleFullName = (e) => {
        setFullName(e.target.value)
    }

     const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = loginActive ? "/login" : "/signup"; 
        const requestBody = loginActive
        ? { email, password }
        : { fullName, email, password };
    const response = await fetch(`http://127.0.0.1:8000${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });

    
    const result = await response.json();
    if(endpoint === "/signup" && response.ok){
        setSuccessMsg("Your profile has been created successfully")
        setFullName("")
        setEmail("")
        setPassword("")
    }
    else if (response.ok && endpoint === '/login'){
        if (rememberMe) {
            localStorage.setItem("access_token", result.token);
        }
        else {
            sessionStorage.setItem("access_token", result.token); 
        }
            
            navigate("/dashboard");
    }
    else if (!response.ok && (response.status === 401 || response.status === 404)) {  
        setErr("Your email and password do not match");
    } 
    else {
        setErr("");
    }
    console.log(result);
  };
  function resetForm(){
    setErr("");
    setEmail("");
    setFullName("");
    setPassword("");
    setSuccessMsg("");
  }
  return (
    <div className='container'>
        <div className='main-container'>
            <div className='left-section'>
                <img src={loginPageImg} />
                


            </div>


            <div className='right-section'>
                <div className='switch-btn'>
                    <button 
                        onClick = {() => {
                            setLoginActive(true)
                            resetForm();
                            }} 
                        className={`login-btn ${loginActive? 'tab-active' : 'tab-inactive'}`}>
                        Log In
                    </button>

                <button 
                    onClick = {() => {
                        setLoginActive(false)
                        resetForm();
                    }} 
                    className={`sign-up-btn ${loginActive? 'tab-inactive' : 'tab-active'}`}>
                        Sign Up
                    </button> 
                </div>

            

            {loginActive ? <form onSubmit={handleSubmit} className='login-form'>
                <h2 className="heading">To Continue</h2>
                <p className="sub-heading">
                    We need your Name & Email
                </p>

                <EmailContainer value={email} setEmail={setEmail} setErr={setErr}/>

                <PasswordContainer value={password} setPassword={setPassword} />

                <div className='msg-container'>
                    {err ? <img src={errImg} />: ""}
                    <span className='err-msg' >
                        {err}
                    </span>
                </div>

                <button className="login-submit-btn">
                    Log In
                </button>
                
                <div className="remember-container">
                    <input type="checkbox" className="checkbox"  onChange={handleCheckbox} />
                    <span className="">Remember Me</span>
                </div>
        
            
            </form>
            :
            <form onSubmit={handleSubmit} className='sign-up-form'>
                <div className='full-name-container'>
                    <input
                        type='text'
                        name='fullName'
                        placeholder='Full Name'
                        className='input-field'
                        value={fullName}
                        onChange={handleFullName}
                    />
                </div>

                <EmailContainer value={email} setEmail={setEmail} setErr={setErr}/>

                <PasswordContainer value={password} setPassword={setPassword} />

                <div className='msg-container'>
                    {err ? 
                    <>
                        <img src={errImg} />
                        <span className='err-msg' >
                            {err}
                        </span>
                    </>
                        : 
                        <span className='success-msg' >
                            {successMsg}
                        </span>
                        }
                    
                </div>
                

                <button className="sign-up-submit-btn">
                    Sign up
                </button>
                
                <div className="remember-container">
                    <input type="checkbox" className="checkbox" />
                    <span className="">Remember Me</span>
                </div>
        
            </form>
            }


            </div>
        </div>
    </div>
  )
}

export default LoginPage