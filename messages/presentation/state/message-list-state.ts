import { Injectable } from '@angular/core';
import { MessageState } from '../../domain/model/message-state';
import { ChatState } from '../../../chats/domain/model/messenger-chat-state';
import { modalState } from '../../domain/model/modal-state';

@Injectable({
  providedIn: 'root',
})
export class MessageListState {
  readonly messages: MessageState[] | null = null;
  readonly actualMessages: MessageState[] | null = null;
  readonly actualChat: ChatState | null = null;
  readonly selectedMessage: MessageState | null = null;
  readonly modal: modalState | null = null;
  readonly repliedMessage: MessageState | null = null;
  readonly uploadMenu: UploadMenuState | null = null;
  showMenu: boolean = false;
  showtoast: boolean = false;
  showUploadMenu: boolean = false
}

export interface UploadMenuState {
  filesToUpload: File[]
}