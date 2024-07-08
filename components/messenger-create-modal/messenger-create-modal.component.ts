import { Component, EventEmitter, Output, Input, OnInit } from "@angular/core";
import { UserEntity } from "../../chats/domain/model/messenger-user-entity";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { UsersDataService } from "../../users/data/users-data-service";
import { ChatState } from "../../chats/domain/model/messenger-chat-state";
import { ChatListDataService } from "../../chats/data/chat-list-data-service";

@Component({
    selector: 'app-messenger-create-modal',
    templateUrl: './messenger-create-modal.component.html',
    styleUrls: ['./messenger-create-modal.component.scss'],
})
export class MessengerCreateModalComponent implements OnInit {
    @Input() isOpen: boolean = false
    @Output() isVisibleChange = new EventEmitter<boolean>()
    @Output() createChat = new EventEmitter<ChatState>()

    chatForm: FormGroup = new FormGroup({})
    submitted: boolean = false
    chatUserList: UserEntity[] = []
    userList: UserEntity[] = this.usersDataService.users.slice(1)

    formName = new FormControl('')
    constructor (
        private usersDataService: UsersDataService,
        private chatListDataService: ChatListDataService,
        private formBuilder: FormBuilder,
    ){}

    ngOnInit() {
        this.chatForm = this.formBuilder.group({
            acceptTerms: [false, Validators.requiredTrue]
        });
    }

    selectUser(user: UserEntity) {
        const index = this.chatUserList.indexOf(user)
        if(index !== -1) {
            this.chatUserList.splice(index, 1)
        } else {
            this.chatUserList.push(user)
        }
    }

    onSubmit(){
        if(this.formName.value && this.chatUserList.length > 1){
            const testChat: ChatState = {
                chatEntity: {
                  id: this.chatListDataService.Chats.length + 100,
                  name: this.formName.value,
                  lastMessage: null,
                  users: [...this.chatUserList],
                  isGroup: true
                },
                isSelected: false,
                unreadCount: 0,
              }
            if(!testChat.chatEntity.users.includes(this.usersDataService.users[0])){
                testChat.chatEntity.users.push(this.usersDataService.users[0])
            }
            this.usersDataService.users[0].chats.push(testChat.chatEntity.id)
            this.createChat.emit(testChat)
            this.isVisibleChange.emit(false)
            this.chatUserList = []
            this.chatForm.reset();
        }
    }

    onClose() {
        this.isVisibleChange.emit(false)
        this.chatUserList = []
        this.chatForm.reset();
    }
}