import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';

import { Usuario } from '../../../models/usuario.model';

import { UsuarioService } from '../../../services/usuario.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-usuarios',
	templateUrl: './usuarios.component.html',
	styles: []
})
export class UsuariosComponent implements OnInit, OnDestroy {
	public totalUsuarios: number = 0;
	public usuarios: Usuario[] = [];
	public usuariosTemp: Usuario[] = [];

	public imgSubs: Subscription;
	public desde: number = 0;
	public cargando: boolean = true;

	constructor(
		private usuarioService: UsuarioService,
		private busquedasService: BusquedasService,
		private modalImagenService: ModalImagenService
	) {}

	ngOnInit(): void {
		this.cargarUsuarios();

		this.imgSubs = this.modalImagenService.nuevaImagen.pipe(delay(100)).subscribe((img) => {
			this.cargarUsuarios();
		});
	}

	ngOnDestroy() {
		this.imgSubs.unsubscribe();
	}

	cargarUsuarios() {
		this.cargando = true;
		this.usuarioService.cargarUsuarios(this.desde).subscribe(({ total, usuarios }) => {
			this.totalUsuarios = total;
			this.usuarios = usuarios;
			this.usuariosTemp = this.usuarios;
			this.cargando = false;
		});
	}

	cambiarPagina(valor: number) {
		this.desde += valor;

		if (this.desde < 0) {
			this.desde = 0;
		} else if (this.desde > this.totalUsuarios) {
			this.desde -= valor;
		}

		this.cargarUsuarios();
	}

	buscar(termino: string) {
		//console.log(termino);

		if (termino.length === 0) {
			return (this.usuarios = this.usuariosTemp);
		}

		this.busquedasService.buscar('usuarios', termino).subscribe((resultados) => {
			this.usuarios = resultados;
		});
	}

	eliminarUsuario(usuario: Usuario) {
		if (usuario.uid === this.usuarioService.uid) {
			return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
		}

		Swal.fire({
			title: 'Borrar Usuario?',
			text: `Esta a punto de borrar a ${usuario.nombre}`,
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Si, borrarlo!'
		}).then((result) => {
			if (result.value) {
				this.usuarioService.eliminarUsuario(usuario).subscribe((resp) => {
					this.cargarUsuarios();
					Swal.fire('Borrado!', 'El usuario ha sido borrado.', 'success');
				});
			}
		});

		//console.log(usuario);
	}

	cambiarRole(usuario: Usuario) {
		console.log(usuario);
		this.usuarioService.guardarUsuario(usuario).subscribe((resp) => console.log(resp));
	}

	abrirModal(usuario: Usuario) {
		this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
	}
}