![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![AmazonDynamoDB](https://img.shields.io/badge/Amazon%20DynamoDB-4053D6?style=for-the-badge&logo=Amazon%20DynamoDB&logoColor=white)
![AWS Amplify](https://img.shields.io/badge/AWS%20Amplify-FF9900.svg?style=for-the-badge&logo=AWS-Amplify&logoColor=white)
![AWS Lambda](https://img.shields.io/badge/AWS%20Lambda-FF9900.svg?style=for-the-badge&logo=AWS-Lambda&logoColor=white)
![API](https://img.shields.io/badge/Amazon%20API%20Gateway-FF4F8B.svg?style=for-the-badge&logo=Amazon-API-Gateway&logoColor=white)


# Landon Hotels (Clone)

This web app is a very basic clone of the original website of [Landon Hotel](https://landonhotel.com/). It is build using React and AWS Amplify. It also demonstrate a basic example of **Serverless** React Web App.

## Technology Used

- React js
- AWS Amplify
- DynamoDB
- Amazon API Gateway
- Lambda Functions

## Prerequisite
- AWS Account (Preferably free tier).
- Node js (v18.x and above)
- aws-cli for Amplify builds
## Deployment

**Local Server**

To run the app locally :-

1. Clone this repo
2. Install dependencies using `yarn`
3. Uncomment the `.json` file imports on the components.
4. Comment out the hooks (`useState` and `useEffect`) call parts on the same.
5. Run the app using 
    ```
    yarn dev
**AWS Amplify build**
1. Install and configure aws-cli (preferably v2). 
2. Its better to use *us-east-1* as the region, otherwise it is neccessary to change the region in DynamoDB table creation codes, which are available under `src/scripts`.
3. Create the tables using 
    ```
    yarn table
4. Load Data into tables using
    ```
    yarn loaddata
4. Create, Deploy and Test Lambda fuctions to read data from DynamoDB. Total four functions needed to read data from four tables. Sample Code :-
    ```
    import { DynamoDB } from "@aws-sdk/client-dynamodb";
    import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

    const REGION = "us-east-1";

    const dbclient = new DynamoDB({ region: REGION });
    const ddbDocClient = DynamoDBDocument.from(dbclient);

    export const handler = async (event) => {
        try {
            const params = {
                TableName: "GalleryImages",
            };

            const data = await ddbDocClient.scan(params);
            return data.Items;
        } catch (error) {
            console.error(error);
        }
    };
6. Create four *API Gateway Routes* (GET) and Integrate the lambda functions.
7. It is better to use a seperate *stage* in the API Gateway for the API requests rather than `default`. 
8. The base **API Url** is saved as environment variable with key name `VITE_BASE_URL`. Same can be added to the AWS Amplify.
9. Once the code is committed follow the deployment steps in the AWS Amplify console.
0. Once the Deployment is ready it can be accessed with the generated app url https://&lt;branch name&gt;.&lt;random string&gt;.amplifyapp.com .

## LICENSE
[MIT](LICENSE)
