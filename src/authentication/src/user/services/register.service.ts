import bcrypt from 'bcryptjs';
import { NewUser } from '@db/schema/users';
import { insertNewUser } from '../dao/insertNewUser.dao';
import { getUserByUsername } from '../dao/getUserByUsername.dao';
import {
    InternalServerErrorResponse,
    ConflictResponse
} from '@src/commons/patterns';

export const registerService = async (
    username: string,
    email: string,
    password: string,
    full_name: string,
    address: string,
    phone_number: string
) => {
    try {
        const TENANT_ID = process.env.TENANT_ID;
        if (!TENANT_ID) {
            return new InternalServerErrorResponse("Server tenant ID is missing").generate();
        }

        const existingUser = await getUserByUsername(username, TENANT_ID);
        if (existingUser) {
            return new ConflictResponse("Username already exists").generate();
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData: NewUser = {
            tenant_id: TENANT_ID,
            username,
            email,
            password: hashedPassword,
            full_name,
            address,
            phone_number
        };

        const newUser = await insertNewUser(userData);

        return {
            data: newUser,
            status: 201
        };
    } catch (err: any) {
        return new InternalServerErrorResponse(err).generate();
    }
};
