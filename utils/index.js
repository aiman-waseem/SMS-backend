// export const returnPayloadHeaders = async (req) => {
//     const payload = req.body;
//     const user = req.user;
//     const id = user?.id;
//     const _user = await User.findOne({
//         where: { id }, attributes: ["restrictAccess", "email", "sellerId"],
//         include: [
//             {
//                 model: Role, as: "role", attributes: ["id", "roleType", "name"]
//             }
//         ]
//     })
//     const role = _user?.role;
//     const roleId = _user?.role?.id;
//     const isSeller = _user?.role?.roleType === "Seller";
//     const isAdmin = _user?.role?.roleType === "Back Office";
//     const roleType = _user?.role?.roleType;
//     return {
//         payload,
//         user, // midddleware user
//         role,
//         isSeller,
//         _user,
//         isAdmin,
//         roleType,
//         restrictAccess: _user?.restrictAccess,
//         userId: id,
//         roleId
//     }
// }

export const returnPayloadHeaders = async (req) => {
    const payload = req.body;
    
  
   
    return {
        payload
       
    }
}