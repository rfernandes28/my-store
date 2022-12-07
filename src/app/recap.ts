/*
String interpolation  {{ variable }}

String interpolation es la manera de enviar datos desde
nuestro componente hacia la vista. Utilizando el doble
símbolo de llaves {{ }}, o también conocidos como brackets,
puedes imprimir el valor de una variable, realizar
operaciones matemáticas o hacer el llamado a una función
dentro del código HTML.
*/

const username: string = 'rfernandes';

const sum = (a: number, b: number) => {
  return a + b;
};

sum(1, 2);

class Person {
  age: number;
  lastname: string;

  constructor(age: number, lastname: string) {
    this.age = age;
    this.lastname = lastname;
  }
}

const ricardo = new Person(27, 'Fernandes');

class Person2 {
  constructor(public age: number, public lastname: string) {}
}

const ricardo2 = new Person2(27, 'Fernandes');

////////////////////////////////////////

/*
Property Binding

Property Binding es la manera que dispone Angular para controlar y modificar las
 propiedades de los distintos elementos de HTML. Para esto, simplemente utiliza los corchetes []
 para poder modificar dinámicamente ese atributo desde el controlador.

Utilidades
El atributo src de la etiqueta <img> para modificar dinámicamente una imagen.
El atributo href de un <a> para modificar un enlace.
El atributo value de un <input> para autocompletar un valor de un formulario.
El atributo disable de un <input> para habilitar/deshabilitar un campo de un formulario.

*/

/*
Event Binding
A lo igual que el Property Binding nos permite modificar el valor de los atributos
de los elementos HTML desde el controlador, el Event Binding permite controlar los
eventos que suceden en estos elementos. El clic de un botón, detectar cambios en un campo,
el envío de un formulario, entre otros eventos. Para esto utiliza los paréntesis () para el
bindeo de la propiedad del elemento.
*/

/*
Data binding con ngModel  <input [(ngModel)]="name">

El atributo ngModel permite el intercambio de datos de forma bidireccional
entre el componente y la vista. Lo que suceda en el componente, se verá reflejado en la vista.
Lo que se suceda en la vista, inmediatamente impactará en el componente.

ngModel usar tanto los corchetes [] como los paréntesis (). De esta manera, se vuelve bidireccional
el intercambio de datos. Si no quieres la bidirección, solo colocamos los corchetes [ngModel] para
que la comunicación sea unidireccional.Para utilizar ngModel, es necesario hacer uso e importar Angular Forms.

*/

/*
Uso de *ngIf

Si la condición dentro del “If” se cumple, se mostrará el <div> con el respectivo contenido dentro. De lo contrario,
el usuario no verá dicho elemento en el navegador.

Para usar un else en Angular, la sintaxis es algo especial. Debes crear un template en tu código HTML usando la etiqueta
que provee Angular llamada <ng-template> con una Variable de Template, comenzando con #, para hacer referencia a este
elemento desde tu If.

<div *ngIf="isPlatzi; else templateElse">Hola, soy Platzi</div>
<ng-template #templateElse>
    <div>No soy Platzi</div>
</ng-template>

*/

/*

Al igual que con un If, Angular permite iterar un array de números, de cadenas de caracteres o de
objetos usando “*ngFor”.Si tienes en tu componente un array de datos

*/



/*

Ciclo de vida de componentes

Un componente pasa por varias etapas en su ciclo de vida. A través de hooks, puedes realizar una determinada acción cuando el componente es inicializado, cuando se dispara un evento, cuando se detecta un cambio, cuando el componente es destruido, etc.

A continuación, se detalla la secuencia de eventos y el orden de los mismos:

Hooks más utilizados
Constructor
Como en toda clase en la programación orientada a objetos, el constructor es quien crea la instancia del objeto y sus dependencias.

Solo se ejecuta una vez antes del render del componente.
No tiene que utilizarse para procesos asincrónicos.
ngOnChanges
El hook ngOnChanges() se dispara cada vez que se produce un cambio de estado en el componente. Cuando una variable cambia de valor, por ejemplo o ante el cambio de valor de un Input.

Se ejecuta N cantidad de veces antes y durante el render del componente.
Puede emplearse para procesos asincrónicos.
ngOnInit
Es el hook más usado, ngOnInit() es ideal para cualquier solicitud de datos asincrónicos a una API para preparar el componente antes de renderizarlo.

Únicamente se ejecuta una vez, antes del render del componente.
Puede usarse para procesos asincrónicos.
ngAfterViewInit
Este hook únicamente se ejecuta una vez cuando el render del componente haya finalizado. Puede serte útil para realizar acciones programáticas que requieran que todo el HTML del componente ya este preparado.

Únicamente se ejecuta una vez después del render del componente.
ngOnDestroy
Finalmente, ngOnDestroy() se ejecutará cuando el componente es destruido, o sea, cuando ya no existe en la interfaz del navegador. Suele utilizarse para liberar espacios de memoria que el componente requiera.

*/

/*
Liberando espacio de memoria
Todo el ecosistema Angular está basado en observables para el manejo asincrónico.

Cada vez que utilices un subscribe() para escuchar la respuesta de algún evento asincrónico (por ejemplo, el llamado a una API), es relevante realizar el respectivo unsubscribe() para liberar ese espacio en memoria.

RxJS
RxJS (Reactive Extensions Library for JavaScript) es una popular librería de Javascript para el manejo de observables. Si trabajas con Angular esta librería será tu mejor amiga.
*/
