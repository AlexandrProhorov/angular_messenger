import { DateState } from './date-state';
import { MessageEntity } from './message-entity';

export interface MessageState {
  messageEntity: MessageEntity;
  isSelected: boolean;
  isChecked: boolean;
  isReplied: boolean;
  repliedContent: MessageEntity | null;
  dateCell: DateState;
  inConversation: boolean;
  conversationCount: number;
  pinedFiles: File[] | null;
}