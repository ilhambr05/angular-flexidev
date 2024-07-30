import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-linked-item',
  standalone: true,
  imports: [],
  templateUrl: './linked-item.component.html',
  styleUrl: './linked-item.component.scss'
})
export class LinkedItemComponent {
  @Input() link!: string;
  @Input() indexToGetName!: string;

  nameDisplay : string = "";
  constructor() { }

  ngOnInit() {

  }
}
