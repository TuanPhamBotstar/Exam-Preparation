import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as SubjectActions from '../actions/subject.action';
import { SubjectApiService } from '../../services/subject-api.service ';


@Injectable({
    providedIn: 'root'
})

export class SubjectEffects {

    @Effect() loadSubjects$ = this.actions$.pipe(
        ofType(SubjectActions.LOAD_SUBJECTS),
        mergeMap((action: SubjectActions.LoadSubjects) => this.subjectApi.getSubjects(action.user_id, action.page)
            .pipe(
                map((data) => new SubjectActions.LoadSubjectsSuccess(data)),
                catchError(error => of(new SubjectActions.LoadSubjectsFailure(error)))
            )
        )
    );

    @Effect() adsSubject$ = this.actions$.pipe(
        ofType(SubjectActions.ADD_SUBJECTS),
        mergeMap((action: SubjectActions.AddSubjects) => this.subjectApi.addSubject(action.payload)
            .pipe(
                map((data) => new SubjectActions.AddSubjectsSuccess(data)),
                catchError(error => of(new SubjectActions.AddSubjectsFailure(error)))
            )
        )
    );

    constructor(
        private actions$: Actions,
        private subjectApi: SubjectApiService,
    ) { }
}

