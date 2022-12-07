import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  //logica de negocio hacia los componentes
  /*
  Un servicio es la forma que utiliza Angular para modular una aplicación
  y crear código reutilizable, este tendrá una determinada lógica de negocio
  que puede ser usada por varios componentes u otros servicios.
  */
  constructor() {}

  private myShoppingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);

  // forma de observable variable$
  myCart$ = this.myCart.asObservable();

  /*
  El concepto de reactividad básica es muy importante en el desarrollo front-end. Se trata del estado de la aplicación
  con respecto al valor de los datos en cada componente, cómo estos cambian a medida que el usuario interactúa y cómo se actualiza la interfaz.

Problemas en la comunicación de componentes
Cuando pensamos en cómo comunicar un componente padre con su hijo y viceversa, solemos utilizar los decoradores @Input() y @Output().

Pero muchas veces, en aplicaciones grandes, la comunicación de componentes se vuelve mucho más compleja y estas herramientas
no alcanzan cuando se necesita enviar información de un componente “hijo” a uno “abuelo”.

Solución a la comunicación de componentes
Es recomendable implementar un patrón de diseño para mantener el estado de la aplicación centralizado en un único punto,
para que todos los componentes accedan a ellos siempre que necesiten. A este punto central se lo conoce como Store.
  */

  addProduct(product: Product) {
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);
  }

  getTotal() {
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }

  getShoppingCart() {
    return this.myShoppingCart;
  }
}
