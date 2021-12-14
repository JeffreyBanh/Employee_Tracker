class department{
    constructor(Id, name){
        this.Id = Id;
        this.name = name;
    }

    getId(){
        return this.Id;
    }

    getName(){
        return this.name;
    }
}

module.exports = department;