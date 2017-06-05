what:
  question: What is hardly everything?
  answer: |
    You add links to a feed. When you click a link, it disappears. You can choose how long that time lasts when adding a link. After that time passes the link appears again.

    To expand on that;

    I follow things in different places to keep up with what they’re doing. things which post most often appear most frequently in my feeds and get more of my attention.

    They drown out the quieter things.

    I want to control how often they appear based on how meaningful they are to me. Similarly, I’ll bookmark things, but not revisit them as it requires hunting around.

    I’d like to both be periodically reminded of things, and not habitually revisiting the same destinations throughout the day.

who:
  question: Who is it for?
  answer: |
    Not everyone. Mostly people who wake up and the first thing they do is check some form of feed, or impulsively revisit the same sites multiple times a day.

    With **Hardly Everything**, when you “follow” or “add” something, you set how often you think you should be looking at it, or will want to look at it, so there isn’t any anxiety about missing something, or feed fatigue from scrolling endlessly.

making:
  question: What led to making it?
  answer: |
    A few years ago I made two sites which placed extreme time scales in the browser—a window often framing fleeting interfaces.

    Those were [a-line-moving-across-a-window-once-every-year.com](http://a-line-moving-across-a-window-once-every-year.com) and [bgcolor-fading-from-black-to-white-every-century.com](http://bgcolor-fading-from-black-to-white-every-century.com).

    They play real-time, so if you sit in-front of your screen for the rest of your life, the background really will fade to white.

    I also made a project called [asdf](asdf.cool) which was a very simple list of links. You could adjust the design to your liking, and it was the first full app-style project I built myself.

data:
  question: Who owns the data?
  answer: |
    This is a real important topic.

    Right now, you own it entirely. For the beta all data is stored locally within your browser. I don’t know anything about what you’re storing, so it’s entirely private. additionally, the site is served over https, so it’s a private and secure connection.

    The downside of this is that you’re unable to sync your links across browsers or machines. You can also accidentally remove all your data by clearing your browser’s data. Because it’s not uploaded anywhere, there is no backup.

    I’d like to fix those problems, perhaps some websocket/webrtc trickery… or maybe a more traditional account-based system — down for feedback…

feeds:
  question: Facebook and Twitter have introduced non-linear feeds to prioritize content you’ll probably like. Does that address some of this feed fatigue?
  answer: |
    Right. Computers are good at recognizing patterns, and our behavior follows patterns.

    Applied to feeds: while you were gone, someone you engage often posted something which got a lot of likes, or whatever, so we’re going to show you that first.

    I don’t doubt the algorithm’s efficiency, but I am skeptical of the intention of the minds behind those algorithms, and if i want them making those decisions for me.

rss:
  question: Where does rss fit into this?
  answer: |
    Well, there is so much money tied up in services and apps. It’s hard for an open standard to survive when the big players are essentially branded proprietary rss readers.

    Beyond the specification, rss readers also had that “unread count” which grows and grows as new posts are pulled in. A little anxiety producing. Honestly, I wasn’t a huge fan of rss. I want to see content in the context of the site.

    This is obvious when considering design. A decision like the choice of typography can give words new meaning and all that… If it were just about content, then yeah, a homogeneous feed is fine, but it’s real important to keep the context intact.

built:
  question: How was it built?
  answer: |
    The app uses a little framework called [choo](https://github.com/yoshuawuyts/choo) by Yoshua Wuyts. It’s somewhat similar to react or angular, but without a lot of the bloat. At times it feels very similar to [elm](http://elm-lang.org/), which is the direction I think js is headed in. Very lightweight and nimble. Basically just fun to work with.

    It also doesn’t have a complicated license attached — something which comes with all these “open source” projects by big name organizations.

    Yosh also comes at it from a certain angle and understanding I connect with, so I want to support what he’s doing by giving it some additional use.

future:
  question: Going forward?
  answer: |
    Hey who knows.

    I do think it’s worth noting that I’m not trying to be precious about all this. Hardly Everything is just stuff on my mind in the form of a usable site/app, as clearly I’m not the best as synthesizing these ideas into words. Also a little fuck you aimed towards the culture of designing for maximum user engagement and consumption.

contact:
  question: I have a question/suggestion/thought.
  answer: hmu, [contact@jon-kyle.com](mailto:contact@jon-kyle.com)