import { Injectable } from '@angular/core';
import { Executor, Reducer } from 'src/app/core/mvi/store';
import { MessageListState } from './message-list-state';
import {
  MessageListResultAction,
  MessageListResultActionTypes,
} from './message-list-result-action';
import { MessageListService } from '../../domain/message-list-service';
import {
  MessageListAction,
  MessageListActionTypes,
} from './message-list-action';
import { ChatListService } from '../../../chats/domain/chat-list-service';
import { MessengerSideBarService } from '../../../sidebar/domain/sidebar-service';
import { MessageState } from '../../domain/model/message-state';

@Injectable({
  providedIn: 'root',
})
export class MessageListExecutor extends Executor<
  MessageListState,
  MessageListAction,
  MessageListResultAction
> {
  constructor(
    private service: MessageListService,
    private chatService: ChatListService,
    private sideBarService: MessengerSideBarService,

  ) {
    super();
  }

  getMessageState() {
    return this.getState();
  }

  override init(
    reducer: Reducer<MessageListState, MessageListResultAction>,
    getState: () => MessageListState,
    onReduced: (state: MessageListState) => void,
  ) {
    super.init(reducer, getState, onReduced);
    this.service.getMessages().subscribe((messages) => {
      this.reduce({
        type: MessageListResultActionTypes.UPDATE_MESSAGE_LIST,
        messages: messages,
      });
    });
    this.service.showMessages().subscribe((messages) => {
      this.reduce({
        type: MessageListResultActionTypes.SHOW_MESSAGES,
        actualMessages: messages,
      });
    });
    this.chatService.getChatData().subscribe((chat) => {
      this.reduce({
        type: MessageListResultActionTypes.SHOW_CHAT,
        actualchat: chat,
      });
    });
    this.sideBarService.getMenuData().subscribe((menu) => {
      this.reduce({
        type: MessageListResultActionTypes.SHOW_MENU,
        showMenu: menu.isOpen,
      });
    });
  }
  execute(action: MessageListAction) {
    switch (action.type) {
      case MessageListActionTypes.SEND_MESSAGE:
        this.service.sendMessage(
          action.inputMessage,
          action.chatId,
          action.repliedMessage,
          null,
          action.pinedFiles,
        );
        this.reduce({
          type: MessageListResultActionTypes.SEND_MESSAGE,
          repliedMessage: null,
          pinedFiles: action.pinedFiles
        });
        break;
      case MessageListActionTypes.OPEN_MENU:
        this.sideBarService.openMenu();
        break;
      case MessageListActionTypes.MODAL_OPEN:
        this.openModal(action.event, action.selectedMessage);
        break;
      case MessageListActionTypes.MODAL_CLOSE:
        this.closeModal(action.isModalVisible);
        break;
      case MessageListActionTypes.GET_MODAL_SECTION:
        this.getModalSection(action.section);
        break;
      case MessageListActionTypes.CLOSE_REPLY:
        this.reduce({
          type: MessageListResultActionTypes.CLOSE_REPLY
        })
        break;
      case MessageListActionTypes.OPEN_CONVERSATION:
        this.openConversation(action.selectedMessage)
        break;
    }
  }

  private getModalSection(section: string) {
    if (this.getState().modal?.visibility) {
      switch (section) {
        case 'reply':
          this.replyModal();
          break;
        case 'copy':
          const content =
            this.getState().selectedMessage?.messageEntity.content;
          if (content) {
            this.service.copyMessage(content);
          }
          break;
        case 'delete':    
          this.service.deleteMessage(this.getState().selectedMessage)
          break;
        case 'discuss':
          const message = 
          this.getState().selectedMessage
          if(message){
            this.sideBarService.openConversation(message)
          }
          break;
      }
    }
  }

  private openModal(event: MouseEvent, selectedMessage: MessageState | null) {
    event.preventDefault();
    if(selectedMessage){
      this.reduce({
        type: MessageListResultActionTypes.MODAL_OPEN,
        modal: this.service.modalSettings(event, 'messages', this.getState(), selectedMessage.messageEntity.id),
        selectedMessage: selectedMessage,
      });
    }
  }

  private closeModal(isModalVisible: boolean) {
    this.reduce({
      type: MessageListResultActionTypes.MODAL_CLOSE,
      modal: this.service.closeModal(this.getState(), isModalVisible),
      selectedMessage: null,
    });
  }

  private replyModal() {
    const message = this.getState().selectedMessage;
    this.reduce({
      type: MessageListResultActionTypes.MODAL_REPLY,
      repliedMessage: message,
    });
  }

  private openConversation(selectedMessage: MessageState) {
    this.sideBarService.openConversation(selectedMessage)
    this.reduce({
      type: MessageListResultActionTypes.OPEN_CONVERSATION,
      selectedMessage: selectedMessage
    });
  }
}
