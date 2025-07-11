## Project

This app is the result of a challenge for the company Modak. The app shows a list of products and includes infinite loading of products based on the API [DummyJSON](https://dummyjson.com/docs/products).
Pressing any product shows more details like the description and additional images.

For the sake of this challenge, I added a button to buy a product which sends a notification with a related 
product. This product is just the first one from the same category you are buying. If the user taps the notification, the app will take you to the details of the related product.

## Run the project locally

You can use an Android or iOS simulator on your laptop, but since I used Expo, you can use the Expo GO app which is available in the Play Store or App Store depending on your phone's OS.

- Open a terminal and go to the project's root folder.

```bash

yarn install
yarn run start

```

- If you are using Expo GO you can scan the QR code in your terminal to open the app
- If you are using a simulator, in the your terminal you can press A in your keyboard to open the android simulator or the letter I if you want to open it in an Ios simulator.
