import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, zip } from 'rxjs';
import { environment } from 'src/environments/environment';
import { checkTime } from '../interceptors/time.interceptor';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = `${environment.API_URL_TEST}/api`;
  constructor(private http: HttpClient) {}

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();

    if (limit && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http
      .get<Product[]>(`${this.apiUrl}/products`, {
        params,
        context: checkTime(),
      })
      .pipe(
        retry(3),
        map((products) =>
          products.map((item) => {
            return {
              ...item,
              taxes: 0.19 * item.price,
            };
          })
        )
      );
  }

  getByCategory(categotyId: string, limit?: number, offset?: number) {
    let params = new HttpParams();

    if (limit && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http
      .get<Product[]>(`${this.apiUrl}/categories/${categotyId}/products`, {
        params,
      })
      .pipe(
        retry(3),
        map((products) =>
          products.map((item) => {
            return {
              ...item,
              taxes: 0.19 * item.price,
            };
          })
        )
      );
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleErrors(error);
      })
    );
  }

  handleErrors(error: HttpErrorResponse): Observable<never> {
    if (error.status == HttpStatusCode.Forbidden)
      throw new Error('No tiene permisos para realizar la solicitud.');
    if (error.status == HttpStatusCode.NotFound)
      throw new Error('El producto no existe.');
    if (error.status == HttpStatusCode.InternalServerError)
      throw new Error('Error en el servidor.');
    throw new Error('Un error inesperado ha ocurrido.');
  }

  create(data: CreateProductDTO) {
    return this.http.post<Product>(`${this.apiUrl}/products`, data);
  }

  update(id: string, data: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }

  fetchReadAndUpdate(id: string, dto: UpdateProductDTO) {
    return zip(this.getProduct(id), this.update(id, dto));
  }
}

/*
PUT vs. PATCH, ¿cuál es la diferencia?
Técnicamente, los endpoints PUT deberían recibir todos los datos del registro a actualizar. Por ejemplo, el título, la descripción,
el precio, la categoría, etc. En cambio, PATCH debería solo recibir un campo individual a actualizar como solo el título, o solo la categoría.

De todos modos, también puedes utilizar endpoints del tipo PUT que reciban un solo dato a actualizar.
Ten en cuenta que PUT es mucho más utilizado que PATCH, pero si quieres refinar y ser estricto con tu backend y seguir a raja tabla las buenas prácticas,
PATCH es ideal para este tipo de actualizaciones de tus datos.
*/
