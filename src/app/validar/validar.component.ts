import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DocumentoService } from '../services/documento.service';
import { IpService } from '../services/ip.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-validar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './validar.component.html',
  styleUrl: './validar.component.css'
})
export class ValidarComponent implements OnInit {
  formulario: FormGroup;
  isLoading = false;
  mensaje: string | null = null;
  esExito = false;
  documentoData: any = null;
  ipAddress: string | undefined;
  fechaHoraConsulta: string | undefined;

  constructor(
    private fb: FormBuilder,
    private documentoService: DocumentoService,
    private ipService: IpService,
    private route: ActivatedRoute
  ) {
    this.formulario = this.fb.group({
      codigo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Comprobar si hay un parámetro 'codigo' en la URL
    this.route.queryParams.subscribe(params => {
      const codigoUrl = params['codigo'];
      if (codigoUrl) {
        this.formulario.patchValue({ codigo: codigoUrl });
        this.validarCodigo();
      }
    });
  }

  validarCodigo(): void {
    if (this.formulario.invalid) {
      return;
    }

    this.isLoading = true;
    const codigo = this.formulario.get('codigo')?.value;

    this.documentoService.validarCodigo(codigo).subscribe({
      next: (response) => {
        this.isLoading = false;

        if (response.exito) {
          this.mensaje = 'Código validado con éxito';
          this.esExito = true;
          this.obtenerDatos(codigo);

          this.ipService.getIp().subscribe((data) => {
            this.ipAddress = data.ip;
            this.fechaHoraConsulta = new Date().toLocaleString();

            if (this.ipAddress && this.fechaHoraConsulta) {
              this.ipService.postIp(this.ipAddress, this.fechaHoraConsulta).subscribe(
                (response) => {
                },
                (error) => {
                  console.error('Error al guardar la IP', error);
                }
              );
            }
          });
        } else {
          this.mensaje = 'Documento no encontrado o firma inválida';
          this.esExito = false;
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error al validar el código:', err);
        this.mensaje = 'Error al validar el código';
        this.esExito = false;
      }
    });
  }

  obtenerDatos(codigo: string): void {
    this.documentoService.obtenerDatos(codigo).subscribe({
      next: (data) => {
        this.documentoData = data.documento;
      },
      error: (err) => {
        console.error('Error al obtener los datos del documento:', err);
        this.mensaje = 'Error al obtener los datos del documento';
        this.esExito = false;
      }
    });
  }
}

