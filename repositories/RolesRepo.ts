import { Model } from "sequelize/types";
import { IRole, Role } from "../entities/Role";

export default interface RolesRepository {

    findById : (id:string) => Promise<IRole>,
    add : (role:IRole) => void,
    updateOne : (role:IRole) => Promise<Boolean>,
    deleteOne : (role:IRole) => Promise<Boolean>,
}