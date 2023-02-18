const BaseRepository = require('./base.repository');

class UserRepository extends BaseRepository {

    constructor({ User }) {
        super(User);
    }

    async getAllWithoutPagination() {
        return await this.model.find();
    }
}

module.exports = UserRepository;