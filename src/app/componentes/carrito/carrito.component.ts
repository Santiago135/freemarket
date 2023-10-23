import { Component, ElementRef, ViewChild } from '@angular/core';
import { CarritoItem } from 'src/app/entidades/carrito-item';
import { Producto } from 'src/app/entidades/producto';
import { CarritoService } from 'src/app/services/carrito.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  public carrito: CarritoItem[] = [];
  public total: number = 0;
  private totales: number[] = [];
  public showModal = false;
  public selectedItem: Producto = new Producto();
  public showModalDeleteItem = false;
  public printingPDF = false;

  constructor(public carritoService: CarritoService) {
    this.UpdateCarritoPrice();
    this.content = new ElementRef(null);
  }

  public AddItem(producto: Producto) {
    this.carritoService.AddToCart(producto);
    this.UpdateCarritoPrice();
  }

  public AskRemoveItem(producto: Producto) {
    this.selectedItem = producto;
    this.showModalDeleteItem = true;
  }

  public RemoveItem() {
    this.carritoService.RemoveFromCart(this.selectedItem.id);
    this.UpdateCarritoPrice();
    this.showModalDeleteItem = false;
  }

  private UpdateCarritoPrice() {
    this.carrito = this.carritoService.GetCarrito();
    this.totales = this.carrito.map(x => x.cantidad * x.producto.precio);
    this.total = this.totales.reduce((total, valor) => total + valor, 0);
  }

  public VaciarCarrito() {
    this.showModal = true;
  }

  public ClearCarrito() {
    this.carritoService.ClearCart();
    location.reload();
  }

  public closeModal() {
    this.showModal = false;
    this.showModalDeleteItem = false;
  }

  @ViewChild('contenido') content: ElementRef;

  // exportToPDF() {
  //   const data = this.content.nativeElement;
  //   let date = new Date().toLocaleString();
  //   let name = "factura-" + date
  //   this.printingPDF = true
  //   setTimeout(() => {
  //     html2canvas(data).then(canvas => {
  //       const imgWidth = 210;
  //       const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //       const contentDataURL = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF('p', 'mm', 'a4');
  //       pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
  //       pdf.save(name + ".pdf");
  //     });
  //     this.printingPDF = false;
  //   }, 100)
  // }

  exportToPDF() {
    const data = this.content.nativeElement;
    let fecha = new Date();
    let date = fecha.toLocaleString();
    let name = "factura-" + date
    this.printingPDF = true;
    setTimeout(() => {
      html2canvas(data).then(canvas => {
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.setFontSize(10);

        const texto1 = 'Gracias por confiar en nuestros productos/servicios. Su satisfacción es nuestra prioridad. Si necesita asistencia ';
        const texto2 = "adicional o tiene alguna pregunta, no dude en ponerse en contacto con nosotros. Esperamos seguir siendo su elección ";
        const texto3 = "preferida. ¡Gracias por su negocio! Compra efectuada el: " + date;
        pdf.setTextColor(150, 150, 150);
        pdf.text(texto1, 10, pdf.internal.pageSize.height - 15);
        pdf.text(texto2, 10, pdf.internal.pageSize.height - 10);
        pdf.text(texto3, 10, pdf.internal.pageSize.height - 5);
        pdf.save(name + ".pdf");

      });
      this.printingPDF = false;
    }, 5)
  }
}