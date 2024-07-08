import { MessageEntity } from '../../../messages/domain/model/message-entity';
import { MessageState } from '../../../messages/domain/model/message-state';
import { UserEntity } from './messenger-user-entity';

export interface ChatEntity {
  id: number;
  name: string;
  lastMessage: MessageState | null;
  isGroup: boolean;
  users: UserEntity[];
}
