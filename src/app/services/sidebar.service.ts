import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SidebarService {
	menu: any[] = [
		{
			titulo: 'Dashboard',
			icono: 'mdi mdi-gauge',
			submenu: [
				{ titulo: 'Main', url: '/' },
				{ titulo: 'Promesas', url: '/dashboard/promesas' },
				{ titulo: 'RxJs', url: '/dashboard/rxjs' },
				{ titulo: 'Graficas', url: '/dashboard/grafica1' },
				{ titulo: 'Progressbar', url: '/dashboard/progress' }
			]
		}
	];

	constructor() {}
}
