(function () {
  const BANK = [
    ["It's not rocket science.", "Used to say something isn't as difficult as it seems."],
    ["Actions speak louder than words.", "What people do matters more than what they say."],
    ["Bite the bullet.", "Force yourself to do something unpleasant that you've been putting off."],
    ["Break the ice.", "Say or do something to relieve tension or get a conversation started."],
    ["Once in a blue moon.", "Something that happens very rarely."],
    ["The ball is in your court.", "It's now up to you to make the next decision or move."],
    ["Cut corners.", "Do something in the easiest or cheapest way, often sacrificing quality."],
    ["Hit the nail on the head.", "Describe exactly what is causing a situation or problem."],
    ["Let the cat out of the bag.", "Reveal a secret, usually by accident."],
    ["On the same page.", "In agreement about something."],
    ["Piece of cake.", "Something that is very easy to do."],
    ["Speak of the devil.", "Said when a person you were just discussing shows up."],
    ["Under the weather.", "Feeling slightly ill."],
    ["A blessing in disguise.", "Something that seems bad at first but turns out to be good."],
    ["Best of both worlds.", "A situation where you enjoy the advantages of two different things at once."],
    ["Bark up the wrong tree.", "Pursue a mistaken course of action based on a wrong assumption."],
    ["Get your act together.", "Organize yourself so you perform more effectively."],
    ["Go the extra mile.", "Make a greater effort than expected."],
    ["Hang in there.", "Encouragement to persist despite difficulty."],
    ["It takes two to tango.", "Both people involved in a situation share responsibility for it."],
    ["Keep your chin up.", "Stay positive during a difficult situation."],
    ["Miss the boat.", "Miss an opportunity because you were too slow to act."],
    ["No pain, no gain.", "You have to work hard or suffer to achieve something worthwhile."],
    ["On thin ice.", "In a risky or precarious situation."],
    ["Pull yourself together.", "Recover control of your emotions."],
    ["See eye to eye.", "Agree with someone."],
    ["Sit on the fence.", "Avoid making a decision or taking a side."],
    ["Spill the beans.", "Reveal secret information, usually unintentionally."],
    ["Take it with a grain of salt.", "Don't take something entirely at face value; be a bit skeptical."],
    ["The elephant in the room.", "An obvious problem that everyone is avoiding discussing."],
    ["Throw in the towel.", "Give up on something."],
    ["Time flies.", "Time passes quickly, especially when you're enjoying something."],
    ["Water under the bridge.", "Something in the past that is no longer worth worrying about."],
    ["When it rains, it pours.", "Difficult things tend to happen all at once."],
    ["You can't judge a book by its cover.", "You can't know what someone or something is like just by looking at it."],
    ["A picture is worth a thousand words.", "An image can convey a complex idea more effectively than a description."],
    ["Better late than never.", "It's better for something to happen late than not at all."],
    ["Curiosity killed the cat.", "Being too inquisitive can get you into trouble."],
    ["Every cloud has a silver lining.", "There's something good in every difficult situation."],
    ["Practice makes perfect.", "Repeating an activity improves your skill at it."],
    ["The apple doesn't fall far from the tree.", "Children tend to resemble their parents in character."],
    ["Don't count your chickens before they hatch.", "Don't assume success before it's actually happened."],
    ["Actions have consequences.", "Everything you do produces some kind of result — good or bad."],
    ["Kill two birds with one stone.", "Achieve two goals with a single action."],
    ["The grass is always greener on the other side.", "Other people's situations always look better than your own, even when they're not."],
    ["Burn the midnight oil.", "Work late into the night."],
    ["Cry over spilled milk.", "Waste time being upset about something that already happened and can't be changed."],
    ["Get a taste of your own medicine.", "Be treated the way you have treated others."],
    ["Hit the ground running.", "Start a new activity or project with a lot of energy right away."],
    ["Jump on the bandwagon.", "Join others in doing something that has become popular."],
    ["Let sleeping dogs lie.", "Avoid restarting an old conflict or bringing up a settled issue."],
    ["Read between the lines.", "Understand the hidden or implied meaning of something."],
    ["Take the bull by the horns.", "Confront a difficult situation directly and with confidence."],
    ["The early bird catches the worm.", "Success comes to those who act early or prepare ahead."],
    ["Turn over a new leaf.", "Start behaving in a better or more positive way."],
    ["You reap what you sow.", "The results you get depend on the effort or intentions you put in."],
    ["Beat around the bush.", "Avoid talking about what's important, usually to delay a difficult point."],
    ["Get the ball rolling.", "Start a process or activity."],
    ["In the same boat.", "In the same difficult situation as someone else."],
    ["Keep your fingers crossed.", "Hope that something will happen the way you want."],
    ["Add insult to injury.", "Make a bad situation worse."],
    ["Barking up the wrong tree.", "Accusing the wrong person or looking in the wrong place."],
    ["Costs an arm and a leg.", "Very expensive."],
    ["Give someone the benefit of the doubt.", "Trust what someone says even without full proof."],
    ["Have a change of heart.", "Change your opinion or feeling about something."],
    ["In hot water.", "In trouble."],
    ["Jump the gun.", "Act too soon, before the right moment."],
    ["Not my cup of tea.", "Something that isn't to your taste or interest."],
    ["The pen is mightier than the sword.", "Words and communication are more powerful than force or violence."],
    ["Well begun is half done.", "A good start makes the rest of a task much easier."]
  ];

  // --- Day anchoring -------------------------------------------------
  // Previously this was pinned to a fixed calendar date (Jan 1, 2026),
  // which meant opening the app for the first time on any later date
  // instantly back-filled every day in between into the archive and
  // inflated the "Learned" stat. Instead, day 0 is now the date the
  // person first opens the app on THIS device. Archive grows one day
  // at a time from there, same as the "two new sayings a day" idea
  // actually requires.
  const START_KEY = 'daily-sayings-start-date-v1';

  function readStart() {
    try {
      const raw = localStorage.getItem(START_KEY);
      if (raw) {
        const d = new Date(raw + 'T00:00:00');
        if (!isNaN(d)) return d;
      }
    } catch (e) {}
    return null;
  }

  function writeStart(date) {
    try {
      localStorage.setItem(START_KEY, dateKeyForRaw(date));
    } catch (e) {}
  }

  function dateKeyForRaw(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  let START = readStart();
  if (!START) {
    const today = new Date();
    START = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    writeStart(START);
  }

  function dayIndexFor(date) {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return Math.floor((d - START) / 86400000);
  }
  function fmtDate(dayIdx) {
    const d = new Date(START.getTime() + dayIdx * 86400000);
    return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  }
  function quotesForDay(dayIdx) {
    const n = BANK.length / 2;
    const idx = ((dayIdx % n) + n) % n;
    const a = BANK[(idx * 2) % BANK.length];
    const b = BANK[(idx * 2 + 1) % BANK.length];
    return [a, b];
  }

  const STORE_KEY = 'daily-sayings-used-v1';
  function loadUsed() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }
  function saveUsed(obj) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(obj)); } catch (e) {}
  }
  let usedMap = loadUsed();

  function toggleUsed(key) {
    usedMap[key] = !usedMap[key];
    saveUsed(usedMap);
    render();
  }

  function cardHTML(dayIdx, slot, entry, isToday) {
    const key = dayIdx + '-' + slot;
    const used = !!usedMap[key];
    const [text, meaning] = entry;
    return `<div class="card ${isToday ? 'today' : ''}">
      <div class="kind">${isToday ? "Today's saying" : fmtDate(dayIdx)}</div>
      <p class="text">${text}</p>
      <p class="meaning">${meaning}</p>
      <div class="card-footer">
        <span class="date-tag">${isToday ? fmtDate(dayIdx) : ''}</span>
        <button class="use-btn ${used ? 'used' : ''}" data-key="${key}">${used ? '✓ Used in conversation' : 'Mark as used'}</button>
      </div>
    </div>`;
  }

  function render() {
    const todayIdx = dayIndexFor(new Date());
    const todayQuotes = quotesForDay(todayIdx);
    document.getElementById('todayBadge').textContent = fmtDate(todayIdx);
    document.getElementById('todayList').innerHTML =
      todayQuotes.map((q, i) => cardHTML(todayIdx, i, q, true)).join('');

    const archiveEl = document.getElementById('archiveList');
    let archiveHTML = '';
    for (let d = todayIdx - 1; d >= 0; d--) {
      const qs = quotesForDay(d);
      archiveHTML += `<div class="archive-day">
        <div class="day-label">${fmtDate(d)}</div>
        ${qs.map((q, i) => cardHTML(d, i, q, false)).join('')}
      </div>`;
    }
    archiveEl.innerHTML = archiveHTML || '<p style="text-align:center;color:var(--text-muted);font-size:0.85rem;">Nothing here yet — check back tomorrow.</p>';

    const totalLearned = (todayIdx + 1) * 2;
    const usedCount = Object.values(usedMap).filter(Boolean).length;
    document.getElementById('statTotal').textContent = totalLearned;
    document.getElementById('statUsed').textContent = usedCount;
    document.getElementById('statStreak').textContent = todayIdx + 1;

    document.querySelectorAll('.use-btn').forEach(btn => {
      btn.addEventListener('click', () => toggleUsed(btn.getAttribute('data-key')));
    });
  }

  document.getElementById('archiveToggle').addEventListener('click', function () {
    const el = document.getElementById('archiveList');
    const open = el.classList.toggle('open');
    this.textContent = open ? 'Hide earlier days ▴' : 'Show earlier days ▾';
  });

  render();
})();