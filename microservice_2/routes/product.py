import strawberry
from typing import List, Optional
from config.db import collection
from schemas.product import ProductType
from bson import ObjectId

@strawberry.type
class Query:
    
    @strawberry.field
    def findAllProducts(self) -> List[ProductType]:
        products = list(collection.find({}))
        return [
            ProductType(
                id=str(product["_id"]),
                name=product["name"],
                price=product["price"],
                quantity=product["quantity"],
                category=product["category"],
                brand=product["brand"],
            )
            for product in products
        ]
        
    @strawberry.field
    def findProduct(self, id: str) -> Optional[ProductType]:
        product = collection.find_one({"_id": ObjectId(id)})
        if product:
            return ProductType(
                id=str(product["_id"]),
                name=product["name"],
                price=product["price"],
                quantity=product["quantity"],
                category=product["category"],
                brand=product["brand"],
            )
        return None
    

@strawberry.type
class Mutation:
    
    @strawberry.mutation
    def createProduct(self, name: str, price: float, quantity: int, category: str, brand: str) -> ProductType:
        # Verificar si el producto ya existe basado en nombre y marca
        existing_product = collection.find_one({"name": name, "brand": brand})
        if existing_product:
            raise Exception("El producto con ese nombre y marca ya existe.")

        # Crear el nuevo producto
        new_product = {
            "name": name,
            "price": price,
            "quantity": quantity,
            "category": category,
            "brand": brand,
        }
        result = collection.insert_one(new_product)

        return ProductType(
            id=str(result.inserted_id),
            name=name,
            price=price,
            quantity=quantity,
            category=category,
            brand=brand,
        )
