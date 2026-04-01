//O AppModule é o módulo principal da aplicação Angular. Ele organiza os componentes, módulos importados e configurações globais.
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdutosListComponent } from './componentes/produtos-list/produtos-list.component';
import { ProdutosFormComponent } from './componentes/produtos-form/produtos-form.component';
import { ProdutosComponent } from './componentes/produtos/produtos.component';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    ProdutosComponent,
    ProdutosListComponent,
    ProdutosFormComponent
  ],
// Aqui declaro todos os componentes que serão usados na aplicação.

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
