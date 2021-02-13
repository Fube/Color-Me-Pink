import { roleRepo } from '../implementations';
import { client } from '../index';
import arrayDiff from '../utilities/arrayDiff';

client.on('guildMemberUpdate', async (past, present) => {

    const isInDb:boolean = await roleRepo.findOne({ userId: present.id, guildId: present.guild.id }) !== null;
    if(!isInDb)return; // Guild memeber is not a user

    const diff:Set<string> = arrayDiff(past.roles.cache.map(n => n.id), present.roles.cache.map(n => n.id));

    if(diff.size <= 0)return; // No difference detected

    let roleInDb:boolean = false;
    let roleId: string = null;
    for(const id of diff){

        if(roleInDb)break;

        roleInDb = (await roleRepo.findOne({ userId: present.id, roleId: id })) !== null;
        roleId = id;
    }

    if(roleInDb)return; // Guild member is a user, and their role is still there. Nothing to do

    await roleRepo.deleteOne({ userId: present.id, roleId, guildId: present.guild.id });
});