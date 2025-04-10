from pydantic import BaseModel

class Product(BaseModel):
    id: str
    name: str
    price: float
    quantity: int
    category: str
    brand: str