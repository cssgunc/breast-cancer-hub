# Setting up your environment

## Cloning the repository

1. [Clone the repository](https://github.com/git-guides/git-clone) into a local workspace. Avoid folders that have cloud sync services, such as Microsoft OneDrive.

## Installing Node

1. Check if you have node and npm install by running `node -v` and `npm -v`. If both are installed, skip this section.
2. Download node from https://nodejs.org/en/download. Follow the steps as shown.
3. Ensure that you have everything downloaded by repeating Step 1. You will need node to run the React server, and npm in order to install the React Native dependencies in the next section.

## Installing Dependencies

Open the repository in an IDE of your choice, preferably VSCode.

### Frontend

1. Open a new terminal for the project and run `cd breast-cancer-hub`. You should now be in `breast-cancer-hub/breast-cancer-hub`. This is where the frontend React Native code is located.
2. Run `npm install`. You will get many warnings and vulnerabilities. Ignore these. If you get errors, you will have to debug.
   > If you are coming in from an older version of this project or have issues in general, try the following few commands:\
   > npx expo install --fix\
   > npx expo install --check\
   > In the end, you should see a message telling you your dependencies are up to date.
3. Run `npm start`. This will be the command you need to run to start the project most of the time.
   > This is configured to run `expo start --tunnel`, which will allow you to view your app on both web and mobile.\
   > You may need to install further dependencies, such as ngrok. Accept the downloads.\
   > You will also need to disable the firewall for these specific dependencies.
4. You have succeeded if you can open the browser version without errors (hit w, or go to http://localhost:8081). Open the developer console. There should be no errors. You should see the home page with a fully interactable calendar, and be able to navigate to settings and self examinations. Try navigating to /login as well.

#### Using Expo Go For Mobile Testing

1. Download Expo Go on your mobile device if you have one.
2. With the app running, scroll up in the terminal and scan the QR code with Expo Go. This should automatically connect the app.
3. You have succeeded if the app builds and opens without errors on your device. There may be some parts missing, but as a whole we just want to see that there are no errors during the process.

### Backend

1. Open another tab of the terminal - don't close your currently running app if you plan to use them at the same time.
2. Run `cd backend-breast-cancer-hub` to navigate to the backend folder.
3. Run `npm run dev` to start up the server. You should see "Server is running on http://localhost:3000/".
4. You have succeeded when the main route just shows "error: ". Try navigating to `/settings`. You should see an Unauthorized error, and the terminal should print out "req made".

### Connecting mobile to backend

1. Set up a .env file in the frontend folder so it is in `breast-cancer-hub/breast-cancer-hub`.
2. If you haven't already, connect to the UNC PSK network instead of the eduroam network on both your laptop and mobile device. Steps to set it up can be found online.
3. Turn off randomized MAC addresses for the PSK network on both your laptop and mobile.
4. Run ipconfig (Windows) or ifconfig (Mac) to get your current IPv4 address for your laptop. Take note of the address.
5. Once you have the IP address for your laptop, create a key in the .env file like EXPO_PUBLIC_BASE_URL=http://152.23.142.148:3000 but use your IP address.
6. Start your backend server.
7. Try to access that base url from a browser in your laptop by entering it into the browser. If it connects successfully, you can now use the Expo Go app like normal, and your backend requests will be received successfully.
8. If it doesn't work, this usually means you haven't given Node.js runtimes enough permission. Try to retrigger the permissions ask and allow all permissions. You can try switching from app.listen(PORT, () => {console.log(`Server is running on http://localhost:${PORT}/`); }); to app.listen(3000, '0.0.0.0', () => { console.log('Server running on http://0.0.0.0:3000/'); }); and running the server, accepting the permissions, and then switching back.

### Stopping the Project

1. Close the running frontend app with Ctrl + C.
2. Close the running backend with Ctrl + C.

## Updating Dependencies and Running the Project Regularly

You do not need to go through all these steps every time. For regular usage and development:

1. Frontend: Run `npm start` in the `breast-cancer-hub/breast-cancer-hub` directory as done previously.
2. Backend: Run `npm run dev` in the `backend-breast-cancer-hub` directory.
3. If any of these fail, double check that your terminal is in the right directory.

Very rarely, we may update the dependencies required for this projects.\
Update dependencies after pulling from the remote repository by running `npm install` in the frontend folder. You can refer back to the Installing Dependencies section.

## Conclusion

By the end of this, you should have an interactive app running on both browser and mobile, and the backend server should be giving you responses to your routes.\
You are ready to start contributing.

Next: Read the [Contributing Guidelines](contributing_guidelines.md) before you begin!
