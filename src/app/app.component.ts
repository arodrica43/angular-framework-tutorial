import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'UMS';

  showModal = false;
  userForm;
  users: any;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
    
  }

  async ngOnInit() {
    this.users = await this.api.listUsers()
    console.log(this.users)
    this.users.map((x: any) => Object.assign(x, {img : "https://i.pravatar.cc/320?img=" + this.generateRandomValue(x.name)}))
  }

  generateRandomValue(name: string){
    return name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 71;
  }


  async openCreateUserForm() {
    //this.userForm.reset();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  async createUser(){
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const user = this.userForm.getRawValue();

    let result = await this.api.createrUser(user);

    this.closeModal();
  }
}
