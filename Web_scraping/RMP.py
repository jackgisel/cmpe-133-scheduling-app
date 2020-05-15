import requests
from bs4 import BeautifulSoup
import json
import math

import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("C:/Users/Luis/Documents/SJSU/Semester 10 SJSU/CMPE 133/Key.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

class RateMyProfScraper:
        def __init__(self,schoolid):
            self.UniversityId = schoolid
            self.professorlist = self.createprofessorlist()
            self.indexnumber = False

        def createprofessorlist(self):#creates List object that include basic information on all Professors from the IDed University
            tempprofessorlist = []
            num_of_prof = self.GetNumOfProfessors(self.UniversityId)
            print(num_of_prof)
            num_of_pages = math.ceil(num_of_prof / 20)
            print(num_of_pages)
            i = 1
            while (i <= num_of_pages):# the loop insert all professor into list
                page = requests.get("http://www.ratemyprofessors.com/filter/professor/?&page=" + str(
                    i) + "&filter=teacherlastname_sort_s+asc&query=*%3A*&queryoption=TEACHER&queryBy=schoolId&sid=" + str(
                    self.UniversityId))
                
                temp_jsonpage = json.loads(page.content)
                temp_list = temp_jsonpage['professors']
                for x in range(0, len(temp_list)):
                        
                        #Testing new code to get more info using teacher id
                        professor_link = 'https://www.ratemyprofessors.com/ShowRatings.jsp?tid=' + str(temp_list[x]['tid']) +  '&showMyProfs=true'
                        page2 = requests.get(professor_link).text
                        soup2 = BeautifulSoup(page2, 'lxml')
                        print("Teacher ID: ", temp_list[x]['tid'])

                        prof_fname = soup2.find_all("div", class_="NameTitle__Name-dowf0z-0 cjgLEI")
                        avg_rating = soup2.find_all("div", class_="RatingValue__AvgRatingWrapper-qw8sqy-3 bIUJtl")
                        num_rating = soup2.find_all("a", href="#ratingsList")
                        take_again = soup2.find_all("div", class_="FeedbackItem__FeedbackNumber-uof32n-1 bGrrmf")

                        would_take = soup2.find_all("div", class_="FeedbackItem__FeedbackDescription-uof32n-2 hddnCs")
                        most_helpf = soup2.find_all("p", class_="HelpfulRating__StyledComments-sc-4ngnti-1 GxNke") 

                        
                        #for x in range(0, len(avg_rating)):
                        try:
                                #print("Name: ", prof_fname[0].text)
                                avg_rating_num = avg_rating[0].text.split('/')
                                #print("Average rating: ", avg_rating_num[0])
                                num_of_rating = num_rating[0].text.split()
                                #print("Number of ratings: ", num_of_rating[0])
                                if(would_take[0].text == "Would take again"):
                                        #print("Would take again: ",take_again[0].text)
                                        Would_take_again = take_again[0].text
                                        #print("Level of Difficulty: ", take_again[1].text)
                                        Level_of_Difficulty = take_again[1].text
                                elif(would_take[0].text == "Level of Difficulty"):
                                        Would_take_again = ""
                                        #print("Level of Difficulty: ", take_again[0].text)
                                        Level_of_Difficulty = take_again[0].text
                                else:
                                        Would_take_again = ""
                                        Level_of_Difficulty = ""
                                        pass
                                try:
                                        #print("Most Helpful Rating: ", most_helpf[0].text)
                                        Most_helpful = most_helpf[0].text
                                except IndexError:
                                        Most_helpful = ""
                                        pass
                                data = {
                                        'Department' : temp_list[x]['tDept'],
                                        'School ID' : temp_list[x]['tSid'],
                                        'Institution' : temp_list[x]['institution_name'],
                                        'First Name' : temp_list[x]['tFname'],
                                        'Middle Name' : temp_list[x]['tMiddlename'],
                                        'Last Name' : temp_list[x]['tLname'],
                                        'Teacher ID' : temp_list[x]['tid'],
                                        'Number of Ratings' : temp_list[x]['tNumRatings'],
                                        'Average Rating' : avg_rating_num[0],
                                        'Would take again' : Would_take_again,
                                        'Level of Difficulty' : Level_of_Difficulty,
                                        'Most Helpful Rating' : Most_helpful
                                }
                                
                                name = temp_list[x]['tFname'] + " " +temp_list[x]['tLname'];
                                print(name)
                                school = db.collection('SJSU - Professors').document(name).set(data)
                                
                        except IndexError:
                                pass

                        #End of new code
                        '''
                        name = temp_list[x]['tFname'] + " " +temp_list[x]['tLname'];
                        print(name)
                        data = {
                                'Department' : temp_list[x]['tDept'],
                                'School ID' : temp_list[x]['tSid'],
                                'Institution' : temp_list[x]['institution_name'],
                                'First Name' : temp_list[x]['tFname'],
                                'Middle Name' : temp_list[x]['tMiddlename'],
                                'Last Name' : temp_list[x]['tLname'],
                                'Teacher ID' : temp_list[x]['tid'],
                                'Number of Ratings' : temp_list[x]['tNumRatings'],
                                'Class Rating' : temp_list[x]['rating_class'].title(),
                                'Overall Quality' : temp_list[x]['overall_rating']
                        }
                        school = db.collection('SJSU - Professors').document(name).set(data)
                        '''
                tempprofessorlist.extend(temp_list)
                i += 1
            return tempprofessorlist

        def GetNumOfProfessors(self,id):  # function returns the number of professors in the university of the given ID.
            page = requests.get(
                "http://www.ratemyprofessors.com/filter/professor/?&page=1&filter=teacherlastname_sort_s+asc&query=*%3A*&queryoption=TEACHER&queryBy=schoolId&sid=" + str(
                    id))  # get request for page
            temp_jsonpage = json.loads(page.content)
            num_of_prof = temp_jsonpage[
                              'remaining'] + 20  # get the number of professors at William Paterson University
            return num_of_prof

        def SearchProfessor(self, ProfessorName):
            self.indexnumber = self.GetProfessorIndex(ProfessorName)
            self.PrintProfessorInfo()
            return self.indexnumber

        def GetProfessorIndex(self,ProfessorName):  # function searches for professor in list
            for i in range(0, len(self.professorlist)):
                if (ProfessorName == (self.professorlist[i]['tFname'] + " " + self.professorlist[i]['tLname'])):
                    return i
            return False  # Return False is not found

        def PrintProfessorInfo(self):  # print search professor's name and RMP score
            if self.indexnumber == False:
                print("error")
            else:
                print(self.professorlist[self.indexnumber])

        def PrintProfessorDetail(self,key):  # print search professor's name and RMP score
            if self.indexnumber == False:
                print("error")
                return "error"
            else:
                print(self.professorlist[self.indexnumber][key])
                return self.professorlist[self.indexnumber][key]

list = RateMyProfScraper(881)
list.createprofessorlist()
