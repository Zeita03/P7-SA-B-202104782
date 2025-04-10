from pydantic import BaseModel
from typing import List, Optional

class Order(BaseModel):
    id: Optional[str]
    userId: str
    productIds: List[str]
    status: str
    paymentMethod: str