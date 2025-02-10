We already have a few components made for various parts of the app.

High level description stuff of where to find files when you need to work on them

Where to find screens:
steps

When to use ThemedView

Where to find styles for buttons

How to get API responses

If you wanted to navigate between pages, what would you do (expo router) - explain the routes we have

Examples:

## Standard components

### AccountSettingsHeaderComponent
This is the pink/purple section that is seen above most pages which includes:
1. A person icon (for the account page)
2. A settings icon (for the settings page)

Use it only on pages that the figma indicates.

### Collapsible
Displays a section with a title that can be expanded or collapsed to show or hide its content.
- Initially, only the title and right arrow (> icon) appear.
- When clicked, it expands to show the content with a downward arrow (v icon).
- Clicking again collapses it.

### ExternalLink
Can be used throughout the app for external links without extra setup.\
Example Usage:\
```
<ExternalLink href="https://example.com">
    Click me to open an external website
</ExternalLink>
```
On web: Opens https://example.com in a new tab.\
On mobile: Opens https://example.com inside an in-app browser instead of the system browser.

### LoadingScreen
This is used as a loading screen while the app is preparing data or resources. 

### NotificationComponent
Displays a message with a date and an option to dismiss the notification.\
It has two types of notifications: a general reminder and an overdue notification.

### ParallaxScrollView
When used, the content beneath it moves dynamically with the scrolling of the page. 

### ThemedText
Simplifies handling different text styles and colors. It ensures that your text components are consistent with the app’s color scheme.\
Example Usage:\
```
<ThemedText style={styles.highlightedTitleText}>
  Based On Your Symptoms
</ThemedText>
```
Use this component instead of the React Native `<Text>` tag.

### ThemedView
Applies dynamic theming for background colors based on the current light or dark mode theme. Acts as a container, similar to a `<div>`.
```
<ThemedView lightColor="#FFFFFF" darkColor="#333333" style={{ padding: 20 }}>
  <Text>Hello, World!</Text>
</ThemedView>
```
Use this component instead of the React Native `<View>` tag.
## Icons

Icons are bundled with Expo. Use [this page](https://icons.expo.fyi/Index) and apply the filter _MaterialIcons_ to find icons.

Import the _material icons_ library with

`import MaterialIcons from '@expo/vector-icons/MaterialIcons';`

and render them within a view or button:

`<MaterialIcons name="home" size={24} color="black" />`

## Links

[Official Expo Documentation here](https://docs.expo.dev/router/navigating-pages)

Links are `<Link>` elements with the `href` attribute set to the destination route. All links in the app should be buttons with an icon, text, or both to indicate the destination.

This is the template that should be used everywhere a link is required, with text, an icon, or both as required:

```
<Link href="/" asChild>
  <Pressable style={styles.button}>
    <Text>home</Text>
    <MaterialIcons name="home" size={24} color="black" />
  </Pressable>
</Link>
```

with customizable style in the stylesheet in each page:

```
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    borderColor: 'black',
    borderWidth: 2
  }
```

### Utility Functions

In "useSettings.ts," you will find these functions:

1. **getSetting**:
   This function's argument is a string key from "SettingsMap", because of the function's generics TS and any TS powered extensions should infer the returning setting value type, use this function any time you want to request a user setting value.
2. **saveSetting**:
   This function's arguments is are a string key from "SettingsMap" and its corresponding value, because of the function's generics TS and any TS powered extensions should infer the setting value type, use this function any time you want to set a user setting value.
3. **backupSettings**:
   This function is meant to backup the user settings to a database, since this leads to a direct database call it should be called as few times as possible. Its intended use-case is to be called after a batch of saveSetting calls are made (such as when a user exits a setting menu).
4. **loadBackupSettings**:
   This function is meant to load user settings from a database, this should only be called when a user logs in
