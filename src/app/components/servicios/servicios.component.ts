import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalVariable } from '../../global';

declare var jQuery:any;
declare var $:any; 

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styles: []
})
export class ServiciosComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }
  private baseApiUrl = GlobalVariable.BASE_API_URL;

  groupList;
  tipoPrecio;
  insumos;
  misInsumos;

  servId;
  servDescripcion;
  servCat;
  setvCost;
  servEst;


  id=localStorage.getItem('id');
  token=localStorage.getItem('token');

  ngOnInit() {
    this.listarGrouList(this.id,this.token);
  }

  abrirModalNuevo(){
    this.listarTipoPrecio();
    $('#ModalRegistro').modal('show');
  }
  abrirModalEditaRegistro(){
    $('#ModalEdicion').modal('show');
  }
  abrirInsumos(id){
    this.servId=id;
    this.listarInsumos();
    this.litarMisInsumos(id)
    $("#ModalInsumos").modal('show');
  }



  //peticiones
  listarGrouList(id,token){
    let body = new URLSearchParams();
      body.set('id', id);
      body.set('token', token);
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Servicios/ListGroup',body.toString(), options)
      .subscribe(res=>{ this.groupList= res; },
      err=>{console.log("Error ocurred")});
  }

  listarTipoPrecio(){
    let body = new URLSearchParams();
      body.set('id', this.id);
      body.set('token', this.token);
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Servicios/listarTipoPrecio',body.toString(), options)
      .subscribe(res=>{ this.tipoPrecio= res; },
      err=>{console.log("Error ocurred")});
  }

  listarInsumos(){
    let body = new URLSearchParams();
      body.set('id', this.id);
      body.set('token', this.token);
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Insumos/SelectList',body.toString(), options)
      .subscribe(res=>{ this.insumos= res; },
      err=>{console.log("Error ocurred")});
  }

  inserta(form:NgForm){
    let body = new URLSearchParams();
    body.set('id', this.id);
    body.set('token', this.token);
    body.set('descripcion',form.value.descripcion);
    body.set('categoria',form.value.categoria);
    body.set('costo',form.value.costo);
    body.set('estado',form.value.estado);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Servicios/insertServicio',body.toString(), options)
    .subscribe(res=>{
        //logica
        if(res==true){
          window.location.reload();
        }
    },
    err=>{console.log("Error ocurred")});
    console.log(body.toString());
  }

  insertaInsumo(form:NgForm){
    let body = new URLSearchParams();
      body.set('id', this.id);
      body.set('token', this.token);
      body.set('servicio', form.value.idServicio);
      body.set('insumo',form.value.idInsumo);
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Servicios/agregarInsumoToServicio',body.toString(), options)
      .subscribe(res=>{
        this.litarMisInsumos(form.value.idServicio);
      },
      err=>{console.log("Error ocurred")});
  }


  buscarById(id){
    this.abrirModalEditaRegistro();
    this.listarTipoPrecio();
    let body = new URLSearchParams();
      body.set('id', this.id);
      body.set('token', this.token);
      body.set('servicioId', id);
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Servicios/buscaServiciosById',body.toString(), options)
      .subscribe(res=>{
        this.servId=res[0].id;
        this.servDescripcion = res[0].descripcion;
        this.servCat=res[0].idCategoriaPrecio;
        this.setvCost=res[0].costo;
        this.servEst=res[0].estado;
       },
      err=>{console.log("Error ocurred")});
  }

  actualiza(form:NgForm){
    let body = new URLSearchParams();
      body.set('id', this.id);
      body.set('token', this.token);
      body.set('idServicio',form.value.idServicio);
      body.set('descripcion',form.value.descripcion);
      body.set('categoria',form.value.categoria);
      body.set('costo',form.value.costo);
      body.set('estado',form.value.estado);
      console.log("body");
      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
      console.log("opciones");
    const req=this.http.post(this.baseApiUrl+'Servicios/updateServicio',body.toString(), options)
      .subscribe(res=>{
          //logica
          if(res==true){
            window.location.reload();
          }
      },
      err=>{console.log("Error ocurred")});
  }

  litarMisInsumos(id){
    let body = new URLSearchParams();
      body.set('id', this.id);
      body.set('token', this.token);
      body.set('servicio',id);
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Servicios/listarMisInsumos',body.toString(), options)
      .subscribe(res=>{ this.misInsumos=res ; },
      err=>{console.log("Error ocurred")});
  }

  eliminaInsumo(servicio,insumo){
    let body = new URLSearchParams();
      body.set('id', this.id);
      body.set('token', this.token);
      body.set('servicio',servicio);
      body.set('insumo',insumo);
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Servicios/eliminaInsumo',body.toString(), options)
      .subscribe(res=>{
        this.litarMisInsumos(servicio); 
        console.log(res) 
      },
      err=>{console.log("Error ocurred")});
  }
  



}
