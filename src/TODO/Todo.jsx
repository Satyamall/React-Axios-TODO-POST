import { useEffect, useState } from "react";
import TodoInput from "./TodoInput";
import axios from "axios";


export default function Todo() {
    
    const [todos, setTodos] = useState([])
    const [isLoading, setLoading]=useState(true);
    
    const handleTask = (title) => {
        const payload={
            title: title,
            status: false
        }
        const config = {
            url: "http://localhost:3000/tasks",
            method: "post",
            data: payload
        }
        return axios(config);
    }
    const getTodos=()=>{
        const config={
            url: "http://localhost:3000/tasks",
            method: "get"
        }
        return axios(config)
    }

    const handleGetTodos=()=>{
        return getTodos()
        .then((res)=>{
            setTodos(res.data);
            setLoading(false);
        })
        .catch((err)=>{
                console.log(err);
        })
    }

    useEffect(()=>{
        handleGetTodos();
    },[]);

    const onSubmit=async(title)=>{
        try{
            setLoading(true)
            await handleTask(title);
            await handleGetTodos();
            setLoading(false);
        }
        catch(err){
            console.log(err)
        }
    }

    if(isLoading){
        return <h1>Loading......</h1>
    }
    return (
        <div>
            <TodoInput onTask={onSubmit} />
            {
                todos.map((item)=>{
                    return <div key={item.id}>
                         <span>{item.id}.</span>
                         <span> {item.title}-</span>
                         <span> {item.status===true? "DONE" : "NOT DONE"}</span>
                    </div>
                })
            }
        </div>
    )
}