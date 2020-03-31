import {OnInit, Component, ViewChild, EventEmitter, Input, Output, ElementRef, ViewEncapsulation, SimpleChanges } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { ModalManager } from 'ngb-modal';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError, interval  } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import * as socketIo from 'socket.io-client';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-personal-detail',
  templateUrl: './personal-detail.component.html',
  styleUrls: ['./personal-detail.component.scss']
})
export class PersonalDetailComponent implements OnInit {
  @Input() trigger: string;
  @Output() user_display = new EventEmitter();
  @ViewChild('myModal', {static: false}) myModal;
  user:any = {
    name : '',
    address : ''
  };
  pollingData: any;
  private modalRef;
  socket:any;
  

  constructor(private modalService: ModalManager, private userService: UserService, private http: HttpClient) { }
  private subscription: Subscription
  ngOnInit() {
    this.socket = socketIo('http://localhost:9000/');
    this.socket.on('element-comm',(data) => 
    this.user = data);

    this.subscription = this.userService.getCurrentUserObj().subscribe(value => {
      this.user = value;
      console.log("subscribe",this.user);

      this.pollingData = interval(1000).switchMap(() => this.http.get(environment.apiUrl + '/users')).subscribe((result: any[]) => {
         console.log("from personal details", result);       
      });
    });
  }

  submitModalData(data) {
    this.user['name'] = data['name'];
    this.user['address'] = data['address'];
    this.userService.setCurrentUserObj(this.user);
    this.socket.emit("element-comm", this.user);

  }

  ngOnDestroy() {
    this.pollingData.unsubscribe();
   }
    
 
  ngOnChanges(changes: SimpleChanges): void {
    console.log('check');
    if (changes.trigger.currentValue === 'VIEW') {
      this.trigger = null;
      this.openModal();
    } else if (changes.trigger.currentValue === 'ADD'){
      this.trigger = null;
      this.addUserDetails(this.user);
    }
}

addUserDetails(user) {
 console.log("initiated", user);

this.userService.addUser(user).subscribe(result => {
  if (result  && result.data) {
     window.alert("success");
    this.user_display.emit(user);
  }
}, error => {
  window.alert("error");
});
}

openModal(){
  this.modalRef = this.modalService.open(this.myModal, {
      size: "md",
      modalClass: 'mymodal',
      hideCloseButton: false,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: true,
      backdropClass: "modal-backdrop"
  })
  }

  closeModal(){
    this.modalService.close(this.modalRef);
  }
}
