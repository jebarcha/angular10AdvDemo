import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-modal-imagen',
	templateUrl: './modal-imagen.component.html',
	styles: []
})
export class ModalImagenComponent implements OnInit {
	public imagenSubir: File;
	public imgTemp: any = '';

	constructor(public modalImagenService: ModalImagenService, public fileUploadService: FileUploadService) {}

	ngOnInit(): void {}

	cerrarModal() {
		this.imgTemp = null;
		this.modalImagenService.cerrarModal();
	}

	cambiarImagen(file: File) {
		this.imagenSubir = file;

		if (!file) {
			return (this.imgTemp = null);
		}

		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onloadend = () => {
			this.imgTemp = reader.result;
		};
	}

	subirImagen() {
		const { id, tipo } = this.modalImagenService;

		//console.log('SubirImagen', tipo, id, this.imagenSubir);

		this.fileUploadService
			.actualizarFoto(this.imagenSubir, tipo, id)
			.then((img: any) => {
				Swal.fire('Guardado', 'Imagen actualizada', 'success');
				//console.log('emit img', img);
				this.modalImagenService.nuevaImagen.emit(img);

				this.cerrarModal();
			})
			.catch((err) => {
				console.log(err);
				Swal.fire('Error', 'No se pudo subir la imagen', 'error');
			});
	}
}
