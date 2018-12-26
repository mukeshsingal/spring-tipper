import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title = 'asd';
  public API = '//localhost:8081';
  data:any=[];
  public dataKeys

  constructor(private http: HttpClient) {
    this.http.get(this.API + '/questions').subscribe(
      data => {
        this.data = data
        console.log(data);
      },
      err => console.error(err),
      () => console.log('done loading foods')
    );

    this.dataKeys = this.data.keys
  }
}

