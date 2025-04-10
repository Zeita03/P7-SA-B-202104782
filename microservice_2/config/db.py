from pymongo import MongoClient
from config.config import DB_HOST

client = MongoClient(DB_HOST)

db = client["ms2_products"]
collection = db["products"]