import { Injectable } from '@angular/core';
import { MessageState } from '../domain/model/message-state';
import { DateState } from '../domain/model/date-state';

@Injectable({
  providedIn: 'root',
})
export class MessageListDataService {
  readonly Messages: MessageState[] = [
    {
      messageEntity: {
        id: 0,
        content: 'jjjjjjjjjj',
        senderId: 'User01',
        timeStamp: randomDate,
        chatId: 2,
      },
      isChecked: false,
      isSelected: false,
      isReplied: false,
      repliedContent: null,
      dateCell: dateCell,
      inConversation: false,
      conversationCount: 0,
      pinedFiles: null,
    },
    {
      messageEntity: {
        id: 1,
        content: 'hi this message belongs to second chat',
        senderId: 'User01',
        timeStamp: randomDate,
        chatId: 1,
      },
      isChecked: false,
      isSelected: false,
      isReplied: false,
      repliedContent: null,
      dateCell: dateCell,
      inConversation: false,
      conversationCount: 0,
      pinedFiles: null,
    },
    {
      messageEntity: {
        id: 2,
        content: 'hi this is the message from third chat(1)',
        senderId: 'User03',
        timeStamp: newerDate,
        chatId: 2,
      },
      isChecked: false,
      isSelected: false,
      isReplied: false,
      repliedContent: null,
      dateCell: dateCell,
      inConversation: false,
      conversationCount: 0,
      pinedFiles: null,
    },
    {
      messageEntity: {
        id: 3,
        content: 'hi this is the message from third chat(2)',
        senderId: 'User03',
        timeStamp: newerDate,
        chatId: 2,
      },
      isChecked: false,
      isSelected: false,
      isReplied: false,
      repliedContent: null,
      dateCell: dateCell,
      inConversation: false,
      conversationCount: 0,
      pinedFiles: null,
    },
    {
      messageEntity: {
        id: 4,
        content: 'hi this is the message from third chat(3)',
        senderId: 'User03',
        timeStamp: newerDate,
        chatId: 2,
      },
      isChecked: false,
      isSelected: false,
      isReplied: false,
      repliedContent: null,
      dateCell: dateCell,
      inConversation: false,
      conversationCount: 0,
      pinedFiles: null,
    },
    {
      messageEntity: {
        id: 5,
        content: 'hi this message was sended in first chat',
        senderId: 'Petya',
        timeStamp: randomDate,
        chatId: 0,
      },
      isChecked: true,
      isSelected: false,
      isReplied: false,
      repliedContent: null,
      dateCell: dateCell,
      inConversation: false,
      conversationCount: 0,
      pinedFiles: null,
    },
    {
      messageEntity: {
        id: 6,
        content: 'Прочитано',
        senderId: 'You',
        timeStamp: newerDate,
        chatId: 0,
      },
      isChecked: true,
      isSelected: false,
      isReplied: false,
      repliedContent: null,
      dateCell: dateCell,
      inConversation: false,
      conversationCount: 0,
      pinedFiles: null,
    },
  ];
}
const dateCell: DateState = {
  visibility: false,
  dateForm: '',
  dateIsDate: false
}
const randomDate = new Date(2024, 1, 23);
const newerDate = new Date(2024, 1, 24);