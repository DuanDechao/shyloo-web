from django.db import models
#from django.utils import timezone
from django.contrib.auth.models import User
# Create your models here.

class HomePage(models.Model):
	ICON_CHOICES = (
		('fa-clone', 'fa-clone'),
		('fa-heart-o', 'fa-heart-o'),
		('fa-lightbulb-o', 'fa-lightbulb-o'),
		('fa-comments-o', 'fa-comments-o'),
	)
	title = models.CharField(max_length = 250)
	desc = models.CharField(max_length = 250)
	icon = models.CharField(max_length = 60, choices=ICON_CHOICES, default='fa-clone')

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
	image = models.ImageField(upload_to = 'images')
	title = models.CharField(max_length = 250)
	label = models.CharField(max_length = 250)
	desc = models.TextField()
	pos = models.CharField(max_length = 10, choices=POS_CHOICES, default='left')
	
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
	pageIdx = models.CharField(max_length = 10, choices=PAGE_CHOICES, default='page1', unique = True)
	tag = models.CharField(max_length = 250, default='1')
	title = models.CharField(max_length = 250)
	label = models.CharField(max_length = 250)
	image = models.ImageField(upload_to = 'images', blank=True)

	def __str__(self):
		return self.pageIdx

