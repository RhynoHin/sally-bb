# Sally BB

**A Tiny BB. A Big Adventure.**

Special 913 Birthday Edition — an original, affectionate retro platform game made especially for Sally. Game idea by **Man Hin**. Built with **Phaser 3.90.0**. Sally's original pixel design takes its warm brown hair, cheerful expression, black heart top, pink skirt and white trainers from the supplied visual references. The references themselves are not distributed or inserted into gameplay.

## Playing

Open the website in a modern browser, turn your iPhone sideways, and choose **PLAY STORY MODE** or **PLAY LEVEL 913**. No account, installation, backend, paid API or external CDN is needed. The pinned Phaser engine is included in `vendor/`.

Story Mode travels through Candy Garden, Milk Bottle Factory, Giant Toy Bedroom, Moonlight Nursery and Sally Dream Castle. The castle leads into a separate three-phase Grumpy Nanny arena. Find a hidden letter in each world, then defeat Nanny in that same completed story run to unlock the Secret Dream Level. The two L letters are distinct collectibles.

### Features

- Original Sally art: 50 frames across idle/blink, walk/run, jump/fall/land, attack, hurt, invincibility, collect, victory, clear, birthday and game-over poses. Normal movement animations remain readable during invincibility flashing.
- Heart Rattle: a short-range heart pulse turns all seven enemy types into floating balloons. Land on one safely, or face it and attack again to launch it into another enemy. Balloons pop after 6.5 seconds; launched balloons expire after 2 seconds.
- Three hearts, 1.5 seconds of damage protection, retries and checkpoints. Falling into a pit costs a heart and returns Sally to her checkpoint.
- Coyote time (120 ms), jump buffering (140 ms), variable-height jumps, one-way ledges and optional keyboard drop-through.
- Factory conveyors and a heart-operated lift switch, bedroom trampolines and vertical lifts, moonlight cloud cycles and moving platforms.
- Three-phase boss: toys, bouncing milk bottles, then a gentle chase. Inflate boss objects and launch them back; three hits per phase.
- Food, stars, healing hearts, bonus notes and an eight-second milk speed boost.
- Responsive safe-area layout, simultaneous touch movement/jump/attack, portrait pause and automatic landscape resume, pause menu, screen-shake toggle and original synthesized chiptunes/SFX.
- Local progress, collected checkpoint items, best score, SALLY letters, birthday wish, dream unlock and sound preference. Saves belong to the current browser/device and website origin.
- PWA manifest, original 180/192/512 px icons and a self-contained service-worker cache.

## Controls

| Action | iPhone | Keyboard |
|---|---|---|
| Move | Hold ◀ / ▶ | Arrow Left / Right or A / D |
| Jump | ↑ JUMP | Space |
| Heart Rattle | ♥ RATTLE | X |
| Pause / Resume | Ⅱ / RESUME | Escape |
| Drop through a ledge | — | Down + Space |
| Fullscreen where supported | Add to Home Screen | F |

Touch buttons support independent pointers. Hold direction while jumping and attacking. Holding Rattle repeats at a short cooldown. Release Jump early for a smaller hop.

**Sound:** tap a menu button to unlock audio in Safari. HOW TO PLAY includes **TEST SOUND**. The sound toggle is remembered; the Pause menu also includes a screen-shake toggle. System Reduced Motion disables gameplay shake.

## Level 913

**Sally's Birthday Party** is immediately available so the birthday surprise can be played without finishing Story Mode. 913 represents Sally's birthday.

Explore pastel cake platforms, icing edges, jelly trampolines, presents, ribbons, balloons, candles and heart decorations. Find **all 18 birthday treasures** (candles, cake, heart tokens, gifts, notes and golden balloons). These use their own counter, independent of the score. Finding all 18 opens **Sally's Secret Birthday Wish** with floating stars and hearts:

> You found Sally’s Secret Birthday Wish!
>
> May every adventure ahead make you smile. ❤️

Continue to the giant cake for **HAPPY BIRTHDAY SALLY!**, falling confetti, a celebration pose and **Made especially for Sally ❤️**. The melody is an original composition, with no borrowed birthday-song melody.

## Local Development

No build step is required. Run a static server from this directory:

```sh
python3 -m http.server 8080
```

Open `http://localhost:8080/`. Opening `index.html` through `file://` will not load the JavaScript modules correctly.

To preview on an iPhone connected to the same Wi-Fi, run:

```sh
python3 -m http.server 8080 --bind 0.0.0.0
```

Open `http://YOUR_COMPUTER_LAN_IP:8080/` in iPhone Safari. Keep the computer and server running. HTTP LAN preview tests gameplay; use the deployed **HTTPS** URL for service workers and installed offline play.

To test repository-relative URLs locally, serve the parent folder and open `/sally-bb/`.

### Editing original art

The reproducible drawing source is `tools/generate-art.py`. Optional art regeneration needs Python and Pillow; runtime play does not:

```sh
python3 -m pip install Pillow
python3 tools/generate-art.py
```

The source draws original sprites/backgrounds; it does not download or process the reference photos.

### Test hooks

`window.render_game_to_text()` returns live gameplay state and coordinates. `window.advanceTime(ms)` stops the regular animation loop and steps the actual Phaser scene and physics loop deterministically. Reload the page to return to normal real-time play.

On `localhost` or `127.0.0.1`, `?test` additionally exposes `window.__sallyTest` for controlled integration fixtures. That fixture API is unavailable on deployed GitHub Pages. See `TESTING.md` for exactly what has been verified and what still requires a physical device.

## GitHub Pages Deployment

The project is stored in the private repository [RhynoHin/sally-bb](https://github.com/RhynoHin/sally-bb). Its current account plan does not enable Pages for private repositories. No live game URL is available. The deployment workflow runs manually only, after Pages is enabled.

The **contents of this directory** go at the repository root, rather than inside an extra `sally-bb` folder.

1. Create a GitHub repository named `sally-bb`. Choose the intended owner and visibility. A public repository works with GitHub Free; private-repository Pages availability depends on your plan.
2. Unzip the project and push all files, including `.github/workflows/deploy.yml`, to its `main` branch. For example, from the extracted game directory:

   ```sh
   git init
   git add .
   git commit -m "Create Sally BB birthday game"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/sally-bb.git
   git push -u origin main
   ```

3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment → Source**, select **GitHub Actions**.
5. Open **Actions → Publish Sally BB to GitHub Pages** and use **Run workflow** on `main`.
6. Wait for the deploy job to succeed. The generated link appears in the deployment environment and Pages settings, usually `https://YOUR_USERNAME.github.io/sally-bb/`.
7. Open that HTTPS link and test it in iPhone Safari. After the first full load, reopen it in airplane mode to verify the offline cache on your device.

The workflow follows [GitHub's official Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages). Assets, imports, icon paths, manifest start URL and service-worker scope all use relative paths.

Alternative: choose **Deploy from a branch → main → /(root)** in Pages and omit the Actions deployment workflow. `.nojekyll` is included for static serving. Use one publishing method.

**Updating the game:** change the cache version in `service-worker.js` whenever runtime files change, then commit, push and run the deployment workflow. Reopen the site online after deployment. Saved progress is separate from the asset cache and is preserved across cache updates.

## iPhone Installation

1. Open the deployed **HTTPS GitHub Pages URL in Safari** and wait for the game to load.
2. Tap **Share** (on some Safari layouts, Page Menu → Share).
3. Tap **Add to Home Screen**. If absent, use **Edit Actions** to add it.
4. Keep the name **Sally BB**. Where offered, enable **Open as Web App**. Tap **Add**.
5. Launch the Sally BB icon from the Home Screen and rotate the phone to landscape.

These steps follow [Apple's Safari Home Screen guidance](https://support.apple.com/guide/iphone/bookmark-a-website-iph42ab2f3a7/ios). Installed mode uses the standalone manifest and safe areas. iOS may clear website data/cache under storage pressure; open online again if needed. No notification permission is requested.

## Project Structure

```text
sally-bb/
├── index.html
├── manifest.json
├── service-worker.js
├── README.md
├── TESTING.md
├── THIRD_PARTY_NOTICES.md
├── .nojekyll
├── .github/workflows/deploy.yml
├── css/style.css
├── js/
│   ├── main.js, config.js, state.js, audio.js
│   ├── scenes/
│   │   ├── BootScene.js, MenuScene.js, StoryScene.js
│   │   └── BirthdayScene.js, BossScene.js, EndingScene.js
│   ├── entities/Sally.js, Enemy.js
│   └── ui/TouchControls.js, HUD.js
├── assets/
│   ├── sprites/     # Sally atlas, animations, enemies, items, props
│   ├── backgrounds/ # Seven original pixel landscapes
│   └── icons/       # Apple and PWA icons
├── vendor/phaser.min.js, PHASER-LICENSE.txt
├── validation/     # Browser and route test evidence
└── tools/generate-art.py
```

Audio is generated by `js/audio.js`; no downloaded music or audio assets are required. Shared level logic is in StoryScene, with Birthday and Boss subclasses. EndingScene handles the three completed-game endings. The sprite sheets keep texture count and loading size low.

## Credits

- Game idea by **Man Hin**.
- Made especially for **Sally ❤️**.
- Original game art, maps, melodies, sound envelopes and game code created for Sally BB.
- Built with **Phaser 3**, Copyright Richard Davey / Phaser Studio Inc., MIT licence; full notice in `vendor/PHASER-LICENSE.txt`.
- [Phaser game configuration](https://docs.phaser.io/phaser/concepts/game) and [Arcade Physics documentation](https://docs.phaser.io/phaser/concepts/physics/arcade) informed the engine integration.

## Known Limitations

- Google Chrome, Chromium and WebKit were tested locally; physical iPhone Safari/Home Screen installation, speaker routing, battery consumption and long-session performance still require a real-device playtest.
- Automated completion scenarios use controlled position fixtures to test collisions, boss hits, unlocks and endings. They establish that these systems work; they are not a full human playthrough or a difficulty/duration guarantee.
- The private GitHub repository is available, but its current plan does not enable Pages for private repositories. The manual deployment workflow is prepared and the `/sally-bb/` path was tested locally; a live deployment remains unverified.
- Fullscreen and orientation locking depend on the browser. The rotate overlay works without orientation-lock support. Camera and platforms use rectangular Arcade collisions; icing is drawn with stepped/rounded edges rather than continuous slope physics.
- Saves are local, not shared between devices. Starting a new Story Mode run replaces the current story checkpoint and letters; best score and permanent birthday/dream unlocks remain.
