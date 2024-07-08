import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Store } from 'src/app/core/mvi/store';
import { MessageListState } from './state/message-list-state';
import { MessageListExecutor } from './state/message-list-executor';
import {
  MessageListAction,
  MessageListActionTypes,
} from './state/message-list-action';
import { MessageListResultAction } from './state/message-list-result-action';
import { MessageListReducer } from './state/message-list-reducer';
import { MessageState } from '../domain/model/message-state';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent extends Store<
  MessageListState,
  MessageListExecutor,
  MessageListAction,
  MessageListResultAction
> {
  constructor(
    state: MessageListState,
    executor: MessageListExecutor,
    reducer: MessageListReducer,
  ) {
    super(state, executor, reducer);
  }
  protected readonly MessageListActionTypes = MessageListActionTypes;
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

  @ViewChild('fileInput') fileInput: any;
  pinedFiles: File[] | null = null

  openFileDialog() {
    this.fileInput.nativeElement.click();
  }
  outputFiles: File[] = []
  onFileSelected(event: any) {
    const file: File = event.target.files[0]
    this.outputFiles.push(file)
    this.pinedFiles = this.outputFiles
  }

  getUploadedFiles(event: any) {
    if(this.pinedFiles){
      this.pinedFiles?.concat(event)
    }
  }
}
