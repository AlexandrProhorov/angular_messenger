import { Injectable } from "@angular/core";
import { UserEntity } from "../../chats/domain/model/messenger-user-entity";

@Injectable({
    providedIn: 'root',
})

export class UsersDataService {
    readonly users: UserEntity[] = [
        { id: 0, name: 'You', isAdmin: false, chats:[0, 1, 2], jobPosition: 'frontend developer', department: 'Отдел Web разработки' },
        { id: 1, name: 'Petya', isAdmin: false, chats:[1, 2], jobPosition: 'frontend developer', department: 'Отдел Web разработки' },
        { id: 2, name: 'User01', isAdmin: false, chats:[1], jobPosition: 'backend developer', department: 'Отдел Web разработки' },
        { id: 3, name: 'User02', isAdmin: false, chats:[0, 2], jobPosition: 'backend developer', department: 'Отдел Web разработки' },
        { id: 4, name: 'User03', isAdmin: false, chats:[2], jobPosition: 'UI/UX designer', department: 'Отдел Web разработки' },
        { id: 5, name: 'User04', isAdmin: false, chats:[2], jobPosition: 'backend developer', department: 'Отдел Web разработки' },
    ]
}