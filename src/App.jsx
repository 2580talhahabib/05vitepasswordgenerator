import { useCallback, useState,useEffect,useRef } from "react"

function App(){
const [length,setlength]=useState(8)
const[numberAllowed,setnumberAllowed]=useState(false)
const[charAllowed,setcharAllowed]=useState(false)
const[password,setpassword]=useState()
const passwordreff=useRef(null)


// working on useCallback hook 
const passwordgenerator=useCallback(()=>{
    let pass=""
    let str="AQZWSXEDCRFVTGBYHNUJMIKOLPqazxswedcrfvtgbyhnujmikolp"

    if(numberAllowed)str+="123456789"
    if(charAllowed)str+="`!@#$%^&*()_+{}[]|:><"

    for (let i = 0; i <= length; i++) {
   let char=Math.floor(Math.random()*str.length+1)
pass+=str.charAt(char)

    }
    setpassword(pass)
},[length,numberAllowed,charAllowed,setpassword])
// working on useRef hook 
const copyPasswordToClipboard=useCallback(()=>{
   
    passwordreff.current.select()
    window.navigator.clipboard.writeText(password)
},[password])
// working on useEffect hook 
useEffect(()=>{
    passwordgenerator()
},[length,numberAllowed,charAllowed,passwordgenerator])

    return(
<>
<div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
<h1 className='text-white text-center my-3'>Password generator</h1>
<div className="flex shadow rounded-lg overflow-hidden mb-4">
<input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordreff}
        />
         <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>


</div>
<div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
<input 
type="range"
max={100}
min={8}
// value={length}
id="inputid"
className="cursor-pointer"
onChange={(e)=>{setlength(e.target.value)

}}
  />
  <label htmlFor="inputid">Length:{length}</label>

</div>

<div className="flex items-center gap-x-1">

    <input
     type="checkbox" 
     id="checkid"
     defaultChecked={numberAllowed}
     onChange={()=>{
setcharAllowed((prev)=>!prev)
     }}
     value={numberAllowed}
     />
     <label htmlFor="checkid">Number</label>
</div>
<input
 type="checkbox" 
defaultChecked={charAllowed}
id="charid"
onChange={()=>setcharAllowed((prev)=> !prev
)}
/>
<label htmlFor="charid">character</label>
</div>
</div>

</>
    )
}

export default App