CREATE TABLE dbo.Employee
	(
	id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
	name varchar(50) NOT NULL,
	surname varchar(50) NOT NULL,
	address varchar(50) NULL,
	description varchar(50) NULL
	)  ON [PRIMARY]
GO