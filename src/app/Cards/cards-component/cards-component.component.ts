import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, Event, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-cards-component',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cards-component.component.html',
  styleUrl: './cards-component.component.scss'
})
export class CardsComponentComponent implements OnInit {

  currentRoute: string = '';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = this.router.url.split('/')[1];
    });

    // Set the initial route
    this.currentRoute = this.router.url.split('/')[1];
  }

  goTo(route: string) {
    this.currentRoute = route;
    this.router.navigate([route], { relativeTo: this.route });
  }
}
