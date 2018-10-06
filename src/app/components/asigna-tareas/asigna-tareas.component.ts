import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalVariable } from '../../global';

declare var jQuery:any;
declare var $:any; 

interface TotalResponse {
  total : number,
  subtotal: number,
  igv:number
}
interface DatosBoleta{
  serie : string,
  numero : number,
  fechaRegistro : string,
  datos : string
}

@Component({
  selector: 'app-asigna-tareas',
  templateUrl: './asigna-tareas.component.html',
  styles: []
})
export class AsignaTareasComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }
  private baseApiUrl = GlobalVariable.BASE_API_URL;

  misClientes;
  groupList;
  servicios;
  trabajadores;
  misServicios;
  misTrabajadores;
  resumenTarea;
  
  serieBoleta;
  numBoleta;
  fechaBoleta;

  totalTarea;
  subTotalTarea;
  IgvTarea;

  idTarea;

  date = new Date();
  hoy = this.obtenerFecha();
  dateData;

  id=localStorage.getItem('id');
  token=localStorage.getItem('token');
  
  ngOnInit() {
    this.listarTareas(this.hoy);
  }

  abrirModalNuevo(){
    $('#ModalRegistro').modal('show');
    this.listarClientes();
  }

  abrirModalServicio(idTarea){
    $('#ModalServicios').modal('show');
    this.idTarea=idTarea;
    this.listarServicios();
    this.listarMisServicios(idTarea);
  }

  abrirModalPago(idTarea){
    this.idTarea=idTarea;
    this.resumenTotal(idTarea);
    $('#ModalPago').modal('show');
  }

  abrirModalCancela(idTarea){
    this.idTarea=idTarea;
    $('#ModalCancelar').modal('show');
  }

  abrirModalTrabajadores(idTarea){
    this.idTarea=idTarea;
    this.listarTrabjadores();
    this.listarMisTrabajadores(idTarea);
    $('#ModalTrabajadores').modal('show');
  }

  abrirModalRecibos(idTarea){
    this.idTarea=idTarea;
    this.obtenerDatosFacturacion(idTarea);
    this.resumenTotal(idTarea);
    this.totalPago(idTarea);
    $("#ModalRecibos").modal('show');
  }


  //calculos
  obtenerFecha(){
    var dia=this.date.getDate();
    var mes=(this.date.getMonth()+1);
    var anio=this.date.getFullYear();
    var mesStr;
    var diaStr;
    if(mes<10){
      mesStr='0'+mes;
    }else{
      mesStr=mes;
    }
    if(dia<10){
      diaStr='0'+dia;
    }else{
      diaStr=dia;
    }
    var final=anio+'-'+mesStr+'-'+diaStr;
    //console.log(final);
    return final;
  }

  //peticiones
  llamarLista(form:NgForm){
    var data=form.value.dateData;
    this.listarTareas(data);
  }

  listarTareas(date){
    let body = new URLSearchParams();
      body.set('id', this.id);
      body.set('token', this.token);
      body.set('date',date);
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'/Tareas/listarTareas',body.toString(), options)
      .subscribe(res=>{ 
        this.groupList= res;
      },
      err=>{console.log("Error ocurred")});
  }

  listarClientes(){
    let body = new URLSearchParams();
      body.set('id', this.id);
      body.set('token', this.token);
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Clientes/listSelect',body.toString(), options)
      .subscribe(res=>{ 
        this.misClientes= res;
      },
      err=>{console.log("Error ocurred")});
  }

  listarServicios(){
    let body = new URLSearchParams();
      body.set('id', this.id);
      body.set('token', this.token);
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Servicios/selectList',body.toString(), options)
      .subscribe(res=>{ 
        this.servicios= res;
      },
      err=>{console.log("Error ocurred")});
  }

  listarTrabajadores(){
    let body = new URLSearchParams();
      body.set('id', this.id);
      body.set('token', this.token);
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Servicios/selectList',body.toString(), options)
      .subscribe(res=>{ 
        this.servicios= res;
      },
      err=>{console.log("Error ocurred")});
  }

  inserta(form:NgForm){
    let body = new URLSearchParams();
    body.set('id', this.id);
    body.set('token', this.token);
    body.set('cliente',form.value.cliente);
    body.set('fecha',form.value.fecha);
    body.set('estado',form.value.estado);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Tareas/insertaTarea',body.toString(), options)
    .subscribe(res=>{
        //logica
        if(res==true){
          window.location.reload();
        }
    },
    err=>{console.log("Error ocurred")});
    console.log(body.toString());
  }

  insertaServicioInTarea(form:NgForm){
    let body = new URLSearchParams();
    body.set('id', this.id);
    body.set('token', this.token);
    body.set('tarea',form.value.idtarea);
    body.set('servicio',form.value.idservicio);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Tareas/insertaServicioToTarea',body.toString(), options)
    .subscribe(res=>{
        //logica
        this.listarMisServicios(form.value.idtarea);
    },
    err=>{console.log("Error ocurred")});
  }

  listarMisServicios(idTarea){
    let body = new URLSearchParams();
    body.set('id', this.id);
    body.set('token', this.token);
    body.set('tareaId',idTarea);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Tareas/listarServicioByTarea',body.toString(), options)
    .subscribe(res=>{ 
      this.misServicios= res;
    },
    err=>{console.log("Error ocurred")});
  }

  eliminaServicio(idTarea,idServicio){
    let body = new URLSearchParams();
    body.set('id', this.id);
    body.set('token', this.token);
    body.set('tarea',idTarea);
    body.set('servicio',idServicio);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Tareas/eliminaServicioTarea',body.toString(), options)
    .subscribe(res=>{ 
      this.listarMisServicios(idTarea);
    },
    err=>{console.log("Error ocurred")});
  }

  resumenTotal(idTarea){
    let body = new URLSearchParams();
    body.set('id', this.id);
    body.set('token', this.token);
    body.set('tarea',idTarea);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Tareas/resumenTotal',body.toString(), options)
    .subscribe(res=>{
      this.resumenTarea=res;
    },
    err=>{console.log("Error ocurred")});
  }

  totalPago(idTarea){
    let body = new URLSearchParams();
    body.set('id', this.id);
    body.set('token', this.token);
    body.set('tarea',idTarea);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post<TotalResponse>(this.baseApiUrl+'Tareas/montoTotal',body.toString(), options)
    .subscribe(res=>{
      this.totalTarea=res.total;
      this.subTotalTarea=res.subtotal;
      this.IgvTarea=res.igv 
    },
    err=>{console.log("Error ocurred")});
  }

  finalizarTarea(form:NgForm){
    let body = new URLSearchParams();
    body.set('id', this.id);
    body.set('token', this.token);
    body.set('tarea',form.value.idTarea);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Tareas/finalizaTarea',body.toString(), options)
    .subscribe(res=>{
      window.location.reload();
    },
    err=>{console.log("Error ocurred")});
  }

  cancelarTarea(form:NgForm){
    let body = new URLSearchParams();
    body.set('id', this.id);
    body.set('token', this.token);
    body.set('tarea',form.value.idTarea);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Tareas/cancelaTarea',body.toString(), options)
    .subscribe(res=>{
      window.location.reload();
    },
    err=>{console.log("Error ocurred")});
  }

  listarTrabjadores(){
    let body = new URLSearchParams();
    body.set('id', this.id);
    body.set('token', this.token);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Trabajadores/listarTrabajadores',body.toString(), options)
    .subscribe(res=>{
      console.log(res);
      this.trabajadores=res;
    },
    err=>{console.log("Error ocurred")});
  }

  insertaTrabajadorInTarea(form:NgForm){
    let body = new URLSearchParams();
    body.set('id', this.id);
    body.set('token', this.token);
    body.set('tarea',form.value.idtarea);
    body.set('trabajador',form.value.idTrabajador);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Tareas/agregaTrabajadorToTarea',body.toString(), options)
    .subscribe(res=>{
      this.listarMisTrabajadores(form.value.idtarea);
    },
    err=>{console.log("Error ocurred")});
  }

  listarMisTrabajadores(idTarea){
    let body = new URLSearchParams();
    body.set('id', this.id);
    body.set('token', this.token);
    body.set('tareaId',idTarea);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Tareas/listarTrabajadoresByTarea',body.toString(), options)
    .subscribe(res=>{ 
      this.misTrabajadores= res;
    },
    err=>{console.log("Error ocurred")});
  }

  eliminaTrabajador(idTarea,idTrabajador){
    let body = new URLSearchParams();
    body.set('id', this.id);
    body.set('token', this.token);
    body.set('tarea',idTarea);
    body.set('trabajador',idTrabajador);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Tareas/eliminaTrabajadorByTarea',body.toString(), options)
    .subscribe(res=>{ 
      console.log(res);
      this.listarMisTrabajadores(idTarea);
    },
    err=>{console.log("Error ocurred")});
  }

  obtenerDatosFacturacion(idTarea){
    let body = new URLSearchParams();
    body.set('id', this.id);
    body.set('token', this.token);
    body.set('tarea',idTarea);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post<DatosBoleta>(this.baseApiUrl+'Tareas/obtenDatosFacturacion',body.toString(), options)
    .subscribe(res=>{
      if (res==null){
        this.serieBoleta=null;
        this.numBoleta=null;
        this.fechaBoleta=null;
        $('#dtosBoleta').css('display','none');
        $('#btnPrint').css('display','none');
        $('#formBoleta').css('display','block');
        $('#modalBody').css('display','block');
        $('#msjComponent').html('');
      }else if(res.datos == '0'){
        $('#modalBody').css('display','none');
        $('#msjComponent').html('Tarea Cancelada');
      }else{
        this.serieBoleta=res[0].serie;
        this.numBoleta=res[0].numero;
        this.fechaBoleta=res[0].fechaRegistro;
        $('#dtosBoleta').css('display','block');
        $('#btnPrint').css('display','block');
        $('#formBoleta').css('display','none');
        $('#modalBody').css('display','block');
        $('#msjComponent').html('');
      }
      console.log(res);
    },
    err=>{console.log("Error ocurred")});
  }

  insertaBoleta(form:NgForm){
    let body = new URLSearchParams();
    body.set('id', this.id);
    body.set('token', this.token);
    body.set('tarea',form.value.idtarea);
    body.set('serie',form.value.serie);
    body.set('numero',form.value.numero);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const req=this.http.post(this.baseApiUrl+'Tareas/insertaBoleta',body.toString(), options)
    .subscribe(res=>{ 
      
    },
    err=>{console.log("Error ocurred")});
  }




}
