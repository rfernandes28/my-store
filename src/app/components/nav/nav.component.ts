import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  showMenu = false;
  counter = 0;
  profile: User | null = null;

  constructor(
    private storeService: StoreService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  login() {
    // this.authService.login('ricardo@mail.com', '123456').subscribe((rta) => {
    //   console.log('user login', rta.access_token);
    //   this.token = rta.access_token;
    //   this.getProfile();
    // });

    this.authService
      .loginAndGetProfile('ricardo@mail.com', '123456')
      .subscribe((user) => {
        this.profile = user;
      });
  }

  getProfile() {
    this.authService.profile().subscribe((rta) => {
      this.profile = rta;
    });
  }
}
