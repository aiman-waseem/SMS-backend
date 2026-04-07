import { DataTypes } from "sequelize";
import sequelize from "../../../config/DBconnection.js";



export const SystemPermissions = sequelize.define(
    "SystemPermissions",
    {
        // Model attributes are defined here

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        menuName: {
            type: DataTypes.STRING(45),
        },
        parentElement: {
            type: DataTypes.STRING(100),
        },
        name: {
            type: DataTypes.STRING(45),
        },
        label: {
            type: DataTypes.STRING(45),
        },
        module: {
            type: DataTypes.STRING(200),
        },
        permType: {
            type: DataTypes.STRING(10),
        },
        method: {
            type: DataTypes.STRING(45),
        },
        action: {
            type: DataTypes.STRING(45),
            // allowNull defaults to true
        },
        icon: {
            type: DataTypes.STRING(45),
            // allowNull defaults to true
        },
        displayPos: {
            type: DataTypes.INTEGER,
            // allowNull defaults to true
        },
        displayMenuPos: {
            type: DataTypes.INTEGER,
            // allowNull defaults to true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            // allowNull defaults to true
        },
        isAdminPermission: {
            type: DataTypes.BOOLEAN,
            // allowNull defaults to true
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            // allowNull defaults to true
        },
        isRender: {
            type: DataTypes.BOOLEAN,
        },
        isRoot: {
            type: DataTypes.BOOLEAN,
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

