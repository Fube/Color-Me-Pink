import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../db';

export const Role = sequelize.define('Role', 
    {

        userId: {

            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,
            field: 'user_id'
        },

        roleId: {

            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: 'role_id'
        },

        guildId: {

            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            primaryKey: true,
            field: 'guild_id'
        },
    },
    {
        
        tableName: 'role',
        freezeTableName: true,
        timestamps: false,
    }
);

export interface IRole {

    userId: string,
    roleId: string,
    guildId: string,
}

export interface IRoleResolvable {

    userId?: string,
    roleId?: string,
    guildId?: string,
}