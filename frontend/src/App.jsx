import {useState,useEffect}from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [jokes, setJokes] = useState([])
  useState(()=>{
    axios.get('/api/jokes')
    .then((response)=>{
      setJokes(response.data)
    })
    .catch((error)=>{
      console.log(error);
      
    })
  })
  return (
    <>
    <h1>Welcome Back Iqbal Boss</h1>
    <h2>Let's Start with a Bang 🤞</h2>
    <p>Jokes: {jokes.length}</p>  
    {
      jokes.map((joke,index)=>(
        <div key={joke.id}>
          <h3>{joke.setup}</h3>
          <h4>{joke.punchline}</h4>
        </div>

      ))
    }
    </>
  )
}

export default App
