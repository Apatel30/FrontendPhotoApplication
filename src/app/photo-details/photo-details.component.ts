import { Component, NgIterable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../Comment';
import { PhotoService } from '../photo.service';
import { PhotoDb } from '../photo';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {
  photoId!: string;
  photo!: PhotoDb[];
  photo1:PhotoDb;
  allComments!: Comment[];
  
  newComment!:string;
  
  

  constructor( private route: ActivatedRoute, private photoService:PhotoService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params=>{
      this.photoId =params.get('photoId')!;
      console.log('Got photo Id:', this.photoId );
      this.loadPhoto(this.photoId);
      this.loadComments(this.photoId);
      console.log("loadcommeted:", this.allComments);
    });
  }

  loadPhoto(photoId:string){
    this.photoService.getPhoto(photoId). subscribe(
      photo=>{
        this.photo= <PhotoDb[]>photo;
        console.log("loaded photo details:", this.photo);
      }
    );
  }
  loadComments(photoId:string){
    this.photoService.getComments(photoId). subscribe(
      comments=>{
        this.allComments= (<Comment[]>comments).reverse();
        console.log("loaded comments details:", this.allComments);
      }
    )
  }

  makeProfilePhoto(){
    this.photoService.makeProfilePhoto(this.photo1.photoUrl)
      .subscribe(
        response=> {
          console.log("Profile photo updated", response);
        }
      )
    }
    makeAlbumCover() {
      this.photoService.makeAlbumCover(this.photo1.photoUrl, this.photo1.albumId).subscribe(
        response => {
          console.log("Album Cover Updated", response);
          
        }
      )
    }

    //makeAlbumCover() {
      //this.photoService.makeAlbumCover(this.photo.photoUrl, this.photo.albumId).subscribe(
        //response => {
          //console.log("Album Cover Updated", response);
          
        //}
      //)
    //}
    saveComment(){
      this.photoService.saveComments(this.photoId, this.newComment)
      .subscribe(
        Response=>{
          console.log("comment posted");
          this.loadComments(this.photoId);
          this.newComment="";
        }
      )
    }
  }


