import { Observable } from 'rxjs';
import { ChatState } from './model/messenger-chat-state';

export abstract class ChatListService {
  abstract getChats(): Observable<ChatState[]>;
  abstract fetchChats(): void;
  abstract selectChat(chat: ChatState): void;
  abstract getChatData(): Observable<ChatState | null>;
  abstract createChat(chat: ChatState): void;
}
