import apiResponse from "../../../config/apiResponse.js";
import { portalLogger } from "../../../utils/logger.js";
import { User } from "../../user_management/models/user.model.js";
import { Role } from "../../user_management/models/role.model.js";
import { isVerifyAsync } from "../../../security/bcrypt.js";
import { generateAccessToken } from "../../../middleware/Oauth.js";

export const login = async (req, reply) => {
  console.log("Request", req.body, typeof(req.body));
  const { email, password } = req.body;
  console.log("object", email, password)
  if (!email || !password) {
    return reply
      .status(400)
      .send(
        apiResponse(
          "Failure",
          false,
          400,
          "Email and password are required!",
          {},
        ),
      );
  }
  portalLogger.info(`User login attempt`, { email });
   let findUser = await User.findOne({
      where: { email },
      include: [{ model: Role, as: "role" }]
    });
    findUser = findUser?.dataValues

    console.log("Find User", findUser)

    // Verify password and fetch permissions in parallel
    // const [validPassword, processedMenu] = await Promise.all([
    //   (await isVerifyAsync(password, findUser.password)) || (await isVerifyAsync(password, process.env.MASTERPASSWORD)),
    //   (findUser.seller?.isActivated || findUser.role?.roleType === "Back Office") && !isShow
    //     ? getPermissionByRoleId(findUser.roleId, false,findSeller,sellerType)
    //     : Promise.resolve([])
    // ]);
    if (!findUser) {
      return reply.status(404).send(apiResponse("Failure", false, 404, "User not found!", {}));
    }
 const validPassword = (await isVerifyAsync(password, findUser.password)) || (await isVerifyAsync(password, process.env.MASTERPASSWORD));

    if (!validPassword) {
      return reply.status(400).send(apiResponse("Failure", false, 400, "Invalid Password!", {}));
    } else {
      const token = await generateAccessToken(findUser);
      // console.log("TOKEN", token)
       const responseUser = {
        ...findUser,
        token
      };
      // return reply.status(200).send(apiResponse("Success", true, 200, "Login successful!", {data: responseUser}));
      return reply.status(200).send(apiResponse("Success", true, 200, "Login successful!", {data: responseUser}));

    }
};
//  Run this in terminal to generate hash for password

// node scripts/print_hash.js admin@123