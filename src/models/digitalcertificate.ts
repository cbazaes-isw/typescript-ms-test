import { Schema, model } from 'mongoose';

interface IDigitalCertificate {
    legalCode: String,
    subject: String,
    email: String,
    organization: String,
    issueDate: Date,
    dueDate: Date,
    info: Schema,
    content: Buffer,
    mimeType: String,
    fileName: String,
    created: Date,
}

const DigitalCertificateSchema = new Schema<IDigitalCertificate>({
    legalCode: {
        type: String,
        index: true,
        match: /^\d{1,8}-[\d{1}K]$/gi, // RUT format
        uppercase: true // Always convert to uppercase
    },
    subject: { type: String },
    email: { type: String },
    organization: { type: String },
    issueDate: { type: Date },
    dueDate: { type: Date },
    info: { type: Schema.Types.Mixed },
    content: { type: Buffer },
    mimeType: { type: String },
    fileName: { type: String },
    created: { type: Date, default: Date.now }
});

const DigitalCertificateModel = model('DigitalCertificate', DigitalCertificateSchema);

export { DigitalCertificateModel };