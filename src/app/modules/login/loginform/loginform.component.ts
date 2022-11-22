import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {

  formularioLogin: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.formularioLogin = fb.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  async loginFn() {
    let email = this.formularioLogin.controls['email'].value;
    let password = this.formularioLogin.controls['password'].value;
    alert("Ingresando: " + email)
    this.consumirLogin(email, password).subscribe((data) => {
      console.log(data);
      alert("Ingreso exitoso");
    }, (error) => {
      console.log("Error:", error);
      alert("Datos incorrectos");
    })
  }

  //ToDo: should be a service, and URL should not be local
  consumirLogin(email: string, password: string) {
    let url = 'http://localhost:3000/login'
    let datos = {
      email: email,
      password: password
    }
    return this.http.post(url, datos, { headers: { 'content-type': 'application/json' } })
  }
}
