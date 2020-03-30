import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs/Subscription';

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
  constructor(private userService: UserService) { }
  private subscription: Subscription  
 
  ngOnInit() {
    this.subscription = this.userService.getCurrentUserObj().subscribe(value => {
      this.user = value;
      console.log("subscribe",this.user);
    });
  }

  submitModalData(data) {
    this.user['email'] = data['email'];
    this.user['phone'] = data['phone'];
    this.userService.setCurrentUserObj(this.user);
  }
} 
