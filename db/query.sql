SELECT
    employee.first_name AS first_name, employee.last_name AS last_name, employeeRole.title AS role_title, concat(employee.first_name, ' ', employee.last_name) as Manager

FROM employee
INNER JOIN employeeRole ON employee.role_id = employeeRole.id; 
