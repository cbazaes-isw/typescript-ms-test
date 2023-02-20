import { TodoModel } from "../models/todo";

export class TodoService {

    contructor() {

    }

    public async getAll(): Promise<any[]> {

        const todos = await TodoModel.find({});
        const items = todos.map((item) => { return { id: item._id, description: item.description } });
        return items;

    }

    public async getById(id: string): Promise<any> {

        const todo = await TodoModel.findOne({ _id: id });
        console.log({ todo });

        if (todo === null) return null;

        return {
            id: todo._id,
            description: todo.description
        }

    }

    public async create(item: Object): Promise<any> {

        const o = new TodoModel(item);
        await o.save();

    }

    public async update(id: string, item: Object): Promise<any> {

        await TodoModel.findByIdAndUpdate(id, item);

    }

    public async delete(id : string) : Promise <any>
    {

        await TodoModel.findByIdAndRemove(id);

    }
}