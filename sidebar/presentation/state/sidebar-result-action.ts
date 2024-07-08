import { ChatState } from '../../../chats/domain/model/messenger-chat-state';
import { MessageState } from '../../../messages/domain/model/message-state';
import { modalState } from '../../../messages/domain/model/modal-state';
import { sideBarState } from '../../data/model/sidebar-state';
import { sideBarAttachmentsItems } from './sidebar-state';

export type MessengerSideBarResultAction =
  | UpdateInfoResultAction
  | ShowChatResultAction
  | SendConversationMessageResultAction
  | OpenModalResultAction
  | CloseModalResultAction
  | ReturnToInitStateResultAction
  | SelectItemResultAction

export enum MessengerSideBarResultActionTypes {
  UPDATE_INFO,
  SHOW_CHAT,
  SEND_CONVERSATION_MESSAGE,
  MODAL_OPEN,
  MODAL_CLOSE,
  TO_INIT_STATE,
  SELECT_ITEM,
}

export interface UpdateInfoResultAction {
  readonly type: MessengerSideBarResultActionTypes.UPDATE_INFO;
  readonly menuState: sideBarState;
}

export interface ShowChatResultAction {
  readonly type: MessengerSideBarResultActionTypes.SHOW_CHAT;
  readonly actualchat: ChatState | null;
}

export interface SendConversationMessageResultAction {
  readonly type: MessengerSideBarResultActionTypes.SEND_CONVERSATION_MESSAGE;
}

export interface OpenModalResultAction {
  readonly type: MessengerSideBarResultActionTypes.MODAL_OPEN;
  readonly modal: modalState;
  readonly selectedMessage: MessageState | null;
}

export interface CloseModalResultAction {
  readonly type: MessengerSideBarResultActionTypes.MODAL_CLOSE;
  readonly modal: modalState | null;
  readonly selectedMessage: null;
}

export interface ReturnToInitStateResultAction {
  readonly type: MessengerSideBarResultActionTypes.TO_INIT_STATE;
  readonly selectedItem: sideBarAttachmentsItems;
}

export interface SelectItemResultAction {
  readonly type: MessengerSideBarResultActionTypes.SELECT_ITEM;
  readonly selectedItem: sideBarAttachmentsItems;
}
