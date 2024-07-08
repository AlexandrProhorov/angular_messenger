import { Injectable } from '@angular/core';
import { Executor, Reducer } from 'src/app/core/mvi/store';
import { MessengerSideBarState, sideBarAttachmentsItems } from './sidebar-state';
import { ChatListService } from '../../../chats/domain/chat-list-service';
import {
  MessengerSideBarResultAction,
  MessengerSideBarResultActionTypes,
} from './sidebar-result-action';
import {
  MessengerSideBarAction,
  MessengerSideBarActionTypes,
} from './sidebar-action';
import { MessengerSideBarService } from '../../domain/sidebar-service';
import { MessageListService } from '../../../messages/domain/message-list-service';
import { MessageState } from '../../../messages/domain/model/message-state';

@Injectable({
  providedIn: 'root',
})
export class MessengerSideBarExecutor extends Executor<
  MessengerSideBarState,
  MessengerSideBarAction,
  MessengerSideBarResultAction
> {
  constructor(
    private service: MessengerSideBarService,
    private chatService: ChatListService,
    private messageService: MessageListService,
  ) {
    super();
  }

  override init(
    reducer: Reducer<MessengerSideBarState, MessengerSideBarResultAction>,
    getState: () => MessengerSideBarState,
    onReduced: (state: MessengerSideBarState) => void,
  ) {
    super.init(reducer, getState, onReduced);
    this.chatService.getChatData().subscribe((chat) => {
      this.reduce({
        type: MessengerSideBarResultActionTypes.SHOW_CHAT,
        actualchat: chat,
      });
      this.service.getMenuData().subscribe((menu) => {
        this.reduce({
          type: MessengerSideBarResultActionTypes.UPDATE_INFO,
          menuState: menu,
        });
      });
    });
  }

  execute(action: MessengerSideBarAction): void {
    switch (action.type) {
      case MessengerSideBarActionTypes.SHOW_INFO:
        this.service.closeMenu();
        break;
      case MessengerSideBarActionTypes.SEND_CONVERSATION_MESSAGE:
        this.messageService.sendMessage(
          action.inputMessage,
          action.chatId,
          action.repliedMessage,
          action.conversation,
          null
        )
        break;
      case MessengerSideBarActionTypes.MODAL_OPEN:
        this.openModal(action.event, action.selectedMessage)
        break;
      case MessengerSideBarActionTypes.MODAL_CLOSE:
        this.closeModal(action.isModalVisible)
        break;
      case MessengerSideBarActionTypes.GET_MODAL_SECTION:
        this.getModalSection(action.section)
        break;
      case MessengerSideBarActionTypes.TO_INIT_STATE:
        this.reduce({
          type: MessengerSideBarResultActionTypes.TO_INIT_STATE,
          selectedItem: sideBarAttachmentsItems.NULL
        })
        break;
      case MessengerSideBarActionTypes.SELECT_ITEM:
        this.getSelectedItem(action.selectedItem)
    }
  }

  private getSelectedItem(section: sideBarAttachmentsItems) {
    this.reduce({
      type: MessengerSideBarResultActionTypes.SELECT_ITEM,
      selectedItem: section
    })
  }

  private getModalSection(section: string) {
    if (this.getState().modal?.visibility) {
      switch (section) {
        case 'copy':
          const content =
            this.getState().selectedMessage?.messageEntity.content;
          if (content) {
            this.messageService.copyMessage(content);
          }
          break;
        case 'delete':    
          this.messageService.deleteMessage(this.getState().selectedMessage)
          break;
      }
    }
  }

  private openModal(event: MouseEvent, selectedMessage: MessageState | null) {
    event.preventDefault();
    if(selectedMessage){
      this.reduce({
        type: MessengerSideBarResultActionTypes.MODAL_OPEN,
        modal: this.messageService.modalSettings(event, 'conversation', this.getState(), selectedMessage.messageEntity.id),
        selectedMessage: selectedMessage,
      });
      console.log(selectedMessage.messageEntity.content, selectedMessage.messageEntity.id)
    }
  }

  private closeModal(isModalVisible: boolean) {
    this.reduce({
      type: MessengerSideBarResultActionTypes.MODAL_CLOSE,
      modal: this.messageService.closeModal(this.getState(), isModalVisible),
      selectedMessage: null,
    });
  }
}
