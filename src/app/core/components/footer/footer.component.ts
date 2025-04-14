import { Component } from '@angular/core';
import { ContainerComponent } from "../container/container.component";

@Component({
  selector: 'app-footer',
  imports: [ContainerComponent],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
