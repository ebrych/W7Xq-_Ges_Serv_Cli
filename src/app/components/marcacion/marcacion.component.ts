import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalVariable } from '../../global';

declare var jQuery:any;
declare var $:any;
declare var QrScanner:any;
declare var setResult:any;

@Component({
  selector: 'app-marcacion',
  templateUrl: './marcacion.component.html',
  styles: []
})
export class MarcacionComponent implements OnInit {
  
  constructor(private http:HttpClient,private router:Router) { }
  private baseApiUrl = GlobalVariable.BASE_API_URL;

  groupList;

  id=localStorage.getItem('id');
  token=localStorage.getItem('token');

  ngOnInit() {
    this.listarGrouList(this.id,this.token);
  }

  listarGrouList(id,token){
    let body = new URLSearchParams();
      body.set('id', id);
      body.set('token', token);
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Marcaciones/listPersonal',body.toString(), options)
      .subscribe(res=>{ 
        this.groupList=res;
        console.log(res);
      },
    err=>{console.log("Error ocurred")});
  }

  agregarMarcacion(idUser){
    var rst = confirm("¿Estas Seguro Marcar Asistencia?");
    if (rst == true) {
      let body = new URLSearchParams();
      body.set('id', this.id);
      body.set('token', this.token);
      body.set('user',idUser);
      let options = {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
      const req=this.http.post(this.baseApiUrl+'Marcaciones/agregarMarcacion',body.toString(), options)
        .subscribe(res=>{ 
          console.log(res);
        },
      err=>{console.log("Error ocurred")});
    } else {
      console.log("Cancelo");
    }
  }

  

}
