import { PasswordType } from "./passwors-type.enum";

export interface CreatePassword {
    name: string,
    value: string,
    purpose: PasswordType
}