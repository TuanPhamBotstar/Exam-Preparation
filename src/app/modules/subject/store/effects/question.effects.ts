import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as QuestionActions from '../actions/question.action';
import { SubjectApiService } from '../../services/subject-api.service ';


@Injectable({
    providedIn: 'root'
})

export class QuestionEffects {

    @Effect() loadQuestions$ = this.actions$.pipe(
        ofType(QuestionActions.LOAD_QUESTIONS),
        mergeMap((action: QuestionActions.LoadQuestions) => this.subjectApi.getQuestions(action.author, action.subject_id, action.page)
            .pipe(
                map((data) => new QuestionActions.LoadQuestionsSuccess(data)),
                catchError(error => of(new QuestionActions.LoadQuestionsFailure(error))) 
            )
        )
    )

    @Effect() loadQuestion$ = this.actions$.pipe(
        ofType(QuestionActions.LOAD_QUESTION),
        mergeMap((action: QuestionActions.LoadQuestion) => this.subjectApi.getQuestion(action.id)
            .pipe(
                map((data) => new QuestionActions.LoadQuestionSuccess(data)),
                catchError(error => of(new QuestionActions.LoadQuestionFailure(error))) 
            )
        )
    )

    @Effect() addQuestion$ = this.actions$.pipe(
        ofType(QuestionActions.ADD_QUESTION),
        mergeMap((action: QuestionActions.AddQuestions) => this.subjectApi.addQuestion(action.payload)
            .pipe(
                map((data) => new QuestionActions.AddQuestionsSuccess(data)),
                catchError(error => of(new QuestionActions.AddQuestionsFailure(error)))
            )
        )
    )

    @Effect() editQuestion$ = this.actions$.pipe(
        ofType(QuestionActions.EDIT_QUESTION),
        mergeMap((action: QuestionActions.EditQuestion) => this.subjectApi.editQuestion(action.qs_id, action.payload)
            .pipe(
                map((data) => new QuestionActions.EditQuestionSuccess(data)),
                catchError(error => of(new QuestionActions.EditQuestionFailure(error)))
            )
        )
    )
    
    @Effect() delQuestion$ = this.actions$.pipe(
        ofType(QuestionActions.DEL_QUESTION),
        mergeMap((action: QuestionActions.DelQuestion) => this.subjectApi.delQuestion(action.payload)
            .pipe(
                map((data) => new QuestionActions.DelQuestionSuccess(data)),
                catchError(error => of(new QuestionActions.DelQuestionFailure(error)))
            )
        )
    )
    constructor(
        private actions$: Actions,
        private subjectApi: SubjectApiService,
    ) { }
}

