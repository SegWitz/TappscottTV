/**
 * afterglow - An easy to integrate HTML5 video player with lightbox support.
 * @link http://afterglowplayer.com
 * @license MIT
 */

import Util from '../lib/Util';

class Config {
  constructor(videoelement, skin = 'afterglow') {
    return this.init(videoelement, skin);
  }

  init(videoelement, skin = 'afterglow') {
    // Check for the video element
    if (videoelement === undefined) {
      console.error('Please provide a proper video element to afterglow');
    } else {
      // Set videoelement
      this.videoelement = videoelement;

      // Prepare the options container
      this.options = {};

      // Set the skin
      this.skin = skin;

      // Prepare option variables
      this.setDefaultOptions();
      // this.setSkinControls();

      const util = new Util();
      // Initialize youtube if the current player is a youtube player
      if (util.isYoutubePlayer(this.videoelement)) {
        this.setYoutubeOptions();
      }
      // Initialize vimeo if the current player is a vimeo player
      if (util.isVimeoPlayer(this.videoelement)) {
        this.setVimeoOptions();
      }
      // Initialize facebook if the current player is a facebook player
      if (util.isFacebookPlayer(this.videoelement)) {
        this.setFacebookOptions();
      }
    }
  }

  /**
   * Sets some basic options based on the videoelement's attributes
   * @return {void}
   */
  setDefaultOptions() {
    this.options = {
      renderers: [
        'html5',
        'native_hls',
      ],
      classPrefix: 'afterglow__',
      videoVolume: 'horizontal',
      fakeNodeName: 'div',
      setDimensions: false,
      features: [
        'progress',
        'current',
        'playpause',
        'tracks',
        'volume',
        'hdtoggle',
        'duration',
      ],
      enableProgressTooltip: false,
      showPosterWhenEnded: true
    };
  }

  /**
   * Gets a configuration value that has been passed to the videoelement as HTML tag attribute
   * @param attributename   string  The name of the attribute to get
   * @param fallback        mixed   The expected fallback if the attribute was
   *                                not set - false by default
   * @return mixed                  The attribute (with data-attributename being preferred)
   *                                or the fallback if none.
   */
  getPlayerAttributeFromVideoElement(attributename, fallback = false) {
    if (this.videoelement.getAttribute(`data-${attributename}`) !== null) {
      return this.videoelement.getAttribute(`data-${attributename}`);
    } if (this.videoelement.getAttribute(attributename) !== null) {
      return this.videoelement.getAttribute(attributename);
    }
    return fallback;
  }

  /**
   * Sets options needed for youtube to work and replaces the sources
   * with the correct youtube source
   */
  setYoutubeOptions() {
    this.options.renderers = [
      'youtube_iframe',
    ];

    this.options.youtube = {
      iv_load_policy: 3,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      showinfo: 0,
      nocookie: 1,
    };

    const util = new Util();
    if (util.ie().actualVersion >= 8 && util.ie().actualVersion <= 11) {
      this.options.youtube.ytControls = 2;
      this.options.youtube.color = 'white';
    } else {
      this.options.youtube.origin = `${location.protocol}://${location.hostname} ${location.port ? ':' + location.port : ''}`;
    }

    if (this.videoelement.getAttribute('poster') === null) {
      this.options.youtube.imageQuality = 'maxresdefault';
    }

    this.videoelement.setAttribute('src', `https://www.youtube.com/embed?v=${this.getPlayerAttributeFromVideoElement('youtube-id')}`);
    this.videoelement.setAttribute('type', 'video/youtube');
  }

  /**
   * Sets options needed for vimeo to work and replaces the sources with the correct vimeo source
   */
  setVimeoOptions() {
    this.options.renderers = [
      'vimeo_iframe',
    ];

    this.videoelement.setAttribute('src', `https://vimeo.com/${this.getPlayerAttributeFromVideoElement('vimeo-id')}`);
    this.videoelement.setAttribute('type', 'video/vimeo');
    this.videoelement.setAttribute('controls', 'no');
  }


  /**
   * Sets options needed for facebook to work and replaces the sources with the correct facebook url
   */
  setFacebookOptions() {
    this.options.renderers = [
      'facebook',
    ];

    this.videoelement.setAttribute('src', this.getPlayerAttributeFromVideoElement('facebook-url'));
    this.videoelement.setAttribute('type', 'video/x-facebook');
  }

  /**
   * Returns the CSS class for the video element
   * @return {string}
   */
  getSkinClass() {
    let cssclass = 'afterglow-skin-default';
    if (this.skin !== 'afterglow') {
      cssclass = `afterglow-skin-${this.skin}`;
    }

    return cssclass;
  }
}

export default Config;
