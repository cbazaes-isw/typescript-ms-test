import { User } from "../models/User.model";
import { BaseRepository } from "./BaseRepository";

export class UserRepository extends BaseRepository<User>
{
    Count(): Promise<Number>
    {
        return this._collection.countDocuments({});
    }
}