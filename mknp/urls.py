from django.conf.urls import url
from . import views
urlpatterns = [
	url(r'^$', views.home_page, name='home_page'),
	url(r'^university/$', views.university, name='university'),
	url(r'^lanuniversity/$', views.lanuniversity, name='lanuniversity'),
	url(r'^highschool/$', views.highschool, name='highschool'),
	url(r'^prouniversity/$', views.prouniversity, name='prouniversity'),
	url(r'^university/(?P<name>[-\w]+)/$',views.university_detail,name='university_detail'),
	url(r'^lanuniversity/(?P<name>[-\w]+)/$',views.lanuniversity_detail,name='lanuniversity_detail'),
	url(r'^highschool/(?P<name>[-\w]+)/$',views.highschool_detail,name='highschool_detail'),
	url(r'^prouniversity/(?P<name>[-\w]+)/$',views.prouniversity_detail,name='prouniversity_detail'),
	url(r'^aboutus/$',views.aboutus,name='aboutus'),
	url(r'^applyinfo/(?P<tagName>[-\w]+)/$',views.applyinfo,name='applyinfo'),
	url(r'^serviceinfo/(?P<tagName>[-\w]+)/$',views.serviceinfo,name='serviceinfo'),
]