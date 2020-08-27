import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class Usuario {
	constructor(
		public nombre: string,
		public email: string,
		public password?: string,
		public img?: string,
		public google?: boolean,
		public role?: string,
		public uid?: string
	) {}

	get imagenUrl() {
		//http://localhost:3000/api/upload/usuarios/c8af990d-77fe-4a89-9512-6d031991cee6.jpg
		if (this.img.includes('https')) {
			return this.img;
		}
		if (this.img) {
			return `${base_url}/upload/usuarios/${this.img}`;
		} else {
			return `${base_url}/upload/usuarios/no-image`;
		}
	}
}
