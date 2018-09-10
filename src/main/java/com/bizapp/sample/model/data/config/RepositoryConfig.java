package com.bizapp.sample.model.data.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

import com.bizapp.sample.model.domain.BusinessEntity;

/**
 * Reason for this configuration class @see <a href=
 * "https://stackoverflow.com/questions/24839760/spring-boot-responsebody-doesnt-serialize-entity-id">https://stackoverflow.com/questions/24839760/spring-boot-responsebody-doesnt-serialize-entity-id</a>
 * 
 * tl;dr
 * 
 * Concern: 1. Using the spring-boot-starter-data-rest dependency, entity @Id
 * fields are not marshalled in the resulting JSON.
 *
 * Reason: 1. By default Spring Data Rest does not spit out IDs. However you can
 * selectively enable it through exposeIdsFor(..) method. You could do this in
 * configuration.
 */

@Configuration
public class RepositoryConfig extends RepositoryRestConfigurerAdapter {
	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		config.exposeIdsFor(BusinessEntity.class);
	}
}