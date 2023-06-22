import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'status',
    loadChildren: () => import('./status/status.module').then((m) => m.StatusModule),
  },
  {path: '', redirectTo: '404', pathMatch: 'full'},
  {path: '**', redirectTo: '404'},
];


@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes, {useHash: true, preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
