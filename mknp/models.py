from django.db import models
#from django.utils import timezone
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
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
	label1 = models.CharField(max_length = 250)
	label2 = models.CharField(max_length = 250)
	label3 = models.CharField(max_length = 250)
	label4 = models.CharField(max_length = 250)
	photo = models.ImageField(upload_to = 'images')
	
	def __str__(self):
		return self.name

class CasePage(models.Model):
	image = models.ImageField(upload_to = 'images')
	tag = models.CharField(max_length = 150)
	
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
	title = models.CharField(max_length = 250)
	label = models.CharField(max_length = 250)
	image = models.ImageField(upload_to = 'images', blank=True)

	def __str__(self):
		return self.pageIdx

class SubPagesInfo(models.Model):
	PAGE_CHOICES = (
		('university_list', 'university_list'),
		('university_detail', 'university_detail'),
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
		return reverse('mknp:university_detail',
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
		return reverse('mknp:university_detail',
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
		return reverse('mknp:university_detail',
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


