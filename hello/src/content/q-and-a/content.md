what:
  question: what is hardly everything?
  answer: |
    you add links to a feed. when you click a link, it disappears. you can choose how long that time lasts when adding a link. after that time passes the link appears again.

    to expand on that;

    i follow things in different places to keep up with what they’re doing. things which post most often appear most frequently in my feeds and get more of my attention.

    they drown out the quieter things.

    i want to control how often they appear based on how meaningful they are to me. similarly, i’ll bookmark things, but not revisit them as it requires hunting around.

    i’d like to both be periodically reminded of things, and not habitually revisiting the same destinations throughout the day.

who:
  question: who is it for?
  answer: |
    not everyone. mostly people who wake up and the first thing they do is check some form of feed, or impulsively revisit the same sites multiple times a day.

    with **hardly everything**, when you “follow” or “add” something, you set how often you think you should be looking at it, or will want to look at it, so there isn’t any anxiety about missing something, or feed fatigue from scrolling endlessly.

making:
  question: what led to making it?
  answer: |
    a few years ago i made two sites which placed extreme time scales in the browser—a window often framing fleeting interfaces.

    those were [a-line-moving-across-a-window-once-every-year.com](http://a-line-moving-across-a-window-once-every-year.com) and [bgcolor-fading-from-black-to-white-every-century.com](http://bgcolor-fading-from-black-to-white-every-century.com).

    they play real-time, so if you sit in-front of your screen for the rest of your life, the background really will fade to white.

    i also made a project called [asdf](asdf.cool) which was a very simple list of links. you could adjust the design to your liking, and it was the first full app-style project i built myself.

compare:
  question: how does this compare to existing tools?
  answer: |
    well, if you mean similar web apps, i’m not concerned.

    to make a shitty and tired comparison, i’d say the intention is closer to memphis furniture, or something. sottsass might have designed chairs, but the chairs were pointing towards meaning beyond their utility as something to sit on.

    this is essentially a rudimentary bookmarking/feed web/app, but by introducing cadence as a setting i’m questioning why feeds look the way they do, and who they serve.

    it seems like most web/apps are designed to drive engagements; they don’t serve the user, but serve the service.

    ideally you’re engaging with hardly everything hardly ever.

    the means of production are also worth mentioning… think of services like facebook and twitter as big-box retail stores, while this is closer to a small independent shop.

data:
  question: who owns the data?
  answer: |
    this is a real important topic to me.

    right now, you own it entirely. for the beta all data is stored locally within your browser. i don’t know anything about what you’re storing, so it’s entirely private. additionally, the site is served over https w/ an ssl certificate, so it’s a private and secure connection.

    the downside of this is that you’re unable to sync your links across browsers or machines. you can also accidentally remove all your data by clearing your browser’s data. because it’s not uploaded anywhere, there is no backup.

    i’d like to fix those problems, perhaps some websocket/webrtc trickery… or maybe a more traditional account-based system — down for feedback…

feeds:
  question: facebook and twitter have introduced non-linear feeds to prioritize content you’ll probably like. does that address some of this feed fatigue?
  answer: |
    right. computers are good at recognizing patterns, and our behavior follows patterns.

    applied to feeds: while you were gone, someone you engage often posted something which got a lot of likes, or whatever, so we’re going to show you that first.

    i don’t doubt the algorithm’s efficiency, but i am skeptical of the intention of the minds behind those algorithms, and if i want them making those decisions for me.

rss:
  question: where does rss fit into this?
  answer: |
    well, there is so much money tied up in services and apps. it’s hard for an open standard to survive when the big players are essentially branded proprietary rss readers.

    beyond the specification, rss readers also had that “unread count” which grows and grows as new posts are pulled in. a little anxiety producing. honestly, i wasn’t a huge fan of rss. i want to see content in the context of the site.

    this is obvious when considering design. a decision like the choice of typography can give words new meaning and all that… if it were just about content, then yeah, a homogenous feed is fine, but it’s real important to keep the context intact.

built:
  question: how was it built?
  answer: |
    the app uses a little framework called [choo](https://github.com/yoshuawuyts/choo) by yoshua wuyts. it’s somewhat similar to react or angular, but without a lot of the bloat. at times it feels very similar to [elm](http://elm-lang.org/), which is the direction i think js is headed in. very lightweight and nimble. basically just fun to work with.

    it also doesn’t have a complicated license attached — something which comes with all these “open source” projects by big name organizations.

    yosh also comes at it from a certain angle and understanding i connect with, so i want to support what he’s doing by giving it some additional use.

future:
  question: going forward?
  answer: |
    hey who knows.

    i do think it’s worth noting that i’m not trying to be precious about all this. hardly everything is just stuff on my mind in the form of a usable site/app, as clearly i’m not the best as synthesizing these ideas into words. also a little fuck you aimed towards the culture of designing for maximum user engagement and consumption.

contact:
  question: i have a question/suggestion/thought.
  answer: hmu → [@hardlyevrythng](http://twitter.com/hardlyevrythng/)