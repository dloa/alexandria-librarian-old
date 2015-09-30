
var defaultSettings = {
    launchStartup: false,
    connectLaunch: false,
    saveCredentials: false,
    minToTaskbar: true,
    LibrarydInstalled: false,
    LibrarydEnabled: false,
    IPFSInstalled: false,
    IPFSEnabled: false
    
};

module.exports = {
    get: function (item) {
      var haveDefault = null,
          value = localStorage.getItem('settings.'+item);

      // hack to parse the local storage type and fully
      // backward compatible
      try {
          value = JSON.parse(value);
      } catch(e) {
          if (value === 'true' || 'false') {
              value = (value === 'true') ? true : false;
          }
      }

      if (defaultSettings[item] && value === null) {
          value = defaultSettings[item];
      }

      return value;
    },

    save: function (key, value) {
      console.info('Preferences | ' + key + ' = ' + value);
      localStorage.setItem('settings.'+key, JSON.stringify(value));
    }
}
