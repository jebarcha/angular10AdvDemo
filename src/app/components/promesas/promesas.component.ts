import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-promesas',
	templateUrl: './promesas.component.html',
	styles: []
})
export class PromesasComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {
		//this.getUsuarios();
		this.getUsuarios().then((usuarios) => {
			console.log(usuarios);
		});

		// console.log('Inicio del ngOnInit');

		// const promesa = new Promise((resolve, reject) => {
		// 	if (false) {
		// 		resolve('Hola Mundo');
		// 	} else {
		// 		reject('Algo salio mal');
		// 	}
		// });

		// promesa
		// 	.then((msj) => {
		// 		console.log('Hey termine', msj);
		// 	})
		// 	.catch((err) => {
		// 		console.error(err);
		// 	});

		// console.log('Fin del ngOnInit');
	}

	getUsuarios() {
		// fetch('https://reqres.in/api/users?page=2').then((res) => {
		// 	console.log(res.json().then((body) => console.log(body)));
		// });

		const promesa = new Promise((resolve) => {
			fetch('https://reqres.in/api/users?page=2')
				.then((resp) => resp.json())
				.then((body) => console.log(body.data));
		});

		return promesa;
	}
}
