import {Navigation} from 'react-native-navigation';

import App from './App';
import {Colors} from './Styles/Styles';

Navigation.registerComponent('com.myApp.WelcomeScreen', () => App);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'com.myApp.WelcomeScreen',
              options: {
                statusBar: {
                  backgroundColor: Colors.appBarColor,
                  style: 'light',
                },
                topBar: {
                  background: {
                    color: Colors.appBarColor,
                  },
                  elevation: 0,
                },
                layout: {
                  componentBackgroundColor: Colors.appBarColor,
                  backgroundColor: Colors.appBarColor,
                },
              },
            },
          },
        ],
      },
    },
  });
});
