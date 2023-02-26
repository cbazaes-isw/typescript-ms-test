import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

const DigitalCertificateSchema = new mongoose.Schema({
    rut: { type: String },
    sujeto: { type: String },
    email: { type: String },
    organizacion: { type: String },
    fechaEmision: { type: Date },
    fechaExpiracion: { type: Date },
    info: { type: Schema.Types.Mixed },
    content: { type: Buffer }
});

const DigitalCertificateModel = mongoose.model('DigitalCertificate', DigitalCertificateSchema);

export { DigitalCertificateModel };