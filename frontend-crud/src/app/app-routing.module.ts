//Esse arquivo configura as rotas da aplicação usando o Angular Router, permitindo navegar entre as telas

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutosListComponent } from './componentes/produtos-list/produtos-list.component';
import { ProdutosFormComponent } from './componentes/produtos-form/produtos-form.component';

const routes: Routes = [
  {path: '', component: ProdutosListComponent},
  {path: 'produtos',component: ProdutosListComponent},
  {path: 'produtos/create',component: ProdutosFormComponent},
  {path: 'produtos/edit/:id',component: ProdutosFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
