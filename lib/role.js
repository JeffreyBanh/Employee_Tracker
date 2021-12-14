class role{
    constructor(Id, title, salary, department_Id){
        this.Id = Id;
        this.title = title;
        this.salary = salary;
        this.department_Id = department_Id;
    }

    getId(){
        return this.Id
    }

    getTitle(){
        return this.title;
    }

    getSalary(){
        return this.salary;
    }

    get_department_Id(){
        return this.department_Id;
    }
}

module.exports = role;