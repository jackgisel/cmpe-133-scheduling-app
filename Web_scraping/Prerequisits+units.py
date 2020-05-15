import requests
from bs4 import BeautifulSoup

import moment
from datetime import datetime


import firebase_admin
from firebase_admin import credentials, firestore

import re

cred = credentials.Certificate("C:/Users/Luis/Documents/SJSU/Semester 10 SJSU/CMPE 133/Key.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


URL3 = 'http://info.sjsu.edu/web-dbgen/catalog/departments/all-departments.html'
page3 = requests.get(URL3).text

soup3 = BeautifulSoup(page3, 'lxml')
results4 = soup3.find_all('table')

majors = results4[2]

links_major = majors.find_all('a', href=True)

for rhs in links_major[25:]:
    full_link_dept = 'http://info.sjsu.edu' + rhs.attrs['href']
    #print(full_link_dept)

    #Scrapes data from just the CMPE Dept
    #URL2 = 'http://info.sjsu.edu/web-dbgen/schedules-spring/d99280.html'
    #page2 = requests.get(URL2).text
    page2 = requests.get(full_link_dept).text

    soup2 = BeautifulSoup(page2, 'lxml')
    Department = soup2.h3.text
    print(Department)

    results3 = soup2.find_all('table')

    try:
        courses = results3[2]
    except IndexError:
        continue

    links = courses.find_all('a', href=True)

    all_links = []
    for index in links:
        if not index.text.find('Courses'):
            all_links.append(index.attrs['href'])

    for rhs in all_links:
        full_link = 'http://info.sjsu.edu' + rhs
        #print("Full link = ", full_link)

        full_page = requests.get(full_link).text
        soup_full = BeautifulSoup(full_page, 'lxml')
        course_links = soup_full.find_all('a', href=True)

        rhs_course = []
        for l in course_links:
            if not l.attrs['href'].find('/web-dbgen/catalog/courses'):
                #print(l.attrs['href'])
                rhs_course.append(l.attrs['href'])
                
        for rhs_all in rhs_course:
            fullest_link = 'http://info.sjsu.edu' + rhs_all
            #print("Course link = ", fullest_link)

            course_page = requests.get(fullest_link).text
            soupy = BeautifulSoup(course_page, 'lxml')
            course_descript = soupy.find_all('p')
            
            Course_Name = soupy.h3.text
            print(soupy.h3.text) #Course

            pre_req_db = ""
            co_req_db = ""
            units = 99;
            hasLab = False
            
            for text in course_descript:
                
                if 'Units' in text.text:
                    #print(text.text.strip())
                    Units_list = text.text.strip()
                    units = Units_list[6]
                
                if 'Prerequisite' in text.text:
                    prerequisite = text.text.lower().replace('\n','.')
                    index2 = prerequisite.find('prerequisite')
                    if(prerequisite.find('prerequisites') != -1): index2 += 1
                    index2 += 13
                    pre_req = str(prerequisite[index2:])
                    index3 = pre_req.find('.')
                    index3 += index2
                    pre_req_db = text.text[index2:index3]

                elif 'prerequisite' in text.text:
                    prerequisite = text.text.lower().replace('\n','.')
                    index2 = prerequisite.find('prerequisite')
                    if(prerequisite.find('prerequisites') != -1): index2 += 1
                    index2 += 13
                    pre_req = str(prerequisite[index2:])
                    index3 = pre_req.find('.')
                    index3 += index2
                    pre_req_db = text.text[index2:index3]

                elif 'Pre-requisite' in text.text:
                    prerequisite = text.text.lower().replace('\n','.')
                    index2 = prerequisite.find('prerequisite')
                    if(prerequisite.find('prerequisites') != -1): index2 += 1
                    index2 += 14
                    pre_req = str(prerequisite[index2:])
                    index3 = pre_req.find('.')
                    index3 += index2
                    pre_req_db = text.text[index2:index3]

                elif 'pre-requisite' in text.text:
                    prerequisite = text.text.lower().replace('\n','.')
                    index2 = prerequisite.find('prerequisite')
                    if(prerequisite.find('prerequisites') != -1): index2 += 1
                    index2 += 14
                    pre_req = str(prerequisite[index2:])
                    index3 = pre_req.find('.')
                    index3 += index2
                    pre_req_db = text.text[index2:index3]
                    print(text.text[index2:index3])

                if 'Corequisite' in text.text:
                    corequisite = text.text.lower().replace('\n','.')
                    index2 = corequisite.find('corequisite')
                    if(corequisite.find('corequisites') != -1): index2 += 1
                    index2 += 13
                    co_req = str(corequisite[index2:])
                    index3 = co_req.find('.')
                    index3 += index2
                    co_req_db = text.text[index2:index3]

                elif 'corequisite' in text.text:
                    corequisite = text.text.lower().replace('\n','.')
                    index2 = corequisite.find('corequisite')
                    if(corequisite.find('corequisites') != -1): index2 += 1
                    index2 += 13
                    co_req = str(corequisite[index2:])
                    index3 = co_req.find('.')
                    index3 += index2
                    co_req_db = text.text[index2:index3]

                elif 'Co-requisite' in text.text:
                    corequisite = text.text.lower().replace('\n','.')
                    index2 = corequisite.find('co-requisite')
                    if(corequisite.find('co-requisites') != -1): index2 += 1
                    index2 += 14
                    co_req = str(corequisite[index2:])
                    index3 = co_req.find('.')
                    index3 += index2
                    co_req_db = text.text[index2:index3]

                elif 'co-requisite' in text.text:
                    corequisite = text.text.lower().replace('\n','.')
                    index2 = corequisite.find('co-requisite')
                    if(corequisite.find('c-orequisites') != -1): index2 += 1
                    index2 += 14
                    co_req = str(corequisite[index2:])
                    index3 = co_req.find('.')
                    index3 += index2
                    co_req_db = text.text[index2:index3]

                if 'Lab' in text.text:
                    hasLab = True

                pre_req_db = re.sub('[^a-zA-Z0-9 ]','',pre_req_db)
                co_req_db = re.sub('[^a-zA-Z0-9 ]','',co_req_db)
                    
                if(units != 99):
                    data = {
                        'Units' : units,
                        'Prerequisites' : pre_req_db,
                        'Corequisites' : co_req_db,
                        'hasLab' : hasLab
                    }
                else:
                    data = {
                        'Prerequisites' : pre_req_db,
                        'Corequisites' : co_req_db,
                        'hasLab' : hasLab
                    }

                if(text == course_descript[-1]):
                    print(data)
                    try:
                        school3 = db.collection('SJSU - Courses').document(Course_Name).update(data)
                    except:
                        continue


'''
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
        if not Instructor.strip():
            Fname = ""
            Lname = ""
        else:
            Full_Name = Instructor.split()
            Fname = Full_Name[0]
            Lname = Full_Name[1]

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
            'Instructor Fname' : Fname,
            'Instructor Lname' : Lname,
            'Institution' : "San Jose State University"
        }

        data2 = {
            'Department' : Department,
            'Course' : Course_Name,
            'Semester' : Semester,
            'Year' : int(Year),
            'Title' : Title,
            'Units' : float(Units),
            'Institution' : "San Jose State University"
        }
        
        daysofweek = []
        if 'M' in Days: daysofweek.append(1)
        if 'T' in Days: daysofweek.append(2)
        if 'W' in Days: daysofweek.append(3)
        if 'R' in Days: daysofweek.append(4)
        if 'F' in Days: daysofweek.append(5)

        data3 = {
            'Daysofweek' : str(daysofweek)
        }
        '''      
        #print(data)
        #school = db.collection('SJSU - Sections').document(Course_Name + " - "+ Section).set(data)
        #school2 = db.collection('SJSU - Courses').document(Course_Name).set(data2)
        #school3 = db.collection('SJSU - Sections').document(Course_Name + " - "+ Section).update(data3)


