import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

let headers = new HttpHeaders();
headers.set('Content-Type', 'application/json');

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  data;
  public url = 'https://practice.geeksforgeeks.org/problems/subarray-with-given-sum/0'
  public rooturl = 'http://localhost:8081/question';
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  public submit(GfgUrlForm) {
    console.log(GfgUrlForm.value.url)

    this.http.post(this.rooturl, {  "url" : GfgUrlForm.value.url } ,{headers: headers}).subscribe(

      data => {
        this.data = data;
        console.log(data);
      },
      err => console.error(err),
      () => console.log('done loading foods')
    );
  }
}
