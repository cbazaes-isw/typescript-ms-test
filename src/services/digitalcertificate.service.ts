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
                legalCode: item.legalCode,
                issueDate: item.issueDate,
                dueDate: item.dueDate
            }
        });
        return items;

    }

    public async getById(id: string): Promise<any> {

        const item = await DigitalCertificateModel.findOne({ _id: id });
        if (item === null) return null;

        return {
            id: item._id,
            legalCode: item.legalCode,
            issueDate: item.issueDate,
            dueDate: item.dueDate
        };

    }
    
    public async create(legalCode: string, password: string, content: Buffer, mimeType: string, fileName: string): Promise<any> {

        const info = p12info(content, password);

        const subject = info.subject.commonName;
        const email = info.subject.emailAddress;
        const organization = info.subject.organizationName;
        const issueDate = info.validity.notBefore;
        const dueDate = info.validity.notAfter;

        const item = new DigitalCertificateModel({
            legalCode,
            subject,
            email,
            organization,
            issueDate,
            dueDate,
            info,
            content,
            mimeType,
            fileName
        });
        item.save();

    }

    public async update(id: string, item: Object): Promise<any> {

        await DigitalCertificateModel.findByIdAndUpdate(id, item);

    }

    public async delete(id: string): Promise<any> {

        await DigitalCertificateModel.findByIdAndRemove(id);

    }
}