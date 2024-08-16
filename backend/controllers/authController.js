const bcrypt = require('bcrypt');
const User = require('../models/user');

// Registro de usuario
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });
        
        res.status(201).json({ message: 'Usuario registrado con éxito.', userId: newUser.id });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor.', error });
    }
};

// Inicio de sesión
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso.', userId: user.id });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor.', error });
    }
};
