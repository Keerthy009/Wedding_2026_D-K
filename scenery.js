/* All wick positions are in the original image's native coordinates.
   Static source-texture patches mask the flattened flames before replacements.
   Image, masks, and flames share one SVG viewBox, so resizing cannot misalign them. */
(function () {
  const ivory = {
    width:982, height:1601, file:'assets/garden-ivory.png',
    // x, wick y, flame height, half-width, patch donor shift
    flames:[
      [384,223,25,3.6,12], [391,247,22,2.7,14], [418,244,22,3.3,12],
      [432,205,29,3.8,-12], [456,181,27,3.4,12], [472,185,15,2.3,-10],
      [532,191,17,2.4,12], [542,179,28,3.7,12], [560,209,28,3.9,-12],
      [572,245,20,2.8,-14], [594,229,26,3.7,-12], [610,253,23,3.0,-12],
    ],
  };
  const sage = {
    width:1024, height:1536, file:'assets/garden-sage.png',
    flames:[
      [409,179,17,2.8,12], [429,163,27,3.5,12], [462,142,25,3.2,12],
      [559,143,27,3.5,-12], [594,165,29,3.6,-12], [616,182,17,2.6,-12],
      [137,1230,18,3.0,10], [285,1228,12,2.3,8], [317,1215,13,2.5,-9],
      [273,1240,11,2.3,8], [263,1338,12,2.8,9], [540,1250,18,3.1,11],
      [652,1230,17,2.6,-10], [675,1223,13,2.4,-9], [582,1316,13,2.6,-8],
      [679,1323,9,2.0,7], [696,1324,8,1.9,-7], [791,1317,10,2.2,7],
      [810,1318,9,2.1,-7], [980,1291,13,2.7,-9], [1012,1303,10,2.2,8],
      [92,1408,13,2.8,-9], [157,1417,10,2.2,-7],
    ],
  };
  function sceneArt(art, id) {
    const defs = `<linearGradient id="${id}-fire" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#edaf48" stop-opacity=".7"/><stop offset=".3" stop-color="#fff1bd"/><stop offset=".55" stop-color="#ffffef"/><stop offset=".8" stop-color="#fff0b0"/><stop offset="1" stop-color="#e7a33e" stop-opacity=".5"/></linearGradient><radialGradient id="${id}-glow"><stop stop-color="#ffdb86" stop-opacity=".48"/><stop offset=".5" stop-color="#ffd98a" stop-opacity=".16"/><stop offset="1" stop-color="#ffd98a" stop-opacity="0"/></radialGradient><filter id="${id}-feather" x="-30%" y="-20%" width="160%" height="140%"><feGaussianBlur stdDeviation=".7"/></filter>`;
    let masks = '', patches = '', flames = '';
    const visibleFlames = art.flames.filter(([, y]) => id === 'sage-envelope' ? y < 500 : id === 'sage-reception' ? y > 1000 : true);
    visibleFlames.forEach(([x,y,h,rx,shift],i) => {
      const maskId = `${id}-mask-${i}`;
      masks += `<mask id="${maskId}" maskUnits="userSpaceOnUse" x="${x-rx-3}" y="${y-h-3}" width="${rx*2+6}" height="${h+5}"><ellipse cx="${x}" cy="${y-h*.51}" rx="${rx+1.5}" ry="${h*.52+1}" fill="white" filter="url(#${id}-feather)"/></mask>`;
      patches += `<g class="flame-patch" mask="url(#${maskId})"><use href="#${id}-source" transform="translate(${shift} 0)"/></g>`;
      const duration = (2.9 + (i%7)*.31).toFixed(2);
      const delay = (-i*.43).toFixed(2);
      flames += `<g class="candle-anchor" data-wick-x="${x}" data-wick-y="${y}" transform="translate(${x} ${y})" style="--flicker-time:${duration}s;--flicker-delay:${delay}s;--glow-time:${(3.5+(i%5)*.37).toFixed(2)}s"><ellipse class="candle-halo" cx="0" cy="${-h*.5}" rx="${rx*4.1}" ry="${h*.95}" fill="url(#${id}-glow)"/><g class="candle-flame"><path d="M0 0 C${-rx*1.1} ${-h*.07} ${-rx*1.1} ${-h*.42} ${-rx*.45} ${-h*.68} Q${rx*.18} ${-h*.9} 0 ${-h} C${rx*.95} ${-h*.72} ${rx*1.1} ${-h*.35} ${rx*.7} ${-h*.15} Q${rx*.25} 0 0 0Z" fill="url(#${id}-fire)"/><path d="M0 -.8 Q${-rx*.6} ${-h*.24} 0 ${-h*.56} Q${rx*.45} ${-h*.21} 0 -.8Z" fill="#fffce5" opacity=".85"/><ellipse cx="0" cy="-.5" rx="${rx*.3}" ry="1.1" fill="#748cb3" opacity=".35"/></g></g>`;
    });
    return `<svg class="candle-art" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${art.width} ${art.height}" aria-hidden="true" focusable="false"><defs>${defs}<image id="${id}-source" href="${art.file}" width="${art.width}" height="${art.height}"/>${masks}</defs><use href="#${id}-source"/>${patches}${flames}</svg>`;
  }
  [['.garden-canopy',ivory,'ivory-canopy'],['.reception',sage,'sage-reception'],['.scene-botanicals',sage,'sage-envelope']].forEach(([selector,art,id]) => {
    const target = document.querySelector(selector);
    target.innerHTML = sceneArt(art,id);
    target.classList.add('flame-scene');
  });
})();
