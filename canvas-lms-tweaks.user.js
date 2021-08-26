// ==UserScript==
// @name         Canvas LMS Tweaks Userscript
// @version      0.1.0
// @description  Various client-side tweaks & bug-fixes to Canvas LMS.
// @author       Enchoseon
// @include      *instructure.com*
// @include      *instructuremedia.com*
// @grant        none
// ==/UserScript==

window.CANVAS_ACTIVE_BRAND_VARIABLES = {};
(function () {
    "use strict";
    // =====================================
    // Branding Modification (does not work)
    // =====================================
    /*
    modifyBranding({
        "primaryDarkened": "#000",
        "primaryLightened": "#000",
        "buttonPrimaryBgdDarkened": "#000",
        "buttonSecondaryBgdDarkened": "#000",
        "fontColorDarkLightened": "#000",
        "linkColorDarkened": "#000",
        "linkColorLightened": "#000",
        "primary": "#000",
        "fontColorDark": "#000",
        "linkColor": "#000",
        "buttonPrimaryBgd": "#000",
        "buttonPrimaryText": "#000",
        "buttonSecondaryBgd": "#000",
        "buttonSecondaryText": "#000",
        "globalNavBgd": "#000",
        "globalNavIconSvgFill": "#000",
        "globalNavIconSvgFillActive": "#000",
        "globalNavMenuItemTextColor": "#000",
        "globalNavMenuItemTextColorActive": "#000",
        "globalNavAvatarBorder": "#000",
        "globalNavMenuItemBadgeBgd": "#000",
        "globalNavMenuItemBadgeText": "#000",
        "globalNavLogoBgd": "#000",
        "watermarkOpacity": "1.0",
        "msapplicationTileColor": "#000",
        "loginBodyBgdColor": "#000",
        "loginBodyBgdShadowColor": "#000",
        "loginContentBgdColor": "none",
        "loginContentBorderColor": "none",
        "loginContentInnerBgd": "none",
        "loginContentInnerBorder": "none",
        "loginContentInnerBodyBgd": "none",
        "loginContentInnerBodyBorder": "none",
        "loginContentLabelTextColor": "#000",
        "loginContentPasswordTextColor": "#000",
        "loginFooterLinkColor": "#000",
        "loginFooterLinkColorHover": "#000",
        "loginInstructureLogo": "#000",
        "headerImage": "null",
        "mobileGlobalNavLogo": "null",
        "watermark": "null",
        "favicon": "null",
        "appleTouchIcon": "null",
        "msapplicationTileSquare": "null",
        "msapplicationTileWide": "null",
        "rightSidebarLogo": "null",
        "loginBodyBgdImage": "null",
        "loginLogo": "null",
    });
    */
    // ===
    // CSS
    // ===
    // Main LMS
    if (window.location.href.includes("instructure.com")) {
        injectCSS(`
            /* Responsiveness / Visibility */
            .planner-completed-items {
                opacity: 0.21;
                transition: opacity 169ms;
            }
            .planner-completed-items:hover {
                opacity: 0.99;
            }
            div.NotificationBadge-styles__activityIndicator.NotificationBadge-styles__hasBadge div span {
                zoom: 125%;
                background-color: lightgreen;
                -webkit-animation: pulsate-fwd 690ms ease-in-out infinite both;
                animation: pulsate-fwd 690ms ease-in-out infinite both;
            }
            body.primary-nav-transitions .menu-item__text {
                transition: transform 69ms cubic-bezier(0.21, 0.420, 0.69, 1.275),opacity 42ms; /* Replaced 300ms "bounce" animation with faster sliding animation */
                transition-delay: 21ms; /* Removed 300ms delay */
            }
            /* Debloat */
            #immersive_reader_mount_point, /* The immersive reader is just another eyesore unless you actually use it */
            #new_activity_button, /* The new activity button doesn't work because most teachers don't remove/delete old assignments—It's usually just clutter that links to clutter */
            #footer, /* The footer is pointless linkspam for Instructure LTI's social media & leglese that nobody reads */
            #global_nav_history_link, /* Nobody uses the history button */
            #global_nav_help_link, /* If you're using this userscript, you're already proficient enough at using Canvas. Also, the "Ask Your Instructor a Question" feature is obsoleted by emailing—I also doubt you even knew it existed */
            #primaryNavToggle, /* Removes expand toggle for leftmost sidebar */
            #conversation-actions button[disabled], /* Remove buttons that were already disabled by your organization in the inbox—Why those basic features would be disabled is beyond me. */
            a.ic-app-header__logomark { /* Remove the clipart-looking icon that is your organizations logo from the leftmost sidebar */
                display: none !important;
            }
            div.Grouping-styles__root.planner-grouping a { /* Remove class banner images from dashboard in list view (makes them solid colors) */
                background-image: none !important;
                height: auto;
            }
            /* Animations */
            @-webkit-keyframes pulsate-fwd {
                0% {
                    -webkit-transform: scale(1);
                    transform: scale(1);
                }
                50% {
                    -webkit-transform: scale(1.1);
                    transform: scale(1.1);
                }
                100% {
                    -webkit-transform: scale(1);
                    transform: scale(1);
                }
            }
            @keyframes pulsate-fwd {
                0% {
                    -webkit-transform: scale(1);
                    transform: scale(1);
                }
                50% {
                    -webkit-transform: scale(1.1);
                    transform: scale(1.1);
                }
                100% {
                    -webkit-transform: scale(1);
                    transform: scale(1);
                }
            }
        `);
    }
    // Video Player
    if (window.location.href.includes("instructuremedia.com")) {
        injectCSS(`
            /* Responsiveness / Visibility */
            /* Bug Fix: Video player bar blocks bottom of the video & is not easily dismissed, which is problematic when pausing to take notes */
            /* The video player bar is now see-through when you're not hovering over it */
            .dVRGv_crZr {
                opacity: 0.25;
                transition: opacity 250ms;
            }
            .dVRGv_crZr:hover {
                opacity: 0.95;
            }
        `);
    }
    // ==
    // JS
    // ==
    /* Bug Fix: Scrolling to the top of the announcements causes the entire page to jump downwards (making it hard to close announcements) */
    /* All wheel event listeners are now disabled when on the dashboard. A cleaner solution is probably possible. */
    if (document.getElementById("announcementWrapper") !== null) {
        window.addEventListener(
            "wheel",
            function (event) {
                event.stopImmediatePropagation();
            },
            true
        );
    }
    /* UX: When visiting the dashboard, automatically scroll down to the actual dashboard rather than the announcements */
    window.addEventListener("load", function () {
        const y = document.getElementById("dashboard_header_container").getBoundingClientRect().top + window.scrollY;
        window.scroll({
            top: y,
            behavior: "smooth",
        });
    });
    /* UX: Always collapse leftmost sidebar */
    document.getElementsByTagName("body")[0].classList.remove("primary-nav-expanded");
    // =========
    // Functions
    // =========
    /* Inject CSS into the header */
    function injectCSS(css) {
        var s = document.createElement("style");
        s.setAttribute("type", "text/css");
        s.appendChild(document.createTextNode(css));
        document.getElementsByTagName("head")[0].appendChild(s);
    }
    /* Provide a layer of abstraction for branding modifications (doesn't work) */
    function modifyBranding(m) {
        window.CANVAS_ACTIVE_BRAND_VARIABLES = {
            "ic-brand-primary-darkened-5": m.primaryDarkened + "!important",
            "ic-brand-primary-darkened-10": m.primaryDarkened + "!important",
            "ic-brand-primary-darkened-15": m.primaryDarkened + "!important",
            "ic-brand-primary-lightened-5": m.primaryLightened + "!important",
            "ic-brand-primary-lightened-10": m.primaryLightened + "!important",
            "ic-brand-primary-lightened-15": m.primaryLightened + "!important",
            "ic-brand-button--primary-bgd-darkened-5": m.buttonPrimaryBgdDarkened + "!important",
            "ic-brand-button--primary-bgd-darkened-15": m.buttonPrimaryBgdDarkened + "!important",
            "ic-brand-button--secondary-bgd-darkened-5": m.buttonSecondaryBgdDarkened + "!important",
            "ic-brand-button--secondary-bgd-darkened-15": m.buttonSecondaryBgdDarkened + "!important",
            "ic-brand-font-color-dark-lightened-15": m.fontColorDarkLightened + "!important",
            "ic-brand-font-color-dark-lightened-30": m.fontColorDarkLightened + "!important",
            "ic-link-color-darkened-10": m.linkColorDarkened + "!important",
            "ic-link-color-lightened-10": m.linkColorLightened + "!important",
            "ic-brand-primary": m.primary + "!important",
            "ic-brand-font-color-dark": m.fontColorDark + "!important",
            "ic-link-color": m.linkColor + "!important",
            "ic-brand-button--primary-bgd": m.buttonPrimaryBgd + "!important",
            "ic-brand-button--primary-text": m.buttonPrimaryText + "!important",
            "ic-brand-button--secondary-bgd": m.buttonSecondaryBgd + "!important",
            "ic-brand-button--secondary-text": m.buttonSecondaryText + "!important",
            "ic-brand-global-nav-bgd": m.globalNavBgd + "!important",
            "ic-brand-global-nav-ic-icon-svg-fill": m.globalNavIconSvgFill + "!important",
            "ic-brand-global-nav-ic-icon-svg-fill--active": m.globalNavIconSvgFillActive + "!important",
            "ic-brand-global-nav-menu-item__text-color": m.globalNavMenuItemTextColor + "!important",
            "ic-brand-global-nav-menu-item__text-color--active": m.globalNavMenuItemTextColorActive + "!important",
            "ic-brand-global-nav-avatar-border": m.globalNavAvatarBorder + "!important",
            "ic-brand-global-nav-menu-item__badge-bgd": m.globalNavMenuItemBadgeBgd + "!important",
            "ic-brand-global-nav-menu-item__badge-text": m.globalNavMenuItemBadgeText + "!important",
            "ic-brand-global-nav-logo-bgd": m.globalNavLogoBgd + "!important",
            "ic-brand-watermark-opacity": m.watermarkOpacity + "!important",
            "ic-brand-msapplication-tile-color": m.msapplicationTileColor + "!important",
            "ic-brand-Login-body-bgd-color": m.loginBodyBgdColor + "!important",
            "ic-brand-Login-body-bgd-shadow-color": m.loginBodyBgdShadowColor5 + "!important",
            "ic-brand-Login-Content-bgd-color": m.loginContentBgdColor + "!important",
            "ic-brand-Login-Content-border-color": m.loginContentBorderColor + "!important",
            "ic-brand-Login-Content-inner-bgd": m.loginContentInnerBgd + "!important",
            "ic-brand-Login-Content-inner-border": m.loginContentInnerBorder + "!important",
            "ic-brand-Login-Content-inner-body-bgd": m.loginContentInnerBodyBgd + "!important",
            "ic-brand-Login-Content-inner-body-border": m.loginContentInnerBodyBorder + "!important",
            "ic-brand-Login-Content-label-text-color": m.loginContentLabelTextColor + "!important",
            "ic-brand-Login-Content-password-text-color": m.loginContentPasswordTextColor + "!important",
            "ic-brand-Login-footer-link-color": m.loginFooterLinkColor + "!important",
            "ic-brand-Login-footer-link-color-hover": m.loginFooterLinkColorHover + "!important",
            "ic-brand-Login-instructure-logo": m.loginInstructureLogo + "!important",
            "ic-brand-header-image": m.headerImage + "!important",
            "ic-brand-mobile-global-nav-logo": m.mobileGlobalNavLogo + "!important",
            "ic-brand-watermark": m.watermark + "!important",
            "ic-brand-favicon": m.favicon + "!important",
            "ic-brand-apple-touch-icon": m.appleTouchIcon + "!important",
            "ic-brand-msapplication-tile-square": m.msapplicationTileSquare + "!important",
            "ic-brand-msapplication-tile-wide": m.msapplicationTileWide + "!important",
            "ic-brand-right-sidebar-logo": m.rightSidebarLogo + "!important",
            "ic-brand-Login-body-bgd-image": m.loginBodyBgdImage + "!important",
            "ic-brand-Login-logo": m.loginLogo + "!important",
        };
    }
})();
