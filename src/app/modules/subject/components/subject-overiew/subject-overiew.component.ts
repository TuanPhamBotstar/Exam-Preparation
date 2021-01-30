import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectApiService } from '../../services/subject-api.service ';
import { CreateSubjectComponent } from '../create-subject/create-subject.component';

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
    const user_id = JSON.parse(localStorage.getItem('user')).user_id;
    this.subjectApi.getSubjects(user_id).subscribe((data => this.subjects = data))
  }
 
  onCreateSubject(){
    console.log('create subject test')
    this.router.navigate(['/bo-de/tao-bo-de']);
  }
  detailSubject(subject_id){
    this.router.navigate(['/chi-tiet'],{queryParams:{bo_de:subject_id}});
  }
  ///
  onActive(cpnRef){
    console.log(cpnRef)
    cpnRef.testViewChild(12)
  }
}
