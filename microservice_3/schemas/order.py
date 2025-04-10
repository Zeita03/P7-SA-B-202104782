import strawberry
from typing import List, Optional

@strawberry.type
class OrderType:
    id: Optional[str]
    userId: str
    productIds: List[str]
    status: str
    paymentMethod: str