import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from '../../../../shared/models/subject.model';
import { SubjectApiService } from 'src/app/shared/Services/subject/subject-api.service ';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent implements OnInit {
  public subjectForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private subjectApi:SubjectApiService,
  ) { }

  ngOnInit(): void {
    this.subjectApi.getSubject().subscribe((data => console.log(data)))
    this.createSubjectFrom();
  }
  createSubjectFrom() {
    this.subjectForm = this.formBuilder.group({
      subjectname: ['', [Validators.required]]
    })
  }

  onCreateSubject(){
    console.log('create subject test')
    this.router.navigate(['/bo-de/tao-bo-de']);
  }
  
  onAddQuestion(subjectname: string) {
    const newSubject = new Subject('',subjectname,0,0);
    
    this.subjectApi.addSubject(newSubject);
    console.log('to add question')
    this.router.navigate(['/tao-cau-hoi'], { queryParams: { bo_de: subjectname } });
  }

  onClose(){
    this.router.navigate(['/']);
  }
}
