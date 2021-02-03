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
        mergeMap((action: QuestionActions.LoadQuestions) => this.subjectApi.getQuestions(action.subject_id, action.page)
            .pipe(
                map((data) => new QuestionActions.LoadQuestionsSuccess(data)),
                catchError(error => of(new QuestionActions.LoadQuestionsFailure(error))) 
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

    constructor(
        private actions$: Actions,
        private subjectApi: SubjectApiService,
    ) { }
}

