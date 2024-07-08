import { Observable } from 'rxjs';
import { MessageState } from './model/message-state';
import { modalState } from './model/modal-state';
import { MessageListState } from '../presentation/state/message-list-state';
import { ChatListState } from '../../chats/presentation/state/chat-list-state';
import { ConversationState } from '../../sidebar/data/model/conversation-state';
import { MessengerSideBarState } from '../../sidebar/presentation/state/sidebar-state';

export abstract class MessageListService {
  abstract getMessages(): Observable<MessageState[]>;
  abstract showMessages(): Observable<MessageState[]>;
  abstract fetchMessages(): void;
  abstract sendMessage(
    message: string,
    chatId: number,
    repliedMessage: MessageState | null,
    conversation: ConversationState | null,
    pinedFiles: File[] | null
  ): void;
  abstract copyMessage(message: string): void;
  abstract deleteMessage(selectedMessage: MessageState | null): void;
  abstract modalSettings(
    event: MouseEvent,
    modalType: string, 
    state: ChatListState | MessageListState | MessengerSideBarState, 
    item: number
  ): modalState;
  abstract closeModal(state: ChatListState | MessageListState | MessengerSideBarState, visibility: boolean): modalState;
}
