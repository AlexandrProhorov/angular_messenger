import { ChatState } from '../../domain/model/messenger-chat-state';
import { UserEntity } from '../../domain/model/messenger-user-entity';

export type ChatListAction = SelectChatAction
 | FilterChatAction
 | OpenModalAction
 | GetModalSectionAction
 | CloseModalAction
 | OpenChatCreateMenuAction
 | CloseChatCreateMenuAction
 | CreateChatAction

export enum ChatListActionTypes {
  SELECT_CHAT,
  FILTER_CHAT_LIST,
  MODAL_OPEN,
  MODAL_CLOSE,
  GET_MODAL_SECTION,
  OPEN_CREATE_MENU,
  CLOSE_CREATE_MENU,
  CREATE_CHAT,
}

export interface SelectChatAction {
  readonly type: ChatListActionTypes.SELECT_CHAT;
  readonly selectedChat: ChatState;
}

export interface FilterChatAction {
  readonly type: ChatListActionTypes.FILTER_CHAT_LIST;
  readonly filter: string;
}

export interface OpenModalAction {
  readonly type: ChatListActionTypes.MODAL_OPEN;
  readonly event: MouseEvent;
  readonly selectedChat: ChatState;
}

export interface CloseModalAction {
  readonly type: ChatListActionTypes.MODAL_CLOSE;
  readonly isModalVisible: boolean
}

export interface GetModalSectionAction {
  readonly type: ChatListActionTypes.GET_MODAL_SECTION;
  readonly section: string;
}

export interface OpenChatCreateMenuAction {
  readonly type: ChatListActionTypes.OPEN_CREATE_MENU;
}

export interface CloseChatCreateMenuAction {
  readonly type: ChatListActionTypes.CLOSE_CREATE_MENU;
}

export interface CreateChatAction {
  readonly type: ChatListActionTypes.CREATE_CHAT;
  readonly chat: ChatState;
}