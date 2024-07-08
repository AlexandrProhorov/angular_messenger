import { Injectable } from '@angular/core';
import { sideBarState } from './model/sidebar-state';
import { sideBarAttachmentsItems } from '../presentation/state/sidebar-state';

@Injectable({
  providedIn: 'root',
})
export class MessengerSideBarDataService {
  sideBar: sideBarState = {
    isOpen: false,
    isConversation: false,
    Conversations: null,
    actualConversation: null,
    selectedItem: sideBarAttachmentsItems.NULL
  }
}