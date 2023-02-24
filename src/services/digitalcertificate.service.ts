import { DigitalCertificateModel } from "../models/digitalcertificate";
import p12info from 'p12-info';

export class DigitalCertificateService {

    contructor() {

    }

    public async getAll(): Promise<any[]> {

        const result = await DigitalCertificateModel.find({});
        const items = result.map((item) => {
            return {
                id: item._id,
                rut: item.rut,
                fechaEmision: item.fechaEmision,
                fechaExpiracion: item.fechaExpiracion
            }
        });
        return items;

    }

    public async getById(id: string): Promise<any> {

        const item = await DigitalCertificateModel.findOne({ _id: id });
        if (item === null) return null;

        return {
            id: item._id,
            rut: item.rut,
            fechaEmision: item.fechaEmision,
            fechaExpiracion: item.fechaExpiracion
        };

    }

    public async create(password: string, base64content: string): Promise<any> {

        const content = Buffer.from(base64content, 'base64');
        const info = p12info(content, password);

        console.log(info);

        let rut = '';
        let fechaEmision = '';
        let fechaExpiracion = '';

        // const item = new DigitalCertificateModel({ rut, fechaEmision, fechaExpiracion, content });
        // item.save();

    }

    public async update(id: string, item: Object): Promise<any> {

        await DigitalCertificateModel.findByIdAndUpdate(id, item);

    }

    public async delete(id: string): Promise<any> {

        await DigitalCertificateModel.findByIdAndRemove(id);

    }
}