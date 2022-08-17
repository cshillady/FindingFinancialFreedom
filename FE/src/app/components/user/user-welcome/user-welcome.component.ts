import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-user-welcome',
  templateUrl: './user-welcome.component.html',
  styleUrls: ['./user-welcome.component.scss']
})
export class UserWelcomeComponent implements OnInit {
  username?: string;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.username = this.storageService.getUser().username;
  }

}
