import { CafModel } from "../models/caf";
import { DOMParserImpl as dom } from 'xmldom-ts';
import * as xpath from 'xpath-ts';


export class CafService {

    contructor() {

    }

    public async getAll(): Promise<any[]> {

        const todos = await CafModel.find({});
        const items = todos.map((item) => {
            return {
                id: item._id,
                rutEmisor: item.rutEmisor,
                razonSocial: item.razonSocial,
                tipoDocumento: item.tipoDocumento,
                folioDesde: item.folioDesde,
                folioHasta: item.folioHasta,
                fechaAutorizacion: item.fechaAutorizacion
            }
        });
        return items;

    }

    public async getById(id: string): Promise<any> {

        const caf = await CafModel.findOne({ _id: id });
        if (caf === null) return null;

        return {
            id: caf._id,
            rutEmisor: caf.rutEmisor,
            razonSocial: caf.razonSocial,
            tipoDocumento: caf.tipoDocumento,
            folioDesde: caf.folioDesde,
            folioHasta: caf.folioHasta,
            fechaAutorizacion: caf.fechaAutorizacion
        };

    }

    public async create(base64content: string): Promise<any> {

        const content = Buffer.from(base64content, 'base64');
        const xmlString = content.toString('utf-8');

        let xml = new dom().parseFromString(xmlString);

        const rutEmisor = xpath.select('string(/AUTORIZACION/CAF/DA/RE)', xml);
        const razonSocial = xpath.select('string(/AUTORIZACION/CAF/DA/RS)', xml);
        const tipoDocumento = parseInt(xpath.select('string(/AUTORIZACION/CAF/DA/TD)', xml) as string);
        const folioDesde = parseInt(xpath.select('string(/AUTORIZACION/CAF/DA/RNG/D)', xml) as string);
        const folioHasta = parseInt(xpath.select('string(/AUTORIZACION/CAF/DA/RNG/H)', xml) as string);
        const fechaAutorizacion = new Date(xpath.select('string(/AUTORIZACION/CAF/DA/FA)', xml) as string);

        const caf = new CafModel({ rutEmisor, razonSocial, tipoDocumento, folioDesde, folioHasta, fechaAutorizacion, content });
        caf.save();

    }

    public async update(id: string, item: Object): Promise<any> {

        await CafModel.findByIdAndUpdate(id, item);

    }

    public async delete(id: string): Promise<any> {

        await CafModel.findByIdAndRemove(id);

    }
}