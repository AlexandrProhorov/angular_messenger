import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatListComponent } from './presentation/chat-list.component';
import { ComponentsModule } from 'src/app/core/components/components.module';
import {
  SvgPaperPlane,
  SvgSquareAndPencil,
  SvgPaperClip,
  SvgChevronForward,
  SvgXMark,
  SvgSearch,
  SvgArrowRight,
  SvgLink,
  SvgDocText,
  SvgCamera,
  SvgVideo,
  SvgCheckmarkChecked,
  SvgCheckmarkSended,
} from 'src/app/core/components/svg-components/svg.components';
import { ChatListService } from './domain/chat-list-service';
import { ChatListServiceImpl } from './data/chat-list-service-impl';
import { MessageListModule } from '../messages/message-list.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    MessageListModule,
    SvgSquareAndPencil,
    SvgPaperPlane,
    SvgPaperClip,
    SvgChevronForward,
    SvgXMark,
    SvgSearch,
    SvgArrowRight,
    SvgLink,
    SvgDocText,
    SvgCamera,
    SvgVideo,
    SvgCheckmarkChecked,
    SvgCheckmarkSended,
  ],
  declarations: [ChatListComponent],
  providers: [
    {
      provide: ChatListService,
      useClass: ChatListServiceImpl,
    },
  ],
  exports: [ChatListComponent],
})
export class ChatListModule {}
