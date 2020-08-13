import { Component } from '@angular/core';

@Component({
	selector: 'app-grafica1',
	templateUrl: './grafica1.component.html',
	styles: []
})
export class Grafica1Component {
	labels1: string[] = [ 'Alitas', 'Papas', 'Refresco' ];
	labels2: string[] = [ 'Carne', 'Carbon', 'Cerveza' ];
	labels3: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
	labels4: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];

	public data1 = [ [ 50, 15, 5 ] ];
	public data2 = [ [ 10, 50, 90 ] ];
	public data3 = [ [ 350, 450, 100 ] ];
	public data4 = [ [ 100, 20, 15 ] ];
}
