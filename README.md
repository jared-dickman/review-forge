# Review Forge Welcome Page!

Turning code review into developer joy


## Configure the app
- create a `.env` file in the root of the project
  - create a [github access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic)
    - add OCTOKIT_SECRET_KEY=PUT_TOKEN_HERE to the `.env` file
  - create an openai account and retrieve two keys one for Org and one for Project
  - add those to `.env` file as OPENAI_ORG_KEY and OPENAI_PROJECT_KEY 

## Running the app
- Start the Frontend
  - open a terminal running node 20+
  - `npm i && npm run dev`

- Start the Backend
  - open a terminal running node 20+
  - `cd src/server && npm i && npx tsc && node dist/app.js`
 

## Screenshots

<details>
  <summary>Easier review with Improved File Order</summary>
  <img width="1496" alt="image" src="https://github.com/user-attachments/assets/b31c12a9-fb89-45da-b1c4-d90a589a9b50">
</details>

<details>
  <summary>Diffs the files in order with Generated Comments</summary>
  <img width="1496" alt="image" src="https://github.com/user-attachments/assets/ca447a99-ba72-4daf-a8d1-55015d8078dc">
</details>


<details>
  <summary>Gain insigshts into different categories</summary>
  
  <details>
    <summary>Prediction Insights</summary>
    <img width="1496" alt="image" src="https://github.com/user-attachments/assets/01c7cff0-dafe-4652-ab0c-3b2cd1345cb6">
  </details>

   <details>
    <summary>Summary Insights</summary>
    <img width="1496" alt="image" src="https://github.com/user-attachments/assets/1c385525-3bd9-4c99-98ce-aedc8136bf90">
  </details>


   <details>
    <summary>Issue Insights</summary>
    <img width="1366" alt="image" src="https://github.com/user-attachments/assets/e8cbc699-f893-4c54-bfd3-95e5c526dcc9">
  </details>


   <details>
    <summary>Testing Insights</summary>
  <img width="1385" alt="image" src="https://github.com/user-attachments/assets/2fbbbfa6-d5d8-44da-a35c-2d778c50b9e4">
  </details>


   <details>
    <summary>Performance Insights</summary>
    <img width="1384" alt="image" src="https://github.com/user-attachments/assets/e4324b36-9932-4c0b-ba24-2e72b7f69772">
  </details>


   <details>
    <summary>Custom Insights</summary>
    <img width="1496" alt="image" src="https://github.com/user-attachments/assets/e98af35a-8de7-42c0-8fe7-589eb2511638">
    <img width="1496" alt="image" src="https://github.com/user-attachments/assets/ab257a5a-92c9-41e9-af21-13255ecb83ef">
  </details>

</details>
