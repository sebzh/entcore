package org.entcore.auth;

import org.entcore.auth.security.AuthResourcesProvider;
import org.entcore.common.http.filter.ActionFilter;
import edu.one.core.infra.Controller;
import edu.one.core.infra.Server;
import edu.one.core.infra.request.filter.SecurityHandler;
import edu.one.core.infra.request.filter.UserAuthFilter;
import edu.one.core.infra.security.oauth.DefaultOAuthResourceProvider;
import org.entcore.common.neo4j.Neo;
import org.vertx.java.core.eventbus.EventBus;

public class Auth extends Server {

	@Override
	public void start() {
		super.start();

		Controller auth = new AuthController(vertx, container, rm, trace, securedActions);

		auth.get("/login", "login");

		auth.post("/login", "loginSubmit");

		auth.get("/logout", "logout");

		auth.get("/oauth2/auth", "authorize");

		auth.post("/oauth2/token", "token");

		auth.get("/oauth2/userinfo", "userInfo");

		auth.get("/activation", "activeAccount");

		auth.post("/activation", "activeAccountSubmit");

		auth.get("/forgot", "forgotPassword");

		auth.post("/forgot", "forgotPasswordSubmit");

		auth.get("/reset/:resetCode", "resetPassword");

		auth.post("/reset", "resetPasswordSubmit");

		auth.post("/sendResetPassword", "sendResetPassword");

		try {
			auth.registerMethod(config.getString("address", "wse.oauth"), "oauthResourceServer");
		} catch (NoSuchMethodException | IllegalAccessException e) {
			log.error(e.getMessage(), e);
		}

		final EventBus eb = getEventBus(vertx);
		SecurityHandler.clearFilters();
		SecurityHandler.addFilter(
				new UserAuthFilter(new DefaultOAuthResourceProvider(eb)));
		SecurityHandler.addFilter(new ActionFilter(auth.securedUriBinding(),
				eb, new AuthResourcesProvider(new Neo(eb, container.logger()))));
	}

}
