import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { debounceTime, Subject } from 'rxjs';
import { IPersonDetail } from '../../model/people';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-table',
  standalone: true,
  imports: [CommonModule, RouterModule, TableModule, IconFieldModule, InputIconModule, InputTextModule, ButtonModule, ProgressSpinnerModule],
  templateUrl: './side-table.component.html',
  styleUrl: './side-table.component.scss'
})
export class SideTableComponent {
  @Input() tableData: 
    [] | IPersonDetail[] 
    = [];
  @Input() title!: string;
  @Input() isLoading: boolean = false;
  // @Input() iconField!: IconField;

  @Output() onDoSearchData = new EventEmitter<string>();
  @Output() onDoViewDetailData = new EventEmitter<number>();

  private searchSubject = new Subject<string>();
  private readonly debounceSearchTimeMs = 250;

  ngOnInit() {
    this.searchSubject.pipe(debounceTime(this.debounceSearchTimeMs)).subscribe(searchValue => {
      this.doSearchData(searchValue);
    });
  }

  ngOnUpdate() {
    console.log("on update loading", this.isLoading);
    // this.isLoading = false;
  }

  onSearchData(event: any) {
    this.searchSubject.next(event.target.value);
  }

  doSearchData(searchValue: string) {
    this.onDoSearchData.emit(searchValue);
  }
  onViewDetailData(dataID: number) {
    this.onDoViewDetailData.emit(dataID);
  }
}
