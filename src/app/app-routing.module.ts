import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideRoutes, RouterModule, Routes } from '@angular/router';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { LoginComponent } from './login/login.component';
import { MyAlbumsComponent } from './my-albums/my-albums.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadPictureComponent } from './upload-picture/upload-picture.component';
import { UserService } from './user.service';

const routes: Routes = [
  {path: 'profile', component:ProfileComponent,canActivate:[UserService]},
  {path: 'album/:albumId', component:AlbumDetailsComponent,canActivate: [UserService]},
  {path: 'create', component:CreateAlbumComponent,canActivate: [UserService]},
  {path: 'login', component:LoginComponent},
  {path: 'albums/recent', component:MyAlbumsComponent,canActivate: [UserService]},
  {path: 'photo/:photoId', component:PhotoDetailsComponent,canActivate: [UserService]},
  {path: 'upload/:albumId', component:UploadPictureComponent,canActivate: [UserService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }






