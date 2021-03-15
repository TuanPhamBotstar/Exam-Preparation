export class User {
    public id: string;
    public username: string;
    public password: string;
    public fullname: string;
    public email: string;
    constructor(id:string,username:string, password:string,fullname:string,email:string){
        this.id = id;
        this.username = username;
        this.password = password;
        this.fullname = fullname;
        this.email = email;
    }
}