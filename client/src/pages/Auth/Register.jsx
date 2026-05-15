import React,{useState} from 'react'
import styles from './Login.module.css';
import login from '../../assests/login.png'
import {Link, useNavigate} from 'react-router-dom'
import {Input,Button,message} from 'antd';
import { getErrorMessage } from '../../util/GetError';
import AuthServices from '../../services/authServices';


function Register() {

  const[username,setUsername] = useState("");
  const[password,setPassword] = useState("");
  const[firstname,setFirstname] = useState("");
  const[lastname,setLastname] = useState("");
  const[loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const[error,setError] = useState();
  const[passerror,setPassError] = useState();

  // const handleSubmit = async () =>
  // {
  //   setLoading(true);
  //   try
  //   {
  //     const data =
  //     {
  //       firstname,
  //       lastname,
  //       username,
  //       password
  //     }
  //     const response = await AuthServices.registerUser(data);   //In this place itself, axios throws an error.
  //     if(response.status === 400)
  //     {
  //   }
  //     //console.log(response);
  //     message.success("Registered Successfully");
  //     navigate('/login');
  //     setLoading(false);

  //   }
  //   catch(err)
  //   {
  //       const screenError = getErrorMessage(err); // Use your util!
  //       message.error(screenError); 
  //       console.log("Error details:", err.response?.data);
  //       setLoading(false);
  //   }
  // }


  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = { firstname, lastname, username, password };
      const response = await AuthServices.registerUser(data);
      message.success("Registered Successfully");
      navigate('/login');
    } catch (err) {
      // Use your getErrorMessage util here!
      const errorText = getErrorMessage(err);
      message.error(errorText); 
      console.log("Details:", err.response?.data);
    } finally {
      setLoading(false);
    }
  }

  const validate = (value) => {   
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-zA-Z0-9]+$/;


  if(!value.trim())
  {
       return 'User name is required';
  }
  else if (value.length < 3) {
    return 'Username must be at least 3 characters.';
  } 

  else if (!usernameRegex.test(value) && !emailRegex.test(value)) {
    return 'Please enter a valid email or username.';
  }
    return "";
}

const validatePassword = (val) => {
 
  const passregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;

  if(!val.trim())
  {
       return 'Empty spaced not allowed';
  }
  else if (val.length < 8) {
    return 'Password must be at least 8 characters.';
  } 

  else if (!passregex.test(val)) {
    return <>
    <p> Please enter a strong password.</p>
    <ul>

      <li>A password should contains atleast 8 characters</li>
      <li>A password should contain one upper case</li>
      <li>A password should contain one lower case</li>
     <li>A password should contain one number</li>
    <li>A password should comtain one special character @ $ ! % * ? & _ </li>
    </ul>
    </>
  }
    return "";
}


  const handleChange = (e) =>{
  const value = e.target.value;
    setUsername(value);
    const result = validate(value); 
    setError(result);
}

const handlePasswordChange = (event) =>{
  const val = event.target.value;
    setPassword(val);
    const result = validatePassword(val); 
    console.log(result)
    setPassError(result);
    console.log("passerrpor",passerror)
}


  return (
    <div>
      <div className={styles.login__card}>
             <img src={login} alt="' '"/>
             <h2>Register</h2>
             <div className={styles.input__inline__wrapper}>
                  <Input placeholder="Firstname"
                  value ={firstname}
                  onChange={(e)=>setFirstname(e.target.value)}
                  />
                  <Input placeholder="Lastname"
                  style={{ marginLeft: '10px' }}
                  value ={lastname}
                  onChange={(e)=>setLastname(e.target.value)}
                  />
               </div>


               <div className={styles.input__wrapper}>
                  <Input placeholder="Username/Email address"
                  value ={username}
                  onChange={handleChange}
                     style={{
                padding: '8px',
                marginTop: '5px',
                borderRadius: '4px',
                outline: 'none',
               
              }}
                  />

                   {/* Show the text error only if they've started typing and there is an error */}
                    {username.length > 0 && error && (
                      <p style={{ color: 'red', fontSize: '12px', margin: '5px 0 0' }}>
                        {error}
                      </p>    
                    )}

                    {/* Success message only if valid and they've typed something */}
                    {username.length >= 3 && !error && (
                      <p style={{ color: 'green', fontSize: '12px' }}>Username is valid!</p>
                    )}


               </div>

               <div className={styles.input__wrapper}>
                  <Input.Password
                  placeholder="Password"
                  value ={password}
                  onChange={handlePasswordChange}
                  maxLength={8}
                     style={{
                padding: '8px',
                marginTop: '5px',
                borderRadius: '4px',
                outline: 'none',
               
              }}
                  />

                     {password.length > 0 && passerror && (
                      <p style={{ color: 'red', fontSize: '12px', margin: '5px 0 0' }}>
                        {passerror}
                      </p>
                    )}

                    {password.length == 8 && !passerror && (
                      <p style={{ color: 'green', fontSize: '12px' }}>Password is valid!</p>
                    )}


              </div>

              <div className='styles.input__info'>
                Existing User?
                 <Link to="/login">Login</Link>
              </div>
<br></br>
              <div id="p-btn">
              <Button loading={loading} style={{ marginTop: '20px' }}  type = "primary" size = "large" disabled={!username || !password} onClick={handleSubmit}>Register</Button>
              </div>
              




        </div>

      </div>
    
  )
}

export default Register