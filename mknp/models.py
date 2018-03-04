from django.db import models
#from django.utils import timezone
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.utils import timezone
# Create your models here.

class HomePage(models.Model):
	ICON_CHOICES = (
		('fa-clone', 'fa-clone'),
		('fa-heart-o', 'fa-heart-o'),
		('fa-lightbulb-o', 'fa-lightbulb-o'),
		('fa-comments-o', 'fa-comments-o'),
	)

	URL_CHOICES = (
		('applyinfo', 'applyinfo'),
		('serviceinfo', 'serviceinfo'),
	)
	title = models.CharField(max_length = 250)
	desc = models.CharField(max_length = 250)
	icon = models.CharField(max_length = 60, choices=ICON_CHOICES, default='fa-clone')
	directUrl = models.CharField(max_length = 100, choices=URL_CHOICES, default='applyinfo')
	def __str__(self):
		return self.title


class ActivityPage(models.Model):
	label = models.CharField(max_length = 250)
	labelName = models.CharField(max_length = 250)
	image = models.FileField(upload_to = 'files')
	title = models.CharField(max_length = 250)
	desc  = models.TextField()

	def __str__(self):
		return self.title

class TeamPage(models.Model):
	name = models.CharField(max_length = 250)
	title = models.CharField(max_length = 250,default='')
	position = models.CharField(max_length = 250,default='')
	labels = models.CharField(max_length = 600,default='')
	label1 = models.CharField(max_length = 250)
	label2 = models.CharField(max_length = 250)
	label3 = models.CharField(max_length = 250)
	label4 = models.CharField(max_length = 250)
	photo = models.ImageField(upload_to = 'images')
	desc = models.TextField(default='')
	tag1 = models.CharField(max_length = 250,default='')
	tag2 = models.CharField(max_length = 250,default='')
	contact = models.CharField(max_length = 250, default='')
	weixin = models.ImageField(upload_to = 'images',default='')
	sendword = models.TextField(default='')
	#skill1Label = models.CharField(max_length = 250,default='')
	#skill1Desc = models.TextField(default='')
	#skill2Label = models.CharField(max_length = 250,default='')
	#skill2Desc = models.TextField(default='')
	#skill3Label = models.CharField(max_length = 250,default='')
	#skill3Desc = models.TextField(default='')
	#skill4Label = models.CharField(max_length = 250,default='')
	#skill4Desc = models.TextField(default='')
	#skill5Label = models.CharField(max_length = 250,default='')
	#skill5Desc = models.TextField(default='')
	
	def get_absolute_url(self):
		return reverse('mknp:teacherinfo',
                        args=[self.name
                       ])
	
	def __str__(self):
		return self.name

class CasePage(models.Model):
	image = models.ImageField(upload_to = 'images')
	tag = models.CharField(max_length = 150)
	desc = models.TextField(default='')
	
	def __str__(self):
		return self.tag

class ProjectPage(models.Model):
	POS_CHOICES = (
		('left', 'left'),
		('right', 'right'),
	)
	URL_CHOICES = (
		('university', 'university'),
		('lanuniversity', 'lanuniversity'),
		('highschool', 'highschool'),
		('prouniversity', 'prouniversity'),
	)
	image = models.ImageField(upload_to = 'images')
	title = models.CharField(max_length = 250)
	label = models.CharField(max_length = 250)
	desc = models.TextField()
	pos = models.CharField(max_length = 10, choices=POS_CHOICES, default='left')
	directUrl = models.CharField(max_length = 100, choices=URL_CHOICES, default='university')
	
	def __str__(self):
		return self.title

class NewsPage(models.Model):
	ICON_CHOICES = (
		('fa-heart', 'fa-heart'),
	)
	title = models.CharField(max_length = 250)
	label = models.TextField()
	icon = models.CharField(max_length = 100, choices=ICON_CHOICES, default='fa-heart')

	def __str__(self):
		return self.title

class PagesInfo(models.Model):
	PAGE_CHOICES = (
		('page1', 'page1'),
		('page2', 'page2'),
		('page3', 'page3'),
		('page4', 'page4'),
		('page5', 'page5'),
		('page6', 'page6'),
	)
	pageIdx = models.CharField(max_length = 10, choices=PAGE_CHOICES, default='page1')
	tag = models.CharField(max_length = 100, default='1')
	title = models.CharField(max_length = 250, blank=True)
	label = models.CharField(max_length = 250, blank=True)
	image = models.ImageField(upload_to = 'images', blank=True)

	def __str__(self):
		return self.pageIdx

class SubPagesInfo(models.Model):
	PAGE_CHOICES = (
		('university_list', 'university_list'),
		('lanuniversity_list', 'lanuniversity_list'),
		('highschool_list', 'highschool_list'),
		('prouniversity_list', 'prouniversity_list'),
		('university_detail', 'university_detail'),
		('lanuniversity_detail', 'lanuniversity_detail'),
		('highschool_detail', 'highschool_detail'),
		('prouniversity_detail', 'prouniversity_detail'),
		('aboutus', 'aboutus'),
	)
	pageIdx = models.CharField(max_length = 30, choices=PAGE_CHOICES, default='page1', unique=True)
	title = models.CharField(max_length = 250)
	label = models.CharField(max_length = 250)
	bg = models.ImageField(upload_to = 'images', blank=True)

	def __str__(self):
		return self.pageIdx

class University(models.Model):
	label = models.CharField(max_length = 250)
	labelName = models.CharField(max_length = 250)
	image = models.ImageField(upload_to = 'images')
	title = models.CharField(max_length = 250)
	label = models.CharField(max_length = 250, blank=True)
	detail_title = models.CharField(max_length = 250)
	detail_image = models.ImageField(upload_to = 'images', default='images/university_detail_default.jpg')
	detail_desc1  = models.TextField(blank=True)
	detail_desc2  = models.TextField(blank=True)
	detail_desc3  = models.TextField(blank=True)
	detail_desc4  = models.TextField(blank=True)
	detail_desc5  = models.TextField(blank=True)
	

	def get_absolute_url(self):
		return reverse('mknp:university_detail',
                        args=[self.title
                       ])

	def __str__(self):
		return self.title
		
class LanUniversity(models.Model):
	label = models.CharField(max_length = 250)
	labelName = models.CharField(max_length = 250)
	image = models.ImageField(upload_to = 'images')
	title = models.CharField(max_length = 250)
	label = models.CharField(max_length = 250, blank=True)
	detail_title = models.CharField(max_length = 250)
	detail_image = models.ImageField(upload_to = 'images', default='images/university_detail_default.jpg')
	detail_desc1  = models.TextField(blank=True)
	detail_desc2  = models.TextField(blank=True)
	detail_desc3  = models.TextField(blank=True)
	detail_desc4  = models.TextField(blank=True)
	detail_desc5  = models.TextField(blank=True)

	def get_absolute_url(self):
		return reverse('mknp:lanuniversity_detail',
                        args=[self.title
                       ])

	def __str__(self):
		return self.title
		
class HighSchool(models.Model):
	label = models.CharField(max_length = 250)
	labelName = models.CharField(max_length = 250)
	image = models.ImageField(upload_to = 'images')
	title = models.CharField(max_length = 250)
	label = models.CharField(max_length = 250, blank=True)
	detail_title = models.CharField(max_length = 250)
	detail_image = models.ImageField(upload_to = 'images', default='images/university_detail_default.jpg')
	detail_desc1  = models.TextField(blank=True)
	detail_desc2  = models.TextField(blank=True)
	detail_desc3  = models.TextField(blank=True)
	detail_desc4  = models.TextField(blank=True)
	detail_desc5  = models.TextField(blank=True)

	def get_absolute_url(self):
		return reverse('mknp:highschool_detail',
                        args=[self.title
                       ])

	def __str__(self):
		return self.title
		
		
class ProUniversity(models.Model):
	label = models.CharField(max_length = 250)
	labelName = models.CharField(max_length = 250)
	image = models.ImageField(upload_to = 'images')
	title = models.CharField(max_length = 250)
	label = models.CharField(max_length = 250, blank=True)
	detail_title = models.CharField(max_length = 250)
	detail_image = models.ImageField(upload_to = 'images', default='images/university_detail_default.jpg')
	detail_desc1  = models.TextField(blank=True)
	detail_desc2  = models.TextField(blank=True)
	detail_desc3  = models.TextField(blank=True)
	detail_desc4  = models.TextField(blank=True)
	detail_desc5  = models.TextField(blank=True)

	def get_absolute_url(self):
		return reverse('mknp:prouniversity_detail',
                        args=[self.title
                       ])

	def __str__(self):
		return self.title

class CompanyInfo(models.Model):
	title = models.CharField(max_length = 500)
	image = models.ImageField(upload_to = 'images')
	desc1  = models.TextField(blank=True)
	desc2  = models.TextField(blank=True)
	desc3  = models.TextField(blank=True)
	desc4  = models.TextField(blank=True)
	desc5  = models.TextField(blank=True)
	def __str__(self):
		return self.title
		
class ApplyInfo(models.Model):
	PAGE_CHOICES = (
		('研究生申请', '研究生申请'),
	)
	tag = models.CharField(max_length = 150, unique=True, default='研究生申请')
	title = models.CharField(max_length = 500)
	label = models.CharField(max_length = 500,blank=True)
	slide_img1  = models.ImageField(upload_to = 'images')
	slide_img2  = models.ImageField(upload_to = 'images')
	slide_img3  = models.ImageField(upload_to = 'images')
	feature1_title = models.CharField(max_length = 150)
	feature1_desc = models.CharField(max_length = 500)
	feature2_title = models.CharField(max_length = 150)
	feature2_desc = models.CharField(max_length = 500)
	feature3_title = models.CharField(max_length = 150)
	feature3_desc = models.CharField(max_length = 500)
	step1_title = models.CharField(max_length = 150)
	step1_image = models.ImageField(upload_to = 'images')
	step1_desc = models.CharField(max_length = 500)
	step2_title = models.CharField(max_length = 150)
	step2_image = models.ImageField(upload_to = 'images')
	step2_desc = models.CharField(max_length = 500)
	step3_title = models.CharField(max_length = 150,blank=True)
	step3_image = models.ImageField(upload_to = 'images',blank=True)
	step3_desc = models.CharField(max_length = 500,blank=True)
	step4_title = models.CharField(max_length = 150,blank=True)
	step4_image = models.ImageField(upload_to = 'images',blank=True)
	step4_desc = models.CharField(max_length = 500,blank=True)
	step5_title = models.CharField(max_length = 150,blank=True)
	step5_image = models.ImageField(upload_to = 'images',blank=True)
	step5_desc = models.CharField(max_length = 500,blank=True)
	step6_title = models.CharField(max_length = 150,blank=True)
	step6_image = models.ImageField(upload_to = 'images',blank=True)
	step6_desc = models.CharField(max_length = 500,blank=True)
	
	def __str__(self):
		return self.tag
		

class ServiceInfo(models.Model):
	tag = models.CharField(max_length = 150, unique=True)
	title = models.CharField(max_length = 500)
	label = models.TextField(blank=True)
	feature1 = models.CharField(max_length = 300,blank=True)
	feature2 = models.CharField(max_length = 300,blank=True)
	feature3 = models.CharField(max_length = 300,blank=True)
	feature4 = models.CharField(max_length = 300,blank=True)
	feature5 = models.CharField(max_length = 300,blank=True)
	item1_title = models.CharField(max_length = 150)
	item1_image = models.ImageField(upload_to = 'images')
	item1_desc = models.CharField(max_length = 500)
	item2_title = models.CharField(max_length = 150)
	item2_image = models.ImageField(upload_to = 'images')
	item2_desc = models.CharField(max_length = 500)
	item3_title = models.CharField(max_length = 150,blank=True)
	item3_image = models.ImageField(upload_to = 'images',blank=True)
	item3_desc = models.CharField(max_length = 500,blank=True)
	item4_title = models.CharField(max_length = 150,blank=True)
	item4_image = models.ImageField(upload_to = 'images',blank=True)
	item4_desc = models.CharField(max_length = 500,blank=True)
	item5_title = models.CharField(max_length = 150,blank=True)
	item5_image = models.ImageField(upload_to = 'images',blank=True)
	item5_desc = models.CharField(max_length = 500,blank=True)
	item6_title = models.CharField(max_length = 150,blank=True)
	item6_image = models.ImageField(upload_to = 'images',blank=True)
	item6_desc = models.CharField(max_length = 500,blank=True)
	
	def __str__(self):
		return self.tag
		
		
class TeacherInfoPage(models.Model):
	descLabel = models.CharField(max_length = 500)
	bg_image = models.ImageField(upload_to = 'images')
	tag1 = models.CharField(max_length = 500)
	tag2 = models.CharField(max_length = 500)
	tag3 = models.CharField(max_length = 500)
	skillLabel = models.CharField(max_length = 500)
	caseLabel = models.CharField(max_length = 500)



class Case(models.Model):
	title = models.CharField(max_length = 200)
	view = models.CharField(max_length=100, default ="1")
	content1 = models.TextField(blank=True)
	img1 = models.ImageField(upload_to = 'images',blank=True)
	content2 = models.TextField(blank=True)
	img2 = models.ImageField(upload_to = 'images',blank=True)
	content3 = models.TextField(blank=True)
	img3 = models.ImageField(upload_to = 'images',blank=True)
	content4 = models.TextField(blank=True)
	img4 = models.ImageField(upload_to = 'images',blank=True)
	content5 = models.TextField(blank=True)
	img5 = models.ImageField(upload_to = 'images',blank=True)
	time = models.DateTimeField(default = timezone.now)
	slug = models.SlugField(max_length=250, unique_for_date='time')
	teacher = models.CharField(max_length = 150)
	tag = models.CharField(max_length = 150, default ="")
	
	class Meta:
		ordering = ('-time',)
		
	def __str__(self):
		return self.title
		
	def get_absolute_url(self):
		return reverse('mknp:case_detail',
						args = [self.time.year,
								self.time.strftime('%m'),
								self.time.strftime('%d'),
								self.slug])
								
								
class Offer(models.Model):
	label = models.CharField(max_length = 250)
	labelName = models.CharField(max_length = 250)
	image = models.FileField(upload_to = 'files')
	title = models.CharField(max_length = 250)
	desc  = models.TextField()

	def __str__(self):
		return self.title