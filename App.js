import {
  StackNavigator,
} from 'react-navigation';
import Login from './src/pages/Login';
import ChatList from './src/pages/ChatList';

const App = StackNavigator({
  Login: {screen: Login},
  ChatList: {screen: ChatList},
}, {
  headerMode: 'none'
});

export default App;