import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent {
  @Input() info;
  @Output() data: EventEmitter<any> = new EventEmitter();

  constructor() {}

  getInput() {
    this.data.emit(this.info);
  }
}
