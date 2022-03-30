To Run
-- package downloading
yarn

--database creating
yarn prisma migrate
yarn prisma migrate dev
yarn 
yarn prisma migrate deploy

-- type generation
yarn prisma generate

--migrate commands
yarn prisma migrate status

--run app 
yarn dev

-- path localhost:4000


--docker
docker build . --tag pc-staging
docker run -p 4000:4000 pc-staging

-- unattached
docker run -p 4000:4000 -d pc-staging


-- cloud build
gcloud builds submit --tag gcr.io/piti-commerce/pc-staging .
gcloud beta run deploy demo-app --image gcr.io/piti-commerce/demo-image --region us-central1 --platform managed --allow-unauthenticated --quiet
