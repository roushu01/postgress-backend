const pg=require("pg")

const Connect=async()=>{
    const client=new pg.Client({
        host:"localhost",
        port:process.env.PORT_NUM,
        user:"postgres",
        password:"root",
        database:"office-demo-backend"
    })
    await client.connect()
    console.log("Connected to PostgreSQL database")
    return client
}
module.exports=Connect