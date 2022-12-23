import { Component, OnInit } from '@angular/core';
import { switchMap, zip } from 'rxjs';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private storeService: StoreService,
    private productService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  products: Product[] = [];
  myShoppingCart: Product[] = [];
  total: number = 0;
  today = new Date();
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    description: '',
    category: {
      id: '',
      name: '',
    },
  };
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  // products: Product[] = [
  //   {
  //     id: '1',
  //     name: 'EL mejor juguete',
  //     price: 565,
  //     image: './assets/images/toy.jpg',
  //     category: 'all',
  //   },
  //   {
  //     id: '2',
  //     name: 'Bicicleta casi nueva',
  //     price: 356,
  //     image: './assets/images/bike.jpg',
  //   },
  //   {
  //     id: '3',
  //     name: 'Colleción de albumnes',
  //     price: 34,
  //     image: './assets/images/album.jpg',
  //   },
  //   {
  //     id: '4',
  //     name: 'Mis libros',
  //     price: 23,
  //     image: './assets/images/books.jpg',
  //   },
  //   {
  //     id: '5',
  //     name: 'Casa para perro',
  //     price: 34,
  //     image: './assets/images/house.jpg',
  //   },
  //   {
  //     id: '6',
  //     name: 'Gafas',
  //     price: 3434,
  //     image: './assets/images/glasses.jpg',
  //   },
  // ];

  ngOnInit(): void {
    this.loadMore();
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
    // this.myShoppingCart.push(product);
    // this.total = this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
    // this.total = this.total + product.price;
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    this.productService.getProduct(id).subscribe({
      next: (data) => {
        this.productChosen = data;
        this.statusDetail = 'success';
        this.toggleProductDetail();
      },
      error: (error) => {
        this.statusDetail = 'error';
        window.alert(error);
        console.error('error =>', error);
      },
    });
  }

  readAndUpdate(id: string) {
    this.productService
      .getProduct(id)
      .pipe(
        switchMap((product) =>
          this.productService.update(product.id, {
            title: 'cambio de titulo callback hell',
          })
        )
      )
      .subscribe((data) => {
        console.log('data', data);
      });

    //Promise all para observables
    this.productService
      .fetchReadAndUpdate(id, { title: 'cambio de titulo callback hell' })
      .subscribe((data) => {
        const read = data[0];
        const update = data[1];
      });
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      price: 100,
      images: [''],
      title: 'Nuevo producto',
      description: 'bla bla',
      categoryId: 2,
    };
    this.productService.create(product).subscribe((data) => {
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'Nuevo titulo 3',
      images: [
        'https://placeimg.com/640/480/any',
        'https://placeimg.com/640/480/any',
      ],
      description: 'Producto de prueba Ric',
      price: 2500,
    };
    const id = this.productChosen.id;
    this.productService.update(id, changes).subscribe((data) => {
      const productIndex = this.products.findIndex((item) => item.id === id);
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex((item) => item.id === id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  loadMore() {
    this.productService
      .getAllProducts(this.limit, this.offset)
      .subscribe((data) => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
  }
}
