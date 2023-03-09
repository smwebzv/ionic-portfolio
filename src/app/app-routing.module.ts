import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MapModule } from './components/map/map.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/map/map.module').then(m => m.MapModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
