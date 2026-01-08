import graphene
from core.models import Organization, Project
from .types import OrganizationType, ProjectType

class Query(graphene.ObjectType):
    organizations = graphene.List(OrganizationType)
    projects = graphene.List(
        ProjectType,
        organization_slug=graphene.String(required=True)
    )

    def resolve_organizations(root, info):
        return Organization.objects.all()

    def resolve_projects(root, info, organization_slug):
        return Project.objects.filter(
            organization__slug=organization_slug
        )

