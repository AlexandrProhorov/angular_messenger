import { Injectable } from '@angular/core';
import { Executor, Reducer } from 'src/app/core/mvi/store';
import {
  ChatListResultAction,
  ChatListResultActionTypes,
} from './chat-list-result-action';
import { ChatListState } from './chat-list-state';
import { ChatListAction, ChatListActionTypes } from './chat-list-action';
import { ChatListService } from '../../domain/chat-list-service';
import { ChatState } from '../../domain/model/messenger-chat-state';
import { MessageListService } from '../../../messages/domain/message-list-service';
import { ChatListDataService } from '../../data/chat-list-data-service';

@Injectable({
  providedIn: 'root',
})
export class ChatListExecutor extends Executor<
  ChatListState,
  ChatListAction,
  ChatListResultAction
> {
  constructor(
    private service: ChatListService,
    private dataService: ChatListDataService,
    private messageService: MessageListService,
  ) {
    super();
  }

  override init(
    reducer: Reducer<ChatListState, ChatListResultAction>,
    getState: () => ChatListState,
    onReduced: (state: ChatListState) => void,
  ) {
    super.init(reducer, getState, onReduced);
    this.service.getChats().subscribe((chats) => {
      this.reduce({
        type: ChatListResultActionTypes.UPDATE_CHAT_LIST,
        chats: chats,
      });
    });
  }

  execute(action: ChatListAction) {
    switch (action.type) {
      case ChatListActionTypes.SELECT_CHAT:
        this.selectChat(action.selectedChat);
        break;
      case ChatListActionTypes.FILTER_CHAT_LIST:
        this.filterChat(action.filter);
        break;
      case ChatListActionTypes.MODAL_OPEN:
        this.openChatModal(action.event, action.selectedChat);
        break;
      case ChatListActionTypes.GET_MODAL_SECTION:
        this.getModalSection(action.section);
        break;
      case ChatListActionTypes.MODAL_CLOSE:
        this.closeModal(action.isModalVisible);
        break;
      case ChatListActionTypes.OPEN_CREATE_MENU:
        this.reduce({
          type: ChatListResultActionTypes.OPEN_CREATE_MENU,
          chatCreateMenu: true
        })
        break;
      case ChatListActionTypes.CLOSE_CREATE_MENU:
        this.reduce({
          type: ChatListResultActionTypes.CLOSE_CREATE_MENU,
          chatCreateMenu: false
        })
        break;
      case ChatListActionTypes.CREATE_CHAT:
        this.createChat(action.chat)
    }
  }

  private getModalSection(section: string) {
    if (this.getState().modal?.visibility) {
      switch (section) {
        case 'pin':
          break;
      }
    }
  }

  private selectChat(selectedChat: ChatState) {
    this.getState().chats?.find(
      (chat) => (chat.isSelected = chat === selectedChat),
    );
    this.reduce({
      type: ChatListResultActionTypes.SELECT_CHAT,
      selectedChat: selectedChat,
    });
    this.service.selectChat(selectedChat);
    this.service.fetchChats();
  }

  private createChat(newChat: ChatState) {
    this.service.createChat(newChat)
    this.selectChat(newChat)
    this.reduce({
      type: ChatListResultActionTypes.UPDATE_CHAT_LIST,
      chats: this.dataService.Chats
    })
    this.service.fetchChats()
  }

  private filterChat(data: string) {
    if (data !== this.getState().filter) {
      const filteredChat: ChatState[] =
        this.getState().chats?.filter((chat) =>
          chat.chatEntity.name.toLowerCase().includes(data.toLowerCase()),
        ) || [];
      this.reduce({
        type: ChatListResultActionTypes.FILTER_CHAT_LIST,
        filteredChats: filteredChat,
        filter: data,
      });
    }
  }

  private openChatModal(event: MouseEvent, selectedChat: ChatState | null) {
    event.preventDefault();
    if(selectedChat){
      this.reduce({
        type: ChatListResultActionTypes.MODAL_OPEN,
        modal: this.messageService.modalSettings(event, 'chats', this.getState(), selectedChat?.chatEntity.id),
        selectedChat: selectedChat,
      });
    }
  }

  private closeModal(isModalVisible: boolean) {
    this.reduce({
      type: ChatListResultActionTypes.MODAL_CLOSE,
      modal: this.messageService.closeModal(this.getState(), isModalVisible),
      markedChat: null,
    });
  }

}
