package com.bizapp.sample.model.data.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bizapp.sample.model.domain.BusinessEntity;

public interface BusinessEntityRepository extends JpaRepository<BusinessEntity, Long> {

	@Query("SELECT e FROM BusinessEntity e WHERE e.entityName LIKE %:entityName% ORDER BY e.entityId ASC")
	List<BusinessEntity> findByPartialEntityName(@Param("entityName") String entityName);

	/*-
	List<BusinessEntity> findByEntityName(String entityName);
	
	@Query("SELECT e FROM BusinessEntity e WHERE e.entityName LIKE %:entityName% ORDER BY e.entityId ASC")
	List<BusinessEntity> findByPartialEntityName(@Param("entityName") String entityName);
	
	// custom query example and return a stream
	
	@Query("SELECT e FROM BusinessEntity e WHERE e.entityId = :entityId")
	Stream<BusinessEntity> findByEntityIdReturnStream(@Param("entityId") long entityId);
	*/
}