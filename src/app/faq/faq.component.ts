import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  faqList = [
    {
      question: '¿Cómo hago un pedido?',
      answer: 'Para hacer un pedido, anda a la página de productos, selecciona los artículos que deseas y procede a la página de carrito para completar tu compra.',
      showAnswer: false
    },
    {
      question: '¿Cuánto tiempo tomará en recibir mi pedido?',
      answer: 'El tiempo de entrega depende de tu ubicación y del método de envío que elijas. Generalmente, los pedidos se entregan en un plazo de 3-7 días hábiles.',
      showAnswer: false
    },
    {
      question: '¿Cuáles son las opciones de pago?',
      answer: 'Aceptamos tarjetas de crédito, PayPal y transferencia bancaria como formas de pago. Proximamente criptomonedas',
      showAnswer: false
    },
    {
      question: '¿Cuál es nuestra política de devoluciones?',
      answer: 'Aceptamos devoluciones en un plazo de 30 días a partir de la fecha de entrega. Por favor, revisa nuestra política de devoluciones completa para obtener más detalles.',
      showAnswer: false
    },
    {
      question: '¿Cómo puedo ponerme en contacto con el servicio de atención al cliente?',
      answer: 'Puedes ponerte en contacto con nuestro servicio de atención al cliente a través del correo electrónico soporte@freemarket.com o llamando al +54 9 11 7577-3492.',
      showAnswer: false
    },
    {
      question: '¿Cuál es la política de garantía de productos?',
      answer: 'Ofrecemos garantía de 1 año en la mayoría de nuestros productos. Si encuentras algún problema con un producto dentro de ese período, contáctanos para solicitar una reparación o reemplazo.',
      showAnswer: false
    },
    {
      question: '¿Qué hago si mi producto llega dañado?',
      answer: 'Si tu producto llega dañado o defectuoso, comunicate con nuestro servicio de atención al cliente de inmediato. Te proporcionaremos instrucciones sobre cómo devolver el producto y obtendrás un reemplazo o un reembolso, según corresponda.',
      showAnswer: false
    }
    
  ];

  toggleAnswer(question: any) {
    question.showAnswer = !question.showAnswer;
  }
}