export type TPasswordChangeHistory = {
    oldPassword: string, date: Date
}

export type TUser = {
    username: string;
    email: string;
    password: string;
    passwordChangedAt: Date;
    passwordChangedHistory: TPasswordChangeHistory[],
    role: 'user' | 'admin'
}