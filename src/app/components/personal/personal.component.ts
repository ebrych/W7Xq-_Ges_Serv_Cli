import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalVariable } from '../../global';

declare var jQuery:any;
declare var $:any;
declare var List:any;


@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styles: []
})
export class PersonalComponent implements OnInit {
  constructor(private http:HttpClient,private router:Router) { }
  private baseApiUrl = GlobalVariable.BASE_API_URL;
  

  groupList;
  localesList;
  cargosList;

  idUs;
  nombreUs;
  cargoIdUs;
  cargoUs;
  localIdUs;
  localUs;
  emailUs;
  phoneUs;
  estIdUs;
  estUs;

  codigoQr="ninguno";

  id=localStorage.getItem('id');
  token=localStorage.getItem('token');

  ngOnInit() {
    this.listarGrouList(this.id,this.token);
    this.iniciarListJS();
  }

  abrirModalRegistro(){
    this.cargaCargos(this.id,this.token);
    this.cargarLocales(this.id,this.token);
    $('#ModalRegistro').modal('show');
  }

  abrirModalEditaRegistro(){
    $('#ModalEditaRegistro').modal('show');
  }
 
  //listJs
  iniciarListJS(){
    var options = {
      valueNames: [ 'nombre', 'cargo' ]
    };
    var lista = new List('lista', options,this.groupList);
  }
  //peticiones
  listarGrouList(id,token){
    let body = new URLSearchParams();
      body.set('id', id);
      body.set('token', token);
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Personal/listPersonal',body.toString(), options)
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
    body.set('local',form.value.local);
    body.set('cargo',form.value.cargo);
    body.set('estado',form.value.estado);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Personal/agregarUsuario',body.toString(), options)
    .subscribe(res=>{
        //logica
        $('#ModalRegistro').modal('hide');
        this.listarGrouList(this.id,this.token);
    },
    err=>{console.log("Error ocurred")});
    console.log(body.toString());
}

buscarById(id){
  this.abrirModalEditaRegistro();
  this.cargaCargos(this.id,this.token);
    this.cargarLocales(this.id,this.token);
  let body = new URLSearchParams();
    body.set('id', this.id);
    body.set('token', this.token);
    body.set('idUsuario', id);
  let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };
  const req=this.http.post(this.baseApiUrl+'Personal/buscaPersonalById',body.toString(), options)
    .subscribe(res=>{
      console.log(res);
      this.idUs=res[0].id;
      this.nombreUs=res[0].nombres;
      this.cargoIdUs=res[0].idCargo;
      this.cargoUs=res[0].descripcion;
      this.localIdUs=res[0].idLocal;
      this.localUs=res[0].local;
      this.emailUs=res[0].email;
      this.phoneUs=res[0].telefono;
      this.estIdUs=res[0].idEstado;
      this.estUs=res[0].estado;
     },
    err=>{console.log("Error ocurred")});
}

actualiza(form:NgForm){
  let body = new URLSearchParams();
  body.set('id', this.id);
  body.set('token', this.token);
  body.set('idUsuario',form.value.id);
  body.set('nombres',form.value.nombres);
  body.set('email',form.value.email);
  body.set('telefono',form.value.telefono);
  body.set('local',form.value.local);
  body.set('cargo',form.value.cargo);
  body.set('estado',form.value.estado);
  console.log("body");
  let options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };
  console.log("opciones");
const req=this.http.post(this.baseApiUrl+'Personal/updatePersonal',body.toString(), options)
  .subscribe(res=>{
      //logica
      $('#ModalEditaRegistro').modal('hide');
      this.listarGrouList(this.id,this.token);
  },
  err=>{console.log("Error ocurred")});
}

cargarLocales(id,token){
  let body = new URLSearchParams();
  body.set('id', id);
  body.set('token', token);
  let options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };
  const req=this.http.post(this.baseApiUrl+'Locales/SelectList',body.toString(), options)
  .subscribe(res=>{ this.localesList= res; },
  err=>{console.log("Error ocurred")});
}

cargaCargos(id,token){
  let body = new URLSearchParams();
  body.set('id', id);
  body.set('token', token);
  let options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };
  const req=this.http.post(this.baseApiUrl+'Cargos/SelectList',body.toString(), options)
  .subscribe(res=>{ this.cargosList= res; },
  err=>{console.log("Error ocurred")});
}




  

}
