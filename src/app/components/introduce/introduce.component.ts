import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Introducer } from '../../shared/models/introduce.model';
@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.css']
})
export class IntroduceComponent implements OnInit {
  introduces:Introducer[] = [
    {
      title:'ĐỀ THI HỌC KỲ',
      content:'Tổng hợp các đề thi học kì các môn cấp 3 với các câu hỏi được phân loại khó, dễ, trung bình dưới hình thức trắc nghiệm.',
      action:'Đăng ký',
      imgUrl:'assets/img/feature1.jpg'
    },
    {
      title:'ĐỀ THI THPT QUỐC GIA',
      content:'Tổng hợp các đề thi trắc nghiệm online THPT Quốc Gia các môn Toán, Lý, Hóa, Sinh qua các năm.',
      action:'Đăng ký',
      imgUrl:'assets/img/feature2.jpg'
    },
    {
      title:'ĐỀ KIỂM TRA',
      content:'Tổng hợp các đề kiểm tra 15 phút, kiểm tra 1 tiết theo hình thức trắc nghiệm online.',
      action:'Đăng ký',
      imgUrl:'assets/img/feature3.jpg'
    },
  ];
  constructor(
    public activatedRoute:ActivatedRoute,
    public router:Router,
  ) { }

  ngOnInit(): void {
  }
  onSignUp(){
    this.router.navigate(['/tai-khoan/dang-ky'],{relativeTo:this.activatedRoute});
  }
}
