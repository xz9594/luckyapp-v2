import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './css/chou.css';
import ChouMiddle from './ChouMiddle'

class Choujiang extends Component {

  constructor(props) {
        super(props)
        this.state = {
          flag:"middle1",//middle1和middle0分别代表有中奖用户和无中奖用户的背景
          contents0:[],//规则内容
        }
    }

    //获取json数据
    componentWillMount(){
      fetch('/rules.json').then(res => res.json()).
      then(result => {
        //console.log("name1是："+json.name.length);
       // console.log("类型："+(json.rules));
        this.setState({
            contents0:result.rules2,
        })
      });
    }

    hanldleChange(comment){
       this.setState({
         flag:comment
       })
        console.log(comment)
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
        
        let contentArrs = this.state.contents0;
        return (
           <div>
           <div className="contentTop0">
               
           </div>
           <div className="contentBottom0">
                
                <div className="left0">
                    <ul>
                      {list(contentArrs)}
                    </ul>
                </div>

                <div className={this.state.flag}>

                  <ChouMiddle onchange={this.hanldleChange.bind(this)}/>

                </div>
                 {/* 开始结束按钮背景 */}
                <div className="right0">
                    
                </div>
                
                <div className="bottom0"> 
                  <Link className="bottomLink" to="/">返回</Link>
                </div>
           </div>
           </div>
            )
    }
}
export default Choujiang;