import { SystemRolePermissions } from "../../user_management/models/rolePermission.model.js";
import { SystemPermissions } from "../../user_management/models/systemPermissions.model.js";

export const 
getPermissionByRoleId = async (
  roleId,
  isRoot = false,
  // findSeller,
  // sellerType,
  requestedUrl = "",
  method = ""
) => {
  const permissionWhere = {};
 console.log("sellerType Top",roleId,isRoot,findSeller,sellerType,requestedUrl,method)
 console.log("sellerType",sellerType)
 console.log("requestedUrl",requestedUrl)
 console.log("method",method)
  // Apply filters only if values are passed
  // if (requestedUrl) {
  //   permissionWhere.action = requestedUrl;
  //   // or permissionWhere.name / permissionWhere.menuName
  //   // depends on where you store the URL
  // }

  // if (method) {
  //   permissionWhere.method = method;
  // }

  // if (isRoot) {
  //   permissionWhere.isRoot = isRoot;
  // }
//   console.log("findSeller",findSeller?.sellerType)
//  let sellerPermType = 'b2b';
// if (findSeller?.sellerType === 'both') {
//   sellerPermType = sellerType?sellerType:'b2b';
// } else if (findSeller?.sellerType === 'b2c') {
//   sellerPermType = 'b2c';
// }

  // const permFilters = { sellerPermType: sellerPermType };
const permFilters = {};
  // Dynamically add filters only if they exist
  if (requestedUrl) permFilters.action = requestedUrl;
  if (method) permFilters.method = method;
  if(isRoot) permFilters.isRoot=isRoot
  console.log({ permFilters })
  try {
const result = await SystemRolePermissions.findAll({
  where: { roleId },
  include: [
    {
      model: SystemPermissions,
      as: "systemPermissions",
      where: {
        ...permFilters
      },
      required: true, // this forces INNER JOIN
      attributes: [
        "id",
        "name",
        // "parentElement",
        "label",
        "menuName",
        "method",
        "action",
        "isRender",
        // "icon",
        "isRoot",
        // "displayMenuPos",
        "displayPos",

      ],
    },
  ],
  order: [[{ model: SystemPermissions, as: "systemPermissions" }, "displayPos", "ASC"]],
});

  
    // console.log("Resultssss", result);


    if (result.length > 0) {
      // return result
      return result;
    } else {
      return [];
    }
  } catch (e) {
    console.log("Error", e);
    throw new Error("Permissions not found");
  }
};