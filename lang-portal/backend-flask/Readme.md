## Install

```sh
pip install -r requirements.txt
```

## Setup DB

To set up the database, follow the following steps:
This separates the data creation process from db creation, so the data is only imported when needed

```
1. Delete db/app.db file
2. Run python init_db.py
3. Run python import_seed_data.py

rm db/app.db ; python init_db.py ; python import_seed_data.py 
```

## Run

```sh
python app.py
```