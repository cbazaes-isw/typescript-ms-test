const BaseService = require('./base.service');

class UserService extends BaseService {
    constructor({ UserRepository }) {

        super(UserRepository);
        this._userRepository = UserRepository;

    }

    async createUser(user, userId) {
        const createdUser = this._userRepository.create({
            ...user,
            owner: userId
        });
        return createdUser;
    }

    async getAllUsers() {
        return this._userRepository.getAllWithoutPagination();
    }
}

module.exports = UserService;