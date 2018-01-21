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
	return render_to_response('mknp/page/university.html', {'universityTypes':universityTypes, 'universitys':universitys}, RequestContext(request))

def university_detail(request, name):
	pageInfo = SubPagesInfo.objects.filter(pageIdx='university_detail')[0]
	university = get_object_or_404(University, title=name)
	return render_to_response('mknp/page/university_detail.html', {'pageInfo':pageInfo, 'university':university}, RequestContext(request))

def aboutus(request):
	pageInfo = SubPagesInfo.objects.filter(pageIdx='aboutus')[0]
	companyInfo = CompanyInfo.objects.all()[0]
	return render_to_response('mknp/page/aboutus.html', {'pageInfo':pageInfo, 'companyinfo':companyInfo}, RequestContext(request))
	
def applyinfo(request, tagName):
	applyInfo = get_object_or_404(ApplyInfo, tag=tagName)
	return render_to_response('mknp/page/apply_flow.html', {'applyInfo': applyInfo}, RequestContext(request))