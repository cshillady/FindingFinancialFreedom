import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from './auth.service';


// const API_URL = 'http://localhost:8080/api/user/';
const API_URL = 'http://fffcapstonefinal-env.eba-qbamrxca.us-east-1.elasticbeanstalk.com/api/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUser(id :number):Observable<User[]>{
    return this.http.get<User[]>(`${API_URL}${id}`)
  }
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${API_URL}admin`)
  }

  deleteUser(userId : number){
    return this.http.delete(`${API_URL}${userId}/delete`)
  }

  updateUser(userId: number, user : User){
    return this.http.put(`${API_URL}${userId}/update`, user )
  }
  
}
