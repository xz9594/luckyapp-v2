import React, {Component} from 'react';
import './css/luru.css';
import Left from './Left';
import Middle from './Middle'
import Right from './Right'

class Luru extends Component {
    localStorage = window.localStorage;

    constructor(props) {
        super(props)
        this.state = {
           
        }
    }

   

    render() {
        return (
          <div>
           <div className="contentTop">
               
           </div>
           <div className="contentBottom">

               <div className="left">
                   <Left />
               </div>

               <div className="middle">
                   <Middle />
               </div>

               <div className="right">
                   <Right />
               </div>
           </div>
           </div>
            )
    }
}

export default Luru;