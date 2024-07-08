import { ChatState } from '../../../chats/domain/model/messenger-chat-state';
import { ConversationState } from '../../../sidebar/data/model/conversation-state';
import { MessageState } from '../../domain/model/message-state';
import { modalState } from '../../domain/model/modal-state';

export type MessageListResultAction =
  | UpdateMessageListResultAction
  | ShowMessagesResultAction
  | ShowChatAction
  | SendMessageResultAction
  | ShowMenuResultAction
  | OpenModalResultAction
  | CloseModalResultAction
  | ReplyModalResultAction
  | DeleteModalResultAction
  | CloseRepliedResultAction
  | StartModalConversationResultAction
  | OpenConversation

export enum MessageListResultActionTypes {
  UPDATE_MESSAGE_LIST,
  SHOW_MESSAGES,
  SHOW_CHAT,
  SEND_MESSAGE,
  SHOW_MENU,
  MODAL_OPEN,
  MODAL_CLOSE,
  MODAL_REPLY,
  MODAL_DELETE,
  CLOSE_REPLY,
  MODAL_CONVERSATION,
  OPEN_CONVERSATION,
}

export interface UpdateMessageListResultAction {
  readonly type: MessageListResultActionTypes.UPDATE_MESSAGE_LIST;
  readonly messages: MessageState[];
}

export interface ShowMessagesResultAction {
  readonly type: MessageListResultActionTypes.SHOW_MESSAGES;
  readonly actualMessages: MessageState[];
}

export interface ShowChatAction {
  readonly type: MessageListResultActionTypes.SHOW_CHAT;
  readonly actualchat: ChatState | null;
}

export interface SendMessageResultAction {
  readonly type: MessageListResultActionTypes.SEND_MESSAGE;
  readonly repliedMessage: MessageState | null;
  readonly pinedFiles: File[] | null;
}

export interface ShowMenuResultAction {
  readonly type: MessageListResultActionTypes.SHOW_MENU;
  readonly showMenu: boolean;
}

export interface OpenModalResultAction {
  readonly type: MessageListResultActionTypes.MODAL_OPEN;
  readonly modal: modalState;
  readonly selectedMessage: MessageState | null;
}

export interface CloseModalResultAction {
  readonly type: MessageListResultActionTypes.MODAL_CLOSE;
  readonly modal: modalState | null;
  readonly selectedMessage: null;
}

export interface ReplyModalResultAction {
  readonly type: MessageListResultActionTypes.MODAL_REPLY;
  readonly repliedMessage: MessageState | null;
}

export interface DeleteModalResultAction {
  readonly type: MessageListResultActionTypes.MODAL_DELETE;
}

export interface CloseRepliedResultAction {
  readonly type: MessageListResultActionTypes.CLOSE_REPLY;
}

export interface StartModalConversationResultAction {
  readonly type: MessageListResultActionTypes.MODAL_CONVERSATION;
  readonly showMenu: boolean;
  readonly isConversation: boolean;
  readonly conversationState: ConversationState[] | null;
}

export interface OpenConversation {
  readonly type: MessageListResultActionTypes.OPEN_CONVERSATION;
  readonly selectedMessage: MessageState;
}