# Install ETL requirements
pip3 install -r requirements.txt

# Create figures table in Postgres DB
psql postgres://postgres:password@localhost:6660/planet -c "
    CREATE TABLE figures (
        id SERIAL PRIMARY KEY,
        org_id INT,
        figure GEOMETRY,
        created_at timestamp default now()
    );;
"

# Process raw data
python3 process_figures.py
