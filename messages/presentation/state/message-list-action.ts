import { ChatEntity } from '../../../chats/domain/model/messenger-chat-entity';
import { MessageState } from '../../domain/model/message-state';
import { UploadMenuState } from './message-list-state';

export type MessageListAction =
  | SelectMessageAction
  | ShowMessagesAction
  | ShowChatAction
  | SendMessageAction
  | UpdateMenuAction
  | OpenMenuAction
  | OpenModalAction
  | CloseModalAction
  | CopyModalAction
  | DeleteModalAction
  | GetModalSectionAction
  | CloseRepliedAction
  | OpenConversation

export enum MessageListActionTypes {
  SELECT_MESSAGE,
  SHOW_MESSAGES,
  SHOW_CHAT,
  SEND_MESSAGE,
  UPDATE_MENU,
  OPEN_MENU,
  MODAL_OPEN,
  MODAL_CLOSE,
  MODAL_COPY,
  MODAL_DELETE,
  GET_MODAL_SECTION,
  CLOSE_REPLY,
  OPEN_CONVERSATION,
}

export interface SelectMessageAction {
  readonly type: MessageListActionTypes.SELECT_MESSAGE;
  readonly selectedMessage: MessageState;
}

export interface ShowMessagesAction {
  readonly type: MessageListActionTypes.SHOW_MESSAGES;
  readonly actualMessages: MessageState[];
}

export interface ShowChatAction {
  readonly type: MessageListActionTypes.SHOW_CHAT;
  readonly actualchat: ChatEntity;
}

export interface SendMessageAction {
  readonly type: MessageListActionTypes.SEND_MESSAGE;
  readonly inputMessage: string;
  readonly chatId: number;
  readonly repliedMessage: MessageState | null;
  readonly pinedFiles: File[] | null
}

export interface UpdateMenuAction {
  readonly type: MessageListActionTypes.UPDATE_MENU;
}

export interface OpenMenuAction {
  readonly type: MessageListActionTypes.OPEN_MENU;
}

export interface OpenModalAction {
  readonly type: MessageListActionTypes.MODAL_OPEN;
  readonly event: MouseEvent;
  readonly selectedMessage: MessageState;
}

export interface CloseModalAction {
  readonly type: MessageListActionTypes.MODAL_CLOSE;
  readonly isModalVisible: boolean
}

export interface CopyModalAction {
  readonly type: MessageListActionTypes.MODAL_COPY;
  readonly message: string | undefined;
}

export interface DeleteModalAction {
  readonly type: MessageListActionTypes.MODAL_DELETE;
  readonly messageToDelete: MessageState
}

export interface GetModalSectionAction {
  readonly type: MessageListActionTypes.GET_MODAL_SECTION;
  readonly section: string;
}

export interface CloseRepliedAction {
  readonly type: MessageListActionTypes.CLOSE_REPLY;
}

export interface OpenConversation {
  readonly type: MessageListActionTypes.OPEN_CONVERSATION;
  readonly selectedMessage: MessageState;
}