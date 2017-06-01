'use strict';

const Emitter = require('component-emitter');

module.exports = MatchMedia;
Emitter(MatchMedia.prototype);
var prototype = MatchMedia.prototype;


function MatchMedia(query) {
  if (!(this instanceof MatchMedia)) return new MatchMedia(query);

  var mql = window.matchMedia(query);

  Object.defineProperties(this, {

    mql: {
      get: _=> mql
    },

    matches: { get: _=> mql.matches },
    match: {get: _=> mql.matches },
    meet: {get: _=> mql.matches },
    is: {get: _=> mql.matches},
    state: {get: _=> mql.matches},

    media: {
      get: _=> mql.media
    }
  });

  this.update = this.update();

  mql.addListener(this.update);
}

prototype.destroy = function() {
  this.mql.removeListener(this.update);
};

prototype.update = function() {
  return event=> {
    this.emit('update', this);
  }
};