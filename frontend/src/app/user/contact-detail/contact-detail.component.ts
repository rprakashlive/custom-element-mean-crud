import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
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
  constructor(private productService: ProductService) { }
  private subscription: Subscription  
 
  ngOnInit() {
    this.subscription = this.productService.getCurrentUserObj().subscribe(value => {
      this.user = value;
      console.log("subscribe",this.user);
    });
  }

  submitModalData(data) {
    this.user['email'] = data['email'];
    this.user['phone'] = data['phone'];
    this.productService.setCurrentUserObj(this.user);
  }
} 
