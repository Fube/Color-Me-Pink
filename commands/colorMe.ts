import { Role, RoleData } from 'discord.js';
import Command from '../classes/Command';
import isValidHex from '../utilities/isValidHex';
import { client } from '../index';

const colorMe = new Command(
    'colorMe',
    ['cm'],
    'Adds a colored role',
    async (message, bits) => {

        if(bits.length < 2){
            await message.reply('Too little or too many args')
            return false;
        }
        
        let [ name, color, ...roleName ] = bits;

        if(!isValidHex(color)){
            await message.reply('Invalid hex code');
            return false;
        }

        try{

            const rolesManager = (await message.guild.fetch()).roles;

            const { member } = message;
            const memberRoles = (await member.fetch(true)).roles;

            const maxBotRolePosition = Math.max(...message.guild.members.cache.find(n => n.id === client.user.id).roles.cache.map(n => n.position));
            let maxPosition = 0;

            for(const [_, role] of memberRoles.cache){

                maxPosition = role.position < maxBotRolePosition && Math.max(maxPosition, role.position);
            
                if(isValidHex(role.name)){

                    await member.roles.remove(role.id);

                    // role.members is cached, so its size won't be updated
                    if(role.members.size - 1 <= 0){
                        await role.delete('No one has this role anymore');
                    }
                }
            }

            let role:Role = rolesManager.cache.filter(n => n.name === color).array()[0];

            if(!role){

                const roleData : RoleData = {
                
                    name: roleName ?? color,
                    color: color,
                    position: maxPosition + Number(maxPosition <= maxBotRolePosition),
                    hoist: true,
                    mentionable: false,
                }
    
                role = await rolesManager.create({
                    data: roleData,
                });
            }

            await memberRoles.add(role);

            return true;
        }
        catch(e){
            console.log(e);
            return false;
        }
    }
);

export default colorMe;