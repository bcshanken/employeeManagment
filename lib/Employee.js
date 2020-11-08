// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
        this.name =name;
        this.id = id;
        this.email = email;
    }
    
}

module.export = {
    Employee
}

const joy = new Employee ("Joy", 23, "joy@email.com");
console.log(joy);