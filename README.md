# My Scripts
### LinkedIn Job Filter

A Tampermonkey userscript that blurs unwanted job cards in LinkedIn Jobs. Blurred cards remain clickable, so a job can still be opened when needed.

#### Requirements

- A desktop browser supported by Tampermonkey, such as Chrome, Edge, Firefox, or Brave
- The [Tampermonkey](https://www.tampermonkey.net/) browser extension installed

#### Installation

1. Install the Tampermonkey extension in your browser.
2. Open the Tampermonkey dashboard and select **Create a new script**.
3. Replace the default script contents with the contents of [job_filter.js](job_filter.js).
4. Save the script with `Ctrl+S` or `Cmd+S`.
5. Open or refresh [LinkedIn Jobs](https://www.linkedin.com/jobs/).

The script only runs on URLs that match `https://www.linkedin.com/jobs/*`.

#### What It Filters

The script blurs job cards that match any of the following:

- Selected consulting, IT services, semiconductor, electronics, and industrial companies
- Selected IT services, consulting, semiconductor, electronics, and embedded-system industries
- Jobs marked **Easy Apply**
- Job titles containing `embedded`, `hardware`, or `Java`
- Staff-level engineering titles, such as `Staff Software Engineer` and `Software Engineer - Staff`
- Jobs whose title or visible description requires more than one year of experience, including `2+ YOE`, `3 years of experience`, `2-4 years`, and `minimum 2 years`

The title-only filters do not blur a role merely because Java, hardware, or embedded work is mentioned elsewhere in its description.

### Customization

Open [job_filter.js](job_filter.js) in a text editor and update the relevant lists near the top of the file:

- `BLOCKED_COMPANIES` for company names
- `BLOCKED_INDUSTRIES` for industries or descriptions
- `BLOCKED_FEATURES` for labels such as Easy Apply
- `BLOCKED_JOB_TITLES` for title-only matches
- `MORE_THAN_ONE_YOE` for experience requirements

Each entry is a JavaScript regular expression. Save the userscript in Tampermonkey, then refresh LinkedIn Jobs to apply changes.

### How It Works

LinkedIn dynamically loads and recycles job cards while scrolling. The script scans the left-hand job-results column after page load, watches for page updates, and performs a periodic backup scan. Matching cards receive a blur and lower opacity but retain normal click behavior.

### Troubleshooting

- Confirm that the script is enabled in the Tampermonkey dashboard.
- Refresh the LinkedIn Jobs page after saving a change.
- Make sure you are on a LinkedIn Jobs URL, not the main LinkedIn feed.
- Open the browser developer console to see messages beginning with `[LI FILTER]`; these show which cards were blurred and why.
