from secrets import username, password

# rds_connection_string = f"{username}:{password}@localhost:5432/etl_team5"
# engine = create_engine(f'postgresql://{rds_connection_string}')

database = "postgres"
# database = "heroku"

connect_string = ""

if database == "postgres":
    # connect_string = "postgresql://username:password@localhost:5432/etl_team5"

    connect_string = f"postgresql://{username}:{password}@localhost:5432/etl_team5"
    
elif database == "heroku":        
    connect_string = "postgresql://b0062c13dd9bc03400c5db309c3dbca1d5d21f486adc48b7c5412f9a8e456@ec2-54-235-108-217.compute-1.amazonaws.com:5432/d5tufocs1d1pci"