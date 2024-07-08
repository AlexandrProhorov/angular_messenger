import { Injectable } from '@angular/core';
import { UserEntity } from '../../domain/model/messenger-user-entity';
import { ChatState } from '../../domain/model/messenger-chat-state';
import { modalState } from '../../../messages/domain/model/modal-state';

@Injectable({
  providedIn: 'root',
})
export class ChatListState {
  readonly chats: ChatState[] | null = null;
  readonly users: UserEntity[] | null = null;
  readonly selectedChat: ChatState | null = null;
  readonly markedChat: ChatState | null = null;
  readonly filteredChats: ChatState[] | null = null;
  readonly filter: string | null = null;
  readonly modal: modalState | null = null;
  chatCreateMenu: boolean = false
}
