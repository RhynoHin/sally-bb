# Sally BB validation

Build date: **3 October 2026**. Local automated testing used Playwright with **Google Chrome 154.0.8037.58**, **Chromium** and **WebKit**, Phaser's actual scene/physics loop, `render_game_to_text()` and deterministic `advanceTime()` stepping.

## Verified

**90 assertions passed with zero captured browser console/page errors.** See `validation/system-checks.json`, `validation/extra-checks.json` and `validation/chrome-checks.json` for individual assertions.

- Story startup, keyboard movement and jumps, coyote time, buffered jumps, variable-height input, platform drop-through.
- Heart Rattle → inflated enemy → safe landing on the enemy → launch → collision with another enemy → score, plus balloon expiration/pop.
- Three hearts, one-heart damage, invincibility, zero-heart Game Over, retry, pause/resume, pit respawn and saved checkpoints.
- Actual simultaneous touch pointers via Chromium CDP: hold right and jump, add attack, then release all pointers without stuck movement.
- Portrait overlay and automatic landscape resume. Canvas bounds remain fitted after rotation in Chromium and WebKit. Small 568 × 320 landscape menu buttons stay inside the screen; 844 × 390 mobile layout was inspected.
- All five story world gates, hidden letters, factory switch, bedroom bounce and disappearing moonlight clouds.
- Nine launched-object boss hits, all three phases, story ending, five-letter dream unlock, Secret Dream Level and its ending.
- All 18 birthday treasures through collision, secret-wish overlay, return to play and Happy Birthday ending.
- WebAudio analyser recorded a nonzero waveform; mute reduced measured output to zero. Sound preference, secret unlock and other local saves survived reload.
- A full offline reload loads the game from its service worker. Both root hosting and `/sally-bb/` repository-path hosting worked; service-worker scope stays inside `/sally-bb/`.
- No missing JavaScript import references or unfinished TODO placeholders in the game source.

## Normal-input route checks

Separately, an automated controller used **only direction, jump and Heart Rattle inputs**, with no teleporting, enemy removal or health override. It crossed every world from its starting position to its goal, entered the boss arena with three hearts, and reached the birthday cake ending. See `validation/route-checks.json`. Boss phases, all-letter and all-birthday-secret scenarios were verified separately with controlled position fixtures, which isolate those interactions.

## Visual review

Screenshots were opened and inspected for title, gameplay, balloon platform, portrait overlay, small iPhone menu, WebKit mobile/rotation layout, story ending, birthday wish and birthday ending. This review caught and fixed lingering old scenes after replay, stale canvas fitting after rotation and an ending/last-collectible ordering issue.

## Still requiring a physical device or publication

- Real iPhone Safari and installed Home Screen launch, notch/Dynamic Island safe areas, speaker/Bluetooth routing, interruptions, storage eviction, battery use and sustained frame rate.
- A human playthrough for feel, difficulty and Sally's reaction to the birthday surprise.
- A live GitHub Actions deployment and its HTTPS URL. The game is stored in the private `RhynoHin/sally-bb` repository, but the current account plan does not enable Pages for private repositories. The supplied workflow is prepared for manual use after Pages is enabled.

WebKit emulation is useful coverage; it does not establish that every iPhone model or installed-app behavior has been tested. HTTP home-network preview does not provide the HTTPS requirements for iPhone offline installation.
