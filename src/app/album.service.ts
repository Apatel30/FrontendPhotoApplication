import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router, RouterState } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AlbumDb } from './album';


@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  

  constructor(private http: HttpClient, private router:Router) { }

  saveAlbum(albumTitle:string,fileId: string){
    var album: AlbumDb = {
      
      coverPhotoUrl: environment.API_BASE_URL + "files/show/" + fileId,
      createdBy:	"Ayushi",
      dateCreated: "2022-05-27T12:01:11.869+00:00",
      id: "",
      name: albumTitle,
    };

  ///api/albumsDb

    var headers=this.getHeaders();
    return this.http.post<any>( environment.API_BASE_URL + "albumsDb/save", album, {headers:headers} )
    .subscribe(
     albumData=>{
      var album: AlbumDb =<AlbumDb>(albumData);
       //var albumId=album.id;
       //this.router.navigate(['albums/recent', albumId]);
    }
    )
  }

  getAllalbums(){
    var headers=this.getHeaders();
    console.log("calling getAllAlbums method with header",headers);
    return this.http.get( environment.API_BASE_URL + "albumsDb",  {headers:headers} );
  }

  getPhotos(albumId: string){
    var headers=this.getHeaders();
    return this.http.get( environment.API_BASE_URL + "albumsDb/"+ albumId + "/photos",{headers:headers});  
    
  }
  getHeaders(){
    var headers={
      'idToken':localStorage.getItem('userIdToken')
    };
    return headers;
  }
}
function body(arg0: string, arg1: { headers: {}; }, body: any) {
  throw new Error('Function not implemented.');
}

