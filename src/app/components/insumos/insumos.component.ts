import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalVariable } from '../../global';

declare var jQuery:any;
declare var $:any; 

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styles: []
})
export class InsumosComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }
  private baseApiUrl = GlobalVariable.BASE_API_URL;

  groupList;

  insumoId;
  insumoName;
  insumoDescrip;
  insumoEstId;
  insumoEst; 

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




    //peticiones
    listarGrouList(id,token){
      let body = new URLSearchParams();
        body.set('id', id);
        body.set('token', token);
      let options = {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
      const req=this.http.post(this.baseApiUrl+'insumos/ListGroup',body.toString(), options)
        .subscribe(res=>{ this.groupList= res; },
        err=>{console.log("Error ocurred")});
    }

    inserta(form:NgForm){
      let body = new URLSearchParams();
      body.set('id', this.id);
      body.set('token', this.token);
      body.set('nombre',form.value.nombre);
      body.set('descripcion',form.value.descripcion);
      body.set('estado',form.value.estado);
      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
      const req=this.http.post(this.baseApiUrl+'insumos/insertInsumo',body.toString(), options)
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
      const req=this.http.post(this.baseApiUrl+'insumos/InsumoById',body.toString(), options)
        .subscribe(res=>{
          this.insumoId=res[0].id;
          this.insumoName=res[0].nombre;
          this.insumoDescrip=res[0].descripcion;
          this.insumoEstId=res[0].idEstado;
          this.insumoEst=res[0].estado;
         },
        err=>{console.log("Error ocurred")});
    }

    actualiza(form:NgForm){
      let body = new URLSearchParams();
        body.set('id', this.id);
        body.set('token', this.token);
        body.set('idInsumo',form.value.idInsumo);
        body.set('nombre',form.value.nombre);
        body.set('descripcion',form.value.descripcion);
        body.set('estado',form.value.estado);
        console.log("body");
        let options = {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        console.log("opciones");
      const req=this.http.post(this.baseApiUrl+'insumos/updateLocal',body.toString(), options)
        .subscribe(res=>{
            //logica
            if(res==true){
              window.location.reload();
            }
        },
        err=>{console.log("Error ocurred")});
    }

}
