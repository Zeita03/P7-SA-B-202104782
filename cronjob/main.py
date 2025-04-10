from datetime import datetime
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
mongo_uri = os.getenv("MONOG_URI")
print("MONGO_URI cargado desde el archivo .env: ", mongo_uri)
db_name = "ms_cronjob"
collection_name = "registros"

def insertar_registro():
    gmt6 = datetime.now()
    numero_carne = "202104782"

    try:
        print("Imprimiendo aqui: ", mongo_uri)
        cliente = MongoClient(mongo_uri)
        
        # Verificar si la conexión fue exitosa
        if cliente is None:
            print("Error al conectar a MongoDB.")
            return
        # Verificar si la base de datos y la colección existen
        if db_name not in cliente.list_database_names():
            print(f"La base de datos '{db_name}' no existe.")
            return
        if collection_name not in cliente[db_name].list_collection_names():
            print(f"La colección '{collection_name}' no existe en la base de datos '{db_name}'.")
            return
        
        db = cliente[db_name]
        coleccion = db[collection_name]

        registro = {
            "fecha_hora": gmt6.strftime("%Y-%m-%d %H:%M:%S"),
            "carnet": numero_carne
        }

        coleccion.insert_one(registro)
        print("Registro insertado correctamente.")

    except Exception as e:
        print(f"Error al insertar el registro: {e}")
    finally:
        if cliente:
            cliente.close()

if __name__ == "__main__":
    insertar_registro()