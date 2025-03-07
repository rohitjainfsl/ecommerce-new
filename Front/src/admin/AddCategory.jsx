import {useState} from "react"
import instance from "../axiosConfig"


 
function AddCategory() {
const[form,setForm]=useState({
    name:'',
    image:'',
})

function handleChange(e){
    let {name,value}=e.target;
    if(name==="image") value=e.target.files[0]
    setForm((prev)=>{return {...prev,[name]:value}})
}

async function handleSubmit(e){
e.preventDefault();
try{
    const frm= new FormData();
    frm.append("name",form.name)
    frm.append("image",form.image)
    const response=await instance.post("/product/category/add",frm,{withCredentials:true})
  console.log(response.data)

}
catch(error){
console.log(error)
}

}
  return (
    <>
    <form action="" encType='multipart/form-data' onSubmit={handleSubmit}>
        <input type="text" name='name' value={form.name} onChange={handleChange} className='border mx-2' placeholder='Enter the name' />
        <input type="file" name='image'  onChange={handleChange} className='border mx-2' />
        <button type='submit' className='rounded border px-2 mx-2'>Submit</button>
    </form>
    </>
  )
}

export default AddCategory