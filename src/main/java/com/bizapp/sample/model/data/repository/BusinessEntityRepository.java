package com.bizapp.sample.model.data.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bizapp.sample.model.domain.BusinessEntity;

/**
 * Custom queries declared in this class are viewable via the "search" in the
 * URI
 * 
 * GET - http://localhost:8080/api/businessEntities/search
 * 
 * Resources Limiting Query Results -
 * https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories.limit-query-result
 * 
 */
public interface BusinessEntityRepository extends JpaRepository<BusinessEntity, Long> {

	@Query("SELECT e FROM BusinessEntity e WHERE e.entityName LIKE %:entityName% ORDER BY e.entityId ASC")
	List<BusinessEntity> findByPartialEntityName(@Param("entityName") String entityName);

	@Query(value = "SELECT * FROM entity WHERE entity_nm LIKE %:entityName% LIMIT 10", nativeQuery = true)
	List<BusinessEntity> findByPartialEntityNameNativeQuery(@Param("entityName") String entityName);

	/*-
	 * @See
	 * https://stackoverflow.com/questions/38349930/spring-data-and-native-query-with-pagination
	 * 
	 * Observations:
	 * 1. Default returned page has 20 items (size=20)
	 * 2. To get a different number per page send size parameter:
	 *   Ex: To return 40 items per page: 
	 *    http://localhost:8080/api/businessEntities/search/findByPartialEntityNameNativeQueryWithPagination?entityName=Hope&size=40
	 * 
	 */
	@Query(value = "SELECT * FROM entity WHERE entity_nm LIKE %:entityName%", countQuery = "SELECT count(*) FROM entity WHERE entity_nm LIKE %:entityName%", nativeQuery = true)
	Page<BusinessEntity> findByPartialEntityNameNativeQueryWithPagination(@Param("entityName") String entityName,
			Pageable pageable);

	/* exact match */
	List<BusinessEntity> findFirst20ByEntityName(@Param("entityName") String entityName, Pageable pageable);

	/*-
	List<BusinessEntity> findByEntityName(String entityName);
	
	@Query("SELECT e FROM BusinessEntity e WHERE e.entityName LIKE %:entityName% ORDER BY e.entityId ASC")
	List<BusinessEntity> findByPartialEntityName(@Param("entityName") String entityName);
	
	// custom query example and return a stream
	
	@Query("SELECT e FROM BusinessEntity e WHERE e.entityId = :entityId")
	Stream<BusinessEntity> findByEntityIdReturnStream(@Param("entityId") long entityId);
	*/
}