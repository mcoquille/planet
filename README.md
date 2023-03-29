# Planet Challenge

## How to run it

1 - Assuming that you have docker installed and launched on your machine,
run "docker-compose up --build", and wait until all containers have reached a steady state
2 - From the main directory, run 'sh start.sh'

## How the CI/CD pipeline would work

In prod, the ETL process would also be containerized.

From there, we push the 3 containers (ETL, backend, and website) into a registry, 
and we deploy them into services.

## A few words

This app could be massively improved, whether it be error management, and with tests.
This was a pretty dense challenge and I had to do it in 3 days, after word.
I'm happy to talk about everything in more details for a next interview.

Also, I'm experiencing a lot of inconsistency with the DB, so I hope it will be better when you run the app. You may have to refresh the page a few times.

Thank you!