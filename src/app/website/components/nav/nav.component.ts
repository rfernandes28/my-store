import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
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
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private router: Router,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
    this.getAllCategories();

    this.authService.user$.subscribe((data) => {
      this.profile = data;
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
      .loginAndGetProfile('admin@mail.com', 'admin123')
      .subscribe(() => {
        this.router.navigate(['/profile']);
      });
      // .subscribe((user) => {
      //   this.profile = user;
      // });
  }

  getProfile() {
    this.authService.profile().subscribe((rta) => {
      this.profile = rta;
    });
  }

  getAllCategories() {
    this.categoriesService.getAll().subscribe((data) => {
      this.categories = data;
    });
  }

  logout() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }
}
