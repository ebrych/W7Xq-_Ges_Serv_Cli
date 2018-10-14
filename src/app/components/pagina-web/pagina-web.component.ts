import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalVariable } from '../../global';


@Component({
  selector: 'app-pagina-web',
  templateUrl: './pagina-web.component.html',
  styles: []
})
export class PaginaWebComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }
  private baseApiUrl = GlobalVariable.BASE_API_URL;


  id=localStorage.getItem('id');
  token=localStorage.getItem('token');
  
  ngOnInit() {
  }

}
