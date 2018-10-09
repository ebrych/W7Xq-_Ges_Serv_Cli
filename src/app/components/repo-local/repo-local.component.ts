import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalVariable } from '../../global';

@Component({
  selector: 'app-repo-local',
  templateUrl: './repo-local.component.html',
  styles: []
})
export class RepoLocalComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }
  private baseApiUrl = GlobalVariable.BASE_API_URL;

  date = new Date();
  hoy = this.obtenerFecha();
  relacionLocales;
  id=localStorage.getItem('id');
  token=localStorage.getItem('token');

  ngOnInit() {
    this.listarRelacion(this.hoy);
  }


  //calculos
  obtenerFecha(){
    var dia=this.date.getDate();
    var mes=(this.date.getMonth()+1);
    var anio=this.date.getFullYear();
    var mesStr;
    var diaStr;
    if(mes<10){
      mesStr='0'+mes;
    }else{
      mesStr=mes;
    }
    if(dia<10){
      diaStr='0'+dia;
    }else{
      diaStr=dia;
    }
    var final=anio+'-'+mesStr+'-'+diaStr;
    //console.log(final);
    return final;
  }

  //peticiones
  listarRelacion(fecha){
    let body = new URLSearchParams();
    body.set('id', this.id);
    body.set('token', this.token);
    body.set('date',fecha);
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'ReporteLocal/listLocales',body.toString(), options)
      .subscribe(res=>{ 
        this.relacionLocales=res
        //console.log(res);
      },
      err=>{console.log("Error ocurred")});
  }

  llamarLista(form:NgForm){
    this.listarRelacion(form.value.dateData);
  }


}
