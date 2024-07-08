import { Component } from '@angular/core';
import { ChatListState } from './state/chat-list-state';
import { Store } from 'src/app/core/mvi/store';
import { ChatListAction } from './state/chat-list-action';
import { ChatListActionTypes } from './state/chat-list-action';
import { ChatListReducer } from './state/chat-list-reducer';
import { ChatListExecutor } from './state/chat-list-executor';
import { ChatListResultAction } from './state/chat-list-result-action';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./messenger.component.scss'],
})
export class ChatListComponent extends Store<
  ChatListState,
  ChatListExecutor,
  ChatListAction,
  ChatListResultAction
> {
  constructor(
    state: ChatListState,
    executor: ChatListExecutor,
    reducer: ChatListReducer,
  ) {
    super(state, executor, reducer);
  }
  protected readonly ChatListActionTypes = ChatListActionTypes;
}
