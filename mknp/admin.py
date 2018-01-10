from django.contrib import admin
from .models import HomePage
from .models import ActivityPage
from .models import TeamPage
from .models import CasePage
from .models import ProjectPage
from .models import NewsPage
from .models import PagesInfo
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
	list_display = ('title', 'label', 'image', 'pos')
admin.site.register(ProjectPage, ProjectPageAdmin)

class NewsPageAdmin(admin.ModelAdmin):
	list_display = ('title', 'label', 'icon')
admin.site.register(NewsPage, NewsPageAdmin)

class PagesInfoAdmin(admin.ModelAdmin):
	list_display = ('pageIdx', 'tag', 'title', 'label', 'image')
admin.site.register(PagesInfo, PagesInfoAdmin)