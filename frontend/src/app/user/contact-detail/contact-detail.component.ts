import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs/Subscription';
import * as socketIo from 'socket.io-client';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError, interval  } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {
  user:any = {
    email : '',
    phone : ''
  };
  constructor(private userService: UserService, private http: HttpClient) { }
  private subscription: Subscription  
  socket:any;
  pollingData: any;

  ngOnInit() {
    this.socket = socketIo('http://localhost:9000/');
    this.socket.on('element-comm',(data) => this.user = data);
    this.subscription = this.userService.getCurrentUserObj().subscribe(value => {
      this.user = value;
      console.log("subscribe",this.user);
    });
    this.pollingData = interval(1000).switchMap(() => this.http.get(environment.apiUrl + '/users')).subscribe((result: any[]) => {
      console.log("from contact details", result);               
    });
  }

  ngOnDestroy() {
    this.pollingData.unsubscribe();
   }

  submitModalData(data) {
    this.user['email'] = data['email'];
    this.user['phone'] = data['phone'];
    this.userService.setCurrentUserObj(this.user);
    this.socket.emit("element-comm", this.user);
  }
} 
