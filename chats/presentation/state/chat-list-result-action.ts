import { modalState } from '../../../messages/domain/model/modal-state';
import { ChatState } from '../../domain/model/messenger-chat-state';

export type ChatListResultAction =
  | SelectChatResultAction
  | UpdateChatListResultAction
  | FilterChatListResultAction
  | OpenModalResultAction
  | CloseModalResultAction
  | OpenChatCreateMenuResultAction
  | CloseChatCreateMenuResultAction
  | CreateChatResultAction

export enum ChatListResultActionTypes {
  SELECT_CHAT,
  UPDATE_CHAT_LIST,
  FILTER_CHAT_LIST,
  MODAL_OPEN,
  MODAL_CLOSE,
  OPEN_CREATE_MENU,
  CLOSE_CREATE_MENU,
  CREATE_CHAT,
}

export interface UpdateChatListResultAction {
  readonly type: ChatListResultActionTypes.UPDATE_CHAT_LIST;
  readonly chats: ChatState[];
}

export interface SelectChatResultAction {
  readonly type: ChatListResultActionTypes.SELECT_CHAT;
  readonly selectedChat: ChatState;
}

export interface FilterChatListResultAction {
  readonly type: ChatListResultActionTypes.FILTER_CHAT_LIST;
  readonly filteredChats: ChatState[] | null;
  readonly filter: string;
}

export interface OpenModalResultAction {
  readonly type: ChatListResultActionTypes.MODAL_OPEN;
  readonly modal: modalState;
  readonly selectedChat: ChatState | null;
}

export interface CloseModalResultAction {
  readonly type: ChatListResultActionTypes.MODAL_CLOSE;
  readonly modal: modalState | null
  readonly markedChat: null
}

export interface OpenChatCreateMenuResultAction {
  readonly type: ChatListResultActionTypes.OPEN_CREATE_MENU;
  readonly chatCreateMenu: boolean
}

export interface CloseChatCreateMenuResultAction {
  readonly type: ChatListResultActionTypes.CLOSE_CREATE_MENU;
  readonly chatCreateMenu: boolean
}

export interface CreateChatResultAction {
  readonly type: ChatListResultActionTypes.CREATE_CHAT;
}