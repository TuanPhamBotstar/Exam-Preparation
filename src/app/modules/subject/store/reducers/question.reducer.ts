import { Question } from '../../models/question.model';
import * as QuestionActions from '../actions/question.action';
import * as storage from '../states/storage';

export interface QuestionState {
    loading: boolean,
    error: Error,
    list: Question[],
    total:number,
    question: Question,
}

const initialState: QuestionState = {
    loading: false,
    error: undefined,
    list: [],
    total:0,
    question: null
}

export function questionReducer(state: QuestionState = initialState, action: QuestionActions.action) {
    switch (action.type) {
        // load questions
        case QuestionActions.LOAD_QUESTIONS:
            return {
                ...state,
                loading: true,
            }
        case QuestionActions.LOAD_QUESTIONS_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                list: action.payload.qsOnePage,
                total: action.payload.total,
                loading: false
            }
        case QuestionActions.LOAD_QUESTIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        // load question
        case QuestionActions.LOAD_QUESTION:
            return {
                ...state,
                loading: true,
            }
        case QuestionActions.LOAD_QUESTION_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                question: action.payload,
                loading: false
            }
        case QuestionActions.LOAD_QUESTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        // add question
        case QuestionActions.ADD_QUESTION:
            return {
                ...state,
                loading: true,
            }
        case QuestionActions.ADD_QUESTION_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                list: [...state.list, action.payload],
                total: state.total + 1,
                loading: false
            }
        case QuestionActions.ADD_QUESTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        // edit question
        case QuestionActions.EDIT_QUESTION:
            return {
                ...state,
                loading: true,
            }
        case QuestionActions.EDIT_QUESTION_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                // list: [...state.list, action.payload],
                loading: false
            }
        case QuestionActions.EDIT_QUESTION_FAILURE:
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