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

  

}
