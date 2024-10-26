import jwt from 'jsonwebtoken';
import Veterinario from '../models/Veterinario.js';

const checkAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Se extrae el token para eliminar el prefijo "Bearer"
            token = req.headers.authorization.split(" ")[1];

            // Verificar y decodificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Encontrar al veterinario en la BD por la ID decodificada
            req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado");
            //console.log(req.veterinario);

            // Si el veterinario no existe
            if (!req.veterinario) {
                return res.status(404).json({ msg: "Veterinario no encontrado" });
            }

            // Pasar al siguiente middleware o controlador
            return next();

        } catch (error) {
            // Si hay un error al verificar el token o la búsqueda del veterinario
            return res.status(403).json({ msg: 'Token no válido' });
        }
    }

    // Si no se proporciona un token en los headers
    if (!token) {
        const error = new Error('Token no válido o inexistente');
        return res.status(403).json({ msg: error.message });
    }
};

export default checkAuth;
