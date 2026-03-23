import { Component,  } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
title = 'Atividade-11';
   leis: boolean = false;
onChange(valor: boolean) {
  this.leis = valor;}
cadastrado: boolean = false;
cadastrar(form: any) {
  if (form.valid) {
    this.cadastrado = true;
  }
}
}
