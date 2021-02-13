import ClientEventListener from "../classes/ClientEventListener";
import { IRole } from "../entities/Role";
import { roleRepo } from "../implementations";

export const syncWithDB = new ClientEventListener(

    'roleDelete',
    async (role) => {

        const inDB: IRole = await roleRepo.findOne({ roleId: role.id });
        if(inDB === null)return; // If it's null, it was not in the DB

        await roleRepo.deleteOne(inDB);
    }
);