import ClientEventListener from '../classes/ClientEventListener';
import { roleRepo } from '../implementations';
import arrayDiff from '../utilities/arrayDiff';

export const syncWithDB = new ClientEventListener(
    
    'guildMemberUpdate', 
    async (past, present) => {

        await Promise.all([
            past.fetch(true),
            present.fetch(true),
        ]);

        if(past.roles.cache.size <= present.roles.cache.size)return; // No role has been removed. No need to go any further.

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

        if(!roleInDb)return; // Guild member is a user, but the removed role is not ours. Ignore

        await roleRepo.deleteOne({ userId: present.id, roleId, guildId: present.guild.id });
        await (await present.guild.roles.fetch(roleId)).delete();
    }
);