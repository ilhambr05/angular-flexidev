import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [MenubarModule, CommonModule],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss'
})
export class MenubarComponent {
  items: MenuItem[] | undefined;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      {
        label: 'People',
        route: '/people'
      },
      {
        label: 'Films',
        route: '/films'
      },
      {
        label: 'Species',
        route: '/species'
      },
      {
        label: 'Vehicle',
        route: '/vehicle'
      },
      {
        label: 'Starship',
        route: '/starship'
      },
    ];
  }
}
