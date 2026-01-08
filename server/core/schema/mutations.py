import graphene
from django.core.exceptions import ObjectDoesNotExist
from core.models import Organization, Project, Task, TaskComment
from .types import ProjectType, TaskType, TaskCommentType

class CreateProject(graphene.Mutation):
    project = graphene.Field(ProjectType)

    class Arguments:
        organization_slug = graphene.String(required=True)
        name = graphene.String(required=True)
        description = graphene.String()
        status = graphene.String(required=True)
        due_date = graphene.Date()

    def mutate(self, info, organization_slug, name, status, description=None, due_date=None):
        try:
            org = Organization.objects.get(slug=organization_slug)
        except Organization.DoesNotExist:
            raise Exception("Organization not found")

        project = Project.objects.create(
            organization=org,
            name=name,
            description=description or "",
            status=status,
            due_date=due_date,
        )

        return CreateProject(project=project)


class UpdateProject(graphene.Mutation):
    project = graphene.Field(ProjectType)

    class Arguments:
        project_id = graphene.ID(required=True)
        name = graphene.String()
        description = graphene.String()
        status = graphene.String()
        due_date = graphene.Date()

    def mutate(self, info, project_id, **kwargs):
        try:
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist:
            raise Exception("Project not found")

        for field, value in kwargs.items():
            setattr(project, field, value)

        project.save()
        return UpdateProject(project=project)


class CreateTask(graphene.Mutation):
    task = graphene.Field(TaskType)

    class Arguments:
        project_id = graphene.ID(required=True)
        title = graphene.String(required=True)
        description = graphene.String()
        status = graphene.String(required=True)
        assignee_email = graphene.String()
        due_date = graphene.DateTime()

    def mutate(self, info, project_id, title, status, description=None, assignee_email=None, due_date=None):
        try:
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist:
            raise Exception("Project not found")

        task = Task.objects.create(
            project=project,
            title=title,
            description=description or "",
            status=status,
            assignee_email=assignee_email or "",
            due_date=due_date,
        )

        return CreateTask(task=task)


class UpdateTask(graphene.Mutation):
    task = graphene.Field(TaskType)

    class Arguments:
        task_id = graphene.ID(required=True)
        title = graphene.String()
        description = graphene.String()
        status = graphene.String()
        assignee_email = graphene.String()
        due_date = graphene.DateTime()

    def mutate(self, info, task_id, **kwargs):
        try:
            task = Task.objects.get(id=task_id)
        except Task.DoesNotExist:
            raise Exception("Task not found")

        for field, value in kwargs.items():
            setattr(task, field, value)

        task.save()
        return UpdateTask(task=task)


class AddTaskComment(graphene.Mutation):
    comment = graphene.Field(TaskCommentType)

    class Arguments:
        task_id = graphene.ID(required=True)
        content = graphene.String(required=True)
        author_email = graphene.String(required=True)

    def mutate(self, info, task_id, content, author_email):
        try:
            task = Task.objects.get(id=task_id)
        except Task.DoesNotExist:
            raise Exception("Task not found")

        comment = TaskComment.objects.create(
            task=task,
            content=content,
            author_email=author_email,
        )

        return AddTaskComment(comment=comment)
