import * as mongoose from 'mongoose';

const DigitalCertificateSchema = new mongoose.Schema({
    rut: { type: String },
    fechaEmision: { type: Date },
    fechaExpiracion: { type: Date },
    content: { type: Buffer }
});

const DigitalCertificateModel = mongoose.model('DigitalCertificate', DigitalCertificateSchema);

export { DigitalCertificateModel };