import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/authService';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.less']
})
export class SecretComponent implements OnInit {
  apiRespone: Object;

  constructor(private http: HttpClient, private authServie: AuthService) { }

  ngOnInit(): void {
    console.log(this.authServie.user$.value);
    this.http.get('http://localhost:3000/api/weather', {
      headers: {
        'Authorization': `Bearer ${this.authServie.user$.value?.idToken}`
      }
    }).subscribe({
      next: json => {
        this.apiRespone = JSON.stringify(json, null, 4);
      },
      error: error => {
        console.error(error);
        this.apiRespone = { error: 'something went wrong' }
      }
    });
  }

}
