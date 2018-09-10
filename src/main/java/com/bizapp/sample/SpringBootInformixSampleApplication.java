package com.bizapp.sample;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.bizapp.sample.model.service.BusinessEntityRepositoryService;

@SpringBootApplication
public class SpringBootInformixSampleApplication { // implements CommandLineRunner {

	private static final Logger log = LoggerFactory.getLogger(SpringBootInformixSampleApplication.class);

	@Inject
	private BusinessEntityRepositoryService businessEntityRepositoryService;

	public static void main(String[] args) {
		SpringApplication.run(SpringBootInformixSampleApplication.class, args);
	}

	// For Stream, need @Transactional
//	@Transactional(readOnly = true)
//	@Override
//	public void run(String... strings) throws Exception {
//		log.info("------Querying Informix Table");
//
//		System.out.println("\n1.findByPartialEntityName()...");
//		Stream<BusinessEntity> stream1 = businessEntityRepositoryService.findByPartialEntityName("Homer%");
//		stream1.forEach(x -> System.out.println(x));
//
//		System.out.println("\n2.findByEntityName(String entityName)...");
//		List<BusinessEntity> list = businessEntityRepositoryService.findByEntityName("Homer56");
//		list.forEach(x -> System.out.println(x));
//
//		System.out.println("\n3.findByEntityId(long entityId)...");
//		// retrieve by entity id
//		try (Stream<BusinessEntity> stream = businessEntityRepositoryService.findByEntityId(19981215793l)) {
//			stream.forEach(x -> System.out.println(x));
//		}
//
//		System.out.println("\n4.exists(long entityId)...");
//		// retrieve by entity id
//		long entityId = 19981215793l;
//		if (businessEntityRepositoryService.exists(entityId)) {
//			System.out.format(" EntityId : %d exists", entityId);
//		}
//
//	}

}