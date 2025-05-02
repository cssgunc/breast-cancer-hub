# Process for translating self-exam cards

1. Navigate to breast-cancer-hub/app/i18n/locales. This is where you will find the already made json files containing the translated strings from other cards. Please reference these if you are confused on how to format anything.
2. Right-click on locales and make a new folder with the locale of the language you are translating for. To find the locale for the language you are translating, find the component called SelectLanguage under components/SelectLanguage. In this file you will find all of the languages and their respective locale. 
3. Inside of that new folder make a new file called translations.json
4. Inside of that file copy and paste this into the file:
```
{
    "CHECK_IN_MIRROR_F": "",
    "CHECK_NIPPLES_F": "",
    "SITTING_STANDING_F": "",
    "COLLARBONE_F": "",
    "IN_BED_F": "",
    "CHECK_IN_MIRROR_M": "",
    "CHECK_NIPPLES_M": "",
    "SITTING_STANDING_M": "",
    "COLLARBONE_M": "",
    "IN_BED_M": "",
    "SIGNS_SYMPTOMS_1_F": "",
    "SIGNS_SYMPTOMS_2_F": "",
    "SIGNS_SYMPTOMS_3_F": "",
    "SIGNS_SYMPTOMS_4_F": "",
    "SIGNS_SYMPTOMS_5_F": "",
    "SIGNS_SYMPTOMS_6_F": "",
    "SIGNS_SYMPTOMS_1_M": "",
    "SIGNS_SYMPTOMS_2_M": "",
    "SIGNS_SYMPTOMS_3_M": "",
    "SIGNS_SYMPTOMS_4_M": "",
    "PAINFUL_PAINLESS_SYMPTOMS_F_M": "",
}
```
6. In your browser, navigate to [BCH self-exam cards](https://www.breastcancerhub.org/news-2/self-breast-exam-card). This is where you will find all of the translated self-exam cards.
7. Scroll to find a card that has yet to be translated and click on the pink card for that language (the pink cards correlate with all keys ending in _F). 
8. Right click on the card and select 'open image in new tab'
9. Go to the image in the new tab and then right click it again and select 'search with google lens'
10. Now, you can highlight and copy text into the json file you created for that language. The key labeled "CHECK_IN_MIRROR_F" is the first step for each card and the key labeled "IN_BED_F" is the last (they are in order so you just need to copy the text from step 1 into CHECK_IN_MIRROR, copy the text from step 2 into CHECK_NIPPLES and so on). Repeat for the blue card (corresponds with keys ending in _M).
11. The pink card has 6 signs/symptoms while the blue card has 4. Same as the steps, copy and paste text into their respective key in order as they appear on the card. 
12. Lastly, the "PAINFUL_PAINLESS_SYMPTOMS_F_M" key is not included in the cards, so just go over to google translate and find the translation for "Painless or painful tumor" in the language you are translating. This text will be the same for both pink and blue cards.
13. Next, navigate to app/i18n/index.ts. In this file you will need to import the file you just made (ex: import translationId from "./locales/id-ID/translations.json";). Then, right underneath this within const resources you need to add in 2 more lines for the locale you just added (ex:   "en-US": { translation: translationEn }, en: { translation: translationEn },). Of course, you need to change the locales to the locale of the language you just translated. After that you're done!