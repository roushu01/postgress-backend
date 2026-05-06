const express=require("express")
const Connect=require("../config/db")
const hashPassword=require("../controllers/Hashing")
const app=express()
app.use(express.json())

const userRoutes = require("./authroutes"); // adjust path

app.use("/api", userRoutes);

let client;
(async () => {
    client = await Connect(); 
})();

app.post("/Post",async(req,res)=>{
    const {name,email,password}=req.body
    const newPassword=await hashPassword(password)

    const result=await client.query('INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *',[name,email,newPassword])
  
    res.status(201).json({message:"Post created successfully", Post:result.rows[0]})
})
app.get("/Post",async(req,res)=>{
    try {
        const result = await client.query('SELECT * FROM users');
        console.log(result.rows);

        res.status(200).json({
            message: "Users retrieved successfully",
            Post: result.rows
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching data", details: err.message });
    }
})
app.delete("Post/:id",async(req,res)=>{
    const {id}=req.params
    const client =await Connect()
    const result =await client.query('DELETE FROM "Post" WHERE id=$1  ')
   
    res.status(200).json({message:"Post deleted successfully"})

})
module.exports=app