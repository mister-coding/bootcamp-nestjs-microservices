import { Observable } from "rxjs";

export enum UserLevel {
    ADMIN = 0,
    MEMBER = 1,
}


export interface UserEmail {
    email: string;
}


export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    avatar: string;
    avatar_media_id: string;
    user_level: UserLevel;
    created_at: string;
    updated_at: string;
}

export interface UserService {
    FindByEmail(request: UserEmail): Observable<User>;
}
