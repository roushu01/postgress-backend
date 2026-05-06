const bcrypt=require("bcrypt")
const saltRounds=10
const hashPassword=async(password)=>{
    try{
        const hash=await bcrypt.hash(password,saltRounds)
        return hash
    }catch(err){
        console.log(err)
    }
}
module.exports=hashPassword