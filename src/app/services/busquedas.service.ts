import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
	providedIn: 'root'
})
export class BusquedasService {
	constructor(private http: HttpClient) {}

	get token(): string {
		return localStorage.getItem('token') || '';
	}

	get headers(): any {
		return {
			headers: {
				'x-token': this.token
			}
		};
	}

	private transformarUsuarios(resultados: any[]): Usuario[] {
		return resultados.map(
			(user) => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
		);
	}

	private transformarHospitales(resultados: Hospital[]): Hospital[] {
		return resultados;
		// return resultados.map(
		// 	(hospital) => new Hospital( hospital.nombre, hospital.uid, hospital.img, hospital.user)
		// );
	}

	private transformarMedicos(resultados: Medico[]): Medico[] {
		return resultados;
		// return resultados.map(
		// 	(hospital) => new Hospital( hospital.nombre, hospital.uid, hospital.img, hospital.user)
		// );
	}

	buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string) {
		const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
		//console.log(url);
		return this.http.get<any[]>(url, this.headers).pipe(
			map((resp: any) => {
				switch (tipo) {
					case 'usuarios':
						return this.transformarUsuarios(resp.resultados);
					case 'hospitales':
						return this.transformarHospitales(resp.resultados);
					case 'medicos':
						return this.transformarMedicos(resp.resultados);
					default:
						return [];
				}
			})
		);
	}
}
