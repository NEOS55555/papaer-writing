import React, { Fragment, Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import Homepage from '@/components/Homepage'
import EditPage from '@/components/EditPage'
import Page1 from '@/components/Page1'
import Page2 from '@/components/Page2'




class Routers extends Component {

	// 这么做的目的是，不使Header和Rightnav多次加载执行didmount
	/*getContainer (jsx) {
		return (
			<Fragment>
				<div className="container main-content-wrapper">
					{jsx}
				</div>
			</Fragment>
		)
	}*/

	render () {
	  return (
	  	<Router>
		    	<Switch>
		    		
		        <Route exact path="/">
							<Homepage />
		        </Route>
		        <Route exact path="/editor">
							<EditPage />
		        </Route>
		        <Route exact path="/page1">
							<Page1 />
		        </Route>
		        <Route exact path="/page2">
							<Page2 />
		        </Route>
		        
		        <Route path="*">
		          404
		        </Route>
		      </Switch>
	    </Router>
	  );
	}
}



export default Routers;
