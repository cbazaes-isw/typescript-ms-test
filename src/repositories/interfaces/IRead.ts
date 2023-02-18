export interface IRead<T> {
    find(item: T): Promise<T[]>;
    finddOne(id: string): Promise<T>;
}