import { MessageState } from "../../../messages/domain/model/message-state";
import { ConversationState } from "../../data/model/conversation-state";
import { sideBarAttachmentsItems } from "./sidebar-state";


export type MessengerSideBarAction = 
  | ShowInfoAction 
  | SendConversationMessageAction
  | OpenModalAction
  | CloseModalAction
  | GetModalSectionAction
  | ReturnToInitStateAction
  | SelectItemAction

export enum MessengerSideBarActionTypes {
  SHOW_INFO,
  SEND_CONVERSATION_MESSAGE,
  MODAL_OPEN,
  MODAL_CLOSE,
  GET_MODAL_SECTION,
  TO_INIT_STATE,
  SELECT_ITEM,
}

export interface ShowInfoAction {
  readonly type: MessengerSideBarActionTypes.SHOW_INFO;
}

export interface SendConversationMessageAction {
  readonly type: MessengerSideBarActionTypes.SEND_CONVERSATION_MESSAGE;
  readonly inputMessage: string;
  readonly chatId: number;
  readonly repliedMessage: MessageState | null;
  readonly conversation: ConversationState | null
}

export interface OpenModalAction {
  readonly type: MessengerSideBarActionTypes.MODAL_OPEN;
  readonly event: MouseEvent;
  readonly selectedMessage: MessageState;
}

export interface CloseModalAction {
  readonly type: MessengerSideBarActionTypes.MODAL_CLOSE;
  readonly isModalVisible: boolean
}

export interface GetModalSectionAction {
  readonly type: MessengerSideBarActionTypes.GET_MODAL_SECTION;
  readonly section: string;
}

export interface ReturnToInitStateAction {
  readonly type: MessengerSideBarActionTypes.TO_INIT_STATE;
}

export interface SelectItemAction {
  readonly type: MessengerSideBarActionTypes.SELECT_ITEM;
  readonly selectedItem: sideBarAttachmentsItems
}