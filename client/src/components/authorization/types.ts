export interface IUser {
    id: number;
    email: string;
    password: string;
    fullName: string;
    username: string;
}
export interface IData {
    success: boolean;
    user: IUser;
    message?: string
}