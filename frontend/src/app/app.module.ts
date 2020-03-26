import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, ComponentFactoryResolver } from '@angular/core';
import { createCustomElement } from "@angular/elements";
import { ModalModule } from 'ngb-modal';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';

// without using angular elements
import { AngularCustomElementsBridge } from './angular-elements-bridge';
import { CustomElementsWrapper } from './custom-elements-wrapper';
import { ProductComponent } from './product/product.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    ModalModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [],
  entryComponents: [ProductComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}


  // ngDoBootstrap() {
  //   const factory = this.injector
  //     .get(ComponentFactoryResolver)
  //     .resolveComponentFactory(AppComponent);
  //   const bridge = new AngularCustomElementsBridge(this.injector, AppComponent, factory);
  //   bridge.prepare();
  //   CustomElementsWrapper.bridge = bridge;
  //   factory.inputs
  //     .map(({ propName }) => propName)
  //     .forEach(property => {
  //       Object.defineProperty(CustomElementsWrapper.prototype, property, {
  //         get: function() {
  //           return bridge.getInput(property);
  //         },
  //         set: function(newValue: any) {
  //           bridge.setInput(property, newValue);
  //         },
  //         configurable: true,
  //         enumerable: true
  //       });
  //     });
  //   customElements.define('app-root', CustomElementsWrapper);
  // }
  
  ngDoBootstrap() {
    const el = createCustomElement(ProductComponent, { injector: this.injector });
    customElements.define('app-product', el as any);
   }
 }
