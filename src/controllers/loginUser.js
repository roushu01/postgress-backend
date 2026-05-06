const pool=require("../config/db")
const bcrypt=require("bcrypt")
const loginUser=async(req,res)=>{
    console.log(req.body)
    const {name,password}=req.body
    
    const client=await pool()
    try{
        
    const result=await client.query('SELECT * FROM users WHERE name=$1',[name])
    console.log(result.rows)
    if (result.rows.length==0){
        res.status(404).json({message:"user not found"})
    
    }
    const user=result.rows[0]

    const isMatch=await bcrypt.compare(password,user.password)
    if (!isMatch){
        res.status(401).json({message:"invalid password"})
    }
    res.status(200).json({message:"login successful",user})   
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"server error"})
    }
    

}

module.exports=loginUser