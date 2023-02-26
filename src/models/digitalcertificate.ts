import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

const DigitalCertificateSchema = new mongoose.Schema({
    legalCode: { type: String },
    subject: { type: String },
    email: { type: String },
    organization: { type: String },
    issueDate: { type: Date },
    dueDate: { type: Date },
    info: { type: Schema.Types.Mixed },
    content: { type: Buffer },
    mimeType: { type: String }
});

const DigitalCertificateModel = mongoose.model('DigitalCertificate', DigitalCertificateSchema);

export { DigitalCertificateModel };