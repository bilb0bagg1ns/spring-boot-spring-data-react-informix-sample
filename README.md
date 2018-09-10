# spring-boot-spring-data-react-informix-sample

# Demonstrates use of

Spring:
1. SpringBoot
2. Spring Data
3. JPA/Hibernate
4. Informix
5. Uses default Tomcat JDBC Connection Pool


React:
1. react.js
2. rest.js - CujoJS toolkit used to make REST calls
3. webpack - toolkit used to compile JavaScript components into a single, loadable bundle
4. babel - write your JavaScript code using ES6 and compile it into ES5 to run in the browser


# Inspired By/Sourced From
1. https://spring.io/guides/tutorials/react-and-spring-data-rest/
2. https://www.mkyong.com/spring-boot/spring-boot-spring-data-jpa-oracle-example/

# Supporting Material:
1. https://spring.io/guides/gs/accessing-data-rest/
2. https://vladmihalcea.com/the-best-way-to-map-a-composite-primary-key-with-jpa-and-hibernate/

# Tools
1. Command line application
2. Service class 
3. Repository class


# Summary

# Execution


## STS 
1. With the pom.xml containing a plugin to install node and npm, noticed occasionally, I'd have to do a Project -> Clean to get app to start properly.


## Exercising the Code:

### Want to see your JavaScript changes automatically? 
Run "npm run-script watch" to put webpack into watch mode. It will regenerate bundle.js as you edit the source.

### URL
1. http://localhost:8080/
   - Note this will first render a table column headers but takes a while to retrieve the data as it is searching for entityName 'Hope', which is an expensive lookup by name

### To test the APIs:
1. http://localhost:8080/api/businessEntities/19981215793

Returns:
{
  "entityName" : "HOPE LUTHERAN CHURCH",
  "entityType" : "DNC         ",
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/api/businessEntities/19871130096"
    },
    "businessEntity" : {
      "href" : "http://localhost:8080/api/businessEntities/19871130096"
    }
  }
}

2. http://localhost:8080/api/businessEntities/search   - identify all custom queries.

Following are queries defined in BusinessEntityRepository

{
  "_links" : {
    "findByEntityIdReturnStream" : {
      "href" : "http://localhost:8080/api/businessEntities/search/findByEntityIdReturnStream{?entityId}",
      "templated" : true
    },
    "findByEntityName" : {
      "href" : "http://localhost:8080/api/businessEntities/search/findByEntityName"
    },
    "findByPartialEntityName" : {
      "href" : "http://localhost:8080/api/businessEntities/search/findByPartialEntityName{?entityName}",
      "templated" : true
    },
    "self" : {
      "href" : "http://localhost:8080/api/businessEntities/search"
    }
  }
}


3. http://localhost:8080/api/businessEntities/search/findByPartialEntityName?entityName=Hope

{
    "_embedded": {
        "businessEntities": [
            {
                "entityId": 19871239542,
                "entityName": "Greeley Assembly of God DBA New Hope Christian Fellowship",
                "entityType": "DNC         ",
                "entityStatusCd": "RP_NC  ",
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/api/businessEntities/19871239542"
                    },
                    "businessEntity": {
                        "href": "http://localhost:8080/api/businessEntities/19871239542"
                    }
                }
            },
            {
                "entityId": 19871340400,
                "entityName": "New Hope Community Church of Golden",
                "entityType": "DNC         ",
                "entityStatusCd": "GOOD   ",
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/api/businessEntities/19871340400"
                    },
                    "businessEntity": {
                        "href": "http://localhost:8080/api/businessEntities/19871340400"
                    }
                }
            },
            {
                "entityId": 19971009577,
                "entityName": "Hope For Children, Inc.",
                "entityType": "DNC         ",
                "entityStatusCd": "GOOD   ",
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/api/businessEntities/19971009577"
                    },
                    "businessEntity": {
                        "href": "http://localhost:8080/api/businessEntities/19971009577"
                    }
                }
            },
            {
   ....
 }    
    

