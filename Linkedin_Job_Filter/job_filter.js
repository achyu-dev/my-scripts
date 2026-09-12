// ==UserScript==
// @name         LinkedIn Job Filter - Blur Unwanted Job Cards and WITCCHA and service based companies
// @namespace    http://tampermonkey.net/
// @version      4.1
// @description  Blur unwanted companies, industries, job titles, experience requirements, and Easy Apply jobs on LinkedIn while keeping cards clickable.
// @match        https://www.linkedin.com/jobs/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    console.log('[LI FILTER] v4 loaded');

    // ============================================================
    // BLOCKED COMPANIES
    // ============================================================

    const BLOCKED_COMPANIES = [

        // -------------------------
        // Big 4
        // -------------------------

        /\bdeloitte\b/i,
        /\bdeloitte usi\b/i,
        /\bdeloitte india\b/i,

        /\bpwc\b/i,
        /pricewaterhousecoopers/i,
        /price\s*waterhouse\s*coopers/i,

        /\bkpmg\b/i,

        /\bernst\s*(?:&|and)\s*young\b/i,
        /\bey\b/i,


        // -------------------------
        // IT Services / Consulting
        // -------------------------

        /\bwipro\b/i,
        /\bBristlecone\b/i,
        /\bBasenine\b/i,
        /\bFortrea\b/i,
        /\bNarayana Health\b/i,
        /\bTakeda\b/i,
        /\bCognizant\b/i,
        /\'O'Neil Digital Solutions\b/i,
        /\bDelta Technology Hub\b/i,
        /\bCapgemini\b/i,
        /\bAlaan الآن\b/i,
        /\bSwish\b/i,
        /\bMolex\b/i,
        /\bNNE\b/i,
        /\b UL Solutions \b/i,
        /\bInfosys\b/i,
        /\bTech Mahindra\b/i,
        /\bHCL\b/i,
        /\bTata Consultancy Services\b/i,
        /\bVIDA Digital Identity\b/i,
        /\bUplers\b/i,
        /\bemagine\b/i, 
        /\bNTT DATA North America\b/i,
        /\bHappiest Minds Technologies\b/i,
        /\bQuest Global\b/i,
        /\bNTT DATA Services\b/i,
        /\bSkycliff IT\b/i,
        /\bNTT DATA\b/i,
        /\bcapco\b/i,
        /\binfosys\b/i,
        /\bTELUS Digital\b/i,
        /\bcgi\b/i,
        /\bLarsen & Toubro\b/i,
        /\bbnp\s+paribas\b/i,
        /\Automation Anywhere\b/i,
        /\bgenpact\b/i,
        /\btata consultancy services\b/i,
        /\bLouis Dreyfus Company\b/i,
        /\btcs\b/i,
        /\btech\s*mahindra\b/i,
        /\bhexaware\b/i,
        /\bhcltech\b/i,
        /\bhcl tech\b/i,
        /\bhcl technologies\b/i,
        /\bViceroy Engineering\b/i,
        /\bQuixta\b/i,
        /\bLTM\b/i,
        /\bcapgemini\b/i,
        /\bcapgemini engineering\b/i,
        /\bcognizant\b/i,
        /\bExxonMobil India Careers\b/i,
        /\bcognizant technology solutions\b/i,
        /\baccenture\b/i,
        /\bitc infotech\b/i,
         /\bInnoWave\b/i,
        /\bTech Mahindra\b/i,
        /\bLTI\b/i,
        /\bLarsen & Toubro Infotech\b/i,
        /\bLarsen and Toubro Infotech\b/i,
        /\bZebra Technologies\b/i,
        /\bMindtree\b/i, 
        /\bEXL\b/i,
        /\bMphasis\b/i,
        /\bPersistent Systems\b/i,
        /\bVirtusa\b/i,
        /\bHexaware\b/i,
        /\bUST\b/i,
        /\bBirlasoft\b/i,
        /\bSyntel\b/i,
        /\bNIIT Technologies\b/i,
        /\bNIIT Tech\b/i,
        /\bNIIT\b/i,
        /\bTechwave\b/i,
        /\bCyient\b/i,
        /\bSonata Software\b/i,
        /\bZensar Technologies\b/i,
        /\bKPIT Technologies\b/i,
        /\bSasken Technologies\b/i,
        /\bSasken\b/i,
        /\bTata Elxsi\b/i,
        /\bTata Elxsi Limited\b/i,
        /\bTata Elxsi Ltd\b/i,
        /\WSP in India\b/i,
        /\bTekWissen India\b/i,
        /\bPeople Prime Worldwide\b/i,
        /\bWSP\b/i,
        /\bWSP Global\b/i,
        /\bWSP USA\b/i,
        /\bWSP Canada\b/i,
        /\bWSP UK\b/i,
        /\bWSP Australia\b/i,
        /\bSAIKOR SECURITY TRAINING AND SERVICES PRIVATE LIMITED\b/i,
        /\bathenahealth \b/i,
        /\bXylem\b/i,
        // -------------------------
        // Semiconductor / Hardware
        // -------------------------
        /\mouser electronics\b/i,
        /\bGIVA\b/i,
        /\bIMI\b/i,
        /\bsamsung\b/i,
        /\bSchindler Group\b/i,
        /\bLinde\b/i,
        /\SiFive\b/i,
        /\bsamsung\b/i,
        /\bsamsung electronics\b/i,
        /\bHSBC\b/i,
        /\bTSMC\b/i,
        /\bBCE Global Tech - A Bell Canada Company\b/i,
        /\bDraup\b/i,
        /\bintel\b/i,
        /\bJai Kisan\b/i,
        /\bICON plc\b/i,
        /\bAltera\b/i,

        /\bqualcomm\b/i,
        /\bbp\b/i,
        /\bnvidia\b/i,

        /\bamd\b/i,
        /\bDeutsche Bahn\b/i,
        /\bJob Directory-CyOpsPath\b/i,
        /\btexas instruments\b/i,

        /\bmicron\b/i,

        /\bmediatek\b/i,

        /\bnxp\b/i,

        /\binfineon\b/i,

        /\bstmicroelectronics\b/i,
        /\bstmicro\b/i,

        /\brenesas\b/i,

        /\bbroadcom\b/i,

        /\bmarvell\b/i,
        /\bFirst Citizens India\b/i,
        /\banalog devices\b/i,

        /\bmicrochip technology\b/i,
        /\bHuntingCube\b/i,
        /\bLight & Wonder\b/i,
        /\bwestern digital\b/i,

        /\bseagate\b/i,

        /\bsynopsys\b/i,

        /\bcadence\b/i,


        // -------------------------
        // Electronics / Industrial
        // -------------------------

        /\bsiemens\b/i,
        /\bPRI INDIA IT SERVICES PRIVATE LIMITED\b/i,
        /\bKONE\b/i,
        /\bABB\b/i,
        /\bRockwell Automation\b/i,
        /\bMichael Page\b/i,
        /\bCollins Aerospace\b/i,
        /\bbosch\b/i,

        /\bhoneywell\b/i,

        /\bschneider electric\b/i,

        /\babb\b/i,

        /\bphilips\b/i,

        /\bsony\b/i,

        /\bpanasonic\b/i,

        /\blg electronics\b/i,

        /\bfoxconn\b/i,

        /\bflex\b/i,
        /\bjabil\b/i,
        /\bJobBeeper\b/i,
    ];


    // ============================================================
    // BLOCKED INDUSTRIES / DESCRIPTIONS
    // ============================================================

    const BLOCKED_INDUSTRIES = [

        // -------------------------
        // IT Services
        // -------------------------

        /it services and it consulting/i,
        /it services & it consulting/i,
        /it services and consulting/i,
        /it services & consulting/i,

        /technology consulting/i,


        // -------------------------
        // Electronics
        // -------------------------

        /semiconductor manufacturing/i,

        /\bsemiconductors\b/i,

        /consumer electronics/i,

        /computers and electronics manufacturing/i,

        /computer hardware manufacturing/i,

        /electrical equipment manufacturing/i,

        /appliances, electrical, and electronics manufacturing/i,

        /electronics manufacturing/i,

        /electronic manufacturing services/i,

        /embedded systems/i,

        /industrial automation/i
    ];


    // ============================================================
    // BLOCKED JOB FEATURES
    // ============================================================

    const BLOCKED_FEATURES = [

        // Blur Easy Apply jobs
        /\beasy apply\b/i
    ];


    // ============================================================
    // BLOCKED JOB TITLES
    //
    // These are deliberately checked against the job title only, so
    // a Java or hardware mention elsewhere in a card does not hide it.
    // ============================================================

    const BLOCKED_JOB_TITLES = [

        // Use letter/digit boundaries because JavaScript treats `_` as
        // a word character (for example, `_Embedded` misses `\b`).
        /(?:^|[^a-z0-9])embedded(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])test(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])testing(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])power apps(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])power BI(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Senior(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Power BI Developer Profile(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Chromecast(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Software Engineer Complier Technologies(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Associate(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Helpdesk Engineer(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Systems(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])BIW Design Engineer(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Payroll(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Thermal Engineer(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])oracle(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])INH2026- BI Developer (?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Shopify(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Manufacturing(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Support(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Automation(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Web Accessibility Engineer(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])ASIC Verification & Validation Engineer(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Electrical, Control & Instrumentation (EC&I) Engineer(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Google Workspace Admin - Software Engineer(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Lead(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Intermediate(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Flutter(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Operations(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Materials(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Analyst(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Assembly(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Electrical Engineer(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Data Scientist(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Design Engineer(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Workday Studio(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])PhD(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])ECAD(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Digital Claims(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Engineer 2(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Engineer II(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Analyzer(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Engineer 3(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Engineer III(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Data Conversion Developer(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Security(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Silicon(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Data Engineer(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])CAD Application(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Wordpress(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])Data Analyst(?:$|[^a-z0-9])/i,
        /\bconsult(?:ant|ing)\b/i,
        /\bquality\s+ass(?:urance|uarance)\b/i,
        /\bquality\s+engineer\b/i,
        /(?:^|[^a-z0-9])qa(?:$|[^a-z0-9])/i,
        /(?:^|[^a-z0-9])\.net(?:$|[^a-z0-9])/i,
        /\bhardware\b/i,
        /\bjava\b/i,
        /\bpython\s+automation\s+engineer\b/i,
        /\bQuality Systems Engineer Laboratory Systems\b/i,
        // Covers Staff Software Engineer, Software Engineer - Staff,
        // Staff-level Software Engineer, etc.
        /\bstaff(?:[-\s]+level)?\s+(?:software|swe|application|platform|backend|frontend|full[ -]?stack)?\s*(?:engineer|developer)\b/i,
        /\b(?:software|swe|application|platform|backend|frontend|full[ -]?stack)\s*(?:engineer|developer)\s*[-,/]?\s*staff(?:[-\s]+level)?\b/i,
        /\bsalesforce\b/i,
        /\bpersistent disk\b/i,
    ];


    // More than one year of experience, whether LinkedIn displays it
    // in the title or in a description snippet (for example, "2+ YOE").
    const MORE_THAN_ONE_YOE = [

        /\b(?:[2-9]|[1-9]\d)\s*\+\s*(?:yoe|years?|yrs?)\b/i,
        /\b(?:[2-9]|[1-9]\d)\s*(?:years?|yrs?)\s+(?:of\s+)?experience\b/i,
        /\b(?:[2-9]|[1-9]\d)\s*(?:-|to)\s*(?:[2-9]|[1-9]\d)\s*(?:years?|yrs?)\b/i,
        /\b(?:minimum|min\.?|at\s+least)\s+(?:[2-9]|[1-9]\d)\s*(?:years?|yrs?)\b/i
    ];


    // ============================================================
    // CSS
    // ============================================================

    const style = document.createElement('style');

    style.textContent = `

        /*
         * Blur unwanted cards.
         *
         * IMPORTANT:
         * We do NOT use pointer-events:none.
         * The blurred cards remain clickable.
         */

        .tm-li-blocked-card {
            filter: blur(7px) !important;
            opacity: 0.28 !important;

            transition:
                filter 0.15s ease,
                opacity 0.15s ease !important;
        }

    `;

    document.head.appendChild(style);


    // ============================================================
    // HELPERS
    // ============================================================

    function normalize(text) {

        return (text || '')
            .replace(/\s+/g, ' ')
            .trim();
    }


    function shouldBlock(text) {

        text = normalize(text);

        if (!text) {
            return false;
        }

        return (

            BLOCKED_COMPANIES.some(
                regex => regex.test(text)
            )

            ||

            BLOCKED_INDUSTRIES.some(
                regex => regex.test(text)
            )

            ||

            BLOCKED_FEATURES.some(
                regex => regex.test(text)
            )

            ||

            MORE_THAN_ONE_YOE.some(
                regex => regex.test(text)
            )

        );
    }


    function getJobTitle(card) {

        const titleElement =
            card.querySelector(
                [
                    'a.job-card-list__title',
                    'a.job-card-container__link',
                    '[data-view-name="job-card-title"]',
                    '.artdeco-entity-lockup__title a',
                    'h3 a',
                    'h3'
                ].join(', ')
            );

        return normalize(
            titleElement && titleElement.innerText
        );
    }


    function shouldBlockJobTitle(title) {

        return BLOCKED_JOB_TITLES.some(
            regex => regex.test(title)
        );
    }


    function shouldBlockCard(card) {

        const cardText = normalize(card.innerText);
        const jobTitle = getJobTitle(card);

        return (
            shouldBlock(cardText)
            ||
            shouldBlockJobTitle(jobTitle)
        );
    }


    // LinkedIn's left rail includes the signed-in user's profile
    // summary. Its employer/title text can match the block lists, but
    // it is not a job card and must never be blurred.
    function isProfileSummaryCard(card) {

        const profileLinks = [];

        if (
            card.matches &&
            card.matches('a[href*="/in/"]')
        ) {
            profileLinks.push(card);
        }

        profileLinks.push(
            ...card.querySelectorAll(
                'a[href*="/in/"]'
            )
        );

        return profileLinks.some(anchor => {

            let url;

            try {
                url = new URL(anchor.href, location.origin);
            } catch {
                return false;
            }

            return (
                /^\/in\/[^/]+\/?$/.test(url.pathname)
                &&
                normalize(anchor.innerText).length >= 2
            );
        });
    }


    // ============================================================
    // IDENTIFY WHY SOMETHING WAS BLOCKED
    // ============================================================

    function getBlockReason(text, jobTitle = '') {

        text = normalize(text);

        for (const regex of BLOCKED_COMPANIES) {

            if (regex.test(text)) {
                return 'blocked company';
            }
        }


        for (const regex of BLOCKED_INDUSTRIES) {

            if (regex.test(text)) {
                return 'blocked industry';
            }
        }


        for (const regex of BLOCKED_FEATURES) {

            if (regex.test(text)) {
                return 'Easy Apply';
            }
        }


        for (const regex of MORE_THAN_ONE_YOE) {

            if (regex.test(text)) {
                return 'more than 1 YOE';
            }
        }


        if (shouldBlockJobTitle(jobTitle)) {
            return 'blocked job title';
        }


        return 'unknown';
    }


    // ============================================================
    // FIND LEFT-HAND JOB CARD
    // ============================================================

    function findLeftJobCard(element) {

        let current = element;

        let bestCandidate = null;


        for (
            let i = 0;
            i < 14 && current;
            i++
        ) {

            if (!current.getBoundingClientRect) {

                current = current.parentElement;

                continue;
            }


            const rect =
                current.getBoundingClientRect();


            const text =
                normalize(current.innerText);


            // -------------------------
            // Basic dimensions
            // -------------------------

            const cardSized = (

                rect.width >= 200 &&

                rect.width <= 550 &&

                rect.height >= 60 &&

                rect.height <= 350

            );


            // -------------------------
            // Must be left side
            // -------------------------

            const onLeft = (

                rect.left <
                window.innerWidth * 0.48

            );


            const reasonableText = (

                text.length >= 5 &&

                text.length <= 2000

            );


            if (
                cardSized &&
                onLeft &&
                reasonableText
            ) {

                bestCandidate = current;

            }


            // -------------------------
            // Prefer semantic card
            // -------------------------

            if (

                (
                    current.tagName === 'LI' ||

                    current.getAttribute('role') ===
                    'listitem'
                )

                &&

                cardSized

                &&

                onLeft

            ) {

                return current;

            }


            current =
                current.parentElement;
        }


        return bestCandidate;
    }


    // ============================================================
    // BLUR CARD
    // ============================================================

    function blurCard(card, matchedText) {

        if (!card) {
            return;
        }


        if (isProfileSummaryCard(card)) {

            card.classList.remove(
                'tm-li-blocked-card'
            );

            return;
        }


        card.classList.add(
            'tm-li-blocked-card'
        );


        if (!card.dataset.tmLogged) {

            const reason =
                getBlockReason(
                    card.innerText,
                    getJobTitle(card)
                );


            console.log(

                '[LI FILTER] BLURRED:',
                reason,
                '| matched:',
                matchedText,
                '| card:',
                normalize(card.innerText)
                    .substring(0, 250)

            );


            card.dataset.tmLogged =
                'true';
        }
    }


    // ============================================================
    // METHOD 1
    //
    // Search visible text in left-hand results
    // ============================================================

    function scanLeftResults() {

        const elements =
            document.querySelectorAll(
                'p, span, div, a'
            );


        for (const element of elements) {

            const rect =
                element.getBoundingClientRect();


            // -------------------------
            // Ignore invisible elements
            // -------------------------

            if (
                rect.width === 0 ||
                rect.height === 0
            ) {

                continue;
            }


            // -------------------------
            // Ignore right-side panel
            // -------------------------

            if (
                rect.left >
                window.innerWidth * 0.48
            ) {

                continue;
            }


            const text =
                normalize(element.innerText);


            if (!text) {
                continue;
            }


            /*
             * Only inspect reasonably small text
             * chunks so we don't match huge parent
             * containers.
             */

            if (text.length > 220) {
                continue;
            }


            if (!shouldBlock(text)) {
                continue;
            }


            const card =
                findLeftJobCard(element);


            if (!card) {
                continue;
            }


            blurCard(
                card,
                text
            );
        }
    }


    // ============================================================
    // METHOD 2
    //
    // Inspect likely card containers directly
    // ============================================================

    function scanPossibleCards() {

        const elements =
            document.querySelectorAll(
                'li, div[role="listitem"], article'
            );


        for (const element of elements) {

            const rect =
                element.getBoundingClientRect();


            // -------------------------
            // Invisible element
            // -------------------------

            if (
                rect.width === 0 ||
                rect.height === 0
            ) {

                continue;
            }


            // -------------------------
            // Only inspect likely
            // left-side job cards
            // -------------------------

            if (

                rect.left >
                window.innerWidth * 0.48

                ||

                rect.width < 200

                ||

                rect.width > 550

                ||

                rect.height < 60

                ||

                rect.height > 350

            ) {

                continue;
            }


            const text =
                normalize(
                    element.innerText
                );


            if (!text) {
                continue;
            }


            if (shouldBlockCard(element)) {

                blurCard(
                    element,
                    getJobTitle(element) || text.substring(0, 120)
                );
            }
        }
    }


    // ============================================================
    // METHOD 3
    //
    // Specifically find Easy Apply text
    // ============================================================

    function scanEasyApply() {

        const elements =
            document.querySelectorAll(
                'span, a, button, div'
            );


        for (const element of elements) {

            const rect =
                element.getBoundingClientRect();


            // Must be left side
            if (
                rect.left >
                window.innerWidth * 0.48
            ) {

                continue;
            }


            const text =
                normalize(
                    element.innerText
                );


            // Exact-ish Easy Apply detection
            if (
                !/\beasy apply\b/i.test(text)
            ) {

                continue;
            }


            // Avoid giant containers
            if (text.length > 80) {
                continue;
            }


            const card =
                findLeftJobCard(element);


            if (card) {

                blurCard(
                    card,
                    'Easy Apply'
                );
            }
        }
    }


    // ============================================================
    // MAIN
    // ============================================================

    function run() {

        scanLeftResults();

        scanPossibleCards();

        scanEasyApply();
    }


    // ============================================================
    // INITIAL RUNS
    // ============================================================

    setTimeout(
        run,
        300
    );

    setTimeout(
        run,
        800
    );

    setTimeout(
        run,
        1500
    );

    setTimeout(
        run,
        3000
    );


    // ============================================================
    // WATCH LINKEDIN'S DYNAMIC UI
    // ============================================================

    let debounceTimer;


    const observer =
        new MutationObserver(() => {

            clearTimeout(
                debounceTimer
            );


            debounceTimer =
                setTimeout(
                    run,
                    150
                );

        });


    observer.observe(
        document.body,
        {
            childList: true,
            subtree: true
        }
    );


    // ============================================================
    // BACKUP SCAN
    //
    // LinkedIn sometimes recycles job card DOM
    // elements when scrolling.
    // ============================================================

    setInterval(
        run,
        1500
    );

})();
