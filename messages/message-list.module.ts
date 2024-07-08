import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/core/components/components.module';
import { MessageListComponent } from './presentation/message-list.component';
import { MessageListService } from './domain/message-list-service';
import { MessageListServiceImpl } from './data/message-list-service-impl';
import {
  SvgPaperClip,
  SvgPaperPlane,
  SvgChevronForward,
  SvgXMark,
  SvgReply,
  SvgArrowDown,
  SvgBubbleRight,
} from 'src/app/core/components/svg-components/svg.components';
import { MessengerSideBarModule } from '../sidebar/sidebar.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    SvgPaperClip,
    SvgPaperPlane,
    SvgChevronForward,
    MessengerSideBarModule,
    SvgXMark,
    SvgReply,
    SvgArrowDown,
    SvgBubbleRight,
  ],
  declarations: [MessageListComponent],
  providers: [
    {
      provide: MessageListService, 
      useClass: MessageListServiceImpl,
    },
  ],
  exports: [MessageListComponent],
})
export class MessageListModule {}
