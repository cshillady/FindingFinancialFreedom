# Finding Financial Freedom
![This is the Logo of Finding Financial Freedom](/Finding-Financial-Freedom/FE/Images/logo.png)

## Table of contents

1. [About The Project](#about-the-project)
2. [Roles](#roles)
3. [Development Timeline](#development-timeline)
4. [Application Details](#application-details)
	1. [Back End](#back-end---spring-boot)
	2. [Front End](#front-end---spring-boot)
	3. [Important Information](#important-information) 
## About The Project
Welcome to Finding Financial Freedom!
	
## Roles
#### Front End Developers:
- Dominic DiMarcello
- Michael Leahey

#### Back End Developers:
- James Brennan
- Roy Rasley
- Wendy De la Cruz Lorenzo

#### AWS:
- Connor Shillady
	
## Development Timeline


### Day 1
- Created Team Organization on Github
- Initialized Git Repository
- Established roles
- Created an organizational chart regarding the tables in the database
- Created a flow chart on how the app will run
- Decided on color scheme and name of project

### Day 2
- Cloned repository
- Created UML Sequence chart that show the flow of the application
- Created tables on MySQL and Model Classes needed 
- Changed the database table by deleting finances and passing UserId to the other tables
- Decided on a logo for the application
- Solved git pushing/pulling issues

### Day 3
- All members were added to an AWS RBS organization
- SQL database Connected to AWS
- All members were given IAM account from Connor's account so they can view items for project
- Front End worked on the overall desing using color scheme
- Back End started to do CRUD operations for all our repositories
- For repository, we decided to split from one finance repository, into separate income, expense, investment, and goals repositories
- Changed the controller to add a try/catch block for error handling

### Day 4
- Changing data types from strings to types that are more context appropriate
- Began expanding error handling to cover more issues than just resource not being found
- Main issue with AWS has been resolved
- Front End added a retirement calculator to the app

### Day 5
- Updated User controller so that users could edit their profiles
- Removed moderator from the list of roles
- Solved jwt authentication problem regarding the update password capability
- Change data type from Date to LocalDate 
- Successfully connected Income to the back end
- Added edit user functionality to the User component

### Day 6
-  Fixed delete error by adding the following annotation  to all instances that have a user_id
```
 @OnDelete(action = OnDeleteAction.CASCADE)
```
- Completely took away the moderator role in the data base
- Fixed the GET all Users issue.
- Resolved the white space issue in the front end by adding the following command to the global styles.scss 
```
div{
overflow: auto;
}
```
- Figured out how to deploy Spring Boot Application through AWS Lightsale
- Started research on deploying Angular to Lightsail

### Day 7
- After testing Lightsail with Angular deployment, it has been determined that to access the webpage, we will not be able to use lightsail. Thankfully some of the errors are gone when using RDS when retesting.
- Dropped Investment off of front end
- Switched to AWS RDS

### Day 8
- Deleted Investments off of back end
- We will have to run this command "npm install chartjs-plugin-datalabels --save" to add this plugin
- Added currentAmount data member to goals
- Worked on presentation for application

### Day 9
- Edited income to load charts
- Completed and practiced presentation
- Fixed update current amount in goals




## Application Details 


### Back End - Spring Boot
#### 1. Initilization
##### 1a. Dependencies: 
```
		i. JPA: 
			<dependency>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-starter-data-jpa</artifactId>
			</dependency>

		ii. Spring Security:
			<dependency>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-starter-security</artifactId>
			</dependency>

		iii. Spring Web:
			<dependency>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-starter-web</artifactId>
			</dependency>

		iv. MySql Server:
			<dependency>
				<groupId>mysql</groupId>
				<artifactId>mysql-connector-java</artifactId>
				<scope>runtime</scope>
			</dependency>

		v. Add in Manually:
			<dependency>
				<groupId>io.jsonwebtoken</groupId>
				<artifactId>jjwt</artifactId>
				<version>0.9.1</version>
			</dependency>

		vi. This depency was necessary to add to allow for Validation:
			<dependency>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-starter-validation</artifactId>
			</dependency>
```
##### 1b. Application Properties:
	
	
		i.  spring.datasource.url= jdbc:mysql://localhost:3306/capstone
			spring.datasource.username= root
			spring.datasource.password= root

			spring.jpa.properties.hibernate.dialect= org.hibernate.dialect.MySQL5InnoDBDialect
			spring.jpa.hibernate.ddl-auto= update

			App Properties
			capstone.app.jwtCookieName= capstone
			capstone.app.jwtSecret= capstoneSecretKey
			capstone.app.jwtExpirationMs= 86400000


#### 2. Building the App
##### 2a. Packages:
```	
		i. Controllers
		ii. Models
		iii. Payload
		iv. Repository
		v. Security
```
##### 2b. Controllers Package:
```
		i. AuthController
			a. Decorators:
				@CrossOrigin(origins = "http://localhost:8080")
				@RestController
				@RequestMapping("/api/auth")
			b. CRUD Functions:
				i. @PostMapping("/signin")
				ii. @PostMapping("/signup")
				iii. @PostMapping("/signout")
			c. DataMembers		
		ii. TestController	
			a. Decorators:
					@CrossOrigin(origins = "http://localhost:8080")
					@RestController
					@RequestMapping("/api/test")
			b. CRUD Functions:
					i. @GetMapping("/all")
					ii. @GetMapping("/user")
						@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
					iii. @GetMapping("/mod")
						@PreAuthorize("hasRole('MODERATOR')")
					iv. @GetMapping("/admin")
						@PreAuthorize("hasRole('ADMIN')")
			c. DataMembers
```
##### 2c. Models
```	
		i. ERole **SEE 4a FOR DATABASE INFORMATION
			a. ENUM //holds user roles
			b. DataMembers:	
				i. ROLE_USER
				ii. ROLE_MODERATOR
				iii. ROLE_ADMIN
		ii. Role
			a. Decorators:
				@Entity
				@Table(name = "roles")
			b. DataMembers:
				i.  @Id
					@GeneratedValue(strategy = GenerationType.IDENTITY)
					Integer id;
				ii. @Enumerated(EnumType.STRING)
					@Column(length = 20)
					private ERole name;	
		iii. User 
			a. Decorators:
				@Entity
				@Table(name = "users",
					   uniqueConstraints = {
						   @UniqueConstraint(columnNames = "username"),
						   @UniqueConstraint(columnNames = "email")
					   })
			b. DataMembers:
				i. @Id
				  @GeneratedValue(strategy = GenerationType.IDENTITY)
				  private Long id;
				ii.   @NotBlank
					  @Size(max = 20)
					  private String username;
				iii.  @NotBlank
					  @Size(max = 50)
					  @Email
					  private String email;  
				iv.   @NotBlank
					  @Size(max = 120)
					  private String password;	 
				v.    @ManyToMany(fetch = FetchType.LAZY)
					  @JoinTable(name = "user_roles", 
								 joinColumns = @JoinColumn(name = "user_id"),
								 inverseJoinColumns = @JoinColumn(name = "role_id"))
					  private Set<Role> roles = new HashSet<>();			 
					//ManyToMany joins tables according to the parameters you enter. in this case if is user id and role id that are used to make the user_roles table	
```
##### 2d. Payload:
```	
		i. Request:
			a. LoginRequest
			b. SignupRequest

		ii. Response:
			a. MessageResponse
			b. UserInfoResponse
```
##### 2e. Repository and Security
```	
Repository
		i. RoleRepository
		ii. UserRepository
		
Security:
		i. JWT
			a. AuthEntryPoint
			b. AuthTokenFilter
			c. JwtUtils
		ii. Services
			a. UserDeatilsImpl
			b. UserDeatilsServiceImpl
		iii. WebSecurityConfig	
```
#### 3. Deployment and Pathing
##### 3a. Back End Paths
```
		i. Base Path: http://localhost:8080
		ii. Auth Path:
			a. @PostMapping("/signin") (tested)
			b. @PostMapping("/signup") (tested)
			c. @PostMapping("/signout") (tested)
		iii. Test Path:
			a. @GetMapping("/all") (tested)
			b. @GetMapping("/user") (tested)
			c. @GetMapping("/admin") (tested)
		
		iv. Finances Path (api/finances):
			a. Income Paths:
				i. @GetMapping("/{user_id}/income") (tested)
				ii. @GetMapping ("/{user_id}/income/{inId}") (tested)
				iii. @PostMapping ("{userId}/income/create") (tested)
				iv. @PutMapping ("{userId}/income/{inId}") (tested)
				v. @DeleteMapping ("{userId}/income/{inId}") (tested)

			b. Expense Paths:
				i. @GetMapping("/{user_id}/expense") (tested)
				ii. @GetMapping ("/{user_id}/expense/{eId}") (tested)
				iii. @PostMapping ("{userId}/expense/create") (tested)
				iv. @PutMapping ("{userId}/expense/{eId}") (tested)
				v. @DeleteMapping ("{userId}/expense/{eId}") (tested)

			c. Investment paths:
				i. @GetMapping("/{user_id}/investment") (tested)
				ii. @GetMapping ("/{user_id}/investment/{invId}") (tested)
				iii. @PostMapping ("{userId}/investment/create") (tested)
				iv. @PutMapping ("{userId}/investment/{invId}") (tested)
				v. @DeleteMapping ("{userId}/investment/{invId}") (tested)

			d. Goal paths:
				i. @GetMapping("/{user_id}/goal") (tested)
				ii. @GetMapping ("/{user_id}/goal/{gId}") (tested)
				iii. @PostMapping ("{userId}/goal/create") (tested)
				iv. @PutMapping ("{userId}/goal/{gId}") (tested)
				v. @DeleteMapping ("{userId}/goal/{gId}") (tested)
```
 ##### 3.Deploying Spring Boot Backend to AWS
 		i. Edit for Pom.xml
		line 17 in jar (after description section): ```<packaging>jar</packaging>```

		ii.Verify app.properties folder has correct DB correction details

		iii. Move META-INF Folder to main/resources folder

		iv.Generate jar:  ```mvn clean package```

		v. Dockerfile
		FROM openjdk:18
		LABEL maintainer="Connor Shillady"
		ADD out/artifacts/docker_demo_jar/docker-demo.jar demo.jar
		ENTRYPOINT ["java", "-jar", "demo.jar"]

		vi. Docker Commands
		docker build -t demo:latest .
		docker run -p 8080:8080 demo
		** another cmd window may be needed for next steps
		docker images
		docker login
		docker push cshillady/demo

		vii. Lightsail
		go to lightsail create container
		cshillady/demo:latest

		viii. related links:
		https://lightsail.aws.amazon.com/ls/docs/en_us/articles/amazon-lightsail-connecting-to-your-mysql-database
		https://hardikparikh94.medium.com/deploy-your-angular-springboot-application-to-aws-lightsail-part-1-frontend-92df68af16ab
		https://aws.amazon.com/blogs/aws/lightsail-containers-an-easy-way-to-run-your-containers-in-the-cloud/
 
 
#### 4. Database
#####	4a. MySQL 
 * 
	tables are automatically created and updated when the code runs for the first time. In order to begin adding users, the following must be added to the "roles" table:
```
		i.  INSERT INTO roles(name) VALUES('ROLE_USER');
		    INSERT INTO roles(name) VALUES('ROLE_ADMIN');
```

#### 5. Test and Error Correction

#### 6. Additional Notes

### Front End - Angular
##### 1a. Creating new Angular Instance:
```
		i. ng new FE
		ii. Allow Angular Routing
		iii. SCSS
```
##### 1b. Bootstrap: 
```	
		i. npm i bootstrap@5.2.0
		ii. index.html: 
			<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
```
 

### Important Information
#### 1. Pathing:
##### 1a. Back End Paths:
```
		i. Auth Path (api/auth):
			a. @PostMapping("/signin") (tested)
			b. @PostMapping("/signup") (tested)
			c. @PostMapping("/signout") (tested)
			
		ii. Test Path (api/test):
			a. @GetMapping("/all") (tested)
			b. @GetMapping("/user") (tested)
			c. @GetMapping("/admin") (tested)
			
		iii. Finances Path (api/finances):
			a. Income Paths:
				i. @GetMapping("/{user_id}/income") (tested)
				ii. @GetMapping ("/{user_id}/income/{inId}") (tested)
				iii. @PostMapping ("{userId}/income/create") (tested)
				iv. @PutMapping ("{userId}/income/{inId}") (tested)
				v. @DeleteMapping ("{userId}/income/{inId}") (tested)
				
			b. Expense Paths:
				i. @GetMapping("/{user_id}/expense") (tested)
				ii. @GetMapping ("/{user_id}/expense/{eId}") (tested)
				iii. @PostMapping ("{userId}/expense/create") (tested)
				iv. @PutMapping ("{userId}/expense/{eId}") (tested)
				v. @DeleteMapping ("{userId}/expense/{eId}") (tested)

			c. Investment paths:
				i. @GetMapping("/{user_id}/investment") (tested)
				ii. @GetMapping ("/{user_id}/investment/{invId}") (tested)
				iii. @PostMapping ("{userId}/investment/create") (tested)
				iv. @PutMapping ("{userId}/investment/{invId}") (tested)
				v. @DeleteMapping ("{userId}/investment/{invId}") (tested)

			d. Goal paths:
				i. @GetMapping("/{user_id}/goal") (tested)
				ii. @GetMapping ("/{user_id}/goal/{gId}") (tested)
				iii. @PostMapping ("{userId}/goal/create") (tested)
				iv. @PutMapping ("{userId}/goal/{gId}") (tested)
				v. @DeleteMapping ("{userId}/goal/{gId}") (tested)
```
##### 1b. Front End Paths:






