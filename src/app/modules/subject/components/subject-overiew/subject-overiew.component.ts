import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectApiService } from '../../services/subject-api.service ';

@Component({
  selector: 'app-subject-overiew',
  templateUrl: './subject-overiew.component.html',
  styleUrls: ['./subject-overiew.component.css']
})
export class SubjectOveriewComponent implements OnInit {
  public subjects:any;
  constructor(
    public router:Router,
    private subjectApi: SubjectApiService,
  ) { }

  ngOnInit(): void {
    this.subjectApi.getSubject().subscribe((data => this.subjects = data))
  }
  onCreateSubject(){
    console.log('create subject test')
    this.router.navigate(['/bo-de/tao-bo-de']);
  }
  detailSubject(subjectname){
    this.router.navigate(['/chi-tiet'],{queryParams:{bo_de:subjectname}});
  }
}
