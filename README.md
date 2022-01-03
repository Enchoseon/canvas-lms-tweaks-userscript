# Canvas LMS Tweaks Userscript

Various client-side tweaks &amp; bug-fixes to Canvas LMS, the BloatPress of Learning Management Systems.

This userscript is geared towards students. If you're a teacher, try [Canvancement](https://github.com/jamesjonesmath/canvancement).

# [Convenient Install Link](https://github.com/Enchoseon/canvas-lms-tweaks-userscript/raw/main/canvas-lms-tweaks.user.js)

Tested on Tampermonkey for Firefox 91 & Chrome 92.

Doesn't help all that much with speed on devices weaker than a cellphone, yet.

# Tweaks

- __UX__: When visiting the dashboard, you'll automatically scroll down to the actual dashboard, past the announcements.
- __UX__: Completed items in the dashboard in list view are now greyed out unless hovered over.
- __UX__: Notification balls are now green & have a small animation.
- __UX__: Leftmost sidebar bounce animation has been sped up greatly & replaced with a slide.
- __Debloat__: Removed the immersive reader button, which is an eyesore unless you actually use it.
- __Debloat__: Removed the new activity button from the dashboard in list view, which usually links to old, improperly set up assignments rather than useful information.
- __Debloat__: Removed the footer, which only contained linkspam for Instructure LTI's social media & legal stuff nobody reads.
- __Debloat__: Removed the "History" & "Help" buttons from the leftmost sidebar. Nobody uses these features.
- __Debloat__: Removed the expand toggle from the leftmost sidebar.
- __Debloat__: Leftmost sidebar is now always in collapsed mode.
- __Debloat__: Removed buttons that were already greyed-out & disabled by your organization in your inbox. Why basic inbox functions would be disabled is beyond me, but at least they won't take up extra space anymore.
- __Debloat__: Removed the organization logo from the top of the leftmost sidebar.
- __Debloat__: Removed class banner images from the dashboard in list view, which were usually poorly cropped & ugly anyways (they are now solid colors instead)
- __Debloat__: Removed the "View Course Stream", "View Course Calendar", & "View Course Notifications" buttons from the course view.
- __Debloat__: Removed class banner images from the dashboard in list & card view (makes them solid colors)
- __Bug Fix__: Video player bar will no longer obstruct the bottom portion of the video.
- __Bug Fix__: Scrolling to the top of the announcements on the dashboard will no longer cause you to jump midway down the page.
