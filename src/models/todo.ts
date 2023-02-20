import * as mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
    id: { type: String },
    description: { type: String }
});

const TodoModel = mongoose.model('Todo', TodoSchema);

export { TodoModel };