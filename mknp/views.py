from django.shortcuts import render
from django.shortcuts import render_to_response
from django.template import RequestContext
from .models import HomePage
from .models import ActivityPage
from .models import TeamPage
from .models import CasePage
from .models import ProjectPage
from .models import NewsPage
from .models import PagesInfo

# Create your views here.

def home_page(request):
	homePages = HomePage.objects.all()
	activityPages = ActivityPage.objects.all()
	teamPages = TeamPage.objects.all()
	casePages = CasePage.objects.all()
	projectPages = ProjectPage.objects.all()
	newsPages = NewsPage.objects.all()
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
		'teamPages': teamPages, 'casePages': casePages, 'projectPages': projectPages, 'newsPages': newsPages, 'Pages1Info': Pages1Info, 'Pages2Info': Pages2Info,
		'Pages3Info': Pages3Info, 'Pages4Info': Pages4Info, 'Pages5Info': Pages5Info, 'Pages6Info': Pages6Info}, RequestContext(request))