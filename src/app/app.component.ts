import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FilesService } from './services/files.service';
import { TokenService } from './services/token.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  token = '';
  imagen = '';

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private userService: UsersService,
    private filesService: FilesService
  ) {}

  ngOnInit(): void {
    const token = this.tokenService.getToken()
    if(token){
      this.authService.profile().subscribe()
    }
  }

  createUser() {
    this.userService
      .create({
        name: 'Ricardo',
        email: 'ricardo@mail.com',
        password: '123456',
      })
      .subscribe((rta) => {
        console.log('user create', rta);
      });
  }

  downlaodPDF() {
    this.filesService
      .getFile('my.txt', './../assets/files/texto.txt', 'application/txt')
      .subscribe();
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.filesService.uploadFile(file).subscribe((data) => {
        this.imagen = data.location;
      });
    }
  }
}
