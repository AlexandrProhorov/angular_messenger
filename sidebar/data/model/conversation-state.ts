import { MessageState } from "../../../messages/domain/model/message-state"

export interface ConversationState {
    id: number
    messages: MessageState[]
  }