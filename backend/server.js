const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.get('/jokes',(req,res)=>{
    const jokes = [
        {
            "id": 1,
            "setup": "Why don't skeletons fight each other?",
            "punchline": "They don't have the guts."
          },
          {
            "id": 2,
            "setup": "What do you call fake spaghetti?",
            "punchline": "An impasta!"
          },
          {
            "id": 3,
            "setup": "Why did the scarecrow win an award?",
            "punchline": "Because he was outstanding in his field!"
          },
          {
            "id": 4,
            "setup": "Why can’t you give Elsa a balloon?",
            "punchline": "Because she will let it go."
          },
          {
            "id": 5,
            "setup": "Why don’t some couples go to the gym?",
            "punchline": "Because some relationships don’t work out."
          }
      
    ]
    res.send(jokes);
})

app.listen(port,()=>{
    console.log(`Server is listening on ${port}`);
    
})