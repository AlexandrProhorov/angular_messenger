import { Component, Input } from "@angular/core";
import { MessageEntity } from "../../messages/domain/model/message-entity";
@Component({
    selector: 'app-messenger-message',
    templateUrl: './messenger-message.component.html',
})

export class MessengerMessageComponent {
    @Input() senderId: string = ''
    @Input() timeStamp: Date = new Date()
    @Input() content: string = ''
    @Input() isReplied: boolean = false
    @Input() repliedContent: MessageEntity | null = null
}