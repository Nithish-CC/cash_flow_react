import axios from "axios";

import "../config/Axiosconfiq";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Login from "../components/auth/Login";
import StudentProfileId from "../components/studentdetails/Student";
import Dashboard from "../components/Dashboard/Dashboard";
import Studentpay from "../components/studentdetails/Studentpay";
import Studentadd from "../components/New Admission/Studentadd";
import Promotion from "../components/Promotion/Promotion";
import Yearoffee from "../components/Yearoffee/Yearoffee";
import Feemaster from "../components/Feemaster/Feemaster";
import Discountfee from "../components/Discountfee/Discountfee";
import Year from "../components/Year/Year";
import Grade from "../components/Grade_section/Grade";
import Studentrecord from "../components/studentdetails/Studentrecord";
import StudentProfile from "../components/studentdetails/Studentprofile";
import StudentprofileSearch from "../components/studentdetails/StudentprofileSearch";
import Placesprice from "../components/Transport/Placesprice";
import Uniform_size from '../components/Uniform_size/Uniform_size';
import Uniform_things from '../components/Uniform_things/Uniform_things';
import Uniform from '../components/Uniform/Uniform';
import Hostalname from "../components/Hostal/Hostalname";
import RoomNo from "../components/Hostal/RoomNo";
import HostalFee from "../components/Hostal/HostalFee";
import Placesspotting from "../components/Transport/Placesspotting";

    
   

const PrivateRoute = (props: any) => {
	let history = useHistory<any>();
	const token = sessionStorage.getItem("AccessToken");
	if (token) {
		return <Route exact={true} path={props.path} component={props.component} />;
	} else {
		history.push("/");
		return <Login {...props} />;
	}
};
const Routers = (props: any) => {
	if (sessionStorage.getItem("AccessToken")) {
		
	}

	return (
		<React.Fragment>
			<React.StrictMode>
				<BrowserRouter>
					<React.Fragment>
						<Switch>
							<Route exact={true} path="/" component={Login} />
							<PrivateRoute path="/Dashboard" component={Dashboard} />
							<PrivateRoute path="/studentrecord" component={Studentrecord} />
							<PrivateRoute path="/StudentProfileId" component={StudentProfileId} />
							<PrivateRoute path="/Stu_pay" component={Studentpay} />
							<PrivateRoute path="/Stu_add" component={Studentadd} />
							<PrivateRoute path="/Stupro" component={Promotion} />
							<PrivateRoute path="/Stu_fees" component={Yearoffee} />
							<PrivateRoute path="/Fee_master" component={Feemaster} />
							<PrivateRoute path="/Discounttype" component={Discountfee} />
							<PrivateRoute path="/Academicyear" component={Year} />
							<PrivateRoute path="/Grade_section" component={Grade} />
							<PrivateRoute path="/studentprofile" component={StudentProfile} />
							<PrivateRoute path="/StudentprofileSearch/:id" component={StudentprofileSearch} />
							<PrivateRoute path="/placesprice" component={Placesprice} />
							<PrivateRoute path="/placesstoppings" component={Placesspotting} />
							<PrivateRoute path="/Uniform_size" component={Uniform_size} />
							<PrivateRoute path="/Uniform_things" component={Uniform_things} />
							<PrivateRoute path="/Uniform" component={Uniform} />
							<PrivateRoute path="/hostal_name" component={Hostalname} />
							<PrivateRoute path="/room_no" component={RoomNo} />
							<PrivateRoute path="/hostal_fees" component={HostalFee} />
							{/* <PrivateRoute exact component={NotFoundScreen} /> */}
						</Switch>
					</React.Fragment>
				</BrowserRouter>
			</React.StrictMode>
		</React.Fragment>
	);
};


export default Routers;
