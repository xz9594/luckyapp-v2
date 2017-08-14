import React, { Component } from 'react';
import './css/right.css';

class Right extends Component {

  constructor(props) {
        super(props)
        this.state = {
          rankNames:[],//奖品名称
          rankNums:[],//奖品数量
        }
    }

  componentWillMount(){
      fetch('/rules.json').then(res => res.json()).
      then(result => {
        let arr0 = [];
        let arr1 = [];
        for(let i=0; i<result.rank.length; i++){
            arr0.push(result.rank[i].name);
            arr1.push(result.rank[i].num);
        }
        this.setState({
            rankNames:arr0,
            rankNums:arr1,
        })
      });
  }
  
  render() {
      let rankN = this.state.rankNames;
      let ranks = (Arr) =>{
          let Arrs = [];
          for(let j=0; j<rankN.length; j++){
              Arrs.push(<p key={j}>{j+1}.{rankN[j]}&nbsp;&nbsp;剩余数量：<span>{this.state.rankNums[j]-localStorage.getItem(rankN[j]+"xingyun")}</span>名</p>);
          }
          return Arrs  
      }
        return (
           <div className="rContent">
               <ul>
                   {ranks(rankN)}
                   {/* <p>1.iPhone8<span></span>台</p>
                   <p>2.咪咕Kindle<span></span>台</p>
                   <p>3.咪咕一百元书券<span></span>份</p> */}
               </ul>
             </div>
            )
    }
}
export default Right;