SELECT MAX(score) FROM student;

SELECT name, class FROM student WHERE score = (SELECT MAX(score) FROM student);

SELECT * FROM student WHERE score >= (SELECT AVG(score) FROM student);

SELECT * FROM department;

SELECT * FROM employee;

SELECT name FROM department WHERE EXISITS (SELECT * FROM employee WHERE department.id = employee.department_id);

SELECT name FROM department WHERE NOT EXISITS (SELECT * FROM employee WHERE department.id = employee.department_id);

GREATE TABLE product (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  price DECIMAL(10,2),
  category VARCHAR(50),
  sotck INT
)

INSERT INTO product (id,name,price,category,stock) VALUES (1,'apple',1.99,'fruit',100);

SELECT c.name AS customer_name,
       SUM(o.total_amount) AS total_amount,