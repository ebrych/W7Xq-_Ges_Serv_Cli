import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (){}
  AppName = 'Nombre Empresa';

  public helloString: string="hola mundo";
  
  logout(){
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
  }


}


