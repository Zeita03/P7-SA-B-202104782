import strawberry

@strawberry.type
class ProductType:
    id: str
    name: str
    price: float
    quantity: int
    category: str
    brand: str