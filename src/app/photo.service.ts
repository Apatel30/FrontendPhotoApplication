import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comment } from './Comment';
import { PhotoDb } from './photo';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {
 
  constructor(private http: HttpClient) { }

  saveComments(photoId: string, newComment:string){
    var comment: Comment = {
      message!: newComment,
      createdBy!:	" ",
      dateCreated!:	"",
      id!	:"",
      photoId!	:photoId
    };


    var headers=this.getHeaders();
    return this.http.post<any>( environment.API_BASE_URL + "photos/comments", comment, {headers:headers} )

  }

 makeProfilePhoto(photoUrl: string){
  var headers = this.getHeaders();
  var params = new HttpParams().set('profilePicUrl', photoUrl);
  return this.http.put<any>(environment.API_BASE_URL + "users/me/profilePhoto", params, {headers:headers})
}
  
makeAlbumCover(photoUrl: string, albumId: string) {
  var headers = this.getHeaders();
  var params = new HttpParams().set('coverPhotoUrl', photoUrl);
  return this.http.put(environment.API_BASE_URL + "albumsDb/" + albumId + "/coverPhoto", params, {headers})
}

  getAllphotos(){
    var headers=this.getHeaders();
   return this.http.get(environment.API_BASE_URL + "photos/" + headers);
  }

  getPhoto(photoId :string){
    var headers=this.getHeaders();
    return this.http.get( environment.API_BASE_URL + "photos/" + photoId, {headers:headers});

  }
  getComments(photoId :string){
    var headers=this.getHeaders();
    return this.http.get( environment.API_BASE_URL + "photos/" + photoId + "/comments",{headers:headers})  ;   
  }

  getHeaders(){
    var headers={
      'idToken':localStorage.getItem('userIdToken')
    };
    return headers;
  }

  //savePhoto(albumId: string, fileName: string) {
    //var photo: PhotoDb = {
     // albumId: albumId,
     // message: "",
     // createdBy: "",
    //  dateCreated: "",
    //  id: "",
    //  photoUrl: environment.API_BASE_URL + "files/view?key=" + fileName,
   // };
   // console.log("Photo service: ", photo);
    
   // var headers = this.getHeaders();
   // this.http.post(environment.API_BASE_URL + "photos", photo, {headers}).subscribe(
     // photoData => {
     //   console.log("Photo Posted: ", photoData);
     //   var photo: PhotoDb = <PhotoDb>(photoData);
        // var photoId = photo.id;
        // this.router.navigate(['photo', photoId]);
    //  }
  //  )
 // }

 
}
  

