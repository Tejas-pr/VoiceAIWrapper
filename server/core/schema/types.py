import graphene
from graphene_django import DjangoObjectType
from core.models import Organization, Project, Task, TaskComment

class OrganizationType(DjangoObjectType):
    class Meta:
        model = Organization
        fields = (
            'id',
            'name',
            'slug',
            'contact_email',
            'created_at',
            'projects',
        )

class ProjectType(DjangoObjectType):
    task_count = graphene.Int()
    completed_tasks = graphene.Int()
    completion_rate = graphene.Float()

    class Meta:
        model = Project
        fields = (
            'id',
            'name',
            'description',
            'status',
            'due_date',
            'created_at',
            'organization',
            'tasks',
        )

    def resolve_task_count(self, info):
        return self.tasks.count()

    def resolve_completed_tasks(self, info):
        return self.tasks.filter(status='DONE').count()

    def resolve_completion_rate(self, info):
        total = self.tasks.count()
        if total == 0:
            return 0.0
        completed = self.tasks.filter(status='DONE').count()
        return round((completed / total) * 100, 2)

class TaskType(DjangoObjectType):
    class Meta:
        model = Task
        fields = (
            'id',
            'title',
            'description',
            'status',
            'assignee_email',
            'due_date',
            'created_at',
            'project',
            'comments',
        )

class TaskCommentType(DjangoObjectType):
    class Meta:
        model = TaskComment
        fields = (
            'id',
            'content',
            'author_email',
            'created_at',
            'task',
        )
