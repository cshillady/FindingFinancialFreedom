import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  user : User = new User();
  users : User[] = [];
  ageValue !: number;
  currentId !: number;
  updateToggle = false;
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getUsers().subscribe((data : any) =>{
      this.users = data;
      console.log(this.users)
    })
  }

  deleteUser(id : number){
    this.userService.deleteUser(id).subscribe((data: any) =>{
      console.log(id)
      this.reloadPage();
    })
  }

  updateUser(userId : number){
    this.userService.updateUser(this.currentId, this.user).subscribe({
      next: (user : any) => {
        this.user = user;
        this.reloadPage();
        console.log(user)
      }
    })
  }

  updateToggler(id : number){
    switch(this.updateToggle) {
      case false:
        this.updateToggle = true;
        this.userService.getUser(id).subscribe( (user: any) => {
            this.user = user;
            this.currentId = user.id;
            console.log(user);
        });
        break;
      default:
        this.updateToggle = false;
    }
  }

  reloadPage(): void {
    window.location.reload();
  }


}
