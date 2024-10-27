import mongoose from "mongoose";

const pacientesSchema = mongoose.Schema({
    nombreMascota: {
        type: String,
        required: true
    },
    especie: {
        type: String,
        required: true
    },
    raza: {
        type: String
    },
    sexo: {
        type: String,
        enum: ["macho", "hembra"],
        required: true
    },
    peso: {
        type: Number
    },
    edad: {
        type: Number,
        required: true
    },
    nombrePropietario: {
        type: String,
        required: true
    },
    apellidoPaternoPropietario: {
        type: String,
        required: true
    },
    apellidoMaternoPropietario: {
        type: String,
        required: true
    },
    correoPropietario: {
        type: String,
        required: true
    },
    telefonoPropietario: {
        type: String,
        required: true
    },
    vacunas: [{
        nombre: String,
        fecha: Date,
        dosis: String
    }],
    alergias: [String],
    consultaMedicas: [{  // Registro de cada consulta médica
        fechaConsulta: {
            type: Date,
            default: Date.now()
        },
        sintomas: [String], // Síntomas reportados
        diagnostico: String, // Diagnóstico de la consulta
        tratamiento: {  // Tratamiento recetado en la consulta
            descripcion: String,
            dosis: String,
            observaciones: String  // Observaciones adicionales del veterinario
        },  
    }],
    veterinario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Veterinario"
    }

}, {
    timestamps: true
});

const Paciente = mongoose.model("Paciente", pacientesSchema);

export default Paciente;
