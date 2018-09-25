/**
 * 
 */

import React, {Component} from 'react';

const client = require('./client');

class BusinessEntities extends Component {
	
	  constructor(props) {
        super(props);
        this.state = {
            colorForBox: "lightskyBlue",
            entity: "",
            entityNameInputBoxDisabled: false,
            entityId: "",
            entityIdInputBoxDisabled: false,            
            todos: [],
            businessEntities: [],
            links: {},
            isOneBusinessEntity: false // used in OneBusinessEntity class
         };

        // bind all event handlers (JavaScript requirement)
        this.entityInputBoxChanged=this.entityInputBoxChanged.bind(this);
        this.entityIdInputBoxChanged=this.entityIdInputBoxChanged.bind(this);
        this.entityNameInputBoxClicked=this.entityNameInputBoxClicked.bind(this);
        this.entityIdInputBoxClicked=this.entityIdInputBoxClicked.bind(this);
        this.fetchBusinessEntity= this.fetchBusinessEntity.bind(this);
        
        this.onNavigate = this.onNavigate.bind(this);
        this.onNavigateToSingleEntity = this.onNavigateToSingleEntity.bind(this);
    }
	
     
    // event handler for entity name input box onChange
 	  entityInputBoxChanged(event) { this.setState({entity: event.target.value}); }	
    // event handler for entity id input box onChange	  
    entityIdInputBoxChanged(event) { this.setState({entityId: event.target.value}); } 
 
    /* entity name input box engaged , disable other box */
    entityNameInputBoxClicked(event) {
     this.setState({entityId : '' }); // blank out value in entity id box
     this.setState({entityIdInputBoxDisabled: true }); // disable the entity id box
    } 
   
   
   /* entity id input box engaged, disable other box */
   entityIdInputBoxClicked(event) {
     this.setState({entity : '' }); // blank out value in entity name box     
     this.setState({entityNameInputBoxDisabled: true }); // disable the entity name box
    } 

	    
   // tag::fetchBusinessEntity[]
	  /*
	    Submit button function.      
	    Retrieves data from a REST call based on what is passed in the input box 
	     entity name is passed via input box, then retrieves all ToDos.
	     'id' a value is passed, then retrieves just that entity by that ID
	  */
	  fetchBusinessEntity(event) {
	    console.log("---- start fetchBusinessEntity");
   		console.log(this.state);
   		
   		// reset the state if its already populated from prior fetch
   		// this will cause, if displayed, the Entities List table to be unrendered
   		this.setState({businessEntities: []});
     this.setState({ isOneBusinessEntity: false });
   		
   		
   		var urlStr;
   		if (this.state.entity) { // searching by a entity name
       urlStr = "/api/businessEntities/search/findByPartialEntityNameNativeQueryWithPagination?entityName=";
       urlStr = urlStr+this.state.entity;
       
       // invoke service
       /* execute in Postman and you'll see the entity._embedded.businessEntities hierarchy */       
       client({method: 'GET', path: urlStr})
          .done(response => {
          this.setState({
                          businessEntities: response.entity._embedded.businessEntities,
                          links: response.entity._links
                       });
       });

       // let's reset entityNameInputBoxDisabled to active
       this.setState({ entityIdInputBoxDisabled: false });

       
   		} else if (this.state.entityId){ // searching by entity id
       urlStr = "/api/businessEntities/";
       urlStr = urlStr + this.state.entityId;

       // invoke service
       client({method: 'GET', path: urlStr})
          .done(response => {
          this.setState({businessEntities: response});
       });
      
       // let's reset entityNameInputBoxDisabled to active
       this.setState({ entityNameInputBoxDisabled: false });
              
   		}
		   console.log("---- end fetchBusinessEntity");            
	  }
	  // end::fetchBusinessEntity[]
	  
   // tag::navigate[]
	  /* 
	   * Execute in Postman and you'll see the entity._embedded.businessEntities hierarchy 
	   * 
	   * This function's client call expects a *list* of business entities to be returned
	   * 
	   * */
   onNavigate(navUri) {
    client({method: 'GET', path: navUri})
       .done(response => {
           this.setState({
              businessEntities: response.entity._embedded.businessEntities,
              links: response.entity._links
           });
       });
    
    this.setState({ isOneBusinessEntity: false });

   }
   // end::navigate[]	  

   // tag::onNavigateToSingleEntity[]
   /* 
    * Execute in Postman and you'll see the entity._embedded.businessEntities hierarchy 
    * 
    * This function's client call expects a *single* business entities to be returned
    * 
    * */
   onNavigateToSingleEntity(navUri) {     
     client({method: 'GET', path: navUri})
       .done(response => {
       this.setState({businessEntities: response});
     });
     
     // let's flag that we have just one BusinessEntity we are working with
     this.setState({ isOneBusinessEntity: true });     
   }
   // end::onNavigateToSingleEntity[]      
   
	  render() {
	       const toDosLength = this.state.todos.length;
	       const businessEntitiesLength  = this.state.businessEntities.length;
	        const styleObj= {
	            backgroundColor: this.state.colorForBox,
	            fontSize: 12
	        };		  
	        
	        /* Conditional rendering - https://reactjs.org/docs/conditional-rendering.html 
	         * Render when we have a list of business entities (list length is >= 1)
	         * or 
	         * when there is just one business entity (value is stored in businessEntities.entity)
	         */	        
	        let businessEntityForRender;
         if (this.state && this.state.businessEntities.length>=1) { // rendering list of business entities     
           businessEntityForRender = <BusinessEntitiesList businessEntities={this.state.businessEntities}
                                                           links={this.state.links}
                                                           onNavigate={this.onNavigate} 
                                                           onNavigateToSingleEntity={this.onNavigateToSingleEntity}/>
         } else if (this.state && this.state.businessEntities.entity) { // rendering single business entity
           
           /*  when searching for a business entity by id, returned values get mapped into businessEntities.entity */
           businessEntityForRender = <OneBusinessEntity oneBusinessEntity={this.state.businessEntities}
                                                        isOneBusinessEntity={this.state.isOneBusinessEntity}/>           
         }
	        
        return (
        		<div id="parent">
        	   	<h1 id="heading">Name Search Availability</h1> 
             <section id="rest-section">
                 <div id="rest-section-div" style={styleObj}>                    
                     {/* Input Box */}
                     <div class="form-group">
                         <label for="entity-label">
                             Enter entity name
                         </label>
                         <input
                             id="entity-input"
                             value={this.state.entity}
                             onChange={this.entityInputBoxChanged}
                             disabled = {this.state.entityNameInputBoxDisabled}
                             onClick = {this.entityNameInputBoxClicked}

                         />
                     </div>
                     <div className="form-group">
                       <label htmlFor="name">Enter entity id </label>
                       <input 
                         id="entityId-input"
                         value={this.state.entityId}
                         onChange={this.entityIdInputBoxChanged}
                         disabled = {this.state.entityIdInputBoxDisabled}
                         onClick = {this.entityIdInputBoxClicked}
                         />
                     </div>
                     {/* Submit Button */}
                     <center>
                         <div>
                             <button
                                 id="botton-for-Box"
                                 onClick={this.fetchBusinessEntity} >
                                 {" "}
                                 Search {" "}
                             </button>
                         </div>
                     </center>
                 </div>
                     {businessEntityForRender}
             </section>
           </div>
        );    	
    };
}


class BusinessEntitiesList extends React.Component{
  
     constructor(props) {
       super(props);
       this.handleNavFirst = this.handleNavFirst.bind(this);
       this.handleNavPrev = this.handleNavPrev.bind(this);
       this.handleNavNext = this.handleNavNext.bind(this);
       this.handleNavLast = this.handleNavLast.bind(this);
      }  
     
     // tag::handle-nav[]
     handleNavFirst(e){
      e.preventDefault();
      this.props.onNavigate(this.props.links.first.href);
     }
    
     handleNavPrev(e) {
      e.preventDefault();
      this.props.onNavigate(this.props.links.prev.href);
     }
    
     handleNavNext(e) {
      e.preventDefault();
      this.props.onNavigate(this.props.links.next.href);
     }
    
     handleNavLast(e) {
      e.preventDefault();
      this.props.onNavigate(this.props.links.last.href);
     }
     // end::handle-nav[]  
     
     // tag::businessEntities-list-render[]  
   	render() {
   		var businessEntities = this.props.businessEntities.map(businessEntity =>
   			<BusinessEntity key={businessEntity._links.self.href} businessEntity={businessEntity}
   			                                                      onNavigateToSingleEntity={this.props.onNavigateToSingleEntity}/>
   		);
   		
   		// links displayed under the table
     var navLinks = [];
     if ("first" in this.props.links) {
      navLinks.push(<button id="nav" key="first" onClick={this.handleNavFirst}>&lt;&lt;</button>);
     }
     if ("prev" in this.props.links) {
      navLinks.push(<button id="nav" key="prev" onClick={this.handleNavPrev}>&lt;</button>);
     }
     if ("next" in this.props.links) {
      navLinks.push(<button id="nav" key="next" onClick={this.handleNavNext}>&gt;</button>);
     }
     if ("last" in this.props.links) {
      navLinks.push(<button id="nav" key="last" onClick={this.handleNavLast}>&gt;&gt;</button>);
     }		
   		
   		return (	
   		 <div>
   			<table id="busentities">
   				<tbody>
   					<tr>
   					<th>Entity Id</th>
   					<th>Entity Name</th>
   					<th>Entity Type</th>
   					<th>Entity Status Code</th>
   					</tr>
   					{businessEntities}
   				</tbody>
   			</table>
      <center>       
       <div>
         {navLinks}
        </div>  
      </center>
      </div>  

   		)
   	}
    // tag::businessEntities-list-render[]  
}

/*
 * This is called by BusinessEntitiesList for rendering each business entity
 */
class BusinessEntity extends React.Component{
  
    constructor(props) {
      super(props);
      this.handleNavigateToSingleEntity = this.handleNavigateToSingleEntity.bind(this);
    }
    
    handleNavigateToSingleEntity(e){
      e.preventDefault();
      this.props.onNavigateToSingleEntity(this.props.businessEntity._links.self.href);
     }
    
  	render() {
  		var businessEntity = this.props.businessEntity
  		var selfLink = this.props.businessEntity._links.self.href
  
  		var isOneBusinessEntity = this.props.isOneBusinessEntity
  		return (
  			<tr>
  			 {!isOneBusinessEntity ? ( 
        <td><a id="selfLink" href= "#" onClick={this.handleNavigateToSingleEntity}> {businessEntity.entityId} </a></td>
        ): (
        <td>{businessEntity.entityId}</td>            
  			 )}
  			<td>{businessEntity.entityName}</td>
  			<td>{businessEntity.entityType}</td>
  			<td>{businessEntity.entityStatusCd}</td>
  			</tr>
  		)
	}
	/*    <td><a href= {selfLink}> {businessEntity.entityId} </a></td>
*/
}

/* -
 * oneBusinessEntity.entity, because that is where the data is stored 
 * 
 * This is evident when you use the Chrome Developer and introspecting the shows this:
 * 
 * Local
 *   -> this: OneBusinessEntity
 *     -> props
 *       ->oneBusinessEntity
 *          -> entity: {entityId: 20061166326, entityName: "Journey of Hope, Inc", entityType: "DPC         ", entityStatusCd: "GOOD   ", _links: {…}, …}
 *          -> headers: {Date: "Tue, 25 Sep 2018 16:05:08 GMT", Transfer-Encoding: "chunked", Content-Type: "application/hal+json;charset=UTF-8"}
 *          -> raw: XMLHttpRequest {onreadystatechange: ƒ, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
 *          -> request: {method: "GET", path: "/api/businessEntities/20061166326", originator: ƒ, headers: {…}, canceled: false, …}
 *          -> status: {code: 200, text: ""}
 * 
 * */
class OneBusinessEntity extends React.Component { 
 
  render () {
      return(
          <table id ="businessentity">
              <tbody>
                  <tr>
                    <th>Entity Id</th>
                    <th>Entity Name</th>
                    <th>Entity Type</th>
                    <th>Entity Status Code</th>
                  </tr>
                   <BusinessEntity key={this.props.entityId} 
                                   businessEntity={this.props.oneBusinessEntity.entity} 
                                   isOneBusinessEntity={this.props.isOneBusinessEntity}/>
              </tbody>
          </table>            
      )            
  }
}


export default BusinessEntities;