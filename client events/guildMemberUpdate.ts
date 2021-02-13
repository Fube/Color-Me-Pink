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

        console.log('Checking for change in roles...')
        if(past.roles.cache.size === present.roles.cache.size)return; // There has been no update in roles. Ignore.

        console.log('Checking if role is in DB...')
        const isInDb:boolean = await roleRepo.findOne({ userId: present.id, guildId: present.guild.id }) !== null;
        if(!isInDb)return; // Guild memeber is not a user
        console.log('Role was in DB...');

        const diff:Set<string> = arrayDiff(past.roles.cache.map(n => n.id), present.roles.cache.map(n => n.id));

        console.log('Checking for differences...')
        if(diff.size <= 0)return; // No difference detected
        console.log('Differences detected', diff);

        let roleInDb:boolean = false;
        let roleId: string = null;
        for(const id of diff){

            if(roleInDb)break;

            roleInDb = (await roleRepo.findOne({ userId: present.id, roleId: id })) !== null;
            roleId = id;
        }

        if(roleInDb)return; // Guild member is a user, and their role is still there. Nothing to do

        await roleRepo.deleteOne({ userId: present.id, roleId, guildId: present.guild.id });
    }
);