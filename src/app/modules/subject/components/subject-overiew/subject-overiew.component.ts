import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subject-overiew',
  templateUrl: './subject-overiew.component.html',
  styleUrls: ['./subject-overiew.component.css']
})
export class SubjectOveriewComponent implements OnInit {

  constructor(
    public router:Router,
  ) { }

  ngOnInit(): void {
  }
  onCreateSubject(){
    console.log('create subject test')
    this.router.navigate(['/bo-de/tao-bo-de']);
  }
}
