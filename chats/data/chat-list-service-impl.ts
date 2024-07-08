import { Injectable } from '@angular/core';
import { ChatListService } from '../domain/chat-list-service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ChatListDataService } from './chat-list-data-service';
import { ChatState } from '../domain/model/messenger-chat-state';
import { MessageListDataService } from '../../messages/data/message-list-data-service';
import { MessageState } from '../../messages/domain/model/message-state';
import { MessengerSideBarDataService } from '../../sidebar/data/sidebar-data-service';
import { MessageListServiceImpl } from '../../messages/data/message-list-service-impl';
import { sideBarAttachmentsItems } from '../../sidebar/presentation/state/sidebar-state';

@Injectable({
  providedIn: 'root',
})
export class ChatListServiceImpl implements ChatListService {
  private chatListSubject = new BehaviorSubject<ChatState[]>([]);
  constructor(
    private chatListDataService: ChatListDataService,
    private messageListDataService: MessageListDataService,
    private sideBarDataService: MessengerSideBarDataService,
    ) {
    this.fetchChats();
  }
  getChats(): BehaviorSubject<ChatState[]> {
    const lastMessagesByChatId: Map<number, MessageState> = new Map();

    this.messageListDataService.Messages.forEach(message => {
      const chatId = message.messageEntity.chatId;
      if (!lastMessagesByChatId.has(chatId) || 
          (message.messageEntity.id > lastMessagesByChatId.get(chatId)!.messageEntity.id) &&
          (message.inConversation === false)) 
        {
          lastMessagesByChatId.set(chatId, message);
        }
    });
    this.chatListDataService.Chats.forEach(chat => {
      let unreadCount: number = 0
      this.messageListDataService.Messages.forEach(message => {
        if(chat.chatEntity.id === message.messageEntity.chatId && 
            !message.isChecked && !message.inConversation && 
            message.messageEntity.senderId !== 'You')
          {
            unreadCount++
          }
      });
      chat.unreadCount = unreadCount
    });
    this.chatListDataService.Chats.forEach(chat => {
      if(lastMessagesByChatId.get(chat.chatEntity.id)?.inConversation !== true){
        const lastMessage = lastMessagesByChatId.get(chat.chatEntity.id);
        if (lastMessage && lastMessage?.inConversation !== true) {
          chat.chatEntity.lastMessage = lastMessage;
        }
      }
    });
  
    return this.chatListSubject;
  }
  
  fetchChats() {
    this.chatListSubject.next(this.chatListDataService.Chats);
  }

  getChatData(): Observable<ChatState | null> {
    return this.getChats().pipe(
      map((chats) => {
        const chat = chats.find((chat) => chat.isSelected === true);
        if (!chat) {
          return null;
        }
        return chat;
      }),
    );
  }

  selectChat(chats: ChatState) {
    const selectedChat = this.chatListDataService.Chats.find(
      (chat) => chat.chatEntity.id === chats.chatEntity.id,
    );

    this.chatListDataService.Chats.forEach((chat) => (chat.isSelected = false));

    if (selectedChat) {
      selectedChat.isSelected = true;
      selectedChat.unreadCount = 0;
      this.sideBarDataService.sideBar.isConversation = false
      this.sideBarDataService.sideBar.selectedItem = sideBarAttachmentsItems.NULL
    }
  }

  createChat(chat: ChatState) { 
    this.chatListDataService.Chats.push(chat)
  }
}
