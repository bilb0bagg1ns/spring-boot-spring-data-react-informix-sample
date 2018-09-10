package com.bizapp.sample.model.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "entity")
public class BusinessEntity {

	@Id
	@Column(name = "entity_id")
	long entityId;
	@Column(name = "entity_nm")
	String entityName;
	@Column(name = "entity_typ")
	String entityType;
	@Column(name = "entity_status_cd")
	String entityStatusCd;

	public BusinessEntity() {

	}

	public BusinessEntity(long entityId, String entityName, String entityType) {
		super();
		this.entityId = entityId;
		this.entityName = entityName;
		this.entityType = entityType;
	}

	public long getEntityId() {
		return entityId;
	}

	public void setEntityId(long entityId) {
		this.entityId = entityId;
	}

	public String getEntityName() {
		return entityName;
	}

	public void setEntityName(String entityName) {
		this.entityName = entityName;
	}

	public String getEntityType() {
		return entityType;
	}

	public void setEntityType(String entityType) {
		this.entityType = entityType;
	}

	public String getEntityStatusCd() {
		return entityStatusCd;
	}

	public void setEntityStatusCd(String entityStatusCd) {
		this.entityStatusCd = entityStatusCd;
	}

	@Override
	public String toString() {
		return "BusinessEntity [entityId=" + entityId + ", entityName=" + entityName + ", entityType=" + entityType
				+ ", entityStatusCd=" + entityStatusCd + "]";
	}

}
