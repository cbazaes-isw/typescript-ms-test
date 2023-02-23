import * as mongoose from 'mongoose';

const CafSchema = new mongoose.Schema({
    rutEmisor: {
        type: String,
        index: true,
        match: /^\d{1,8}-[\d{1}K]$/gi, // RUT format
        uppercase: true // Always convert to uppercase
    },
    razonSocial: { type: String },
    tipoDocumento: { type: Number },
    folioDesde: { type: Number },
    folioHasta: { type: Number },
    fechaAutorizacion: { type: Date, index: true },
    content: { type: Buffer }
});

const CafModel = mongoose.model('Caf', CafSchema);

export { CafModel };