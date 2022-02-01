import logo from './logo.svg';
import './App.css';
import {Component} from 'react'







class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      autoStartToken:'',
      orderRef:''
    }
  }


   componentDidMount() {




      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({personalNumber:197202214453
          ,endUserIp:'172.31.15.164'
          ,userVisibleData:'Persigund test Check.this only for test envirment'
        })
    };
     fetch('https://giti.persifund.com:8002/internet-gateway/api/bankids/sign-bank-id', requestOptions)
    .then(response => response.json())
    .then(function(data){
      console.log(data.data);
      //this.setState({ autoStartToken: data.autoStartToken,orderRef:data.orderRef  });
      //https://appapi2.bankid.com/
      window.open('https://app.bankid.com/?autoStartToken='+data.data.autoStartToken+'&redirect=null');
      timer(data.data.orderRef);
    });

    
        
    function timer(orderRefTemp){
      const refreshId = setInterval(function getAlerts() {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({orderRef:orderRefTemp
          })
         }
       fetch('https://giti.persifund.com:8002/internet-gateway/api/bankids/collect-bank-id', requestOptions)
          .then(response => response.json())
          .then(function(data){
              if(data.data.status === 'pending'){
                // works when system wait for aprove user
              }
              if(data.data.status === 'complete'){
                // works when user aprove bankId
                handleSignIn();
                clearInterval(refreshId);
              }
              if(data.data.status === 'failed'){
                // works when procees is failed.for other test you can test hintCode value like as "userCancel" or "expiredTransaction"
                if(data.data.hintCode ==='userCancel'){
                  handleCanceled();
                }
                if(data.data.hintCode ==='expiredTransaction'){
                  handleExpierdTime();
                }
                clearInterval(refreshId);
              }
       });
        }, 10000)
    }

    function handleSignIn(){
      alert("You are sign completly!")
    }

    function handleExpierdTime(){
      alert("Transaction filed Time Expierd!")
    }

    function handleCanceled(){
      alert("Transaction filed .You are canceld transaction!")
    }
  
  

    
   
  };
  





  render(){
    return (
      <div className="App">
      
      </div>
    );
  }

}

export default App;
