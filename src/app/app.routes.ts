import { SuporteComponent } from './pages/suporte/suporte.component';
import { TourComponent } from './pages/tour/tour.component';
import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { LoginComponent } from './login/login.component';

import { HomePage } from './home-page/home-page.component';
import { CartComponent } from './cart/cart.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { FeaturesComponent } from './pages/features/features.component';
import { PremiumComponent } from './pages/premium/premium.component';
import { PrecosComponent } from './pages/precos/precos.component';



export const routes: Routes = [
  {path: 'login', component: LoginComponent },
  { path: 'home', component: HomePage },
  { path: 'produto', component: ProdutoComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'premium', component: PremiumComponent },
  { path: 'suporte', component: SuporteComponent },
  { path: 'precos', component: PrecosComponent },
  {path: 'clientes', component: ClienteComponent },
  {path: 'pedidos', component: PedidosComponent },
  {path: 'carrinho', component: CartComponent },
  
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // ou a home
];


