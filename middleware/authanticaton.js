import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authantication  = async(req,res,next) =>{
    let token = req.header("Authorization");
    //res.send("Token:", token);
    
    token = token && token.split(" ")[1]; 
    if(!token){
        return res.status(402).json({Error : "Access Denied"});
    } 

    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY , {expiresIn : "1h"});
        req.user = decoded
        next();
    }
    catch(error){
        return res.status(401).json({Error : "Invalid token"});
    }

}
export default authantication