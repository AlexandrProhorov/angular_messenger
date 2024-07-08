import { NgModule } from '@angular/core';
import { ChatListModule } from './chats/chat-list.module';
import { MessageListModule } from './messages/message-list.module';
import { MessengerComponent } from './presentation/view/messenger.component';

@NgModule({
  imports: [ChatListModule, MessageListModule],
  declarations: [MessengerComponent],
})
export class MessengerModule {}
