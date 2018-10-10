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
  }
  
  listaReservas(){
  }
  
  acepta(idRe){
  }
  
  rechaza(idRe){
  }
  
  

}
