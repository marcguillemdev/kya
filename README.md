![kya logo](https://github.com/marcguillemdev/kya/blob/main/front-end/src/assets/kya-logo-no-shadow.png?raw=true)

# KYA IS STILL IN DEVELOPMENT AND DOES NOT HAVE AN INSTALLER YET


# Kya, a small and fast headless CMS

Kya is a small CMS coded in Java and TypeScript using Spring Boot and Angular. From Kya you can manage multiple domains that contain a lot of posts from one place. The posts can be retrieved from an API and it only serves to specific domain.

## 🔨 To do list

| Feature            | State |
|--------------------|-------|
|  👷‍♂️ CRUD for Users | 90%   |
|  📖 CRUD Domains    | 90%   |
|  🗂️ CRUD for Posts  | 80%   |
|  👮‍♀️ Auth Flow      | 90%   |
|  📈 Dashboard       | 0%    |
|  💁‍♂️ REST API       | 0%    |

## 🛠️ Building front-end (Angular)

 1. Clone repo: `git clone https://github.com/marcguillemdev/kya`
 2. Go inside project: `cd ./kya/front-end`
 3. Install dependencies: `npm install` ***(Requires Node.JS)***
 4. Serve application via: `ng serve`
 5. Visit http://localhost:4200 and you will see a blank page because we do not configure the backend yet :3

## 🛠️ Building backend (Spring Boot)

Spring Boot is quite more complex to run because we need a MySQL database (or another database engine) running and configured. ***So in order to get started we have to edit the*** `Application.properties`. 

> ### ***I strongly recommend to use IntelliJ IDEA*** to manage Gradle dependencies and run configuration automatically.

MySQL Connector is present in build.gradle file, if you want to use another DB Engine, please install the proper connector.

1. Open `\src\main\resources\application.properties` file and edit the following values:
	1. `spring.datasource.url`. Is not really necessary to edit this field if you have a **MySQL database** running on your local machine **with default port and a database named Kya created**. If you dont have that, then configure it to make it work.
	2. `spring.datasource.username`. Put your MySQL username.
	3. `spring.datasource.password`. Put your MySQL password.
	
2. After edit of `application.properties` file, we are ready to run Kya. You can run it building a .jar or from your IDE using gradle run configuration. If you are in IntelliJ IDEA, just open the right panel called ***"Gradle"*** and run ***bootJar*** configuration.

> Every restart, Kya recreate the database and insert some test data.

## 🎉 ¡We are ready to use Kya!
Now go back to your browser and refresh http://localhost:4200 and you will see the login page.
**Use *admin* as username and *admin* as password.** *All generated users have the same value in the username and password.*

## 💼 License
GPLv3. Take a look to license file for more information.


