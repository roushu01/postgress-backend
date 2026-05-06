const express=require("express")

const hashPassword=require("../controllers/Hashing")
const app=express()
app.use(express.json())

const userRoutes = require("./authroutes"); // adjust path
const pool = require("../config/db")

app.use("/api", userRoutes);


app.post("/Post",async(req,res)=>{
    const {name,email,password}=req.body
    const newPassword=await hashPassword(password)

    const result=await pool.query('INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *',[name,email,newPassword])
  
    res.status(201).json({message:"Post created successfully", Post:result.rows[0]})
})
app.get("/Post",async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM users');
        console.log(result.rows);

        res.status(200).json({
            message: "Users retrieved successfully",
            Post: result.rows
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching data" });
    }
})
app.delete("Post/:id",async(req,res)=>{
    const {id}=req.params
    const pool =await Connect()
    const result =await pool.query('DELETE FROM "Post" WHERE id=$1  ')
   
    res.status(200).json({message:"Post deleted successfully"})

})
module.exports=app