import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubjectApiService } from 'src/app/modules/subject/services/subject-api.service ';
import { SubjectService } from 'src/app/modules/subject/services/subject.service';

@Component({
  selector: 'app-config-menu',
  templateUrl: './config-menu.component.html',
  styleUrls: ['./config-menu.component.css']
})
export class ConfigMenuComponent implements OnInit {
  editSubjectForm: FormGroup;
  editBox: boolean = false;
  editSuccess: boolean = false;
  subscription: Subscription;
  confirmBlock: boolean = false;
  subject_id: string;
  subjectName: string;
  subjectNameConfirm: string = "";
  statusConfirm: boolean = false;
  page: number;
  formBuilder: FormBuilder;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private subjectService: SubjectService,
    private subjectApi: SubjectApiService,
  ) { }

  ngOnInit(): void {
    this.formBuilder = new FormBuilder();
    this.initialEditSubjectForm(this.subjectName);
    this.activatedRoute.queryParams.subscribe(data => {
      if(data.subject){
        this.subject_id = data.subject;
        this.subjectApi.getSubjectName(this.subject_id).subscribe(data => {
          if(data.subjectname){
            this.subjectName = data.subjectname.toUpperCase();
            this.initialEditSubjectForm(this.subjectName);
          }
        })
      }
      if(data.page){
        this.page = data.page;
      }
    })  
  }
  initialEditSubjectForm(subjectname: string) {
    this.editSubjectForm = this.formBuilder.group({
      subjectname: [subjectname, [Validators.required]]
    })
  }
  onSave(subjectname: string) {
    this.subjectApi.editSubjectName(this.subject_id, {subjectname: subjectname}).subscribe(data => {
      console.log(data)
      if(data.subjectname){
        this.editSuccess = true;
      }
      this.subjectName = data.subjectname;
      setTimeout(() => this.editSuccess = false, 1000)
    })
  }
  onEditSubject(){
    this.editBox = !this.editBox;
    this.initialEditSubjectForm(this.subjectName);
  }
  onDelSubject() {
    this.subjectService.removeSubject(this.subject_id);
    this.router.navigate(['/subjects'], { queryParams: { page: this.page? this.page: 1 } });
    this.confirmBlock = !this.confirmBlock;
  }
  openConfirmBlock() {
    if(this.subjectName.toLocaleUpperCase() === this.subjectNameConfirm.toLocaleUpperCase()){ 
      this.confirmBlock = !this.confirmBlock;
      this.statusConfirm = false;
    }
    else{
      this.statusConfirm = true;
    }
  }
  onClose(){
    this.editBox = !this.editBox;
  }
  showtext(txt){
    this.statusConfirm = false;
    this.subjectNameConfirm = txt;
    console.log(this.subjectNameConfirm)
  }
}
