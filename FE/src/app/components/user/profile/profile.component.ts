import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  selected = '';
  currentId!: any;
  user: User = new User();
  updateToggle = false;
  deleteToggle = false;
  currentUser: any;
  addUsersToggle = false;

  constructor(
    private userService: UserService, 
    private storageService: StorageService,
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.currentId = this.storageService.getUser().id;
    this.loadUser(this.currentId);
    console.log(this.currentId);
    console.log(this.user);
    if(this.currentId === undefined){
      this.router.navigate(['/login'])
    }
  }
  loadUser(currentId: any) {
    this.userService.getUser(this.currentId).subscribe((data:any)=>{
      this.user=data;
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

  deleteUser(id : number){
    this.userService.deleteUser(id).subscribe((data: any) =>{
      console.log(id);
      this.logout();
      this.reloadPage();
      
      
    })
  }
  deleteToggler(id : number){
    switch(this.deleteToggle) {
      case false:
        this.deleteToggle = true;
        this.userService.getUser(id).subscribe( (user: any) => {
            this.user = user;
            this.currentId = user.id;
            console.log(user);
        });
        break;
      case true:
        this.deleteToggle = false;
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res + "this is res");
        this.storageService.clean();
      },
      error: err => {
        console.log(err + "this is an error");
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
