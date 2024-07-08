import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-messenger-input-field',
  templateUrl: './input-field.component.html',
})
export class MessengerInputFieldComponent {
  @Input() class?: string | string[];
  @Input() placeholder: string = 'Сообщение...';
  @Output() onSubmit: EventEmitter<string> = new EventEmitter<string>();
  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();

  onSubmitValue(event: any) {
    if (!this.onSubmit) return;
    const value = event.target.value;
    this.onSubmit.emit(value);
    event.target.value = '';
  }

  onChangeValue(event: any) {
    if (!this.onChange) return;
    const value = event.target.value;
    this.onChange.emit(value);
  }
}
