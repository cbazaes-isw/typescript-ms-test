export interface IWrite<T> {

    create(item: T): Promise<Boolean>;
    update(id: string, item: T): Promise<Boolean>;
    delete(id: string): Promise<Boolean>;

}