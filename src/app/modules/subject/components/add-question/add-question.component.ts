import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


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
  public addQuestionForm:FormGroup;
  constructor(
    public activatedRoute: ActivatedRoute,
    public formBuilder:FormBuilder,
    public http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(data => this.subjectname = data.bo_de);
    this.createAddQuestionForm();
    console.log(this.answers.controls[0])
    this.http.get('http://localhost:8082/questions').subscribe(data => console.log(data))
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
  onAddQuestion(){
    console.log(this.addQuestionForm.value);
    let newQuestion = { 
      questionTitle: "1+1=?", 
      level: 1, 
      answers: [ 
          { "content": "2", "isCorrect": true }, 
          { "content": "3", "isCorrect": false }, 
          { "content": "5", "isCorrect": false } 
        ] 
      }
    this.http.post('http://localhost:8082/questions',newQuestion);
  }

}
