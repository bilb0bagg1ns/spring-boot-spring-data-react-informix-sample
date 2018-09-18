package com.bizapp.sample.model.service;

import javax.inject.Inject;
import javax.inject.Named;
import javax.sql.DataSource;

import com.bizapp.sample.model.data.repository.BusinessEntityRepository;

/**
 * Service that facades BusinessEntityRepository
 *
 */
@Named
public class BusinessEntityRepositoryService {

	@Inject
	DataSource dataSource;

	@Inject
	private BusinessEntityRepository businessEntityRepository;

	public boolean exists(long entityId) {
		return businessEntityRepository.existsById(entityId);
	}

	/*-
	public List<BusinessEntity> findByPartialEntityName(String entityName) {
		System.out.println("--------> Inside BusinessEntityRepositoryService::findByPartialEntityName");
	
		List<BusinessEntity> list = businessEntityRepository.findByPartialEntityName(entityName);
		return list;
	}
	
	public List<BusinessEntity> findByEntityName(String entityName) {
		System.out.println("--------> Inside BusinessEntityRepositoryService::findByEntityName");
		List<BusinessEntity> list = businessEntityRepository.findByEntityName(entityName);
		return list;
	}
	
	public Stream<BusinessEntity> findByEntityId(long entityId) {
		System.out.println("-------->DATASOURCE = " + dataSource);
	
		Stream<BusinessEntity> stream = businessEntityRepository.findByEntityIdReturnStream(entityId);
		return stream;
	}
	*/
}
