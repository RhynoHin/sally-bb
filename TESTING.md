# Sally BB validation

Build date: **3 October 2026**. Local automated testing used Playwright with **Google Chrome 154.0.8037.58**, **Chromium** and **WebKit**, Phaser's actual scene/physics loop, `render_game_to_text()` and deterministic `advanceTime()` stepping.

## Latest Starheart update

**103 assertions passed** across Chrome 154 and Chromium, with zero captured game console/page errors: 33 transformation/death checks, 6 layout/audio/reduced-motion checks and 64 gameplay regressions. The unchanged skill action client also captured movement/jump, transformation and menu states. See `validation/magic-checks.json`, `magic-extra-checks.json` and `magic-regression-checks.json`.

New coverage includes C and actual simultaneous touch activation, charge/refill, world and health freeze, portrait pause/resume, finisher damage and score, transformed outfit expiry, boss hit and final-hit ending, birthday treasure requirements, crying/tears/bottle animation, small-screen retry/menu/help, real nonzero transformation audio output, mute and offline reload of the new assets. Screenshots were visually inspected.

WebKit in this update timed out before beginning local navigation at 15, 30 and 45 seconds. New Safari behavior is unverified; the earlier build had WebKit coverage. A physical iPhone remains untested.

## Original-build verification

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
- A live GitHub Actions deployment and its HTTPS URL. The game is stored in the private `RhynoHin/sally-bb` repository, but the current account plan does not enable Pages for private repositories. The supplied workflow is prepared for manual use after Pages is enabled. The public runtime is hosted separately through Sites at https://sally-bb-913.rhynohin.chatgpt.site .

WebKit emulation is useful coverage; it does not establish that every iPhone model or installed-app behavior has been tested. HTTP home-network preview does not provide the HTTPS requirements for iPhone offline installation.
