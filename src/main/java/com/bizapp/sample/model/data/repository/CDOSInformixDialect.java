package com.bizapp.sample.model.data.repository;

import org.hibernate.dialect.pagination.AbstractLimitHandler;
import org.hibernate.dialect.pagination.LimitHandler;
import org.hibernate.engine.spi.RowSelection;

/**
 * Hibernate's implementation of Informix Dialect was preventing execution of
 * pagination (http://localhost:8080/api/businessEntities?page=2&size=4).
 * 
 * Error was : query result offset is not supported error.
 * 
 * Source of error:
 * org.hibernate.dialect.pagination.FirstLimitHandler::processSql method
 * (hibernate-core-5.2.17.Final.jar)
 * 
 * Solution:
 * 
 * 1. Used the code from the following link to override
 * org.hibernate.dialect.InformixDialect behavior around key pagination methods.
 * 
 * https://stackoverflow.com/questions/19219556/hibernate-jdbc-generates-wrong-sql-for-informix-database
 * 
 * 2. Also, added following entry in application.properites
 * spring.jpa.properties.hibernate.dialect =
 * com.bizapp.sample.model.data.repository.CDOSInformixDialect
 * 
 *
 */
public class CDOSInformixDialect extends org.hibernate.dialect.InformixDialect {

	public CDOSInformixDialect() {
		super();
	}

	@Override
	public LimitHandler getLimitHandler() {
		return LIMIT_HANDLER;
	}

	@Override
	public String getLimitString(String querySelect, int offset, int limit) {
		return getMyLimitString(querySelect, offset, limit);
	}

	@Override
	public boolean supportsLimit() {
		return true;
	}

	private static final LimitHandler LIMIT_HANDLER = new AbstractLimitHandler() {
		@Override
		public String processSql(String sql, RowSelection selection) {
			return getMyLimitString(sql, selection.getFirstRow(), selection.getMaxRows());
		}

		@Override
		public boolean supportsLimit() {
			return true;
		}

		@Override
		public boolean bindLimitParametersFirst() {
			return true; // must do, otherwise there will be an exception cause of preparedStatments
		}
	};

	public static String getMyLimitString(String querySelect, int offset, int limit) {
		/*
		 * SQL Syntax: SELECT FIRST <limit> ... SELECT SKIP <offset> FIRST <limit> ...
		 */

		System.out.println("CDOSInformixDialect.getMyLimitString()");

		if (offset < 0 || limit < 0) {
			throw new IllegalArgumentException("Cannot perform limit query with negative limit and/or offset value(s)");
		}

		StringBuffer limitQuery = new StringBuffer(querySelect.length() + 10);
		limitQuery.append(querySelect);
		int indexOfEndOfSelect = querySelect.toLowerCase().indexOf("select") + 6;

		if (offset == 0) {
			limitQuery.insert(indexOfEndOfSelect, " first ?");
		} else {
			limitQuery.insert(indexOfEndOfSelect, " skip ?" + " first ?");
		}

		return limitQuery.toString();
	}

}
