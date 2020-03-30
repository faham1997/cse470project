------------
# Software Requirements Specification

## for


# "Doctorpur"

#### Version 1.0



#### Prepared by

### Muhammad Anwarul Azim ###
<br>


--------------------
<br>
<br>

#### Group Members Information

| **Name** | **ID** | **E-mail** |
| --- | --- | --- |
| Muhammad Anwarul Azim |   18101624|  anwarulazims1998@gmail.com |
| Faham |   |   |
| Nafiur |   |   |
| Riasat |   |   | |
<br>

#### Other Information

| Instructor: | Abu Mohammad Shabbir Khan |
| --- | --- |
| Course: | Software Engineering |
| Course Code: | CSE 470 |
| Semester: | Spring 2020 |
| Date: |   |             |
<br>
<br>

----------
<br>
<br>

 ## **Contents**   ###

        
 #### 1  Introduction        
 1.1        Document Purpose        
 1.2        Product Scope        
 1.3        Intended Audience and Document Overview        
 1.4        Definitions, Acronyms and Abbreviations       
 1.5        Document Conventions        
 1.6        References and Acknowledgments        
####  2        Overall Description        
 2.1        Product Overview        
 2.2        Product Functionality       
 2.3        Design and Implementation Constraints        
 2.4        Assumptions and Dependencies        
 #### 3        Specific Requirements        
 3.1        External Interface Requirements        
 3.2        Functional Requirements        
 3.3        Use Case Model        
 #### 4        Other Non-functional Requirements        
 4.1        Performance Requirements        
 4.2        Safety and Security Requirements        
 4.3        Software Quality Attributes        
       
 <br>
 <br>
 
 -------------
<br>
<br>













### Revisions

| Version | Primary Author(s) | Description of Version | Date Completed |
| --- | --- | --- | --- |
| Draft Type and Number | Full Name | Information about the revision. This table does not need to be filled in whenever a document is touched, only when the version is being upgraded. | 00/00/00 |
<br>
<br>
 
-------------------
<br>
<br>

## 1 **Introduction**
This document describes all the features, interfaces, underlying system, and constraints of "Doctorpur", a web based healthcare application. A brief overview of the designing procedure can be illustrated from this document.
### 1.1 Document Purpose
The Purpose of this document is to outline the system so that there exists no ambiguity about systems functionality and constraints.
### 1.2	Product Scope
This software system will be a web application.Both doctors and patients/ caregivers will use the app. However, this app is mainly focused on the patients in order to make the process of doctor selection more effective and efficient. This app will provide a list of doctors and the option to narrow down the list according to different preferences e.g. female only, low visit , high qualification etc. Doctors will use the app to provide their medical credentials and appointment information so that patients can find them and make appointments through the app.

### 1.3 Intended Audience and Document Overview
This document is written, having both the stakeholders and developers in mind. This let the stakeholders know what they are getting and let the developer know what they are designing.
### 1.4 Definitions, Acronyms and Abbreviations
| Term | Defination |
| --- | --- |
| SRS| Software Requirements Specification |
| Outpatient |Patient who is going through medical follow up visit  |
|Web Application  |Application, which is stored and run in a remote surver and user interects with the application through a browser  |
| stakeholder | People, who are going to  be benefited from the app. Here, Doctor & patient or patients caregiver  |             |
### 1.5 Document Conventions
This document follows the IEEE formatting requirements for SRS [1].
## 1.6 References and Acknowledgments
[1] IEEE Guide for Software Requirements Specifications," in IEEE Std 830-1984 , vol., no., pp.1-26, 10 Feb. 1984
<br>
<br>
With due respect, we would like to thank Mr. Abu Mohammad Shabbir Khan, Lecturar of CSE department, BRAC University, Dhaka, who guided and inspired us to write this paper with enough fascination
<br>
<br>


--------------------
<br>
<br>

# 2 Overall Description

## 2.1 Product Overview
Doctorpur is an independent web based healthcare application which is designed to improve the current doctor selection situation in terms of outpatients follow up visit. There are a large number of outpatients who are  taking follow up visits every day. The number of doctors serving them is also large. There are  doctors of different medical backgrounds, different specializations and different qualifications. However, most of the patients can’t keep track of this huge information. As a result, in terms of doctor selection, they rely upon others or select the nearest one. This selection is neither efficient nor effective. This often results in switching several doctors, delaying treatment periods and wasting money. However, this problem can be mitigated by providing the patients effective access to a complete database of doctors information. Having this in mind, the concept of Doctorpur emerged.

## 2.2 Product Functionality
#### Doctorpurs basic functionalities are listed bellow

1. Home page which will redirect patients and doctor to their deired page
2. New doctor can enlist themselves by a sign up process where they will submit their credentials and appointment information using a form
3. Listed doctor can log in using email and password to view how many appointment is scheduled that day
4. Any one can select any of the three search option (search by name, hospital, medical field) in order to get the doctor list.
5. User can sort the list according to low-high visit (vice versa),shortest distance,female/male only or qualification.
6. User can view doctors credentials & schedule .
7. user can get an appointment by providing information (name, age, sex & mobile no.)




## 2.3 Design and Implementation Constraints
Doctorpur is a web application and depends on Internet totally. As the application fetches data from the database over the Internet, it must be functional even in a lower bandwidth. 

Doctors credential and appointments are very sensitive information. So it's crucial to ensure security for each and every doctors account. Having this in mind, sign up form should force every doctor to use strong password. Furthermore, all the information should be encrypted and password should hashed  before storing.

All the dependencies should be Docarized before deploying to server. The app shuld be compatible with a wide spectrum of browser

The system must be scalableand & robust. There should be multiple database for fault tolerance

The app will serve to people of different classes and ages. The front end must not contain any sort ambiguity and must be usable for majority.



## 2.4 Assumptions and Dependencies
There are some assumptions which should be taken into account. Firsly, no functionality of Doctorpur is violating any of the current government law. Secondly, doctor will find doctorpur interesting and provide information to enrich the app. Thirdly, none of the Doctorpurs functionality will hampers any of the doctors interest. Finally, most of the internet user will have the minimum bandwidth for using this application.


# 3 Specific Requirements

## 3.1 External Interface Requirements

<br>

### 3.1.1 User Interfaces
![](dia1.png)
fig.1 . DoctotPur user interface diagram
<br>



<br>

### 3.1.2 Hardware Interfaces
All smart devices, which has browser working properly  will be capable of connecting to DoctorPur. As the application will be deployed to server and there is no heavy use of graphical devices, system should consume little power from the client side.

There should be standby server and backup database seperated physically and logically for increasing fault tolerance. 
<br>

### 3.1.3 Software Interfaces
<br>
Basically this system has three components- front end, back end & a database. The front end will interect with the user and send request to the back end according to the user needs. Back end will responce to the request by  making queries in the database. Programming language and frameworks should be selected with a view to reducing complexity and increasing consistency.

As there maybe dependencies for various pacages and built in libraries, everything should be containerized using Docker.

<br>
<br>

## 3.2 Functional Requirements
<br>

## 3.3 Use Case Model
**Brief Description:**  Seacrch For Doctor

**Actors:** Application User

**Preconditions:** User has access to application

**Basic Flow:** 

    1) User opens the application
    2) User clicks search icon
    3) The system offers the user to search by Name/Hospital/Specialization
    4) The user selects an option
    5) Then the system prompts the user to type the Doctor/Hospital/Specialization name
    6) The user types the name
    7) Then the user presses the search button to begin the search
    8) The system returns the names of doctors with a common Name/Hospital/Specialization
    9) The user selects the desired doctor from the list

**Extensions:**
    
    1) The system cannot find the required doctor
        a. Show a screen saying "Doctor Not found" to the user

**Post condition:**
    1) User finds their required doctor

**Special Requirements:**
    1) The search interface must be intuitive to the end user

![](usecase.png)
<br>
fig.2 . Use case Model



<br>

# 4 Other Non-functional Requirements

## 4.1 Performance Requirements
The application must responce in real time.


If no search result found, search process must halt and show appropriate message
<br>

## 4.2 Safety and Security Requirements
For each Sign Up user should forced to use strong password

All password should be salt and hashed using SHA 256 

All the information should be encrypted

In case of abnormal traffic, reCaptcha should be used for preventing DDos

Classes should be made private and getter/setter should be used in appropriate cases

## 4.3 Software Quality Attributes

### Adaptability
Open Closed software design principle should be used for making the software flexible enough to adopt new functionality


### Usability
Front end should be very easy to understand so that majority can use this app easily.

### Acceptability 
No feature of the app should hamper any of the users interest

### Scalability
The app should be easy to modify if the number of user increase rapidly

### Maintainability
The source code should be compact and clean so that any new developer can contribute easily


