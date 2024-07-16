export enum PasswordType {
    Email = 0,
    Site
}

export const PasswordTypes = Object.values(PasswordType)
    .filter(value => typeof value === 'number')
    .map(value =>  value as PasswordType);

export const PasswordTypeLabels: Record<PasswordType, string> = {
    [PasswordType.Email]: "Email",
    [PasswordType.Site]: "Site"
};