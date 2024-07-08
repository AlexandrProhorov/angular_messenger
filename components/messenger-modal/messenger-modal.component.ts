import { Component, Output, Input, EventEmitter, HostListener, ElementRef } from '@angular/core';
import {
  PopupMenuSection,
  PopupMenuElementStyle,
  PopupMenuElement,
} from 'src/app/core/components/filter-popup-menu/filter-popup-menu';

@Component({
  selector: 'app-messenger-modal',
  templateUrl: './messenger-modal.component.html',
})
export class MessengerModalComponent {
  @Output() sectionClickedEventEmitter = new EventEmitter<string>();
  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Input() type: string = '';
  public selectedSection: string = '';
  constructor(
    private el: ElementRef,
    ){}
  messagesMenuSections: PopupMenuSection[] = [
    {
      elements: [
        {
          id: 'reply',
          name: 'Ответить',
          icon: '../../../../assets/icon-reply.svg',
          type: PopupMenuElementStyle.BASE,
        },
        {
          id: 'pin',
          name: 'Закрепить',
          icon: '../../../../assets/pin.svg',
          type: PopupMenuElementStyle.BASE,
        },
        {
          id: 'copy',
          name: 'Копировать',
          icon: '../../../../assets/icon-copy.svg',
          type: PopupMenuElementStyle.BASE,
        },
        {
          id: 'forward',
          name: 'Переслать',
          icon: '../../../../assets/icon-share.svg',
          type: PopupMenuElementStyle.BASE,
        },
        {
          id: 'discuss',
          name: 'Обсудить',
          icon: '../../../../assets/bubble.right.svg',
          type: PopupMenuElementStyle.BASE,
        },
        {
          id: 'select',
          name: 'Выделить',
          icon: '../../../../assets/checkmark.circle.svg',
          type: PopupMenuElementStyle.BASE,
        },
        {
          id: 'delete',
          name: 'Удалить',
          icon: '../../../../assets/trash.svg',
          type: PopupMenuElementStyle.DANGER,
        },
      ],
    },
  ];

  chatsMenuSections: PopupMenuSection[] = [
    {
      elements: [
        {
          id: 'pin',
          name: 'Закрепить',
          icon: '../../../../assets/pin.svg',
          type: PopupMenuElementStyle.BASE,
        },
        {
          id: 'leave',
          name: 'Покинуть чат',
          icon: '../../../../assets/rectangle.portrait.and.arrow.forward.svg',
          type: PopupMenuElementStyle.DANGER,
        },
      ]
    }
  ]

  conversationMenuElements: PopupMenuElement[] = this.messagesMenuSections[0].elements.filter(el => el.id !== 'discuss')
  conversationMenuSections: PopupMenuSection[] = [
    {
      elements: this.conversationMenuElements
    }
  ]

  get menuSections(): PopupMenuSection[] {
    if(this.type){
      switch(this.type){
        case('messages'):
          return this.messagesMenuSections
        case('chats'):
          return this.chatsMenuSections
        case('conversation'):
          return this.conversationMenuSections
        default: 
          throw new Error
      }
    } else throw new Error
  }

  onSectionClicked(sectionId: string) {
    this.selectedSection = sectionId;
    this.sectionClickedEventEmitter.emit(sectionId);
    this.isVisibleChange.emit(false)
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isVisibleChange.emit(false)
    }
  }

}
