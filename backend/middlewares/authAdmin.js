import jwt from "jsonwebtoken"

//admin authentication middleware
const authAdmin = async (req,res,next) => {
    console.log(`[${req.method}] ${req.originalUrl}`);
    try {
        const {atoken} = req.headers
        if(!atoken){
            return res.json({success:false,message:'Not authorized login agian'})
        }
        const token_decode = jwt.verify(atoken,process.env.JWT_SECRET)

        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:'Not authorized login agian'})
        }

        next();

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }
} 

export default authAdmin