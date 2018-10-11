import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalVariable } from '../../global';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styles: []
})
export class ReservasComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }
  private baseApiUrl = GlobalVariable.BASE_API_URL;
  
  groupList;
  
  id=localStorage.getItem('id');
  token=localStorage.getItem('token');
  ngOnInit() {
    this.listaReservas(this.id,this.token)
  }
  
  listaReservas(id,token){
    let body = new URLSearchParams();
      body.set('id', id);
      body.set('token', token);
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Reservas/listarReservas',body.toString(), options)
      .subscribe(res=>{ this.groupList= res; },
      err=>{console.log("Error ocurred")});
  }
  
  acepta(idRe){
    let body = new URLSearchParams();
      body.set('id', this.id);
      body.set('token', this.token);
      body.set('reserva',idRe);
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Reservas/confirmReserva',body.toString(), options)
      .subscribe(res=>{
        console.log(res); 
        this.listaReservas(this.id,this.token);
      },
      err=>{console.log("Error ocurred")});
  }
  
  rechaza(idRe){
    let body = new URLSearchParams();
      body.set('id', this.id);
      body.set('token', this.token);
      body.set('reserva',idRe);
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Reservas/cancelaReserva',body.toString(), options)
      .subscribe(res=>{ 
        this.listaReservas(this.id,this.token);
      },
      err=>{console.log("Error ocurred")});
  }
  
  

}
