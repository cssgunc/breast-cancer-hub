## BCH Reusable Components

### AccountSettingsHeaderComponent

This is the pink/purple section that is seen above most pages which includes:

1. A person icon (for the account page)
2. A settings icon (for the settings page)

Use it only on pages that the figma indicates.

### CalendarComponent

Displays an interactive calendar for tracking menstrual cycles. It allows users to navigate between months, view period and special days, and toggle an editing mode to log or remove period days, updating the checkup day accordingly.

### ExternalLink

Can be used throughout the app for _external links_ without extra setup.\
Example Usage:\

```
<ExternalLink href="https://example.com">
    Click me to open an external website
</ExternalLink>
```

On web: Opens https://example.com in a new tab.\
On mobile: Opens https://example.com inside an in-app browser instead of the system browser.

More info on ExternalLink is provided belo in the Links section.

### LearnMoreTextContainer

Displays a source attribution message and a "Learn more" link that directs users to an external website about breast cancer when tapped.

### LoadingScreen

This is used as a loading screen while the app is preparing data or resources.

### NotificationComponent

Displays a message with a date and an option to dismiss the notification.\
It has two types of notifications: a general reminder and an overdue notification.

### SelectLanguage

Allows users to choose a language from a dropdown menu. It features a toggle button that expands a list of language options, updating the selected language when a user makes a choice.

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

### External Linking

[Official Expo Documentation here](https://docs.expo.dev/router/navigating-pages)

For external links we are using the `<ExternalLink>` component with the `href` attribute set to the destination route. All links in the app should be buttons with an icon, text, or both to indicate the destination.

Example:

```
<ExternalLink href="/" asChild>
  <Pressable style={styles.button}>
    <Text>home</Text>
    <MaterialIcons name="home" size={24} color="black" />
  </Pressable>
</ExternalLink>
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

**Only use this setup when linking to an external site.**

### Internal Linking

[Official Expo Documentation here](https://docs.expo.dev/versions/latest/sdk/router/#userouter)

For internal linking use the expo router.

Example:

```
import { useRouter } from "expo-router";

{/* Navigate to Home Page */}
<TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
  <Text style={styles.buttonText}>Go to Home</Text>
</TouchableOpacity>
```

**Only use this setup when linking to an internal page within our project.**

## Utility Functions

In "useSettings.ts," you will find these functions:

1. **getSetting**:
   This function's argument is a string key from "SettingsMap", because of the function's generics TS and any TS powered extensions should infer the returning setting value type, use this function any time you want to request a user setting value.
2. **saveSetting**:
   This function's arguments is are a string key from "SettingsMap" and its corresponding value, because of the function's generics TS and any TS powered extensions should infer the setting value type, use this function any time you want to set a user setting value.
3. **backupSettings**:
   This function is meant to backup the user settings to a database, since this leads to a direct database call it should be called as few times as possible. Its intended use-case is to be called after a batch of saveSetting calls are made (such as when a user exits a setting menu).
4. **loadBackupSettings**:
   This function is meant to load user settings from a database, this should only be called when a user logs in
