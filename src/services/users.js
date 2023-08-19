import fs from 'fs';
import path from 'path';
import { compare, hash } from 'bcryptjs';

const filePath = path.join(process.cwd(), "src", "data", "users.json");

export function getAll () {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

export function getById (id) {
    const data = getAll();
    return data.find(p => p.id === Number(id));
}

export function getByEmail (email) {
    const data = getAll();
    return data.find(p => p.email.toLowerCase() === email.toLowerCase());
}

export async function verifyPassword (hashedPassword, password) {
    const isValid = await compare(password, hashedPassword);
    return isValid;
}

export async function changePassword (email, oldPassword, newPassword) {
    const user = getByEmail(email);
    if (!user) {
        throw new Error("User not found.");
    }
    const isValid = await verifyPassword(user.password, oldPassword);
    if (!isValid) {
        throw new Error("Old password is incorrect.");
    }
    const hashedPassword = await hash(newPassword, 12);
    user.password = hashedPassword;
    const data = getAll();
    const index = data.findIndex(p => p.id === user.id);
    data[index] = user;
    fs.writeFileSync(filePath, JSON.stringify(data));
}

export async function save (email, password, firstName, lastName) {
    const found = getByEmail(email);
    if (found) {
        throw new Error("User already exist.");
    }
    const data = getAll();
    const hashedPassword = await hash(password, 12);
    data.push({
        id: data.length + 1,
        email,
        firstName,
        lastName,
        password: hashedPassword
    });
    fs.writeFileSync(filePath, JSON.stringify(data));
}