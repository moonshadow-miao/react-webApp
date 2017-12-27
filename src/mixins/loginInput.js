import {Toast} from 'antd-mobile'
import {mailValid} from "../utils";
import {Api_verifyCode} from "../services/api";

let time = null;

export function Mixin(Component) {
  return class Component extends Component {
    state = {
      formData: {
        mail: '',
        password: '',
        code: ''
      },
      allowLoad: false,
      allowSendCode: true,
      codeTip: '获取验证码',
    }

    // 获取验证码
    getCode = async () => {
      if (!this.state.allowSendCode) return
      if (!mailValid(this.state.formData.mail)) return Toast.info('请输入正确的邮箱', 1);
      await Api_verifyCode(this.state.formData.mail);
      Toast.success('验证码已发送!', 1 );
      this.setState({allowSendCode: false});
      let num = 60;
      time = setInterval(() => {
        if (num <= 0) {
          this.setState({codeTip: '获取验证码', allowSendCode: true});
          clearInterval(time);
          return
        }
        this.setState({codeTip: `${num}秒后重新获取`});
        num--
      }, 1000);
    };

    // 输入框的双向数据绑定
    changeInput(value, e) {
      this.setState({
        formData: {...this.state.formData, [value]: e.target.value},
        allowLoad: true,
      })
    };
  }
}
