from pymongo import MongoClient
from config.config import DB_HOST

client = MongoClient(DB_HOST)

db = client["ms3_orders"]
collection = db["orders"]