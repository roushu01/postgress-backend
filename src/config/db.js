const pg=require("pg")

const Connect=async()=>{
    const client=new pg.Client({
        host:process.env.DB_HOST,
        port:5432,
        user:process.env.DB_USER,
        password:"9m2Q7hiqKT7tyfTfuxzKXejOVYI0Vdxm",
        database:process.env.DB_NAME
    })
    await client.connect()
    console.log("Connected to PostgreSQL database")
    return client
}
module.exports=Connect