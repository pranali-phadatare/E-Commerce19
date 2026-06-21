import { Component, OnInit  } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-cart-contact',
  standalone: true,
  imports: [MatTabsModule, RouterOutlet],
  templateUrl: './cart-contact.component.html',
  styleUrl: './cart-contact.component.scss'
})
export class CartContactComponent implements OnInit {
  selectedTab = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        if (event.url.includes('contact-us')) {
          this.selectedTab = 1;
        } else {
          this.selectedTab = 0;
        }
      }
    });

  }

  onTabChange(event: MatTabChangeEvent) {

    if (event.index === 0) {
      this.router.navigate(['/cart']);
    } else {
      this.router.navigate(['/cart/contact-us']);
    }

  }
}
