import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from "../../models/question.model";
// go to previous page
import {Location} from '@angular/common';
import { SubjectApiService } from '../../services/subject-api.service ';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public levels = [ 
    {name:"Dễ", value : 1},
    {name: "Trung bình", value: 2},
    {name: "Khó", value:3}];
  public subjectname: string;
  public subject_id: string;
  public addQuestionForm:FormGroup;
  constructor(
    public activatedRoute: ActivatedRoute,
    public formBuilder:FormBuilder,
    public http: HttpClient,
    private _location:Location,
    public subjectApi: SubjectApiService,
  ) { }

  ngOnInit(): void {
    /* is instead to viewchild */
    // this.activatedRoute.queryParams.subscribe(data => {
    //   this.subjectname = data.bo_de;
    //   if(this.subjectname){
    //       this.subjectApi.getSubjectByName(this.subjectname).subscribe(data => {
    //       this.subject_id = data;
    //       console.log(this.subject_id);
    //     })
    //   }
    // });
    this.createAddQuestionForm();
    // console.log(this.answers.controls[0])
    // this.http.get('http://localhost:8082/api/admin/questions').subscribe(data => console.log(data))
  }
  getSubject_id(id:string){
      this.subject_id = id;
  }
  createAddQuestionForm(){
    this.addQuestionForm = this.formBuilder.group({
      questionTitle:['',[Validators.required]],
      level:[1,[Validators.required]],
      answers: this.formBuilder.array([
        this.newAnswer(),
        this.newAnswer(),
        this.newAnswer(),
      ])
    });
  }
  get answers(): FormArray{
    return this.addQuestionForm.get('answers') as FormArray;
  }
  newAnswer():FormGroup{
    return this.formBuilder.group({
      content:['',[Validators.required]],
      isCorrect:[false]
    })
  }
  addAnswer(){
    this.answers.push(this.newAnswer());
  }
  removeAnswer(i:number){
    this.answers.removeAt(i);
  }
  onSaveQuestion(){
    console.log(this.addQuestionForm.value);
    const newTitle = this.addQuestionForm.value.questionTitle;
    const newAnswer = this.addQuestionForm.value.answers;
    const newLevel = this.addQuestionForm.value.level;
    const newQuestion = new Question(newTitle,newAnswer,newLevel,'',this.subject_id);
    console.log(newQuestion);
    this.http.post('http://localhost:8082/api/admin/questions',newQuestion).subscribe(data => console.log(data));
    this.addQuestionForm.reset();
  }
  onBack(){
    this._location.back();
  }
  
}
