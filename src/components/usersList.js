import React from 'react'
import { connect} from 'react-redux'
import { Avatar } from '@material-ui/core';
import {startGetUsers,tartGetSearch, startGetSearch} from '../actions/usersAction'
import Pagination from "react-js-pagination";
import { Button,Form,Col } from 'react-bootstrap' 




import './userList.css'
import './search.css'


class UsersList extends React.Component {
 constructor() {
     super()
     this.state ={
         pageNo:1,
         search:''
     }
 }

 handleChange = (e) => {
    this.setState({
        [e.target.name]:e.target.value
    })
 }

 handleSubmit = (e) => {
     e.preventDefault()
     console.log(this.state.search)
     this.props.dispatch(startGetSearch(this.state.search))
 }

 componentDidMount() {
     this.props.dispatch(startGetUsers(this.state.pageNo))
 }

 
 handlePageChange(pageNo) {
    console.log(`active page is ${pageNo}`);
    this.setState({pageNo: pageNo});
    this.props.dispatch(startGetUsers(pageNo))
  }


   render () {
       console.log(this.props.users)
       return (
           <div>
                <Form className="search-form" onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Col>
                            <Form.Control
                                id="inlineFormInput"
                                placeholder="Search here"
                                name="search"
                                value={this.state.search}
                                onChange={this.handleChange}
                            />
                        </Col>

                        <Col>
                            <Button xs="auto" type="submit">
                                Submit
                            </Button>
                           
                        </Col>
                    </Form.Row>
             </Form>
               {
                   this.props.users.map((user,i) => {
                       return (
                           <div key={i} className="user">
                               <div className="user-header">
                                   <Avatar className="user-avatar" src={user.avatar_url} />
                                <h5>{user.login}</h5>
                               </div>

                               <img className="user-img" src={user.avatar_url} />
                            </div>
                          
                       )
                   })
               }<div className="pagination">
            <Pagination itemClass="page-item"
                linkClass="page-link"
                activePage={this.state.pageNo}
                totalItemsCount={1700}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange.bind(this)}
            />
        </div>
           </div>
       )
   }
    
}

const mapStateToProps = (state) => {
    return {
        users:state.users
    }
}

export default connect(mapStateToProps)(UsersList)