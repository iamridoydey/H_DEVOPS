# Docker Guide
- Create a network
  - docker network create user_app_net
-Build the postgres image
  - docker run -d -p 5432:5432 --name=postgres -e POSTGRES_PASSWORD=secretpassword --network=user_app_net

-Build the user app image
  - docker build --network=host -t user_app .
- Run the container
  - docker run -d --network user_app_net -p 3000:3000 -e DATABASE_URL=postgresql://postgres:secretpassword@postgres:5432/mydb --name user_app_init_v user_app:latest 
