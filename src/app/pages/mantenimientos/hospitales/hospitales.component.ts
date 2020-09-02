import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { HospitalService } from '../../../services/hospital.service';
import { BusquedasService } from '../../../services/busquedas.service';

import { Hospital } from '../../../models/hospital.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-hospitales',
	templateUrl: './hospitales.component.html',
	styles: []
})
export class HospitalesComponent implements OnInit, OnDestroy {
	public hospitales: Hospital[];
	public imgSubs: Subscription;
	public cargando: boolean = true;
	public hospitalesTemp: Hospital[] = [];

	constructor(
		private hospitalService: HospitalService,
		private modalImagenService: ModalImagenService,
		private busquedasService: BusquedasService
	) {}
	ngOnDestroy(): void {
		this.imgSubs.unsubscribe();
	}

	ngOnInit(): void {
		this.cargarHospitales();

		this.imgSubs = this.modalImagenService.nuevaImagen.pipe(delay(100)).subscribe((img) => {
			this.cargarHospitales();
		});
	}

	cargarHospitales() {
		this.cargando = true;
		this.hospitalService.cargarHospitales().subscribe((hospitales: Hospital[]) => {
			this.cargando = false;
			this.hospitales = hospitales;
			this.hospitalesTemp = this.hospitales;
		});
	}

	guardarCambios(hospital) {
		this.hospitalService.actualizarHospital(hospital._id, hospital.nombre).subscribe((resp) => {
			//console.log(resp);
			Swal.fire('Actualizado', hospital.nombre, 'success');
		});
	}

	eliminarHospital(hospital) {
		this.hospitalService.borrarHospital(hospital._id).subscribe((resp) => {
			this.cargarHospitales();
			Swal.fire('Borrado', hospital.nombre, 'success');
		});
	}

	async abrirSweetAlert() {
		const { value = '' } = await Swal.fire<string>({
			title: 'Crear Hospital',
			text: 'Ingrese el nombre del nuevo hospital',
			input: 'text',
			inputPlaceholder: 'Ingrese el nombre del hospital',
			showCancelButton: true
		});

		if (value.trim().length > 0) {
			this.hospitalService.crearHospital(value.trim()).subscribe((resp: any) => {
				this.hospitales.push(resp.hospital);
			});
		}
	}

	abrirModal(hospital: Hospital) {
		this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
	}

	buscar(termino: string) {
		if (termino.length === 0) {
			return (this.hospitales = this.hospitalesTemp);
		}

		this.busquedasService.buscar('hospitales', termino).subscribe((resultados: any) => {
			this.hospitales = resultados;
		});
	}
}
