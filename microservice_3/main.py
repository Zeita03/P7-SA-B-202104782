from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter
from routes.order import Query, Mutation

import strawberry

# Schemas of GraphQL
schema = strawberry.Schema(query=Query, mutation=Mutation)
graphql_app = GraphQLRouter(schema)

app = FastAPI()
app.include_router(graphql_app, prefix="/orders")