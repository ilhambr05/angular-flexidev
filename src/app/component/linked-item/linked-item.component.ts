import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-linked-item',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './linked-item.component.html',
  styleUrl: './linked-item.component.scss'
})
export class LinkedItemComponent {
  @Input() link!: string;
  @Input() indexToGetName!: string;
  
  @Output() onParentClick = new EventEmitter<string>();

  isLoading: boolean = false;
  isError: boolean = false;
  errorText: string = "";

  nameDisplay : string = "";
  constructor(private common : CommonService) { }

  ngOnInit() {
    this.loadPerson();
  }

  loadPerson(){
    this.isLoading = true;
    this.isError = false;

    this.common.get(this.link).subscribe(
      {
        next: (res: any) => {
          this.nameDisplay = res[this.indexToGetName];
        },
        error: (error: any) => {
          this.isError = true;
          this.errorText = error.message;
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      }
    )
  }

  onLinkClick(){
    this.onParentClick.emit("testing child click");
  }
}
