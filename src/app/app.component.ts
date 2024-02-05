import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavDwComponent } from "./components/navDw/navDw.component";
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NavDwComponent]
})
export class AppComponent {
  title = 'GamblingFrontDW';
}
