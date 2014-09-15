function Notification(){
	this.isUnread = function(){
		return _.find(this.recipients, function(recipient){
			return recipient.userId === model.me.userId;
		}) !== undefined;
	}
}

function NotificationType(){
	this.apply = function(){
		if(model.notificationTypes.selection().length > 0){
			model.notificationTypes.noFilter = false;
		}
		model.notifications.sync();
	}
}

function Skin(data){
	this.setForUser = function(){
		http().get('/userbook/api/edit-userbook-info?prop=theme&value=' + this._id);
	}
}

model.build = function (){
	this.makeModels([Notification, NotificationType, Widget, Skin]);

	this.collection(Notification, {
		sync: function(){
			var that = this;
			that.all = [];
			var types = model.notificationTypes.selection();
			if(model.notificationTypes.noFilter){
				types = model.notificationTypes.all;
			}

			if(!types.length){
				return;
			}

			var params = { type: _.map(types, function(type){
				return type.data;
			})};

			http().get('/timeline/lastNotifications',params).done(function(response){
				that.load(response.results);
			});
		}
	});

	this.collection(NotificationType, {
		sync: function(){
			http().get('/timeline/types').done(function(data){
				this.load(data);
				this.forEach(function(t){
					t.selected = true;
				});
				model.notifications.sync();
			}.bind(this));
		},
		removeFilter: function(){
			model.notificationTypes.current = null;
			model.notifications.sync();
		},
		noFilter: false
	});

	this.collection(Skin, {
		sync: function(){
			skin.listThemes(function(themes){
				this.load(themes);
			}.bind(this));
		}
	});
};


