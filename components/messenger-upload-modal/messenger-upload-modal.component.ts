import { Component, Output, Input, EventEmitter, ViewChild, ElementRef } from "@angular/core";

@Component({
    selector: 'app-messenger-upload-modal',
    templateUrl: './messenger-upload-modal.component.html',
    styleUrls: ['./messenger-upload-modal.component.scss'],
})
export class MessengerUploadModalComponent {
    @Input() isOpen: boolean = false
    @Input() incomingFiles: File[] = []
    @Output() isVisibleChange = new EventEmitter<boolean>()
    @Output() outputMessage = new EventEmitter<string>()
   
    @Output() files = new EventEmitter<File[]>()
    
    @ViewChild('fileInput') fileInput: any;

    openFileDialog() {
        this.fileInput.nativeElement.click();
    }

    onClose() {
        this.incomingFiles.length = 0
        
    }
    onFileSelected(event: any) {
        const file: File = event.target.files[0]
        this.incomingFiles.push(file)
        
    }
    onSubmit(event: string){
        this.files.emit(this.incomingFiles)
        this.outputMessage.emit(event)
        this.onClose()
    }
}