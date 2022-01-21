INSERT INTO department (department_name) VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");
INSERT INTO employeeRole (title, salary, department) VALUES 
("Salesperson", 80000, 1),
("Lead Engineer", 150000, 2),
("Software Engineer", 120000, 2),
("Account Manager", 160000, 3),
("Accountant", 125000, 3),
("Legal Team Lead", 250000, 4),
("Lawyer", 190000, 4),
("Lead Salesperson", 100000, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES
    ("Mike", "Chen", 1, 8),
    ("Ashley", "Rodriguez", 2, NULL),
    ("Kevin", "Tupik", 3, 2),
    ("kundal", "Singh", 4, NULL),
    ("Malia", "Brown", 5, 4),
    ("Saraj", "Lourd", 6, NULL),
    ("Tom", "Allen ", 7, 6),
    ("John", "Doe", 8, NULL);