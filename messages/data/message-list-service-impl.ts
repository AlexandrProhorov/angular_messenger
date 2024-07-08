import { Injectable } from '@angular/core';
import { MessageListService } from '../domain/message-list-service';
import { MessageListDataService } from './message-list-data-service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { MessageState } from '../domain/model/message-state';
import { ChatListService } from '../../chats/domain/chat-list-service';
import { MessageEntity } from '../domain/model/message-entity';
import { Clipboard } from '@angular/cdk/clipboard';
import { ChatListDataService } from '../../chats/data/chat-list-data-service';
import { modalState } from '../domain/model/modal-state';
import { ChatListState } from '../../chats/presentation/state/chat-list-state';
import { MessageListState } from '../presentation/state/message-list-state';
import { MessengerSideBarDataService } from '../../sidebar/data/sidebar-data-service';
import { MessengerSideBarService } from '../../sidebar/domain/sidebar-service';
import { ConversationState } from '../../sidebar/data/model/conversation-state';

@Injectable({
  providedIn: 'root',
})
export class MessageListServiceImpl implements MessageListService {
  private messageListSubject = new BehaviorSubject<MessageState[]>([]);
  constructor(
    private messageListDataService: MessageListDataService,
    private chatListDataService: ChatListDataService,
    private chatListService: ChatListService,
    private clipBoard: Clipboard,
    private sideBarDataService: MessengerSideBarDataService,
    private sideBarService: MessengerSideBarService,
  ) {
    this.fetchMessages();
  }

  getMessages(): Observable<MessageState[]> {
    return this.messageListSubject.asObservable();
  }

  fetchMessages(): void {
    this.messageListSubject.next(this.messageListDataService.Messages);
  }
  showMessages(): Observable<MessageState[]> {
    return this.chatListService.getChats().pipe(
      map((chats) => {
        let date = new Date(2023, 1, 1);
        const today = new Date();
        const chat = chats.find((chat) => chat.isSelected === true);
        const messages = this.messageListSubject.getValue();
        const resultMessages = messages.filter(
          (message) => message.messageEntity.chatId === chat?.chatEntity.id,
        );
        resultMessages.forEach((message) => {
          if (message.messageEntity.senderId !== 'You') {
            message.isChecked = true;
          }
          if(message.inConversation === false) {
            if (
              message.messageEntity.timeStamp.getFullYear() !== date.getFullYear() ||
              message.messageEntity.timeStamp.getMonth() !== date.getMonth() ||
              message.messageEntity.timeStamp.getDate() !== date.getDate()
            ) {
              date = message.messageEntity.timeStamp;
              if (
                message.messageEntity.timeStamp.getDate() === today.getDate() &&
                message.messageEntity.timeStamp.getMonth() === today.getMonth() &&
                message.messageEntity.timeStamp.getFullYear() === today.getFullYear()
              ) {
                message.dateCell = {
                  visibility: true,
                  dateForm: 'сегодня',
                  dateIsDate: false,
                };
              } else {
                message.dateCell = {
                  visibility: true,
                  dateForm: message.messageEntity.timeStamp,
                  dateIsDate: true,
                };
              }
            }
          }
        });
        return resultMessages;
      }),
    );
  }

  sendMessage(
    message: string,
    chatId: number,
    repliedMessage: MessageState | null,
    conversation: ConversationState | null,
    pinedFiles: File[] | null,
  ): void {
    if (message !== '') {
      const foundMessage = this.messageListDataService.Messages.find(
        (message) =>
          message.messageEntity.id === repliedMessage?.messageEntity.id,
      );

      const testMessageEntity: MessageEntity = {
        id: this.messageListDataService.Messages.length + 100,
        content: message,
        senderId: 'You',
        timeStamp: new Date(),
        chatId: chatId,
      };
      let testMessage: MessageState = {
        messageEntity: testMessageEntity,
        isChecked: false,
        isSelected: false,
        isReplied: false,
        repliedContent: null,
        dateCell: {
          visibility: false,
          dateForm: '',
          dateIsDate: false,
        },
        inConversation: false,
        conversationCount: 0,
        pinedFiles: pinedFiles
      };
      if (!conversation){
        if (repliedMessage && foundMessage) {
          foundMessage.isReplied = true;
          testMessage.repliedContent = repliedMessage.messageEntity;
        }
        this.messageListDataService.Messages.push(testMessage);
        this.chatListDataService.Chats.find((chat) => {
          if (chat.chatEntity.id === testMessage.messageEntity.chatId) {
            chat.chatEntity.lastMessage = testMessage;
            const index = this.chatListDataService.Chats.indexOf(chat);
            if (index > -1) {
              this.chatListDataService.Chats.splice(index, 1);
              this.chatListDataService.Chats.unshift(chat);
            }
          }
        });
      }
      else {
        testMessage.inConversation = true
          if(this.sideBarDataService.sideBar.actualConversation){
            testMessage.messageEntity.id = this.sideBarDataService.sideBar.actualConversation.messages.length + 100
          }
        this.sideBarDataService.sideBar.actualConversation?.messages.push(testMessage);
        const conversationMessage = this.messageListDataService.Messages.find(message => 
          (message.messageEntity.id) === this.sideBarDataService.sideBar.actualConversation?.id)
        if(conversationMessage && this.sideBarDataService.sideBar.actualConversation){
          conversationMessage.conversationCount = this.sideBarDataService.sideBar.actualConversation?.messages.length
        }
      }
      this.chatListService.fetchChats();
      this.fetchMessages();
    }
  }

  copyMessage(message: string) {
    if (message) {
      this.clipBoard.copy(message);
    }
  }

  deleteMessage(selectedMessage: MessageState | null): void {
    const actualConversation = this.sideBarDataService.sideBar.actualConversation
    if (selectedMessage) {
      let index: number | null = this.messageListDataService.Messages.findIndex(
        (message) =>
          message.messageEntity.id === selectedMessage.messageEntity.id,
      );
      if(selectedMessage.conversationCount !== 0) {
        const convToDelete = this.sideBarDataService.sideBar.Conversations?.findIndex(el => el.id === selectedMessage.messageEntity.id)

        if(convToDelete !== undefined && this.sideBarDataService.sideBar.Conversations) {          
          this.sideBarDataService.sideBar.Conversations?.splice(convToDelete, 1)
          this.sideBarService.closeMenu()
        }
      }
      if(selectedMessage.messageEntity.id === actualConversation?.messages[0].messageEntity.id){
        actualConversation.messages.length = 0
        this.sideBarService.closeMenu()
      }
      if(selectedMessage.inConversation) {
        const indexInThread = actualConversation?.messages?.findIndex(el => 
          el.messageEntity.id === selectedMessage.messageEntity.id)
        if(indexInThread) {
          actualConversation?.messages.splice(indexInThread, 1)
          const conversationMessage = this.messageListDataService.Messages.find(message => 
            (message.messageEntity.id) === actualConversation?.id)
          if(conversationMessage && actualConversation){
            conversationMessage.conversationCount = actualConversation?.messages.length
          }
          if(conversationMessage?.conversationCount === 1){
            this.sideBarDataService.sideBar.Conversations?.findIndex(el => el.id === actualConversation?.id)
            this.sideBarService.closeMenu()
          }
        }
      }
      if(selectedMessage.inConversation === false && selectedMessage.messageEntity.id !== actualConversation?.messages[0].messageEntity.id) {
        this.messageListDataService.Messages.splice(index, 1)  
      }
      index = null;
    }

    this.chatListDataService.Chats.find((chat) => {
      if (
        selectedMessage &&
        chat.chatEntity.id === selectedMessage.messageEntity.chatId
      ) {
        const actualChatMessages = this.messageListDataService.Messages.filter(
          (val) => val.messageEntity.chatId === chat.chatEntity.id,
        );
        if (actualChatMessages.length === 0) {
          chat.chatEntity.lastMessage = null;
        } else {
          const newLast = actualChatMessages.reduce((max, curr) =>
            curr.messageEntity.timeStamp > max.messageEntity.timeStamp
              ? curr
              : max,
          );
          if(newLast.inConversation === false){
            chat.chatEntity.lastMessage = newLast;
          }
          if(!actualChatMessages.length) {
            chat.chatEntity.lastMessage = null
          }
        }
      }
      if(this.sideBarDataService.sideBar.actualConversation?.messages && 
        this.sideBarDataService.sideBar.actualConversation?.messages.length < 1)
        {
          this.sideBarService.closeMenu()
        }
    });

    this.chatListService.fetchChats();
  }
  modalSettings(
    event: MouseEvent,
    modalType: string,
    state: ChatListState | MessageListState,
    item: number,
  ) {
    let clientY = event.clientY;
    let clientX = event.clientX;
    const modalWidth = 270;
    const modalHeight = modalType === 'messages' ? 300 : 50;
    const chatListWidth = 520;
    const selectedItem =
      state instanceof ChatListState
        ? state.markedChat?.chatEntity.id
        : state.selectedMessage?.messageEntity.id;
    if (clientY + modalHeight > window.innerHeight) {
      clientY = clientY - modalHeight;
    }

    if (
      clientX + modalWidth >
      (modalType === 'messages' ? window.innerWidth : chatListWidth)
    ) {
      clientX = clientX - modalWidth;
    }

    let modalOption: modalState = {
      posX: clientX + 20,
      posY: clientY,
      visibility: true,
    };

    if (state.modal?.visibility === true && item === selectedItem) {
      modalOption.visibility = false;
      return modalOption;
    }
    return modalOption;
  }

  closeModal(
    state: ChatListState | MessageListState,
    visibility: boolean,
  ): modalState {
    if (state.modal) {
      state.modal.visibility = visibility;
      return state.modal;
    } else throw new Error();
  }
}