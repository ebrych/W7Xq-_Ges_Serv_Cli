import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalVariable } from '../../global';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }
  private baseApiUrl = GlobalVariable.BASE_API_URL;
  datosSesion;

  ngOnInit() {
    $('#navbar').css('display','none');
    $('body').css('background-color','#f5f5f5');
  }

  abrirModalOlvidePs(){
    $('#ModalOlvide').modal('show');
  }

  login(form:NgForm){
      let body = new URLSearchParams();
      body.set('user', form.value.user);
      body.set('password', form.value.pass);
      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
      const req=this.http.post(this.baseApiUrl+'sesiones/login',body.toString(), options)
      .subscribe(res=>{
        //logica
        if(res != null){
          this.datosSesion=res;
          localStorage.setItem('id',this.datosSesion.id);
          localStorage.setItem('usuario',this.datosSesion.username);
          localStorage.setItem('token',this.datosSesion.token);
          
          //console.log(localStorage.getItem('usuario'));
          //console.log(localStorage.getItem('token'));
          this.router.navigate(['/panel'])
        }else{
          console.log("Sin Usuario");
        }
      },
      err=>{console.log("Error ocurred")});

  }

  
}
