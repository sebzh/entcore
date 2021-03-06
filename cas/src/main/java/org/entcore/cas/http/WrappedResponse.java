/*
 * Copyright © WebServices pour l'Éducation, 2014
 *
 * This file is part of ENT Core. ENT Core is a versatile ENT engine based on the JVM.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation (version 3 of the License).
 *
 * For the sake of explanation, any module that communicate over native
 * Web protocols, such as HTTP, with ENT Core is outside the scope of this
 * license and could be license under its own terms. This is merely considered
 * normal use of ENT Core, and does not fall under the heading of "covered work".
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 */

package org.entcore.cas.http;

import fr.wseduc.cas.http.Response;
import org.vertx.java.core.http.HttpServerResponse;
import org.vertx.java.core.logging.Logger;
import org.vertx.java.core.logging.impl.LoggerFactory;

public class WrappedResponse implements Response {

	private static final Logger log = LoggerFactory.getLogger(WrappedResponse.class);
	private HttpServerResponse response;
	private boolean ended = false;

	public WrappedResponse(HttpServerResponse response) {
		this.response = response;
	}

	@Override
	public void setStatusCode(int i) {
		response.setStatusCode(i);
	}

	@Override
	public void setBody(String s) {
		log.debug(s);
		ended = true;
		response.end(s);
	}

	@Override
	public void putHeader(String s, String s2) {
		response.putHeader(s, s2);
	}

	@Override
	public void close() {
		if (!ended) {
			response.end();
		}
	}

}
