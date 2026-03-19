// Generate Access Token for user
// export const generateAccessToken = async (user) => {
//   try {
//     // config.get("TOKEN_KEY")
//     const jwtTime = await Configuration.findOne({ where: { keyName: "JWTExpiry" }, raw: true });
//     return jwt.sign(user, process.env.TOKEN_KEY, {
//       expiresIn: jwtTime?.value || "9h",
//       algorithm: "HS256", // Explicitly using HS256 algorithm
//     });
//   } catch (error) {
//     console.error("Error generating token:", error);
//     return null;
//   }
// };
import jwt from "jsonwebtoken";
export const generateAccessToken = (user) => {
    console.log("Inside token obj", user)
    try{
 return jwt.sign(user, process.env.TOKEN_KEY, {
    expiresIn: "10h",
    algorithm: "HS256",
  })
    } catch(error){
        console.error("Error generating token:", error);
        return null;
    }
 
};

// export const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Access token missing" });

//   jwt.verify(token, process.env.TOKEN_KEY, (err, user) => { 
//     if (err) {
//       return res.status(403).json({ message: "Invalid or expired token" });
//     }
//     req.user = user;
//     next();
//   })

export const authenticate = async (req, res, token) => {
let decoded;
 decoded = jwt.verify(token, process.env.TOKEN_KEY);
  req.user = decoded;
    req.token = token;

}