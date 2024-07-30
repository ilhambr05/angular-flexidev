import { Component, Input } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
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
          console.log(res, res[this.indexToGetName], this.indexToGetName);
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
}
