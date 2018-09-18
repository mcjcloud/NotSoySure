# Not Soy Sure?
*Not Soy Sure?* is a React Native application developed at HackRice aimed at helping those who cannot eat animal products such as Vegans. The application uses MLKit to recognize the ingredients from the labels of packaged foods and list any that are non-vegan.

## How does it work?
The application works by allowing a user to take a picture of an ingredients label. That image is processed through MLKit's text recognition model and converted to plaintext. That text is then sanitized and broken up into individual ingredients and passed to an API to be cross-referenced with a non-vegan chemical database. The results of this process are returned to the application and displayed to the user. 

## How to install
1. Clone the repository.
2. Install dependencies: `npm`, `react-native`, `cocoa-pods`, `XCode`, and optionally `Android Studio`
3. Navigate to the project directory and run `npm install`
4. Navigate to the `ios` folder and run `pod install`
5. Open the `NotSoySure.xcworkspace` in XCode
6. Navigate to the project settings and change the bundle identifier to a unique string
7. Plug in your device and press play!
