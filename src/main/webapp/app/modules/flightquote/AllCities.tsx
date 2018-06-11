import * as React from 'react';
import { connect } from 'react-redux'
import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

export interface IHomeProp{
  segments: Array<Object>
}



export class AllCities extends React.Component<IHomeProp>  {
  render(){
    console.log(this.props.segments);
    var data=[]
    this.props.segments.map(it=>{
      data.push(it.segment)
    })
   return(
       <div >
       {data}
       </div>
    )
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default AllCities;