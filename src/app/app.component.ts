import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  encryptionKey: string = 'my-secret-key';
  processedText: string = '';
  isSubmitted: boolean = false;
  status: string = '';
  form: FormGroup = {} as FormGroup;
  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      mainText: new FormControl('', Validators.required)
    })
  }

  onSubmit(): void {
    this.form.reset();
  }

  copyText(value: string): void {
    navigator.clipboard.writeText(value).then(() => {
      console.log('texto copiado', value);
    }).catch((err) => {
      console.error('Error al copiar texto', err);
    })
  }

  encrypt(value: string) : void {
    console.log(value);
    if (value){
      this.isSubmitted = true;
      const encrypted = CryptoJS.AES.encrypt(value, this.encryptionKey).toString()
      this.processedText = encrypted
      this.status = 'Encriptado'
    }
  }

  decrypt(value: string) : void {
    console.log(value);
    if (value) {
      this.isSubmitted = true;
      const decrypted = CryptoJS.AES.decrypt(value, this.encryptionKey).toString(CryptoJS.enc.Utf8)
      this.processedText = decrypted
      this.status = 'Desencriptado'
    }
  }
}
