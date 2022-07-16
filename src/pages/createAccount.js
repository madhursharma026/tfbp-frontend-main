import React from 'react'
import { Link, withRouter } from 'react-router-dom'


const CreateAccount = () => {
  return (
    <div className="row" style={{textAlign: 'center', justifyContent: 'center'}}>
        <div className="col">
          <Link to="/register?account_type=Provider" className="btn btn-primary">Provider Registration</Link>
        </div>
        <div className="col">
          <Link to="/register?account_type=Attorney" className="btn btn-primary">Attorney Registration</Link>
        </div>
        <div className="col">
          <Link to="/register?account_type=Marketer" className="btn btn-primary">Marketer Registration</Link>
        </div>
    </div>
  )
}

export default CreateAccount