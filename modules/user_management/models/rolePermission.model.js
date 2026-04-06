import { DataTypes } from "sequelize";
import sequelize from "../../../config/DBcontext.js";
import { Permission } from "./permission.model.js";
import { SystemPermissions } from "./systemPermissions.model.js";
import { SellerProfile } from "../../merchant_management/models/merchant.model.js";




export const SystemRolePermissions = sequelize.define(
  "systemrolepermissions",

  {
    // Model attributes are defined here

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Roles",
        key: "roleId",
      },
    },
    permId: {
      type: DataTypes.INTEGER,
      references: {
        model: SystemPermissions,
        key: "permId",
      },
    },

    // sellerId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: SellerProfile,
    //     key: "sellerId",
    //   },
    // },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isWrite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isUpdate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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


SystemRolePermissions.belongsTo(SystemPermissions, {
  foreignKey: "permId",
  as: "systemPermissions",
});

// SystemRolePermissions.belongsTo(SellerProfile, {
//   foreignKey: "sellerId",
//   as: "seller",
// });
//sequelize.sync()
