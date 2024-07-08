import { Reducer } from 'src/app/core/mvi/store';
import { MessageListState } from './message-list-state';
import {
  MessageListResultAction,
  MessageListResultActionTypes,
} from './message-list-result-action';
import { Injectable } from '@angular/core';
import { clone } from 'cloneable-ts';

@Injectable({
  providedIn: 'root',
})
export class MessageListReducer
  implements Reducer<MessageListState, MessageListResultAction>
{
  reduce(
    state: MessageListState,
    action: MessageListResultAction,
  ): MessageListState {
    switch (action.type) {
      case MessageListResultActionTypes.UPDATE_MESSAGE_LIST:
        return clone(state, {
          messages: action.messages.map((val) => {
            return {
              messageEntity: val.messageEntity,
              isSelected: val.isSelected,
              isChecked: val.isChecked,
              isReplied: val.isReplied,
              repliedContent: val.repliedContent,
              dateCell: val.dateCell,
              inConversation: val.inConversation,
              conversationCount: val.conversationCount,
              pinedFiles: val.pinedFiles,
            };
          }),
        });
      case MessageListResultActionTypes.SHOW_MESSAGES:
        return clone(state, { actualMessages: action.actualMessages });
      case MessageListResultActionTypes.SHOW_CHAT:
        return clone(state, { actualChat: action.actualchat });
      case MessageListResultActionTypes.SEND_MESSAGE:
        return { ...state, repliedMessage: null};
      case MessageListResultActionTypes.SHOW_MENU:
        return clone(state, { showMenu: action.showMenu });
      case MessageListResultActionTypes.MODAL_OPEN:
        return clone(state, {
          modal: action.modal,
          selectedMessage: action.selectedMessage,
        });
      case MessageListResultActionTypes.MODAL_CLOSE:
        return clone(state, { selectedMessage: null });
      case MessageListResultActionTypes.MODAL_REPLY:
        return clone(state, { repliedMessage: action.repliedMessage });
      case MessageListResultActionTypes.MODAL_DELETE:
        return clone(state)
      case MessageListResultActionTypes.CLOSE_REPLY:
        return { ...state, repliedMessage: null };
      case MessageListResultActionTypes.MODAL_CONVERSATION:
        return clone(state, { showMenu: action.showMenu });
      case MessageListResultActionTypes.OPEN_CONVERSATION:
        return { ...state, selectedMessage: action.selectedMessage}
    }
  }
}
