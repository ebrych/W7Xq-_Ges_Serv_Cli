import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalVariable } from '../../global';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }
  private baseApiUrl = GlobalVariable.BASE_API_URL;

  groupList;
  
  idCli;
  nombresCli;
  emailCli;
  telefonoCli;

  id=localStorage.getItem('id');
  token=localStorage.getItem('token');

  ngOnInit(){
    this.listarGrouList(this.id,this.token);
  }

  abrirModalNuevo(){
    $('#ModalRegistro').modal('show');
  }

  abrirModalEditaRegistro(){
    $('#ModalEditaRegistro').modal('show');
  }

  //peticiones
  listarGrouList(id,token){
    let body = new URLSearchParams();
      body.set('id', id);
      body.set('token', token);
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Clientes/listGroup',body.toString(), options)
      .subscribe(res=>{ this.groupList= res; },
      err=>{console.log("Error ocurred")});
  }

  inserta(form:NgForm){
    let body = new URLSearchParams();
    body.set('id', this.id);
    body.set('token', this.token);
    body.set('nombre',form.value.nombre);
    body.set('email',form.value.email);
    body.set('telefono',form.value.telefono);

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Clientes/insertClient',body.toString(), options)
    .subscribe(res=>{
        //logica
        if(res==true){
          window.location.reload();
        }
    },
    err=>{console.log("Error ocurred")});
    console.log(body.toString());
}

buscarById(id){
  this.abrirModalEditaRegistro();
  let body = new URLSearchParams();
    body.set('id', this.id);
    body.set('token', this.token);
    body.set('clienteId', id);
  let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };
  const req=this.http.post(this.baseApiUrl+'Clientes/clienteById',body.toString(), options)
    .subscribe(res=>{
      this.idCli=res[0].id;
      this.nombresCli=res[0].nombres;
      this.emailCli=res[0].email;
      this.telefonoCli=res[0].telefono;
      //console.log(res[0].id);
     },
    err=>{console.log("Error ocurred")});
}

actualiza(form:NgForm){
  let body = new URLSearchParams();
    body.set('id', this.id);
    body.set('token', this.token);
    body.set('idCliente',form.value.idCliente);
    body.set('nombre',form.value.nombre);
    body.set('email',form.value.email);
    body.set('telefono',form.value.telefono);
    console.log("body");
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    console.log("opciones");
  const req=this.http.post(this.baseApiUrl+'Clientes/updateCliente',body.toString(), options)
    .subscribe(res=>{
        //logica
        if(res==true){
          window.location.reload();
        }
    },
    err=>{console.log("Error ocurred")});
}


  

}
