import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval, Subscriber, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
	selector: 'app-rxjs',
	templateUrl: './rxjs.component.html',
	styles: []
})
export class RxjsComponent implements OnDestroy {
	subscriber: Subscription;

	constructor() {
		// this.retornaObservable().pipe(retry(1)).subscribe(
		// 	(valor) => {
		// 		console.log('subs:', valor);
		// 	},
		// 	(error) => console.log(error),
		// 	() => console.log('completado')
		// );

		this.subscriber = this.retornaIntevalo().subscribe(console.log);
	}

	ngOnDestroy(): void {
		this.subscriber.unsubscribe();
	}

	retornaIntevalo(): Observable<number> {
		const intervalo$ = interval(500).pipe(map((valor) => valor + 1), filter((valor) => valor % 2 === 0));

		return intervalo$;
	}

	// retornaObservable(): Observable<number> {
	// 	let i = -1;

	// 	return new Observable<number>((observer) => {
	// 		const intervalo = setInterval(() => {
	// 			i++;
	// 			observer.next(i);
	// 			if (i === 4) {
	// 				observer.complete();
	// 				clearInterval(intervalo);
	// 			}
	// 			if (i === 2) {
	// 				i = 0;
	// 				observer.error('I llego al valor de 2');
	// 			}
	// 		}, 1000);
	// 	});
	// }
}
