import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalVariable } from '../../global';

declare var jQuery:any;
declare var $:any; 


@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styles: []
})
export class CargosComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }
  private baseApiUrl = GlobalVariable.BASE_API_URL;

  groupList;
  permisosList;
  misPermisos;
  cargoId;
  cargoDescrip;
  cargoEstId;
  cargoEst;

  id=localStorage.getItem('id');
  token=localStorage.getItem('token');

  ngOnInit() {
    this.listarGrouList(this.id,this.token);
  }

  abrirModalNuevo(){
    $('#ModalRegistro').modal('show');
  }
  abrirModalEditaRegistro(){
    $('#ModalEdicion').modal('show');
  }
  abrirModalPermisos(){
    $('#ModalPermisos').modal('show');
  }

  //peticiones
  listarGrouList(id,token){
    let body = new URLSearchParams();
      body.set('id', id);
      body.set('token', token);
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Cargos/ListGroup',body.toString(), options)
      .subscribe(res=>{ this.groupList= res; },
      err=>{console.log("Error ocurred")});
  }

  inserta(form:NgForm){
    let body = new URLSearchParams();
    body.set('id', this.id);
    body.set('token', this.token);
    body.set('descripcion',form.value.descripcion);
    body.set('estado',form.value.estado);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Cargos/insertCargo',body.toString(), options)
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
      body.set('insumoId', id);
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Cargos/cargoById',body.toString(), options)
      .subscribe(res=>{
        console.log(res);
        this.cargoId=res[0].id;
        this.cargoDescrip=res[0].descripcion;
        this.cargoEstId=res[0].idEstado;
        this.cargoEst=res[0].estado;
       },
      err=>{console.log("Error ocurred")});
  }

  actualiza(form:NgForm){
    let body = new URLSearchParams();
      body.set('id', this.id);
      body.set('token', this.token);
      body.set('idCargo',form.value.idCargo);
      body.set('descripcion',form.value.descripcion);
      body.set('estado',form.value.estado);
      console.log("body");
      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
      console.log("opciones");
    const req=this.http.post(this.baseApiUrl+'Cargos/updateCargo',body.toString(), options)
      .subscribe(res=>{
          //logica
          if(res==true){
            window.location.reload();
          }
      },
      err=>{console.log("Error ocurred")});
  }



  permisos(id){
    this.abrirModalPermisos();
    this.listaMisPermisos(id);
    let body = new URLSearchParams();
      body.set('id', this.id);
      body.set('token', this.token);
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Permisos/List',body.toString(), options)
      .subscribe(res=>{ 
        this.permisosList= res;
        this.cargoId=id;
      },
      err=>{console.log("Error ocurred")});
  }

  listaMisPermisos(id){
    this.abrirModalPermisos();
    this.cargoId=id;
    let body = new URLSearchParams();
      body.set('id', this.id);
      body.set('token', this.token);
      body.set('idCargo',id);
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Permisos/listaPermisosByCargo',body.toString(), options)
      .subscribe(res=>{ 
        this.misPermisos= res;
      },
      err=>{console.log("Error ocurred")});
  }

  insertaPermiso(form:NgForm){
    let body = new URLSearchParams();
      body.set('id', this.id);
      body.set('token', this.token);
      body.set('cargo',form.value.idCargo);
      body.set('permiso',form.value.idPermiso);
      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
    const req=this.http.post(this.baseApiUrl+'Permisos/agregaPermiso',body.toString(), options)
      .subscribe(res=>{
          //logica
          if(res==true){
            window.location.reload();
          }
      },
      err=>{console.log("Error ocurred")});
  }

  eliminaPermiso(cargo,permiso){
    let body = new URLSearchParams();
      body.set('id', this.id);
      body.set('token', this.token);
      body.set('cargo',cargo);
      body.set('permiso',permiso);
      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
    const req=this.http.post(this.baseApiUrl+'Permisos/eliminaPermiso',body.toString(), options)
      .subscribe(res=>{
          //logica
          if(res==true){
            window.location.reload();
          }
      },
      err=>{console.log("Error ocurred")});
  }


} 
