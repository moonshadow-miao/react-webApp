import createHistory from 'history/createBrowserHistory'
import {Modal} from 'antd-mobile';

const alert = Modal.alert;
const history = createHistory({
  getUserConfirmation: (message, callback) => {
    let res = new Promise((resolve, reject) => {
      alert('提示', message, [
        {text: '取消', onPress: () => reject(false)},
        {text: '确认', onPress: () => resolve(true)},
      ]);
    });
    res.then(() => {
      callback(true)
    }).catch(() => {
      callback(false)
    })
  }
});

history.block((location, action) => {
  if (location.pathname === '/register' && action === 'POP') {
    return '确认离开当前页面?'
  }
  if (location.pathname === '/forget-pwd' && action === 'POP') {
    return '确认离开当前页面?'
  }
  if (location.pathname === '/login' && action === 'POP' && document.querySelector('.miss').style.display === 'none') {
    return '确认离开当前页面?'
  }
})

// history.listen((location, action) => {
//   console.log(`The current URL is ${location.pathname},search:${location.search},hash:${location.hash}`)
//   console.log(`The last navigation action was ${action}`)
// });

export default history
