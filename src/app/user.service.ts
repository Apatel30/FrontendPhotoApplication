import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';
import { UserDb } from './user';

@Injectable({
  providedIn: 'root'
})

export class UserService implements CanActivate  {
   user:  Observable<any>;
   userIdToken!: string | null;
   defaultProfilePhoto: string ="https://images.ctfassets.net/hrltx12pl8hq/5hb9s8fTpw4Pk7fEm8Hdfs/d7c5ae85aad44fb334bcde8268135774/flowers-images-card.jpg?fit=fill&w=368&h=207";
  
  constructor(private angularFireAuth: AngularFireAuth, private router: Router, private http: HttpClient, private messageService: MessageService) { 
    this.user = angularFireAuth.authState;
    this.userIdToken = localStorage.getItem('userIdToken');
    this.userIdToken = localStorage.getItem('userIdToken');
    console.log("user Id token at the construction of the service", this.userIdToken);

    this.user.subscribe(
      userInfo => {
        console.log("user info is available", userInfo);
        this.saveIdToken(userInfo);   
      }
    );
  }
  canActivate(): boolean {
    if(this.angularFireAuth.currentUser!=null){
      
      return true;
    }
    else
    {
      this.router.navigate(['login']);
      return false;
  }
}
  
  saveIdToken(firebaseUser :firebase.User){
    firebaseUser.getIdToken().then(
      idTokenValue => {
        localStorage.setItem('userIdToken', idTokenValue);
        this.userIdToken = localStorage.getItem('userIdToken');
        console.log("Id Token value: ", localStorage.getItem('userIdToken'));
      }
    );

  }

  /* Sign in */
  SignIn(email: string, password: string) {
      this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
      console.log('You are in!');
      this.saveIdToken(res.user!); 
      this.router.navigate(['albums/recent']);
    
      })
      .catch(err => {
      console.log('Something went wrong:',err.message);
      this.messageService.newMessage(err.message);
      });
  }

  /* Sign up */
  SignUp(email: string, password: string, name: string) {
        this.angularFireAuth
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
        console.log('You are Successfully signed up!', res); 
        console.log("name in signup=", name);
        this.saveIdToken(res.user!); 
        this.registerUser(email,name);
        })
        .catch(error => {
        console.log('Something is wrong:', error.message);
        });
  }

  registerUser(email: string, name: string){

  
    console.log("Name in registration=", name);

    var user:UserDb = {
      
      id!: "",
      emailAddress!: email,
      name!: name,
      profilePicUrl!: this.defaultProfilePhoto,
    };
  this.http.post( environment.API_BASE_URL + "users", user)
  .subscribe( Response =>{
    console.log('You are Successfully registred!'); 
    this.router.navigate(['albums/recent']);
  });
    
  }

  /* Sign out */
  SignOut() {
    localStorage.clear();
    console.log('You are out!');
    this.angularFireAuth.signOut();
    this.router.navigate(['login']);
   
  }

  getCurrentUserProfile(){
    var headers=this.getHeaders();
    return this.http.get( environment.API_BASE_URL + "users/me", {headers:headers});
  }

  
 


  getHeaders(){
    var headers={
      'idToken':localStorage.getItem('userIdToken')
    };
    return headers;
  }
  
}

  
