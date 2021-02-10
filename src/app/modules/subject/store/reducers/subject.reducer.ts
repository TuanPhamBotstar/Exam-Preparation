import { Question } from '../../models/question.model';
import { Subject } from '../../models/subject.model';
import * as SubjectActions from '../actions/subject.action';
import * as storage from '../states/storage';

export interface SubjectState {
    list: any,
    loading: boolean,
    error: Error,
    subject_id: string,
    total: number,
}

const initialState: SubjectState = {
    list: storage.getItem('subjects'),
    // list: [],
    loading: false,
    error: undefined,
    subject_id: '',
    total:0,
}

export function subjectReducer(state: SubjectState = initialState, action: SubjectActions.action) {
    switch (action.type) {
        //load subjects
        case SubjectActions.LOAD_SUBJECTS:
            return {
                ...state,
                loading: true,
            }
        case SubjectActions.LOAD_SUBJECTS_SUCCESS:
            storage.saveItem('subjects', action.payload.subjectsOnePage)
            console.log(action.payload)
            return {
                ...state,
                list: action.payload.subjectsOnePage,
                total: action.payload.total,
                loading: false,
            }
        case SubjectActions.LOAD_SUBJECTS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        // add subject
        case SubjectActions.ADD_SUBJECTS:
            return {
                ...state,
                loading: true,
            }
        case SubjectActions.ADD_SUBJECTS_SUCCESS:
            console.log(state.list)
            console.log(action.payload)
            return {
                ...state,
                subject_id: action.payload._id,
                list: [...state.list, action.payload],
                
                loading: false,
            }
        case SubjectActions.ADD_SUBJECTS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        // remove subject
        case SubjectActions.REMOVE_SUBJECTS:
            return {
                ...state,
                loading: true,
            }
        case SubjectActions.REMOVE_SUBJECTS_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                list:state.list.filter(subject => subject._id != action.payload),
                
                loading: false,
            }
        case SubjectActions.REMOVE_SUBJECTS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        default:
            return {
                ...state
            }
    }
}