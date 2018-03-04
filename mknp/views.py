from django.shortcuts import render, get_object_or_404
from django.shortcuts import render_to_response
from django.template import RequestContext
from .models import HomePage
from .models import ActivityPage
from .models import TeamPage
from .models import CasePage
from .models import ProjectPage
from .models import NewsPage
from .models import PagesInfo
from .models import University
from .models import SubPagesInfo
from .models import CompanyInfo
from .models import ApplyInfo
from .models import ServiceInfo
from .models import LanUniversity
from .models import HighSchool
from .models import ProUniversity
from .models import TeacherInfoPage
from .models import Case
from .models import Offer
# Create your views here.

def home_page(request):
	homePages = HomePage.objects.all()
	activityPages = ActivityPage.objects.all()
	teamPages = TeamPage.objects.all()
	casePages = CasePage.objects.all()
	projectPages = ProjectPage.objects.all()
	newsPages = NewsPage.objects.all()
	Pages1Infos = PagesInfo.objects.filter(pageIdx='page1')
	Pages1Info = PagesInfo.objects.filter(pageIdx='page1')[0]  
	Pages2Info = PagesInfo.objects.filter(pageIdx='page2')[0] 
	Pages3Info = PagesInfo.objects.filter(pageIdx='page3')[0] 
	Pages4Info = PagesInfo.objects.filter(pageIdx='page4')[0] 
	Pages5Info = PagesInfo.objects.filter(pageIdx='page5')[0] 
	Pages6Info = PagesInfo.objects.filter(pageIdx='page6')[0]

	activityPageTypes = {}
	for page in activityPages:
		activityPageTypes[page.label] = page.labelName

	return render_to_response('mknp/page/home.html', {'homePages': homePages, 'activityPages': activityPages, 'activityPageTypes': activityPageTypes, 
		'teamPages': teamPages, 'casePages': casePages, 'projectPages': projectPages, 'newsPages': newsPages, 'Pages1Infos': Pages1Infos, 'Pages1Info': Pages1Info, 'Pages2Info': Pages2Info,
		'Pages3Info': Pages3Info, 'Pages4Info': Pages4Info, 'Pages5Info': Pages5Info, 'Pages6Info': Pages6Info}, RequestContext(request))
		
def university(request):
	universitys = University.objects.all()
	universityTypes = {}
	for university in universitys:
		universityTypes[university.label] = university.labelName
	pageInfo = SubPagesInfo.objects.filter(pageIdx='university_list')[0]
	return render_to_response('mknp/page/university.html', {'pageInfo':pageInfo, 'universityTypes':universityTypes, 'universitys':universitys}, RequestContext(request))
	
def lanuniversity(request):
	universitys = LanUniversity.objects.all()
	universityTypes = {}
	for university in universitys:
		universityTypes[university.label] = university.labelName
	pageInfo = SubPagesInfo.objects.filter(pageIdx='lanuniversity_list')[0]
	return render_to_response('mknp/page/university.html', {'pageInfo': pageInfo, 'universityTypes':universityTypes, 'universitys':universitys}, RequestContext(request))
	
def highschool(request):
	universitys = HighSchool.objects.all()
	universityTypes = {}
	for university in universitys:
		universityTypes[university.label] = university.labelName
	pageInfo = SubPagesInfo.objects.filter(pageIdx='highschool_list')[0]
	return render_to_response('mknp/page/university.html', {'pageInfo': pageInfo, 'universityTypes':universityTypes, 'universitys':universitys}, RequestContext(request))
	
def prouniversity(request):
	universitys = ProUniversity.objects.all()
	universityTypes = {}
	for university in universitys:
		universityTypes[university.label] = university.labelName
	pageInfo = SubPagesInfo.objects.filter(pageIdx='prouniversity_list')[0]
	return render_to_response('mknp/page/university.html', {'pageInfo': pageInfo, 'universityTypes':universityTypes, 'universitys':universitys}, RequestContext(request))

def university_detail(request, name):
	pageInfo = SubPagesInfo.objects.filter(pageIdx='university_detail')[0]
	university = get_object_or_404(University, title=name)
	return render_to_response('mknp/page/university_detail.html', {'pageInfo':pageInfo, 'university':university}, RequestContext(request))
	
def lanuniversity_detail(request, name):
	pageInfo = SubPagesInfo.objects.filter(pageIdx='lanuniversity_detail')[0]
	university = get_object_or_404(LanUniversity, title=name)
	return render_to_response('mknp/page/university_detail.html', {'pageInfo':pageInfo, 'university':university}, RequestContext(request))
	
def highschool_detail(request, name):
	pageInfo = SubPagesInfo.objects.filter(pageIdx='highschool_detail')[0]
	university = get_object_or_404(HighSchool, title=name)
	return render_to_response('mknp/page/university_detail.html', {'pageInfo':pageInfo, 'university':university}, RequestContext(request))
	
def prouniversity_detail(request, name):
	pageInfo = SubPagesInfo.objects.filter(pageIdx='prouniversity_detail')[0]
	university = get_object_or_404(ProUniversity, title=name)
	return render_to_response('mknp/page/university_detail.html', {'pageInfo':pageInfo, 'university':university}, RequestContext(request))

def aboutus(request):
	pageInfo = SubPagesInfo.objects.filter(pageIdx='aboutus')[0]
	companyInfo = CompanyInfo.objects.all()[0]
	return render_to_response('mknp/page/aboutus.html', {'pageInfo':pageInfo, 'companyinfo':companyInfo}, RequestContext(request))
	
def applyinfo(request, tagName):
	applyInfo = get_object_or_404(ApplyInfo, tag=tagName)
	return render_to_response('mknp/page/apply_flow.html', {'applyInfo': applyInfo}, RequestContext(request))
	
def serviceinfo(request, tagName):
	serviceInfo = get_object_or_404(ServiceInfo, tag=tagName)
	return render_to_response('mknp/page/items.html', {'serviceInfo':serviceInfo}, RequestContext(request))

def case_list(request, tagtype):
	pageInfo = TeacherInfoPage.objects.all()[0]
	cases = Case.objects.filter(tag = tagtype)
	caseinfo = CasePage.objects.filter(tag = tagtype)[0]
	return render(request, 'mknp/page/case_list.html', {'pageInfo':pageInfo, 'caseinfo': caseinfo, 'cases': cases}, RequestContext(request))
	
def case_detail(request, year, month, day, post):
	case = get_object_or_404(Case,  time__year = year,
									time__month = month,
									time__day = day,
									slug = post)
	return render(request, 'mknp/page/case.html', {'case':case}, RequestContext(request))

def teacherinfo(request, tagName):
	pageInfo = TeacherInfoPage.objects.all()[0]
	teacherInfo = get_object_or_404(TeamPage, name=tagName)
	tags = teacherInfo.labels.split(',')
	cases = Case.objects.filter(teacher=tagName)
	return render_to_response('mknp/page/teacher.html', {'teacherInfo':teacherInfo, 'pageInfo':pageInfo, 'tags': tags, 'cases':cases}, RequestContext(request))

def offerlist(request, titleInfo):
	Pages1Info = PagesInfo.objects.filter(pageIdx='page1')[0]  
	Pages2Info = PagesInfo.objects.filter(pageIdx='page2')[0] 
	Pages3Info = PagesInfo.objects.filter(pageIdx='page3')[0] 
	Pages4Info = PagesInfo.objects.filter(pageIdx='page4')[0] 
	Pages5Info = PagesInfo.objects.filter(pageIdx='page5')[0] 
	Pages6Info = PagesInfo.objects.filter(pageIdx='page6')[0]
	pageInfo = HomePage.objects.filter(title = titleInfo)[0]
	offers = Offer.objects.all()
	offerTypes = {}
	for offer in offers:
		offerTypes[offer.label] = offer.labelName
		
	return render_to_response('mknp/page/offer.html', {'pageInfo':pageInfo, 'offerTypes':offerTypes, 'offers': offers,'Pages1Infos': Pages1Infos, 'Pages1Info': Pages1Info, 'Pages2Info': Pages2Info,
		'Pages3Info': Pages3Info, 'Pages4Info': Pages4Info, 'Pages5Info': Pages5Info, 'Pages6Info': Pages6Info}, RequestContext(request))
