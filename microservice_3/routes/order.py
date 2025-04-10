import strawberry
from typing import List, Optional
from config.db import collection
from schemas.order import OrderType
from bson import ObjectId

@strawberry.type
class Query:
    
    @strawberry.field
    def getOrderById(self, orderId: str) -> Optional[OrderType]:
        order = collection.find_one({"_id": ObjectId(orderId)})

        if not order:
            return None
        
        return OrderType(
            id=str(order["_id"]),
            userId=order["userId"],
            productIds=order["productIds"],
            status=order["status"],
            paymentMethod=order["paymentMethod"]
        )

@strawberry.type
class Mutation:
    
    @strawberry.mutation
    def createOrder(
        self,
        userId: str,
        productIds: List[str],
        paymentMethod: str
    ) -> OrderType:
        
        # Initial status
        status = "Pending"

        # Create new order
        new_order = {
            "userId": userId,
            "productIds": productIds,
            "status": status,
            "paymentMethod": paymentMethod
        }
        
        result = collection.insert_one(new_order)

        return OrderType(
            id=str(result.inserted_id),
            userId=userId,
            productIds=productIds,
            status=status,
            paymentMethod=paymentMethod
        )