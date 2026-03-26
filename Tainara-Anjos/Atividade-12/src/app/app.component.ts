import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { FormRecord, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Atividade-12';
    formulario: FormGroup;

  constructor(private fb: FormBuilder) {
     this.formulario = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],

      telefones: this.fb.array([
        this.fb.control('')
      ]),
      redes: new FormRecord({
        instagram: new FormControl(''),
        facebook: new FormControl('')
      })
    });
  }
  get telefones() {
    return this.formulario.get('telefones') as FormArray;
  }
  adicionarTelefone() {
    this.telefones.push(this.fb.control(''));
  }
  removerTelefone(index: number) {
    this.telefones.removeAt(index);
  }
  get redes() {
    return this.formulario.get('redes') as FormRecord;
  }
  adicionarRede(nome: string) {
    if (nome) {
      this.redes.addControl(nome, new FormControl(''));
    }
  }
  removerRede(nome: string) {
    this.redes.removeControl(nome);
  }
  onSubmit() {
    console.log(this.formulario.value);
  }
}
