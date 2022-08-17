import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FAQsComponent implements OnInit {
  classList: any;
  nextElementSibling: any;

  constructor() {}

  ngOnInit(): void {
  }

  id: any = '';
  accordion(ids:any){
    if(this.id == ids){
      this.id = '';
    }
    else{
      this.id = ids;
    }
  }

//   public isShowing(): void{
// let faq = document.getElementsByClassName("faq-page");
// for ( let i = 0; i < faq.length; i++) {
//     faq[i].addEventListener("click",  () => {
//         /* Toggle between adding and removing the "active" class,
//         to highlight the button that controls the panel */
//         this.classList.toggle("active");
//         /* Toggle between hiding and showing the active panel */
//         var body = this.nextElementSibling;
//         if (body.style.display === "block") {
//             body.style.display = "none";
//         } else {
//             body.style.display = "block";
//         }
//     });
// }
//   }
}
