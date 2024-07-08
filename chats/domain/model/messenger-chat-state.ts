import { ChatEntity } from './messenger-chat-entity';

export interface ChatState {
  chatEntity: ChatEntity;
  isSelected: boolean;
  unreadCount: number;
}
