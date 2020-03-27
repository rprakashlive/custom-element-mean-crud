import {OnInit, Component, ViewChild, EventEmitter, Input, Output, ElementRef, ViewEncapsulation, SimpleChanges } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs/Subscription';
import { ModalManager } from 'ngb-modal';

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
  private modalRef;

  constructor(private modalService: ModalManager, private productService: ProductService) { }
  private subscription: Subscription
  ngOnInit() {
    this.subscription = this.productService.getCurrentUserObj().subscribe(value => {
      this.user = value;
      console.log("subscribe",this.user);
    });
  }

  submitModalData(data) {
    this.user['name'] = data['name'];
    this.user['address'] = data['address'];
    this.productService.setCurrentUserObj(this.user);
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
