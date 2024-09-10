import React,{useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const SignIn:React.FC = () => {
    const navigate = useNavigate()
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/v1/user/signin", {
              email, password
            });
    
            console.log('Full Response Data:', response.data); // Log the full response
    
            const { token } = response.data;
            if (token) {
                localStorage.setItem('authToken', token);
            }
    
            // Adjust navigation based on available data
            if (token) {
                navigate(`/workspace`);
            } else {
                console.error('userId is undefined');
            }
        } catch (err) {
            console.error('Error during signup:', err);
        }
    };
    
    
  return (
    <div className='sign-up-form'>
        <div className='form-area'>
            <h1 style={{marginBlock:"19px"}}>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className='name-email-area'>
                    <label>Email</label>
                    <input type="email" name="" placeholder='john@example.com'
                    onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div>
                    <label >Password</label>
                    <input type="password" name="" id="" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}/>
                </div>

                <div>
                    <button type='submit'>Sign Up</button>
                </div>
            </form>
            
        </div>
    </div>
  )
}

export default SignIn