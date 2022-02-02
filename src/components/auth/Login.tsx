import React from "react";



const Login = () =>{

    return(


    <div className="container">
    
        <div className="row justify-content-center">

            <div className="col-xl-6 col-lg-12 col-md-5">

                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                      
                        <div className="row">
                            
                            <div>
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                    </div>
                                    <form className="user">
                                        <div className="form-group">
                                            <input type="email" className="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Enter Email Address..."/>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Password"/>
                                        </div>
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox small">
                                                <input type="checkbox" className="custom-control-input" id="customCheck"/>
                                                <label className="custom-control-label" id="customCheck">Remember
                                                    Me</label>
                                            </div>
                                        </div>
                                        <a href="/Dashboard" className="btn btn-primary btn-user btn-block">
                                            Login
                                        </a>
                                       
                        
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    
    </div>
    )

}

export default Login;