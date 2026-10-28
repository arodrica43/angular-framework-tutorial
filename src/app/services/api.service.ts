import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  rootURL: string = "http://localhost:8000/"

  async get(path: string){
    let result = await fetch(this.rootURL + path)
      .then(response => response.json())
      .catch(error => console.error('Error:', error));
    return result;
  }

  async post(path: string, body: any){
    let result = await fetch(this.rootURL + path,{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .catch(error => console.error('Error:', error));
    return result;
  }

  async listUsers(){
    let result = await this.get("user")
    return result
  }


   async createrUser(userData: any){
    let result = await this.post("user", userData)
    return result
  }


}
