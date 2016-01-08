import alt from '../../alt';
import Preferences from '../../utils/PreferencesUtil';
import PreferencesActions from './actions';

class PreferencesStore extends Preferences {
    constructor() {
        super();
        this.bindActions(PreferencesActions);
    }

    onSet(opts) {

        const setting = opts.setting;
        const value = opts.value;

        this.settings[setting] = this.getAndSet(setting, value);
    }


}

export
default alt.createStore(PreferencesStore);