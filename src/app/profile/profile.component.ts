import { Component, OnInit } from '@angular/core';
import { UserDb } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!: UserDb;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUserProfile().subscribe(
      userProfile => {
        this.user = <UserDb>userProfile;
        console.log("Got user profile",userProfile, this.user );

      }
    )
  }
}

