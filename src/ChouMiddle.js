import React, { Component } from 'react';
import './css/chouMiddle.css';

class ChouMiddle extends Component {

  constructor(props) {
        super(props)
        this.state = {
         userList:[],//输入的用户列表
         box:'box',//用户名滚动
         startAndEnd:"开始",//按钮文字
         disabled1:"",//如果没有用户，则按钮为disabled
         user:'show',//用户列表切换show显示，hide隐藏
         lucyUser:"hide",//中奖用户列表切换show显示，hide隐藏
         lucyuserName:"",//中奖用户的名字
         lucyuserList:[],//左侧中奖用户显示列表
         background:"middle1",//获奖名单的背景图片
         marqueeBox:"marqueeBox1",//中奖人滚动速度
         rankName:[],//奖品名字
         rankNum:[],//奖品数量
        }
    }
    
    componentWillMount(){
       let users0 = [];
      //所有用户名字，只能输入该数组中的名字  在Luru的middle页面也用到该数组
      fetch('/rules.json').then(res => res.json()).
      then(result => {
        users0 = result.names;//将获取到的所有用户名放入users0中
        let speenRight = result.speed;//右侧带抽奖用户滚动速度,暂时没有想到好的办法
        if(speenRight==="1"){this.setState({box:'box11'})
        }else if(speenRight==="2"){this.setState({box:'box12'})
        }else if(speenRight==="3"){this.setState({box:'box13'})
        }else if(speenRight==="4"){this.setState({box:'box14'})
        }else if(speenRight==="5"){this.setState({box:'box15'})
        }else if(speenRight==="6"){this.setState({box:'box16'})
        }else if(speenRight==="7"){this.setState({box:'box17'})
        }else if(speenRight==="8"){this.setState({box:'box18'})
        }else if(speenRight==="9"){this.setState({box:'box19'})
        }else if(speenRight==="10"){this.setState({box:'box110'})
        }else{this.setState({box:'box'})}
        let speenLift = result.speed1;//左侧中奖用户滚动速度
        if(speenLift==="1"){this.setState({marqueeBox:'marqueeBox1'})
        }else if(speenLift==="2"){this.setState({marqueeBox:'marqueeBox2'})
        }else if(speenLift==="3"){this.setState({marqueeBox:'marqueeBox3'})
        }else if(speenLift==="4"){this.setState({marqueeBox:'marqueeBox4'})
        }else if(speenLift==="5"){this.setState({marqueeBox:'marqueeBox5'})
        }else if(speenLift==="6"){this.setState({marqueeBox:'marqueeBox6'})
        }else if(speenLift==="7"){this.setState({marqueeBox:'marqueeBox7'})
        }else if(speenLift==="8"){this.setState({marqueeBox:'marqueeBox8'})
        }else if(speenLift==="9"){this.setState({marqueeBox:'marqueeBox9'})
        }else if(speenLift==="10"){this.setState({marqueeBox:'marqueeBox10'})
        }else{this.setState({marqueeBox:'marqueeBox1'})}
        
        let ranks = result.rank;
        let rankName = [];//奖品名字
        let rankNum =[];//奖品数量
        for(let n=0; n<ranks.length; n++){
            rankName.push(ranks[n].name);
            rankNum.push(ranks[n].num);
        }
        this.setState({
            rankName:rankName,
            rankNum:rankNum
        })
      
        let userLists = [];
        //获取待抽奖用户的名单
        for(let i=0; i<localStorage.length; i++){
          let num = localStorage.key(i);
          var name = localStorage.getItem(num);
          for(let j=0; j<users0.length; j++){
           if(users0[j]===name){
               userLists.push(name);
           }
        }  
       } 
      //判断使用有用户输入，没有输入用户或者没有奖品是不能抽奖
      let rank0 = this.refs.select.value;
        if(!rank0){
          this.setState({
          disabled1:'disabled'
        })
        }
      if(userLists.length===0){
        userLists=['没有用户'];
        this.setState({
          disabled1:'disabled'
        })
      }
      //将所有可能中奖的名字和等级放入数组
      const userNameRank = [];
      const rankList=this.state.rankName;
      for(let x=0; x<users0.length; x++){
        for(let y=0; y<rankList.length; y++){
            let temp = users0[x]+rankList[y];
            userNameRank.push(temp);
        }
      }
      
      let luckUsersList = [];//左侧中奖用户列表数组
      for(let z=0; z<localStorage.length; z++){
          let num0 = localStorage.key(z);
          //var name = localStorage.getItem(num);
          for(let h=0; h<userNameRank.length; h++){
            if(userNameRank[h]===num0){
              luckUsersList.push(localStorage.getItem(num0))
            }
          }  
       }
       
         //将localStorage获取的用户名放入state以及左侧滚动的中奖用户
         this.setState({
          userList:userLists,
          lucyuserList:luckUsersList,
        })

      //改变是否有用户中奖的背景图片
      let backgroundFlag0="";
      if(this.props.onchange){
        if(luckUsersList.length===0){
          backgroundFlag0='middle0'
        }else{
          backgroundFlag0='middle1'
        }
        this.props.onchange(backgroundFlag0);
      }
      });

    }


    //处理开始结束按钮
    handleChangeClick(){
    //随机获取中奖用户名
    let lucknames = this.state.userList;
    let n = Math.floor(Math.random()*lucknames.length);
    //随机中奖用户
    let luckname = lucknames[n];

    //获取中奖等级
    let rank = this.refs.select.value;

    let startEndValue = this.refs.startEnd.innerHTML;
    
    if(startEndValue==="开始"){
      this.setState({
        startAndEnd:'结束',
        box:'box1',
        user:"show",
        lucyUser:"hide", 
      })
    }else if(startEndValue==="结束"){
        //处理剩余奖品数量
        let rName = this.state.rankName;//获取奖品名字数组
        let rNum = this.state.rankNum;//获取奖品数量数组
        let rankTemp = rank+"xingyun";
        if(!localStorage.getItem(rankTemp)){//记录每个奖品出现的次数
          localStorage.setItem(rankTemp,1);
        }else{
          let rTemp = parseInt(localStorage.getItem(rankTemp))+1;
          localStorage.setItem(rankTemp,rTemp);
        }
        //判断是否还有剩余奖项
        for(let x = 0; x<rName.length; x++){
          if(rank === rName[x]){
            if(parseInt(localStorage.getItem(rank+"xingyun"))===rNum[x]){
              localStorage.setItem(rName[x]+"disabled","disabled");
            }
          }
        }
        let sum = 0;//所有奖品的和
        let sumRank=0;//所有点击次数的和
        for(let z=0; z<rNum.length; z++){
          sum+=rNum[z];
        }
        

       //左侧中奖列表
       let tempUser=luckname+rank;
       let tempUser0=luckname+"--------"+rank;
       localStorage.setItem(tempUser,tempUser0);
       //alert(localStorage.getItem("海子一等奖")+localStorage.length)

      //刷新页面不显示已经中奖的人名
      localStorage.removeItem(luckname);
      setTimeout(()=>{
        window.location.reload(); 
      },2000)

      this.setState({
        startAndEnd:'开始',
        box:'box2',
        user:"hide",
        lucyUser:"show",
        lucyuserName:luckname,
        disabled1:'disabled',//点击结束的时候不能立刻抽奖
      })
    }
    
  }
  
  render() {
        let userArr=this.state.userList;
        let lucyUserArr=this.state.lucyuserList;
        let listArr = (arr)=>{
          let Arr = [];
          for(let j=0; j<arr.length; j++){
            Arr.push(<li key={j}>{arr[j]}</li>)
          }
          return Arr
        }
        //中奖等级内容
        let rankName0 = this.state.rankName;//获取中奖名字数组
        let rankNum0 = this.state.rankNum;//获取中奖数量数组
        let ranks = (arrs) => {
          let Arrs = [];
          for(let m=0; m<arrs.length; m++){
            Arrs.push(<option key={m} disabled={localStorage.getItem(rankName0[m]+"disabled")} value={arrs[m]}>{arrs[m]}</option>)
          }
          return Arrs;
        }
        return (
           <div>
             {/* 中奖用户列表 */}
             <div className="cmLeft">
               <div className="marquee">
                 <ul className={this.state.marqueeBox}>
                   {listArr(lucyUserArr)}
                 </ul>
               </div>
             </div> 

             <div className="cmRight">
                 {/* 中奖等级 */}
                 <div className="sel">
                   <select ref="select">
                     {/* <option  disabled={localStorage.getItem('haveOne')} value="一等奖">一等奖</option>
                     <option  disabled= {localStorage.getItem('haveTwo')} value="二等奖">二等奖</option>
                     <option  disabled={localStorage.getItem('haveThree')} value="三等奖">三等奖</option> */}
                     {ranks(rankName0)}
                   </select>
                 </div>

                  {/* 用户列表滚动区域 */}
                 <div ref="change" className={this.state.user}>
                      <ul className={this.state.box}>
                        {listArr(userArr)}
                      </ul>
                 </div>
                 {/* 单个中奖用户区域 */}
                 <div ref="change1" className={this.state.lucyUser}>
                      <span className="lucyuser">{this.state.lucyuserName}</span>
                 </div>

                    {/* 开始结束按钮 */}
                    <div className="btn">
                        <button disabled={this.state.disabled1} ref="startEnd" onClick={this.handleChangeClick.bind(this)}>{this.state.startAndEnd}</button>
                    </div>
                 </div>
           </div>
            )
    }
}
export default ChouMiddle;