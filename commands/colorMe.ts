import { Role, RoleData } from 'discord.js';
import Command from '../classes/Command';
import isValidHex from '../utilities/isValidHex';
import { client } from '../index';
import { IRole } from '../entities/Role';
import RoleRepoImpl from '../repositories/RolesRepoImpl';

const roleRepo = new RoleRepoImpl();

const colorMe = new Command(
    'colorMe',
    ['cm'],
    'Adds a colored role',
    async (message, bits) => {

        if(bits.length < 2){
            await message.reply('Too little or too many args')
            return false;
        }
        
        const [ name, color, ...roleName ] = bits;
        const joinedName = roleName.length >= 0 ? roleName.join(' ') : color;

        if(!isValidHex(color)){
            await message.reply('Invalid hex code');
            return false;
        }

        try{

            const rolesManager = (await message.guild.fetch()).roles;

            const { member } = message;
            const memberRoles = (await member.fetch(true)).roles;

            // Find the bot's highest assigned role to make sure the bot isn't trying to assign a role higher than it can
            const maxBotRolePosition = Math.max(...message.guild.members.cache.find(n => n.id === client.user.id).roles.cache.map(n => n.position));
            let maxPosition = 0;

            // Find the user's highest assigned role to know where the new role should be situated
            for(const [_, role] of memberRoles.cache){
                maxPosition = role.position < maxBotRolePosition && Math.max(maxPosition, role.position);
            }

            const roleData : RoleData = {
                
                name: roleName.length >= 0 ? roleName.join(' ') : color,
                color,
                position: maxPosition + Number(maxPosition <= maxBotRolePosition),
                hoist: true,
                mentionable: false,
            };


            // Check to see if user has a recorded role for specific guild
            const inDB:IRole = await roleRepo.findOne({
                userId: member.id,
                guildId: member.guild.id,
            });

            if(inDB !== null){

                // Cache and force fetch
                const assignedRole = rolesManager.fetch(inDB.roleId, true, true);

                (await assignedRole).edit({
                    name: joinedName,
                    color,
                });

                await roleRepo.updateOne({
                    userId: member.id,
                    roleId: inDB.roleId,
                    guildId: member.guild.id,
                });
            }
            else{

                const role = await rolesManager.create({
                    data: roleData,
                });
    
                await memberRoles.add(role);

                await roleRepo.add({
                    userId: member.id,
                    roleId: role.id,
                    guildId: member.guild.id,
                });
            }

            return true;
        }
        catch(e){
            console.log(e);
            return false;
        }
    }
);

export default colorMe;