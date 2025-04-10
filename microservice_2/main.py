from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter
from routes.product import Query, Mutation
from config.config import PORT

import strawberry

# Schemas of GraphQL
schema = strawberry.Schema(query=Query, mutation=Mutation)
graphql_app = GraphQLRouter(schema)

app = FastAPI()
app.include_router(graphql_app, prefix="/products")