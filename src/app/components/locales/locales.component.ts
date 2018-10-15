import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalVariable } from '../../global'; 

declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styles: []
})
 
export class LocalesComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }
  private baseApiUrl = GlobalVariable.BASE_API_URL;
  groupList;

  localId;
  localName;
  localDir;
  localPhone;
  localEstId;
  localEst;

  id=localStorage.getItem('id');
  token=localStorage.getItem('token');
  ngOnInit() {
    this.listarGrouList(this.id,this.token);
    //console.log(this.groupList);
  }

  abrirModalNuevo(){
    $('#ModalRegistro').modal('show');
  }
  abrirModalEditaRegistro(){
    $('#ModalEdicion').modal('show');
  }




  //peticiones
  listarGrouList(id,token){
    let body = new URLSearchParams();
      body.set('id', id);
      body.set('token', token);
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Locales/ListGroup',body.toString(), options)
      .subscribe(res=>{ this.groupList= res; },
      err=>{console.log("Error ocurred")});
  }

  inserta(form:NgForm){
      let body = new URLSearchParams();
      body.set('id', this.id);
      body.set('token', this.token);
      body.set('nombre',form.value.nombre);
      body.set('direccion',form.value.direccion);
      body.set('telefono',form.value.telefono);
      body.set('estado',form.value.estado);
      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
      const req=this.http.post(this.baseApiUrl+'Locales/insertLocal',body.toString(), options)
      .subscribe(res=>{
          //logica
          $('#ModalRegistro').modal('hide');
          this.listarGrouList(this.id,this.token);
      },
      err=>{console.log("Error ocurred")});
  
  }

  buscarById(id){
    this.abrirModalEditaRegistro();
    let body = new URLSearchParams();
      body.set('id', this.id);
      body.set('token', this.token);
      body.set('localId', id);
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Locales/localById',body.toString(), options)
      .subscribe(res=>{
        this.localId=res[0].id;
        this.localName=res[0].nombres;
        this.localDir=res[0].direccion;
        this.localPhone=res[0].telefono;
        this.localEstId=res[0].idEstado;
        this.localEst=res[0].estado;
        //console.log(res[0].id);
       },
      err=>{console.log("Error ocurred")});
  }

  actualiza(form:NgForm){
    let body = new URLSearchParams();
      body.set('id', this.id);
      body.set('token', this.token);
      body.set('idLocal',form.value.idLocal);
      body.set('nombre',form.value.nombre);
      body.set('direccion',form.value.direccion);
      body.set('telefono',form.value.telefono);
      body.set('estado',form.value.estado);
      console.log("body");
      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
      console.log("opciones");
    const req=this.http.post(this.baseApiUrl+'Locales/updateLocal',body.toString(), options)
      .subscribe(res=>{
          //logica
          $('#ModalEdicion').modal('hide');
          this.listarGrouList(this.id,this.token);
          
      },
      err=>{console.log("Error ocurred")});
  }

  

  
}
