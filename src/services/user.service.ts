import { UserModel } from "../models/user";

export class UserService {

    contructor() {

    }

    public async getByEmail(email: string): Promise<any> {

        const user = await UserModel.findOne({ email });
        if (user === null) return null;

        return {
            name: user.name,
            email: user.email,
            password: user.password
        };

    }

    public async create(item: Object): Promise<any>{
        const o = new UserModel(item);
        await o.save();
        return o;
    }

}