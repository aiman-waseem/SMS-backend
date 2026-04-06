import { DataTypes } from "sequelize";
import {sequelize} from "../../../config/DBconnection.js"

// import { SellerProfile } from "../../merchant_management/models/merchant.model.js";

export const Role = sequelize.define(
  "Role",
  {
    // Model attributes are defined here

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(45),
      unique: true,
      
    },
    roleType: {
      type: DataTypes.STRING(45),
      // allowNull defaults to true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      // allowNull defaults to true
    },
    isVisible: {
      type: DataTypes.BOOLEAN,
      // allowNull defaults to true
    },
    sellerId: {
      type: DataTypes.INTEGER,
      references: {
        model: "SellerProfile",
        key: "id",
      },
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
    createdBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
      // allowNull defaults to true
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
      // allowNull defaults to true
    }
  },
  {
    // Other model options go here
    freezeTableName: true,
  }
);

// Role.belongsTo(SellerProfile, {
//   foreignKey: "sellerId",
//   as: "seller",
// })
//sequelize.sync()
