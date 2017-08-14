import React, {Component} from 'react';
import './css/left.css';
class Left extends Component {

    constructor(props) {
        super(props)
        this.state = {
           contents:[],//活动规则内容
        }
    }

   //获取json数据
    componentWillMount(){
      fetch('/rules.json').then(res => res.json()).
      then(result => {
        //console.log("name1是："+json.name.length);
       // console.log("类型："+(json.rules));
        this.setState({
            contents:result.rules1
        })
      });
    }

    render() {
        let list = (arr)=>{
            if(!arr){
                return <p>没有规则</p>
            }
            let listArr = [];
            for(let i=0; i<arr.length; i++){
                listArr.push(<p key={i}>{arr[i]}</p>);
            }
            return listArr
        }

        let contentArr = this.state.contents;

        return (
          <div className="leftContent">
             <ul>
                 {list(contentArr)}
             </ul>
           </div>
            )
    }
}

export default Left;