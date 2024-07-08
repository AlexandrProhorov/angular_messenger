import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Store } from 'src/app/core/mvi/store';
import { MessengerSideBarState, sideBarAttachmentsItems } from './state/sidebar-state';
import { MessengerSidebarReducer } from './state/sidebar-reducer';
import {
  MessengerSideBarAction,
  MessengerSideBarActionTypes,
} from './state/sidebar-action';
import { MessengerSideBarExecutor } from './state/sidebar-executor';
import { MessengerSideBarResultAction } from './state/sidebar-result-action';
import { MessageState } from '../../messages/domain/model/message-state';
import { MessageListActionTypes } from '../../messages/presentation/state/message-list-action';

@Component({
  selector: 'app-messenger-menu',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../../messages/presentation/message-list.component.scss']
})
export class MessengerSideBarComponent extends Store<
  MessengerSideBarState,
  MessengerSideBarExecutor,
  MessengerSideBarAction,
  MessengerSideBarResultAction
> {
  constructor(
    state: MessengerSideBarState,
    executor: MessengerSideBarExecutor,
    reducer: MessengerSidebarReducer,
  ) {
    super(state, executor, reducer);
  }
  protected readonly MessengerSideBarActionTypes = MessengerSideBarActionTypes;
  protected readonly MessageListActionTypes = MessageListActionTypes;
  protected selectedItem = sideBarAttachmentsItems;

  protected itemNames = {
    [sideBarAttachmentsItems.IMAGES]: 'Фотографии',
    [sideBarAttachmentsItems.FILES]: 'Файлы',
    [sideBarAttachmentsItems.VIDEOS]: 'Видео',
    [sideBarAttachmentsItems.LINKS]: 'Ссылки',
  };
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  @ViewChildren('messages') messages!: QueryList<MessageState>;
  private prevMessagesLength: any;
  ngAfterViewInit() {
    this.prevMessagesLength = this.messages.length
    this.messages.changes.subscribe(() => {
    if (this.messages.length !== this.prevMessagesLength) {
      this.scrollToBottom();
      this.prevMessagesLength = this.messages.length;
    }
  });
  }
  scrollToBottom() {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
