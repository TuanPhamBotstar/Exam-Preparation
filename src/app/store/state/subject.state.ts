import { Subject } from '../../shared/models/subject.model';
export interface Appstate {
    readonly user: Subject[];
}