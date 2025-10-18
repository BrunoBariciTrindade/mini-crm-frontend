
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ProductService } from '../service.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-home-page',
  imports: [  MatBadgeModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatGridListModule
  ,CommonModule,
  MatFormFieldModule,
  MatInputModule,
  FormsModule,RouterModule],
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePage {
constructor(public authService: AuthService) {} 
}



