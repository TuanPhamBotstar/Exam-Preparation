import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { User } from '../../shared/models/user.model';


export const LOAD_USERS = '[USER] Load Users';
export const LOAD_USERS_SUCCESS = '[USER] Load Users Success';
export const LOAD_USERS_FAILURE = '[USER] Load Users Fialure';
export const ADD_USER = '[USER] Add User';
export const ADD_USER_SUCCESS = '[USER] Add User Success';
export const ADD_USER_FAILURE = '[USER] Add User Failure';
export const LOGIN = '[Auth] Login';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';
// Load users
export class LoadUsers implements Action {
    readonly type = LOAD_USERS;
}

export class LoadUsersSuccess implements Action {
    readonly type = LOAD_USERS_SUCCESS;
    constructor(public payload: any) { }
}

export class LoadUsersFailure implements Action {
    readonly type = LOAD_USERS_FAILURE;
    constructor(public payload: Error) { }
}

// Add user
export class AddUser implements Action {
    readonly type = ADD_USER;
    constructor(public payload: User) { }
}

export class AddUserSuccess implements Action {
    readonly type = ADD_USER_SUCCESS;
    constructor(public payload: User, public message:any) { }
}

export class AddUserFailure implements Action {
    readonly type = ADD_USER_FAILURE;
    constructor(public payload: Error) { }
}

// login
export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: User) { }
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public payload: any) { }
}

export class LoginFailure implements Action {
    readonly type = LOGIN_FAILURE;
    constructor(public payload: Error) { }
}


export type action = LoadUsers | LoadUsersSuccess | LoadUsersFailure |
    AddUser | AddUserSuccess | AddUserFailure |
    Login | LoginSuccess | LoginFailure