import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from "../../models/question.model";
// go to previous page
import {Location} from '@angular/common';
import { SubjectApiService } from '../../services/subject-api.service ';
import { SubjectService } from '../../services/subject.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  subscription2: Subscription;
  author: string;
  confirmBlock: boolean = false;
  perPage: number = 10;
  page: number;
  idxQs: number;
  showNewQuestion: boolean = false;
  newQs: any;
  answersArr: any;
  addQuestion: number = 0;
  editQuestion: number = 0;
  public question_id: string;
  public question: Question = null;
  public textLevel = ['', 'Easy', 'Normal', 'Hard'];
  public levels = [ 
    {name:"Easy", value : 1},
    {name: "Normal", value: 2},
    {name: "Hard", value:3}];  
  public subjectname: string;
  public subject_id: string;
  public addQuestionForm:FormGroup;
  constructor(
    public activatedRoute: ActivatedRoute,
    public formBuilder:FormBuilder,
    private router: Router,
    private _location:Location,
    public subjectService: SubjectService,
  ) { }

  ngOnInit(): void {
    this.author = JSON.parse(localStorage.getItem('user')).user_id;
    this.activatedRoute.queryParams.subscribe(data => {
      if(data.subject){
        this.subject_id =data.subject;
        this.page = data.page;
        if(data.question){
          this.question_id = data.question;
          this.subjectService.loadQuestion(this.question_id);
          this.editQuestion = 1;
          this.addQuestion = -1;
        }
        else{
          this.editQuestion = -1;
          this.addQuestion = 1;
          console.log('add qs')
          this.createAddQuestionForm();
          console.log('exit edit qs', this.answers)
        }
      }
      console.log(data)
    });

    this.subscription2 = this.subjectService.getSubject().subscribe(data => {  
      if(data.question.question != true && !data.question.loading){
        console.log('get question',data.question)
        this.idxQs = data.question.list.length;
        this.question = data.question.question;
        if(this.editQuestion === 1 && this.question ){
          this.createEditQuestionForm();
          this.question.answers.forEach(answer => {
            this.answers.push(this.formBuilder.group({
              content:[answer['content'],Validators.required],
              isCorrect:[answer['isCorrect']]
            }))
          })
        }
      }
    })
  }
  ngOnDestroy():void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
    if(this.subscription2){
      this.subscription2.unsubscribe();
    }
  }
  getSubject_id(id:string){
      this.subject_id = id;
  }
  createEditQuestionForm(){
    this.addQuestionForm = this.formBuilder.group({
      questionTitle:[this.question.title,[Validators.required]],
      level:[this.question.level,[Validators.required]],
      answers:this.formBuilder.array([])
    });
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
    this.newQs = newQuestion;
    // this.subjectApi.addQuestion(newQuestion).subscribe(data => console.log(data));
    if(this.addQuestion === 1){
      this.subjectService.addQuestion(newQuestion);
      if(this.idxQs === 10){
        this.page ++;
      }
      this.showNewQuestion = true;
      setTimeout(() => {this.showNewQuestion = false; this.addQuestionForm.reset();}, 1000);
    }
    if(this.editQuestion === 1){
      this.subjectService.editQuestion(this.question_id, newQuestion);
      this.subjectService.loadQuestion(this.question_id);
      this.showNewQuestion = true;
      setTimeout(() => {this.showNewQuestion = false}, 1000);
    }
    // this.subscription = this.subjectService.getSubject().subscribe(data => {
    //   console.log(data.question.total)
    //   this.page = Math.ceil(data.question.total/this.perPage);
    // })
  }
  onDeleteQuestion(){
    this.subjectService.deleteQuestion(this.question_id);
    if(this.idxQs === 1 && this.page > 1){
      this.page --;
    }
    this.router.navigate(['/subject/questions'], {queryParams: {subject: this.subject_id, page: this.page}});
  }
  onBack(){
    this.showNewQuestion = false;
    // this.subscription = this.subjectService.getSubject().subscribe(data => {
    //   console.log(data.question.total)
    // })
    this.router.navigate(['/subject/questions'], {queryParams: {subject: this.subject_id, page: this.page}})
    
  }
  openConfirmBlock(){
    this.confirmBlock = !this.confirmBlock;
  }
  
}
