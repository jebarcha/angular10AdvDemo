import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';

import { Hospital } from '../../../models/hospital.model';
import { Medico } from '../../../models/medico.model';
import Swal from 'sweetalert2';
import { error } from '@angular/compiler/src/util';
import { delay } from 'rxjs/operators';

@Component({
	selector: 'app-medico',
	templateUrl: './medico.component.html',
	styles: []
})
export class MedicoComponent implements OnInit {
	public medicoForm: FormGroup;
	public hospitales: Hospital[] = [];
	public hospitalSeleccionado: Hospital;
	public medicoSeleccionado: Medico;

	constructor(
		private fb: FormBuilder,
		private hospitalService: HospitalService,
		private medicoService: MedicoService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe(({ id }) => {
			//console.log(params);
			this.cargarMedico(id);
		});

		this.medicoForm = this.fb.group({
			nombre: [ '', Validators.required ],
			hospital: [ '', Validators.required ]
		});

		this.cargarHospitales();

		this.medicoForm.get('hospital').valueChanges.subscribe((hospitalId) => {
			this.hospitalSeleccionado = this.hospitales.find((h) => h._id === hospitalId);
			//console.log(this.hospitalSeleccionado);
			//console.log(hospitalId);
		});
	}

	cargarMedico(id: string) {
		if (id === 'nuevo') {
			return;
		}

		this.medicoService.obtenerMedicoPorId(id).pipe(delay(100)).subscribe((medico) => {
			//console.log(medico);
			if (!medico) {
				return this.router.navigateByUrl(`/dashboard/medicos`);
			}

			const { nombre, hospital: { _id } } = medico;
			this.medicoSeleccionado = medico;
			this.medicoForm.setValue({ nombre, hospital: _id });
		});
	}

	cargarHospitales() {
		this.hospitalService.cargarHospitales().subscribe((hospitales) => {
			this.hospitales = hospitales;
		});
	}

	guardarMedico() {
		const { nombre } = this.medicoForm.value;

		if (this.medicoSeleccionado) {
			// actualizar
			const data = {
				...this.medicoForm.value,
				_id: this.medicoSeleccionado._id
			};
			this.medicoService.actualizarMedico(data).subscribe((resp) => {
				Swal.fire('Modificado', `${nombre} actualizado correctamente`, 'success');
			});
		} else {
			// crear
			this.medicoService.crearMedico(this.medicoForm.value).subscribe((resp: any) => {
				//console.log(resp)
				Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
				this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
			});
		}
	}
}
