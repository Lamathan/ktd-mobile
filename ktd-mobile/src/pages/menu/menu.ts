import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//TEST GOING TO OTHER PAGE
import { UsersPage } from '../users/users';
import { AddPage } from '../add/add';
//
//HTTP PART
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  answer: any;
  link : string;
  data : any;
  songsSelected : any;
  ex : any;


  constructor(public navCtrl: NavController, public http: Http)
  {
    //this.upvote();
    //this.displaySongs();
  }

  goAdd() {
    this.navCtrl.push(AddPage);
  }
  goUsers() {
    this.navCtrl.push(UsersPage);
  }


  displaySongs()
  {
    this.http.get('http://localhost:6680/killthedj/tracks').map(res => res.json()).subscribe(data => {
      this.songsSelected = data.active;
      console.log(this.songsSelected);
    });
  }

  upvote() {

    this.link = 'http://localhost:6680/killthedj/searches';
    //this.data = JSON.stringify({username: this.data.username});
    this.data = JSON.stringify({
      "query": {
        "track_name": [
          "Un"
        ]
      }
    });

    this.http.post(this.link, this.data).map(res => res.json()).subscribe(data => {
      this.answer = data[0].tracks;
    }, error => {
      console.log("Oooops!");
    });
  }

}
