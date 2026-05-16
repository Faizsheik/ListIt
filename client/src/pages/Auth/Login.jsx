import React,{useState} from 'react'
import styles from './Login.module.css';
import login from '../../assests/login.png'
import {Link, useNavigate} from 'react-router-dom'
import {Form,Input,Button,message} from 'antd';
import AuthServices from '../../services/authServices';
import { getErrorMessage } from '../../util/GetError';

function Login() {

  const[username,setUsername] = useState("");
  const[password,setPassword] = useState("");
  const[loading,setLoading] = useState(false);
  const navigate = useNavigate(); //constructor
  const[error,setError] = useState();
  const[passerror,setPassError] = useState();
  const [isBlurred, setIsBlurred] = useState(false);


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



  const handleSubmit = async () =>
  {   
    

        console.log("Logged successfully");
        try
        {
          setLoading(true);
          let data=
          {
            username,
            password
          }

          const response = await AuthServices.loginUser(data);
        
          console.log(response.data);
          localStorage.setItem('toDoAppUser',JSON.stringify(response.data));   //convertimg JSON or string into localstorage  //contains token also
          navigate('/to-do-list'); //path name
          setLoading(false)

        }catch(err)
        {
          console.log(err);
        // message.error(err.message);
            message.error(getErrorMessage(err));

          setLoading(false)
        }

    
        setUsername('');
        setPassword('');
    
   
  }


  return (
    <div>
      <div className={styles.login__card}>
        
             <img src={login} alt="' '"/>
             <h2>Login</h2>
             
               <div className={styles.input__wrapper}>
                  <Input placeholder="Username/Email address"
                  type='text/email'
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

                    {/* Success message only if valid and they've typed something */}
                    {password.length >= 8 && !passerror && (
                      <p style={{ color: 'green', fontSize: '12px' }}>Password is valid!</p>
                    )}

              </div>

              <div className='styles.input__info'>
                New User? <Link to="/register">Register</Link>
              </div><br></br>
              <div>
                
              <Button
               style={{ 
                    marginTop: '10px',
                    // Always keep the text white
                    color: '#ffffff', 
                    // Always keep the primary blue background, but lower opacity when disabled
                    backgroundColor: 'var(--primary)', 
                    border: 'none',
                    opacity: (!username || !password) ? 0.4 : 1,
                    cursor: (!username || !password) ? 'not-allowed' : 'pointer'
                  }}
               loading={loading}  
               loadingstyle={{ marginTop: '20px' }} 
               type = "primary" size = "large" disabled={!username || !password} onClick={handleSubmit}>Login</Button>
              </div>
        </div>
       {/* my code */}



      </div>
    
  )
}

export default Login