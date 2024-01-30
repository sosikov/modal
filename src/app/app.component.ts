import { ApplicationRef, Component, ComponentRef, EmbeddedViewRef, TemplateRef, createComponent } from '@angular/core';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  componentRef?: ComponentRef<ModalComponent>

  constructor(private applicationRef: ApplicationRef) {}

  show(template: TemplateRef<unknown>) {
    const environmentInjector = this.applicationRef.injector;

    this.componentRef = createComponent(ModalComponent, { environmentInjector });

    Object.assign(this.componentRef.instance, { template });

    const [rootNode] = (this.componentRef.hostView as EmbeddedViewRef<unknown>)
      .rootNodes as HTMLElement[];

    document.body.appendChild(rootNode);

    this.applicationRef.attachView(this.componentRef.hostView);

    document.body.classList.add('noscroll')
  }

  hide() {
    if (this.componentRef) {
      // this.applicationRef.detachView(this.componentRef.hostView);
  
      this.componentRef.destroy();

      delete this.componentRef

      // const [rootNode] = (this.componentRef.hostView as EmbeddedViewRef<unknown>)
      //   .rootNodes as HTMLElement[];
  
      // rootNode.remove();

      document.body.classList.remove('noscroll')
    }
  }
}
