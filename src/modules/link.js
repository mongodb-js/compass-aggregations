const IS_ELECTRON = require('is-electron-renderer');

/**
 * Action creator for opening links.
 *
 * @returns {Function} The open link function.
 */
export const openLink = href => {
  return () => {
    if (!IS_ELECTRON) {
      window.open(href, '_new');
    } else {
      require('electron').shell.openExternal(href);
    }
  };
};
