import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GraphComponent} from './graph/graph.component';

const routes: Routes = [
  {path: 'graph', component: GraphComponent},
  {path: ' ', redirectTo: '/graph'},
  {path: '**', redirectTo: '/graph'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
