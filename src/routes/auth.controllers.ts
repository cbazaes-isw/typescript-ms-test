import { Router, Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const authRoutes = Router();
const service = new UserService();

authRoutes.post('/register', async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { name, email, password } = req.body;
        const user = await service.create({ name, email, password });
        res.status(201).json({
            success: true,
            message: 'Usuario creado con éxito',
            data: user
        });

    } catch (error) {

        res.status(500).end();
        console.error('Caught error', error);

    }

});

authRoutes.post('/login', async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { email, password } = req.body;

        if (!email) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: 'El correo es requerido'
                });
        }

        if (!password) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: 'Se requiere una contraseña'
                });
        }

        const user = await service.getByEmail(email);

        if (!user) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: 'Correo o contraseña inválido'
                });
        }

        console.log({password, user});        

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: 'Correo o contraseña inválido'
                });
        }

        const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET as string);

        res.json({ success: true, token });

    } catch (error) {

        console.error(error);
        res.status(500).json(error).end();

    }

});

export { authRoutes };