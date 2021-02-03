import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as TestActions from '../actions/test.action';
import { TestApiService } from '../../services/test-api.service';



@Injectable({
    providedIn: 'root'
})

export class TestEffects {

    @Effect() loadTests$ = this.actions$.pipe(
        ofType(TestActions.LOAD_TESTS),
        mergeMap((action: TestActions.LoadTests) => this.testApi.getTestsBySubject_id(action.subject_id)
            .pipe(
                map((data) => new TestActions.LoadTestsSuccess(data)),
                catchError(error => of(new TestActions.LoadTestsFailure(error))) 
            )
        )
    )


    constructor(
        private actions$: Actions,
        private testApi: TestApiService,
    ) { }
}

