class Employee{
    consturctor(Id, first_name, last_name, role_Id, manager_Id){
        this.Id = Id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_Id = role_Id;
        this.manager_Id = manager_Id;
    }
        getId() {
            return this.Id;
        }
    
        get_first_name(){
            return this.first_name;
        }
    
        getEmail(){
            return this.Email;
        }
    
        get_Role_id(){
            return this.role_Id;
        }
        
        get_manager_Id(){
            return this.manager_Id;
        }
    
}
    
module.exports = Employee;