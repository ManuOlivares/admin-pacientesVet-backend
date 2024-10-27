import Paciente from "../models/Paciente.js";


// Agregar un nuevo paciente
const agregarPaciente = async (req, res) => {

    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;

    try {
        const pacienteAlmacenado = await paciente.save(); 
        res.json(pacienteAlmacenado);


    } catch (error){
        console.log(error);

    }
   
};

// Obtener todos los pacientes del veterinario
const obtenerPacientes = async (req, res) => {

    const pacientes = await Paciente.find()
        .where("veterinario")
        .equals(req.veterinario);

    res.json(pacientes);
};

// Obtener Pacientes por el ID
const obtenerPaciente = async (req, res)=> {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        return res.status(400).json({ msg:"No encontrado" });
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg: "Acción no válida" });
    }
    res.json(paciente);

};

// Actualizar Paciente
const actualizarPaciente = async (req, res)=> {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        return res.status(400).json({ msg:"No encontrado" });
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg: "Acción no válida" });
    }

    // Lo que se va actualizar
    paciente.nombreMascota =  req.body.nombreMascota || paciente.nombre;
    paciente.especie = req.body.especie || paciente.especie;
    paciente.raza = req.body.raza || paciente.raza;
    paciente.sexo = req.body.sexo || paciente.sexo;
    paciente.peso = req.body.peso || paciente.peso;
    paciente.edad = req.body.edad || paciente.edad;
    paciente.nombrePropietario = req.body.nombrePropietario || paciente.nombrePropietario;
    paciente.apellidoPaterno = req.body.apellidoPaterno || paciente.apellidoPaterno;
    paciente.apellidoMaterno = req.body.apellidoMaterno || paciente.apellidoMaterno;
    paciente.correo = req.body.correo || paciente.correo;
    paciente.telefono = req.body.telefono || paciente.telefono;



    try{
        const pacienteActualizado = await paciente.save();
        res.json(pacienteActualizado);

    } catch(error) {
        console.log(error);
    }
    

};

const eliminarPaciente = async (req, res)=> {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        return res.status(400).json({ msg:"No encontrado" });
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg: "Acción no válida" });
    }

    try {
        await paciente.deleteOne();
        res.json({ msg:"Paciente Eliminado" });

    } catch (error){
        console.log(error)
    }


};


export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}