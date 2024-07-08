import { Reducer } from 'src/app/core/mvi/store';
import { ChatListState } from './chat-list-state';
import {
  ChatListResultAction,
  ChatListResultActionTypes,
} from './chat-list-result-action';
import { Injectable } from '@angular/core';
import { clone } from 'cloneable-ts';

@Injectable({
  providedIn: 'root',
})
export class ChatListReducer
  implements Reducer<ChatListState, ChatListResultAction>
{
  reduce(state: ChatListState, action: ChatListResultAction): ChatListState {
    switch (action.type) {
      case ChatListResultActionTypes.UPDATE_CHAT_LIST:
        return clone(state, {
          chats: action.chats.map((val) => {
            return {
              chatEntity: val.chatEntity,
              isSelected: val.isSelected,
              unreadCount: val.unreadCount,
            };
          }),
        });
      case ChatListResultActionTypes.SELECT_CHAT:
        return clone(state, { selectedChat: action.selectedChat });
      case ChatListResultActionTypes.FILTER_CHAT_LIST:
        return clone(state, { filteredChats: action.filteredChats });
      case ChatListResultActionTypes.MODAL_OPEN:
        return clone(state, {
          modal: action.modal,
          markedChat: action.selectedChat,
        });
      case ChatListResultActionTypes.MODAL_CLOSE:
        return clone(state, {
          modal: action.modal,
          markedChat: null
        })
      case ChatListResultActionTypes.OPEN_CREATE_MENU:
        return clone(state, { chatCreateMenu: true })
      case ChatListResultActionTypes.CLOSE_CREATE_MENU:
        return clone(state, { chatCreateMenu: false })
      case ChatListResultActionTypes.CREATE_CHAT:
        return clone(state)
    }
  }
}
