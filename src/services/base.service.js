class BaseService {
    constructor(Repository) {
        this.repository = Repository;
    }

    async get(id) {

        if (!id) {
            const error = new Error();
            error.status = 400;
            error.message = "Parámetro id es obligatorio";
            throw error;
        }

        const entity = this.repository.get(id);
        if (!entity) {
            const error = new Error();
            error.status = 404;
            error.message = "Entidad no encontrada";
            throw error;
        }

        return entity;
    }
}