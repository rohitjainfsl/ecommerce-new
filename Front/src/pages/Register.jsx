import {useState} from "react"
import {Link} from "react-router-dom"
import instance from "../axiosConfig"

function Register() {

const [data,setData]=useState({
name:'',
email:'',
password:'',
})

const[passwordMatch, setPasswordMatch]=useState(true)

function handleChange(e){
    const {name, value}=e.target
    setData((prev)=>{
        return {...prev, [name]:value};
    })
}

function handleConfirmPassword(e){
if(e.target.value!==data.password){
setPasswordMatch(false)
}
else{
    setPasswordMatch(true)
}
}

async function handleSubmit(e){
e.preventDefault();
try{
  const repsonse=await instance.post("/user/register",data,{withCredentials:true});
  console.log(repsonse.data)
}
catch(error){
  console.log(error);
}
}


  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter Name" name="name" onChange={handleChange} value={data.name} />
        <input type="email" placeholder="Enter Email" name="email" onChange={handleChange} value={data.email} />
        <input
          type="password"
          placeholder="Choose a Strong Password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="cpassword"
          onChange={handleConfirmPassword}
        />
        {!passwordMatch ? <span>Passwords do not match</span>:""}
        <button type="submit">Register</button>
      </form>
      <p>
        Already register? <Link to='/user/login'>login</Link>
    </p>
    </>
  );
}

export default Register;
