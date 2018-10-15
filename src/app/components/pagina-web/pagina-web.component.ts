import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalVariable } from '../../global';


declare var jQuery:any;
declare var $:any;

interface InfoContacto {
  telefono : string,
  mail: string,
  face:string,
  insta:string
}
interface Entrada{
  id : number,
  titulo: string,
  descripcion: string,
  orden : number
}
@Component({
  selector: 'app-pagina-web',
  templateUrl: './pagina-web.component.html',
  styles: []
})
export class PaginaWebComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }
  private baseApiUrl = GlobalVariable.BASE_API_URL;

  idEntrada;
  tituloEntrada;
  descripEntrada;
  ordenEntrada;

  EntradasList;
  numeroTef;
  emailCont;
  facebook;
  instagram;

  id=localStorage.getItem('id');
  token=localStorage.getItem('token');
  
  ngOnInit() {
    this.listarGrouList();
    this.traerDatoContacto();
  }

  abrirModalNuevaEntrada(){
    $("#ModalRegistroEntrada").modal('show');
  }
  editEntrada(id){
    $("#ModalEditaEntrada").modal('show');
    this.obtenerEntradaById(id);
  }
  editarIndoContacto(){
    $("#ModalEditaContacto").modal('show');
  }

 //peticiones
 listarGrouList(){
  let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };
  const req=this.http.get(this.baseApiUrl+'Website/getData', options)
    .subscribe(res=>{ this.EntradasList= res; },
    err=>{console.log("Error ocurred")});
  }

  insertaEntrada(form:NgForm){
    let body = new URLSearchParams();
    body.set('id', this.id);
    body.set('token', this.token);
    body.set('titulo',form.value.titulo);
    body.set('descripcion',form.value.descripcion);
    body.set('orden',form.value.orden);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Website/agregarInfoWeb',body.toString(), options)
    .subscribe(res=>{
        $("#ModalRegistroEntrada").modal('hide');
        this.listarGrouList();

    },
    err=>{console.log(err)});

  }

  obtenerEntradaById(id){
    let body = new URLSearchParams();
    body.set('id', this.id);
    body.set('token', this.token);
    body.set('infoWebId',id);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post<Entrada>(this.baseApiUrl+'Website/buscaInfoWeb',body.toString(), options)
    .subscribe(res=>{
      this.idEntrada=res[0].id;
      this.tituloEntrada=res[0].titulo;
      this.descripEntrada=res[0].descripcion;
      this.ordenEntrada=res[0].orden;
        
    },
    err=>{console.log(err)});
   
  }

  actualizaEntrada(form:NgForm){
    let body = new URLSearchParams();
    body.set('id', this.id);
    body.set('token', this.token);
    body.set('idEntrada',form.value.idEntrada);
    body.set('titulo',form.value.titulo);
    body.set('descripcion',form.value.descripcion);
    body.set('orden',form.value.orden);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Website/actualizaInfoWeb',body.toString(), options)
    .subscribe(res=>{
      this.listarGrouList();
      $("#ModalEditaEntrada").modal('hide');
    },
    err=>{console.log(err)});

  }

  deleteEntrada(id){
    let body = new URLSearchParams();
    body.set('id', this.id);
    body.set('token', this.token);
    body.set('infoWebId',id);;
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Website/eliminaIfoWeb',body.toString(), options)
    .subscribe(res=>{
        //logica
        this.listarGrouList();
    },
    err=>{console.log(err)});
  }


  traerDatoContacto(){
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.get<InfoContacto>(this.baseApiUrl+'Website/getContacto', options)
    .subscribe(res=>{
        this.numeroTef=res[0].numero;
        this.emailCont = res[0].mail;
        this.facebook=res[0].facebook;
        this.instagram=res[0].instagram;
        console.log(res);
     },
    err=>{console.log("Error ocurred")});
  }

  
  

  actualizaContacto(form:NgForm){
    let body = new URLSearchParams();
    body.set('id', this.id);
    body.set('token', this.token);
    body.set('numero',form.value.orden);
    body.set('numero',form.value.numero);
    body.set('mail',form.value.email);
    body.set('facebook',form.value.facebook);
    body.set('instagram',form.value.instagram);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Website/actualizaContacto',body.toString(), options)
    .subscribe(res=>{
        //logica
        $("#ModalEditaContacto").modal('hide');
        this.traerDatoContacto();
    },
    err=>{console.log(err)});
  }



}
