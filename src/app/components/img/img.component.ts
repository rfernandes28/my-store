import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  img: string = '';

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img')
  public set changeImg(newImg: string) {
    this.img = newImg;
    // se puede ejecutar codigo cuando cambie este input especifico
   // console.log('cambio de img>>>', this.img);

  }

  // Input obtner el valor desde el componente padre
  @Input() alt: string = '';

  @Output() loaded = new EventEmitter<string>();
  imageDefault = './assets/images/default.png';

  // counter = 0;
  // counterFn: number | undefined;

  constructor() {
    // antes del render
    // no correr async
    // corre una sola vez por instancia
//console.log('soy constructor', 'imageDefault>>', this.imageDefault);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // antes y durante del render
    // actualiza cambios de los inputs
    // corre muchas veces

   // console.log('soy ngOnChanges', 'imageDefault>>', this.imageDefault);
    console.log('changes>>', changes);
    //SimpleChanges llegan todos los cambios de los inputs
  }

  ngOnInit(): void {
    //antes del render
    //corre async
    //corre una sola vez

    console.log('soy ngOnInit', 'imageDefault>>', this.imageDefault);

    // this.counterFn = window.setInterval(() => {
    //   this.counter += 1;
    //   console.log('Run counter');
    // }, 1000);
  }

  ngAfterViewInit(): void {
    // corre despues del render
    // manejamos los hijos
    console.log('soy ngAfterViewInit', 'imageDefault>>', this.imageDefault);
  }

  ngOnDestroy(): void {
    // cuando se elimina el componente
    console.log('soy ngOnDestroy', 'imageDefault>>', this.imageDefault);
    // window.clearInterval(this.counterFn);
  }

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    // console.log('Loaded');
    this.loaded.emit(this.img);
  }
}
