import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { PermClass } from 'src/app/master/permission/Classes/perm-class';
import { PermServService } from 'src/app/master/permission/Services/perm-serv.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})



export class HeaderComponent implements OnInit {
  response: any;
  Response: PermClass[];

  constructor(private route: Router, public ser: PermServService) { }

  ngOnInit() {

   
    $(document).ready(function() { 
      //$(".hasmenu").trigger('click');
      if($("ul.hasSubMenu li").hasClass("active")) {
        $(".hasSubMenu").removeClass("noDisplay").addClass("DisplayMenu");
        $(".hasSubMenu").prev().parent(".pc-item").addClass("active");
        //alert("working");
        //$(".hasmenu").trigger('click');
      }
    }); 
    
    // setTimeout(function () {
    //   item.addClass('is-open');
    // }, 20);

    $(".hasmenu").on("click", function(){
      if($(".hasSubMenu").hasClass("noDisplay")) {
        $(".hasSubMenu").removeClass("noDisplay").addClass("DisplayMenu");
      } else {
        $(".hasSubMenu").removeClass("DisplayMenu").addClass("noDisplay");
      }
    });

    


    // $(".hasSubMenu").hide();
    // $("button.hasmenu").click(function () {
    //   $(".hasSubMenu").slideToggle("slow", function () {
    //     if ($(this).hide()) {
    //       $(this).show();
    //     }
    //     $(this).prev().parent().addClass("active");
    //   })
    // });

    // });


  }

  OnLogout() {
    localStorage.removeItem('token');
    this.route.navigate(['user/login']);
  }

  GetData() {
    debugger
    this.ser.GetAllService().subscribe(
      res => {
        if (res != null) {
          this.response = res;
          this.Response = this.response;
        }
      },
      err => { console.error() }
    );
  }

  // openMenu() {
  //   if ($(".pc-link").click()) {
  //     $(".hasmenu").trigger('click'); 
  //   }
  // }

}
