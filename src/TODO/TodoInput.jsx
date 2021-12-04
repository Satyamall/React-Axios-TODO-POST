import { useState } from "react"


export default function TodoInput({onTask}){

    const [text, SetText]=useState("");

    const handleChange=(e)=>{
        SetText(e.target.value);
    }

    const handleCLick=(e)=>{
        e.preventDefault();
        onTask(text);
    }

    return (
        <div>
           <input type="text" 
           placeholder="Add something...." 
           value={text} 
           onChange={handleChange}
           />
           <button onClick={handleCLick}>+</button>

        </div>
    )
}