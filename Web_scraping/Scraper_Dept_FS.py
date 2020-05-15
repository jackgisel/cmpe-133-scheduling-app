import requests
from bs4 import BeautifulSoup

import moment
from datetime import datetime


import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("C:/Users/Luis/Documents/SJSU/Semester 10 SJSU/CMPE 133/Key.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


URL3 = 'http://info.sjsu.edu/web-dbgen/schedules-spring/all-departments.html'
page3 = requests.get(URL3).text

soup3 = BeautifulSoup(page3, 'lxml')
results4 = soup3.find_all('table')

majors = results4[2]

links_major = majors.find_all('a', href=True)

for rhs in links_major:
    full_link_dept = 'http://info.sjsu.edu' + rhs.attrs['href']
    #print(full_link_dept)

    #Scrapes data from just the CMPE Dept
    #URL2 = 'http://info.sjsu.edu/web-dbgen/schedules-spring/d99280.html'
    #page2 = requests.get(URL2).text
    page2 = requests.get(full_link_dept).text

    soup2 = BeautifulSoup(page2, 'lxml')
    Department = soup2.h3.text
    print(Department)

    data = {
        'Department Name' : Department,
        'Institution' : "San Jose State University"
    }

    school = db.collection('SJSU - Departments').document(Department).set(data)
    
    
    results3 = soup2.find_all('table')

    try:
        courses = results3[2]
    except IndexError:
        continue

    links = courses.find_all('a', href=True)
    
    for rhs in links:
        full_link = 'http://info.sjsu.edu' + rhs.attrs['href']
        #print(full_link)


        #full_link = 'http://info.sjsu.edu/web-dbgen/schedules-spring/c4733750.html'
        #page = requests.get(URL).text

        #Scrapes individual course data
        page = requests.get(full_link).text

        soup = BeautifulSoup(page, 'lxml')

        Course_Name = soup.h3.text
        print(soup.h3.text) #Course

        results = soup.find_all('table')
        course_info = results[2]

        #print(course_info.text)

        course_data = course_info.find_all_next(string=True)
        x = 0
        ge = 0
        #print(course_data[x+2]) #Semester
        Term = course_data[x+2].split()
        Semester = Term[0]
        Year = Term[1]

        #print(course_data[x+5]) #Title
        Title = course_data[x+5]
        if course_data[8].strip(): #GE
            ge = 1
            x = x + 1
        if not course_data[ge + 10].strip(): #Footnotes
            x = x - 1   
        #print(course_data[x+13]) #Section
        Section = course_data[x+13]

        #print(course_data[x+16]) #Code
        Code = course_data[x+16]

        #print(course_data[x+19]) #Units
        Units = course_data[x+19]

        #print(course_data[x+22]) #Type - Lec/Lab
        Type = course_data[x+22]

        #print(course_data[x+25]) #Mode - Online/In-person
        Mode = course_data[x+25]

        #print(course_data[x+28]) #Space ----- Might need to parse further before DB.
        temp = course_data[x+28].split()
        space = temp[0].split('/')

        Seats_taken = space[0]
        Total_seats = space[1]

        #print(course_data[x+32]) #Days
        Days = course_data[x+32]

        #print(course_data[x+35]) #Time
        if(course_data[x+35] == 'TBA '):
            Start_time = 0000
            End_time = 0000
        else:
            times = course_data[x+35].split()
            Start_time = times[0]
            End_time = times[1]

        #print(course_data[x+38]) #Date   ----- Maybe necessary for our calendar. ^^
        dates = course_data[x+38].split()
        Start_date = dates[0]
        End_date = dates[1]

        #print(course_data[x+41]) #Location
        if not course_data[x+41].strip():
            x = x - 1
            Location = "TBA"
        else:
            Location = course_data[x+41]

        #print(course_data[x+44]) #Instructor
        Instructor = course_data[x+44]

        data = {
            'Department' : Department,
            'Course' : Course_Name,
            'Semester' : Semester,
            'Year' : int(Year),
            'Title' : Title,
            'Section' : int(Section),
            'Code' : int(Code),
            'Units' : float(Units),
            'Type' : Type,
            'Mode' : Mode,
            'Seats taken' : int(Seats_taken),
            'Total seats' : int(Total_seats),
            'Days' : Days,
            'Start Time' : int(Start_time),
            'End Time' : int(End_time),
            'Start Date' : Start_date,
            'End Date' : End_date,
            'Location' : Location,
            'Instructor' : Instructor,
            'University' : 'SJSU'
        }

        #print(data)
        school = db.collection('SJSU').document('Majors')
        school.collection(Department).document(Course_Name + " - "+ Section).set(data)



#Code below can be added above cmpe dept to account for every major.
#Code below finds the link to every departments course list.
#      Change URL2 with full_link_dept
'''
URL3 = 'http://info.sjsu.edu/web-dbgen/schedules-spring/all-departments.html'
page3 = requests.get(URL3).text

soup3 = BeautifulSoup(page3, 'lxml')
results4 = soup3.find_all('table')

majors = results4[2]

links_major = majors.find_all('a', href=True)

for rhs in links_major:
    full_link_dept = 'http://info.sjsu.edu' + rhs.attrs['href']
    print(full_link_dept)
'''
