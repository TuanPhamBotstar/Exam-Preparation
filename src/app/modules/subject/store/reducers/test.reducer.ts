
import { Test } from '../../models/test.model';
import * as TestActions from '../actions/test.action';

export interface TestState {
    loading: boolean,
    error: Error,
    list: Test[],
}

const initialState: TestState = {
    loading: false,
    error: undefined,
    list: [],
}

export function testReducer(state: TestState = initialState, action: TestActions.action) {
    switch (action.type) {
        // load tests
        case TestActions.LOAD_TESTS:
            return {
                ...state,
                loading: true,
            }
        case TestActions.LOAD_TESTS_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                list: action.payload,
                loading: false
            }
        case TestActions.LOAD_TESTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return {
                ...state
            }
    }
}