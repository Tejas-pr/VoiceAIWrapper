import graphene
from core.schema.queries import Query as CoreQuery
from core.schema.mutations import (
    CreateProject,
    UpdateProject,
    CreateTask,
    UpdateTask,
    AddTaskComment,
)

class Mutation(graphene.ObjectType):
    create_project = CreateProject.Field()
    update_project = UpdateProject.Field()
    create_task = CreateTask.Field()
    update_task = UpdateTask.Field()
    add_task_comment = AddTaskComment.Field()

schema = graphene.Schema(
    query=CoreQuery,
    mutation=Mutation
)
