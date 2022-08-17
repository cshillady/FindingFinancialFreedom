import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  id?: number

  classList: any;
  nextElementSibling: any;
  incomeFreqCollapsed: boolean = true;
  expensesCollapsed: boolean = true;
  incomeCollapsed: boolean = true;
  financialStatusToggle = false;
  userHomeStatusToggle = true

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.id = this.storageService.getUser().id;
  }

  userHomeToggle(): void {
    switch(this.userHomeStatusToggle) {
      case false:
        this.userHomeStatusToggle = true;
        break;
      default:
        this.userHomeStatusToggle = false;
    }
  }

  financeToggle(): void {
    switch(this.financialStatusToggle) {
      case false:
        this.financialStatusToggle = true;
        break;
      default:
        this.financialStatusToggle = false;
    }
  }

}
