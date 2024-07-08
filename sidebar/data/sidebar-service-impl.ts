import { Injectable } from '@angular/core';
import { MessengerSideBarService } from '../domain/sidebar-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessengerSideBarDataService } from './sidebar-data-service';
import { MessageState } from '../../messages/domain/model/message-state';
import { ConversationState } from './model/conversation-state';
import { sideBarState } from './model/sidebar-state';

const dataService = new MessengerSideBarDataService()
const initialState: sideBarState = dataService.sideBar
@Injectable({
  providedIn: 'root',
})
export class MessengerSideBarServiceImpl implements MessengerSideBarService {

  menuState = new BehaviorSubject<sideBarState>(initialState);
  constructor(
    private messengerSideBarDataService: MessengerSideBarDataService,
  ) {
    this.fetchMenuData();
  }

  getMenuData(): Observable<sideBarState> {
    return this.menuState.asObservable();
  }

  fetchMenuData(): void {
    this.menuState.next(this.messengerSideBarDataService.sideBar);
  }

  openMenu(): void {
    this.messengerSideBarDataService.sideBar.isOpen = true;
    this.messengerSideBarDataService.sideBar.isConversation = false;
    this.fetchMenuData();
  }

  closeMenu(): void {
    this.messengerSideBarDataService.sideBar.isOpen = false;
    this.fetchMenuData();
  }

  openConversation(message: MessageState) {
    let sideBar = this.messengerSideBarDataService.sideBar;
    if(!sideBar.isOpen){
      sideBar.isOpen = true;
    }
    sideBar.isConversation = true;
    
    if (!sideBar.Conversations || sideBar.Conversations.length === 0) {
      sideBar.Conversations = [];
    }
    if(sideBar.Conversations) {
      const existingConversation = sideBar.Conversations.find(conversation => conversation.id === message.messageEntity.id);

      if (!existingConversation) {
          const newConversation: ConversationState = {
              id: message.messageEntity.id,
              messages: [message]
          };
          sideBar.Conversations.push(newConversation);
          sideBar.actualConversation = newConversation;
      } else {
          sideBar.actualConversation = existingConversation;
      }
    }
    this.fetchMenuData();

  }
}
