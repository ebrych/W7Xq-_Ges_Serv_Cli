import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalVariable } from '../../global';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styles: []
})
export class PanelComponent implements OnInit {

  constructor(private http:HttpClient) { }
  private baseApiUrl = GlobalVariable.BASE_API_URL;
  misDatos;
  ngOnInit() {
    $('#navbar').css('display','block');
    $('#idPanel').css('display','none');
    let body = new URLSearchParams();
      body.set('id',localStorage.getItem('id') );
      body.set('token', localStorage.getItem('token'));
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Panel/Permisos',body.toString(), options)
      .subscribe(res=>{
        //logica
        this.misDatos=res;
      },
      err=>{console.log("Error ocurred")});
     
 
  }

}
