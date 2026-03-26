import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; // 1. Tilføj RouterLink her

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink], // 2. Tilføj RouterLink her i arrayet
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'inventory-app';
}
