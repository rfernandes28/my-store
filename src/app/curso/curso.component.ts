import { Component } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-curso-root',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss'],
})
export class CursoComponent {
  name = 'Ricardo';
  age = 27;
  img = 'https://source.unsplash.com/random';
  btnDisabled = false;
  person = {
    name: 'Jose',
    age: 62,
    avatar: 'https://source.unsplash.com/random',
  };

  widthImg = 10;

  newName = '';

  emojis: string[] = ['😂', '🐦', '🐳', '🌮', '💚'];

  productsEJ: Product[] = [
    {
      id: '1',
      title: 'EL mejor juguete',
      price: 565,
      images: ['./assets/images/toy.jpg'],
      category: {
        id: '1',
        name: 'a',
      },
    },
    {
      id: '2',
      title: 'Bicicleta casi nueva',
      price: 356,
      images: ['./assets/images/bike.jpg'],
      category: {
        id: '1',
        name: 'a',
      },
    },
    {
      id: '3',
      title: 'Colleción de albumnes',
      price: 34,
      images: ['./assets/images/album.jpg'],
      category: {
        id: '1',
        name: 'a',
      },
    },
    {
      id: '4',
      title: 'Mis libros',
      price: 23,
      images: ['./assets/images/books.jpg'],
      category: {
        id: '1',
        name: 'a',
      },
    },
    {
      id: '5',
      title: 'Casa para perro',
      price: 34,
      images: ['./assets/images/house.jpg'],
      category: {
        id: '1',
        name: 'a',
      },
    },
    {
      id: '6',
      title: 'Gafas',
      price: 3434,
      images: ['./assets/images/glasses.jpg'],
      category: {
        id: '1',
        name: 'a',
      },
    },
  ];

  box = {
    width: 100,
    height: 100,
    background: 'red',
  };

  register = {
    name: '',
    email: '',
    password: '',
  };

  imgParent = '';

  //https://www.w3schools.com/howto/img_avatar.png

  toggleButton() {
    this.btnDisabled = !this.btnDisabled;
  }
  increaseAge() {
    this.person.age += 1;
  }

  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    // console.log(element.scrollTop);
  }

  onKeyUp(event: Event) {
    const element = event.target as HTMLInputElement;
    // console.log(element.value);
    this.person.name = element.value;
  }

  addName() {
    this.emojis.push(this.newName);
    this.newName = '';
  }

  deleteName(index: number) {
    this.emojis.splice(index, 1);
  }

  onRegister() {
    // console.log(this.register);
  }

  onLoaded(img: string) {
    // console.log('loaded padre:', img);
  }

  showImg = true;

  toggleImg() {
    this.showImg = !this.showImg;
  }
}
