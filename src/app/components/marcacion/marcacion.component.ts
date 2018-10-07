import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalVariable } from '../../global';


@Component({
  selector: 'app-marcacion',
  templateUrl: './marcacion.component.html',
  styles: []
})
export class MarcacionComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }
  private baseApiUrl = GlobalVariable.BASE_API_URL;

  id=localStorage.getItem('id');
  token=localStorage.getItem('token');

  ngOnInit() {
  }

  resultScan(resultString: string){
    let body = new URLSearchParams();
    body.set('id', this.id);
    body.set('token', this.token);
    body.set('user',resultString);
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Asistencia/agregarAsistencia',body.toString(), options)
      .subscribe(res=>{ 
        console.log(res);
      },
      err=>{console.log("Error ocurred")});
    console.debug('Result: ', resultString);
  }

}
