import { setup, start } from './Game/Game';
import { waitForImagesToBeLoaded } from './Game/ImageLoader';

import './index.scss';

waitForImagesToBeLoaded().then(() => {
  setup();

  start();
});
