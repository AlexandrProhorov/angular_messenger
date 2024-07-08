import { Injectable } from '@angular/core';
import { ChatState } from '../domain/model/messenger-chat-state';
import { UsersDataService } from '../../users/data/users-data-service';

@Injectable({
  providedIn: 'root',
})
export class ChatListDataService {
  readonly Chats: ChatState[] = [
    {
      chatEntity: {
        id: 0,
        name: 'Petya',
        lastMessage: null,
        isGroup: false,
        users: [users.users[1]],
      },
      isSelected: false,
      unreadCount: 0,
    },
    {
      chatEntity: {
        id: 1,
        name: 'Групповой1',
        lastMessage: null,
        isGroup: true,
        users: [
          users.users[2],
          users.users[0],
        ],
      },
      isSelected: false,
      unreadCount: 0,
    },
    {
      chatEntity: {
        id: 2,
        name: 'Групповой2',
        lastMessage: null,
        isGroup: true,
        users: [
          users.users[2],
          users.users[3],
          users.users[4],
          users.users[0],
        ],
      },
      isSelected: false,
      unreadCount: 0,
    },
  ];
}

const users = new UsersDataService()