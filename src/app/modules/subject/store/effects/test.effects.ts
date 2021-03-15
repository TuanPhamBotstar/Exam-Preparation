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
        mergeMap((action: TestActions.LoadTests) => this.testApi.getTestsBySubject_id(action.author, action.subject_id)
            .pipe(
                map((data) => new TestActions.LoadTestsSuccess(data)),
                catchError(error => of(new TestActions.LoadTestsFailure(error))) 
            )
        )
    )
    @Effect() loadTesting$ = this.actions$.pipe(
        ofType(TestActions.LOAD_TESTING),
        mergeMap((action: TestActions.LoadTesting) => this.testApi.getTesting(action.test_id)
            .pipe(
                map((data) => new TestActions.LoadTestingSuccess(data)),
                catchError(error => of(new TestActions.LoadTestingFailure(error))) 
            )
        )
    )
    @Effect() loadDetailTest$ = this.actions$.pipe(
        ofType(TestActions.LOAD_DETAIL_TEST),
        mergeMap((action: TestActions.LoadDetailTest) => this.testApi.getDetaiTest(action.author, action.subject_id, action.test_id)
            .pipe(
                map((data) => new TestActions.LoadDetailTestSuccess(data)),
                catchError(error => of(new TestActions.LoadDetailTestFailure(error))) 
            )
        )
    )
    @Effect() addTest$ = this.actions$.pipe(
        ofType(TestActions.ADD_TEST),
        mergeMap((action: TestActions.AddTest) => this.testApi.addNewTest(action.payload)
            .pipe(
                map((data) => new TestActions.AddTestSuccess(data)),
                catchError(error => of(new TestActions.LoadTestsFailure(error))) 
            )
        )
    )
    @Effect() putTypeCode$ = this.actions$.pipe(
        ofType(TestActions.PUT_TYPE_CODE),
        mergeMap((action:TestActions.PutTypeCode) => this.testApi.putTypeCode(action.payload)
          .pipe(
            map((data) => new TestActions.PutTypeCodeSuccess(data)),
            catchError(error => of(new TestActions.PutTypeCodeFailure(error)))
          ))
      ); 
    @Effect() deleteTest$ = this.actions$.pipe(
        ofType(TestActions.DELETE_TEST),
        mergeMap((action:TestActions.DelTest) => this.testApi.delTest(action.test_id)
          .pipe(
            map((data) => new TestActions.DelTestSuccess(data)),
            catchError(error => of(new TestActions.DelTestFailure(error)))
          ))
      );          

    constructor(
        private actions$: Actions,
        private testApi: TestApiService,
    ) { }
}

