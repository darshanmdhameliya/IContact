import express, { Application, Request, Response } from "express"
import userRouter from "./router/useRouter"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { log } from "console"
dotenv.config({ path: "./.env" })

const hostName: string = "127.0.0.1"
const port: number| string | undefined  = process.env.PORT || 9999
const dburl:any= process.env.MONGO_DB_CLOUD_URL
const dbName:string | undefined = process.env.MONGO_DB_DATABASE

const app: Application = express()

app.get("/", (request: Request, response: Response) => {
    response.json({
        msg: "Server Started"
    })
})

mongoose.connect(dburl , {
    dbName:dbName
}).then(()=>{
    console.log("Database Connection is ready...");
}).catch((error)=>{
    console.log(error);
})

app.use("/api/users", userRouter)

app.listen(Number(port), hostName, () => {
    console.log(`Express Server started at http://${hostName}:${port}`);

})