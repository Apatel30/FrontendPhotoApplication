import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInFormVisible= true;
  
  email!: string;
  password!: string;
  name!:string;
  
constructor(public userService:UserService ) { }

  ngOnInit(): void {
   
  }

  makeSignInFormVisible(){

    this.signInFormVisible= true;

  }
  makeSignUpFormVisible(){
    
    this.signInFormVisible= false;

  }
  
SignIn(){
 console.log("user try to login");
 this.userService.SignIn(this.email, this.password);
 this.email = '';
 this.password = '';
}

signUp(){
  console.log("user try to signup");
  console.log("Name in component=", this.name)
  this.userService.SignUp(this.email, this.password, this.name);
  this.email = '';
  this.password = '';
  
  
}
signOut() {
  this.userService.SignOut();
}

}



