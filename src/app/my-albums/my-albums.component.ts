import { Component, OnInit } from '@angular/core';
import { AlbumDb } from '../album';
import { AlbumService } from '../album.service';


@Component({
  selector: 'app-my-albums',
  templateUrl: './my-albums.component.html',
  styleUrls: ['./my-albums.component.css']
})
export class MyAlbumsComponent implements OnInit {

  albums!: AlbumDb[];
  

  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    console.log("calling albumService from component");
    this.albumService.getAllalbums().subscribe(
      Response => {
        this.albums= <AlbumDb[]>Response;
        console.log("All albums response", Response,this.albums);
      }
    );
  }

}
