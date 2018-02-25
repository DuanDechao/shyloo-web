from django.contrib import admin
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
from .models import Case
# Register your models here.

class HomePageAdmin(admin.ModelAdmin):
	list_display = ('title', 'desc', 'icon')
admin.site.register(HomePage, HomePageAdmin)

class ActivityPageAdmin(admin.ModelAdmin):
	list_display = ('label', 'labelName', 'image', 'title')
admin.site.register(ActivityPage, ActivityPageAdmin)

class TeamPageAdmin(admin.ModelAdmin):
	list_display = ('name', 'label1', 'label2', 'label3', 'label4', 'photo')
admin.site.register(TeamPage, TeamPageAdmin)

class CasePageAdmin(admin.ModelAdmin):
	list_display = ('tag', 'image')
admin.site.register(CasePage, CasePageAdmin)

class ProjectPageAdmin(admin.ModelAdmin):
	list_display = ('title', 'label', 'image', 'directUrl')
admin.site.register(ProjectPage, ProjectPageAdmin)

class NewsPageAdmin(admin.ModelAdmin):
	list_display = ('title', 'label', 'icon')
admin.site.register(NewsPage, NewsPageAdmin)

class PagesInfoAdmin(admin.ModelAdmin):
	list_display = ('pageIdx', 'tag', 'title', 'label', 'image')
admin.site.register(PagesInfo, PagesInfoAdmin)

class SubPagesInfoAdmin(admin.ModelAdmin):
	list_display = ('pageIdx', 'title', 'label', 'bg')
admin.site.register(SubPagesInfo, SubPagesInfoAdmin)

class UniversityAdmin(admin.ModelAdmin):
	list_display = ('label', 'labelName', 'image', 'title', 'label', 'detail_title', 'detail_image')
admin.site.register(University, UniversityAdmin)

class CompanyInfoAdmin(admin.ModelAdmin):
	list_display = ('title', 'image')
admin.site.register(CompanyInfo, CompanyInfoAdmin)

class ApplyInfoAdmin(admin.ModelAdmin):
	list_display = ('tag', 'title')
admin.site.register(ApplyInfo, ApplyInfoAdmin)

class ServiceInfoAdmin(admin.ModelAdmin):
	list_display = ('tag', 'title')
admin.site.register(ServiceInfo, ServiceInfoAdmin)

class LanUniversityAdmin(admin.ModelAdmin):
	list_display = ('label', 'labelName', 'image', 'title', 'label', 'detail_title', 'detail_image')
admin.site.register(LanUniversity, LanUniversityAdmin)

class HighSchoolAdmin(admin.ModelAdmin):
	list_display = ('label', 'labelName', 'image', 'title', 'label', 'detail_title', 'detail_image')
admin.site.register(HighSchool, HighSchoolAdmin)

class ProUniversityAdmin(admin.ModelAdmin):
	list_display = ('label', 'labelName', 'image', 'title', 'label', 'detail_title', 'detail_image')
admin.site.register(ProUniversity, ProUniversityAdmin)

class CaseAdmin(admin.ModelAdmin):
	list_display = ('title', 'slug', 'teacher', 'time')
admin.site.register(Case, CaseAdmin)