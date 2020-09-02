import { Component, OnInit, OnDestroy } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-medicos',
	templateUrl: './medicos.component.html',
	styles: []
})
export class MedicosComponent implements OnInit, OnDestroy {
	public cargando: boolean = true;
	public imgSubs: Subscription;
	public medicos: Medico[];
	public medicosTemp: Medico[] = [];

	constructor(
		private medicoService: MedicoService,
		private modalImagenService: ModalImagenService,
		private busquedasService: BusquedasService
	) {}
	ngOnDestroy(): void {
		this.imgSubs.unsubscribe();
	}

	ngOnInit(): void {
		this.cargarMedicos();

		this.imgSubs = this.modalImagenService.nuevaImagen.pipe(delay(100)).subscribe((img) => {
			this.cargarMedicos();
		});
	}

	cargarMedicos() {
		this.cargando = true;
		this.medicoService.cargarMedicos().subscribe((medicos) => {
			this.cargando = false;
			this.medicos = medicos;
			this.medicosTemp = this.medicos;
		});
	}

	buscar(termino: string) {
		if (termino.length === 0) {
			return (this.medicos = this.medicosTemp);
		}

		this.busquedasService.buscar('medicos', termino).subscribe((resultados: any) => {
			this.medicos = resultados;
		});
	}

	abrirModal(medico: Medico) {
		//console.log(medico);
		this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
	}

	borrarMedico(medico: Medico) {
		Swal.fire({
			title: 'Borrar Medico?',
			text: `Esta a punto de borrar a ${medico.nombre}`,
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Si, borrarlo!'
		}).then((result) => {
			if (result.value) {
				this.medicoService.borrarMedico(medico._id).subscribe((resp) => {
					this.cargarMedicos();
					Swal.fire('Borrado!', 'El medico ha sido borrado.', 'success');
				});
			}
		});
	}
}
