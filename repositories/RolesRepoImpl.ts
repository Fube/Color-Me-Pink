import { IRole, IRoleResolvable, Role } from "../entities/Role";
import RolesRepository from "./RolesRepo";

export default class RoleRepoImpl implements RolesRepository {


    public async findById(id:string){

        const obj = await Role.findByPk(id);
        return obj.get();
    }

    
    public async findOne(role:IRoleResolvable): Promise<IRole>{

        const obj = await Role.findOne({
            where: {
                ...role,
            }
        });

        return obj && obj.get();
    }

    public async add(role:IRole){

        await Role.create(role);
    }

    public async updateOne(role:IRole){

        try{

            const obj = await Role.findByPk(role.userId);
            
            for(const field in role){
                obj.setDataValue(field, role[field]);
            }
            await obj.save();
            return true;
        }
        catch{
            return false;
        }
    }

    public async deleteOne(role:IRole){

        try{

            (await Role.findByPk(role.userId)).destroy();
            return true;
        }
        catch{
            return false;
        }
    }
    
}