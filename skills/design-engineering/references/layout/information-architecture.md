---
title: information-architecture
summary: Structure follows the user's mental model. Group long settings, tabs only for views of one thing, two levels of menu before breadcrumbs, search logs as rename requests, the primary action always in view, first value before any tour, errors that name a recovery.
tags: [layout, information-architecture, navigation, settings, onboarding]
---

# Information architecture

Information architecture decides what a user can find before any pixel is styled. The rule under every item here: arrange and name things the way the user already thinks about them, not the way the codebase or the org chart is split. A flat structure buries everything equally; hierarchy is something you build on purpose. Visual hierarchy inside one screen is [[grouping-by-space]]; this node is the structure across screens.

## Grouping

- **Long settings get sections, not a scroll.** Past about a dozen options, split them under a side nav with named groups (Account, Billing, Notifications), each a short page. Forty toggles on one page have no hierarchy.
- **Progressive disclosure.** Show what most users need; put the rare options behind an "Advanced" section or a detail page.
- **Name by the user's model.** "Send messages in the background", not "Enable async relay mode". Internal jargon on a label is a bug report waiting to happen.

## Navigation depth

- **Tabs are views of one thing**: this week / month / year, or one record's Overview / Activity / Settings. Unrelated destinations are navigation, not tabs ([[component-confusables]]).
- **Two levels of menu, then stop.** A third nested dropdown loses people. Flatten it, or move depth into pages with breadcrumbs and a URL that carries the location ([[url-as-state]]).
- **Search logs are rename requests.** If people keep searching "invoices" while the nav says "Billing", rename the item. Heavy search for browsable things means the IA failed.

## Keeping the next step visible

- **The primary action never sits only at the bottom of a long page.** Anchor it in a sticky bar or the header; most visitors never scroll to the end.
- **Destructive actions live apart from confirm**: separate them by space and a visual break, never side by side as equals ([[destructive-actions]]).
- **Onboarding delivers value first.** Creating the user's first project in one step beats an eight-stop tour. A tour explains the product; the shortcut proves it.

## Dead ends

- **Empty views explain and act**: why it's empty, plus the button that fills it ([[empty-loading-states]]).
- **Error pages name the failure and a specific recovery**: "That link expired. Request a new one", not "Something went wrong" with a back button.

## When to apply

Planning a new section, settings page, or nav; reviewing a product where users "can't find" things; any time a third menu level or a twelfth tab is proposed.

## Gotcha

Renaming beats restructuring. Before redrawing the sitemap, check whether the labels are the problem: a mislabeled item in the right place fails the same way as a well-labeled one in the wrong place, and the label is a one-line fix.

## Sources

- Emil Kowalski's design-engineering practice, distilled by HKTITAN.
- Related: [[grouping-by-space]], [[url-as-state]], [[destructive-actions]], [[empty-loading-states]], [[design-vocabulary]].
