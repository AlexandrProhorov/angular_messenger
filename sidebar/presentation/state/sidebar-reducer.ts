import { Reducer } from 'src/app/core/mvi/store';
import { Injectable } from '@angular/core';
import { clone } from 'cloneable-ts';
import { MessengerSideBarState, sideBarAttachmentsItems } from './sidebar-state';
import {
  MessengerSideBarResultAction,
  MessengerSideBarResultActionTypes,
} from './sidebar-result-action';

@Injectable({
  providedIn: 'root',
})
export class MessengerSidebarReducer
  implements Reducer<MessengerSideBarState, MessengerSideBarResultAction>
{
  reduce(
    state: MessengerSideBarState,
    action: MessengerSideBarResultAction,
  ): MessengerSideBarState {
    switch (action.type) {
      case MessengerSideBarResultActionTypes.UPDATE_INFO:
        return clone(state, { 
          showChatInfo: action.menuState.isOpen,
          isConversation: action.menuState.isConversation,
          Conversation: action.menuState.Conversations,
          actualConversation: action.menuState.actualConversation
        });
      case MessengerSideBarResultActionTypes.SHOW_CHAT:
        return clone(state, { actualChat: action.actualchat });
      case MessengerSideBarResultActionTypes.SEND_CONVERSATION_MESSAGE:
        return {...state}
      case MessengerSideBarResultActionTypes.MODAL_OPEN:
        return clone(state, { modal: action.modal, selectedMessage: action.selectedMessage})
      case MessengerSideBarResultActionTypes.MODAL_CLOSE:
        return clone(state, {modal: action.modal, selectedMessage: null})
      case MessengerSideBarResultActionTypes.TO_INIT_STATE:
        return {...state, selectedItem: action.selectedItem}
      case MessengerSideBarResultActionTypes.SELECT_ITEM:
        return {...state, selectedItem: action.selectedItem}
    }
  }
}
