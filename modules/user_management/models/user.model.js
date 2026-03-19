import { DataTypes } from "sequelize";
import {sequelize} from "../../../config/DBconnection.js"
// import { SellerProfile } from "../../merchant_management/models/merchant.model.js";
import { Role } from "./role.model.js";
export const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    image: {
      type: DataTypes.STRING,
    },
    userType: {
      type: DataTypes.INTEGER,
    },
    connectorLogin: {
      type: DataTypes.BOOLEAN,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      // allowNull defaults to true
    },
    password: {
      type: DataTypes.STRING(100),
      // allowNull defaults to true
    },
    loginOtp: {
      type: DataTypes.STRING(192),
      // allowNull defaults to true
    },
    otpExpiry: {
      type: DataTypes.DATE,
      // allowNull defaults to true
    },
    phone: {
      type: DataTypes.STRING(24),
      // allowNull defaults to true
    },

    restrictAccess: {
      type: DataTypes.BOOLEAN,
    },

    connectorLogin: {
      type: DataTypes.BOOLEAN,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      // allowNull defaults to true
    },
    isLoggout: {
      type: DataTypes.BOOLEAN,
      // allowNull defaults to true
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    comissionerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      // allowNull defaults to true
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    freezeTableName: true,
  }
);


// User.belongsTo(SellerProfile, {
//   foreignKey: "sellerId",
//   as: "seller",
// });

User.belongsTo(Role, {
  foreignKey: "roleId",
  as: "role",
});

// SellerProfile.hasOne(User, {
//   foreignKey: "sellerId",
//   as: "user",
// });

// import { SellerProfile } from "../../merchant_management/models/merchant.model.js";
// User.belongsTo(SellerProfile, {
//   foreignKey: "sellerId",
//   as: "seller",
// });
