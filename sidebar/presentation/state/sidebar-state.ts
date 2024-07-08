import { Injectable } from '@angular/core';
import { ChatState } from '../../../chats/domain/model/messenger-chat-state';
import { ConversationState } from '../../data/model/conversation-state';
import { modalState } from '../../../messages/domain/model/modal-state';
import { MessageState } from '../../../messages/domain/model/message-state';

@Injectable({
  providedIn: 'root',
})
export class MessengerSideBarState {
  readonly actualChat: ChatState | null = null;
  readonly Conversation: ConversationState[] | null = null;
  readonly actualConversation: ConversationState | null = null;
  readonly modal: modalState | null = null;
  readonly selectedMessage: MessageState | null = null;
  readonly sideBarAttachments: sideBarAttachmentsState | null = null
  readonly selectedItem: sideBarAttachmentsItems = sideBarAttachmentsItems.NULL
  showChatInfo: boolean = false;
  isConversation: boolean = false;
}

export enum sideBarAttachmentsItems {
  IMAGES,
  FILES,
  VIDEOS,
  LINKS,
  NULL,
}

export interface sideBarAttachmentsState {
  chatId: number,
  images: File[],
  files: File[],
  videos: File[],
  links: File[],
}