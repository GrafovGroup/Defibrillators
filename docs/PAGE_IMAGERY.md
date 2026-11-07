# Page imagery — 7 November 2026

Built-in image generation mode; no CLI or external generation service. Owner authorized original illustrations and licensed photography. 43 generated scenes, 7 licensed reference images, 50 distinct page subjects in both English and French. Each subject has a different source image; language equivalents and links previewing that same subject share its identity. The approved homepage hero and logos remain unchanged; homepage service cards now use four distinct subject images.

Images are not evidence of inventory, exact supplied configurations, completed installations, company staff, manufacturer endorsement, certification or instructional technique. Four model profiles use explicitly labelled contextual scenes rather than synthetic branded AEDs. The Philips references show carrying cases, not exposed devices. Product schema never treats contextual scenes as device photographs.

Assets live in `public/images/visuals/`; responsive WebP variants are declared in `src/data/visual-assets.json`. Widths are 400/800/1200 where source resolution permits, without upscaling. Every variant is below 150 KB; 400px variants are below 45 KB. Source PNGs and the source manifest are preserved in workspace output `image-enrichment/originals/`, separate from the public release.

To reproduce optimization: `node scripts/prepare-visuals.mjs /absolute/path/to/source-manifest.json`. Conversion only: no synthesized labels or photo retouching. The build uses checked-in derivatives and requires no generator credentials.

## Generation prompts

Shared prompt prefix for all scenes except installation:

> Use case: photorealistic-natural. Asset type: unique editorial service or planning hero for Defibrillators.ca. Make one horizontal 3:2 high-end realistic photograph-style illustration. Calm professional Canadian context, natural daylight, navy/white palette with restrained red details. No brand names or company logos, no certification claims, no watermarks, no readable personal data, no medical emergency or patients. Never copy a specific branded AED. Any equipment is a generic unbranded contextual prop. Keep the important subject fully visible, composed centrally with edge space for responsive crops. Avoid repeated compositions: follow this scene specifically.

### maintenance

Asset: `visuals/maintenance-*.webp`

A maintenance coordinator at a clean workbench checks a sealed generic AED carry bag and a paper inspection checklist, close view of hands and everyday inspection tools, overhead side light. No disassembly or electrical repair.

### programs

Asset: `visuals/programs-*.webp`

Wide elevated view of a meeting table: three small unbranded AED carry cases, three coloured location folders and a laptop displaying a simple abstract multi-location status dashboard without legible text; two coordinators planning in a modern office. Not a wall-cabinet scene.

### training

Asset: `visuals/training-*.webp`

A bright classroom before a training session, adult CPR manikins on clean individual floor mats and clearly separate blue practice-device cases on a side table, an instructor preparing the room in background. No patient, no hands performing compressions or electrode placement, no medical technique demonstration.

### services

Asset: `visuals/services-*.webp`

A facilities coordinator and an installation specialist reviewing a simple unlabeled floor-plan drawing at a reception counter, one closed red equipment bag alongside, bright community building, candid side angle.

### accessories

Asset: `visuals/accessories-*.webp`

An elegant overhead still life of generic AED support supplies: two sealed blank foil electrode pouches, a compact dark battery module, a soft navy carry pouch, sealed gloves and a paper inventory card. Carefully spaced on white, red edging. No exposed pads, no connectors or compatibility markings.

### batteries

Asset: `visuals/batteries-*.webp`

Macro editorial still life of two different generic sealed AED battery modules on a clean navy mat with blank manufacturer-document envelopes, no cells exposed, no brand, no voltage labels or made-up numbers, softly blurred desk behind.

### signage

Asset: `visuals/signage-*.webp`

A bright accessible hallway with a generic green heart-and-lightning location sign and a simple directional arrow at a junction, wayfinding as the subject. No words or corporate logos, no red-cross emblem, no equipment cabinet in frame.

### kits

Asset: `visuals/kits-*.webp`

Top-down arranged emergency response support pouch open on a white table: sealed gloves, a folded towel, blunt-tipped trauma shears and a sealed breathing barrier packet; orderly navy and red pouch. No AED unit, no pills, no patient, no instructional diagrams.

### parts

Asset: `visuals/parts-*.webp`

Close oblique desk photograph of a person comparing a printed equipment reference sheet with blank boxed replacement supplies and a magnifying glass, hands only, generic catalogue grids without readable text. No proprietary device shape.

### packages

Asset: `visuals/packages-*.webp`

Three separate unbranded navy equipment bags of different sizes beside a white empty wall cabinet and sealed supply boxes on a studio floor, three-quarter angle, generous white background and quiet red accent. Conceptual package planning; no branded AED or claims.

### siteAssessment

Asset: `visuals/site-assessment-*.webp`

A building coordinator holding a clipboard and measuring an unobstructed public corridor with a laser distance tool, wide view showing doorway, reception sightline and daylight. No cabinet, no visible laser entering eyes, no text.

### cabinetMounting

Asset: `visuals/cabinet-mounting-*.webp`

Close-up of gloved hands checking a wall-mounted empty cabinet bracket with a spirit level against a neutral white masonry wall; cabinet door and tool kit on a nearby work surface, no person face, no drilling in progress or electrical wires.

### readinessInspection

Asset: `visuals/readiness-inspection-*.webp`

An adult site coordinator visually checking a closed generic AED carry case inside an open wall cabinet while holding a tidy inspection clipboard, over-shoulder composition. No exposed electronics or invented compliance badge.

### expiryTracking

Asset: `visuals/expiry-tracking-*.webp`

Calendar and supply management desktop still life: small red date marker on a text-free monthly grid, sealed electrode pouch, two neutral replacement boxes and a pen, no readable dates or product labels. Tight overhead composition.

### postUse

Asset: `visuals/post-use-*.webp`

A quiet equipment preparation area with a closed generic AED case, a fresh sealed response-kit pouch and a blank incident-document envelope separated neatly on a bench; technician gloved hands organizing only unused supplies. No blood, no patient, no used pads, no claim of real incident.

### assetInventory

Asset: `visuals/asset-inventory-*.webp`

A facilities coordinator using a handheld barcode scanner beside three shelves of closed navy and red equipment bags, generic small unreadable inventory tags, clean storeroom with strong depth and soft daylight. No invented brand or dashboards.

### adultPads

Asset: `visuals/adult-pads-*.webp`

A pair of sealed plain electrode pouches laid beside an adult-size CPR training torso resting on a clean training bench, focus on packaged supplies; do not show exposed electrodes, pad placement, logos or medical instructions.

### paediatricPads

Asset: `visuals/paediatric-pads-*.webp`

A closed small unbranded blue paediatric supplies pouch beside a child-size CPR training manikin on a bright classroom table, focus on size context and sealed supplies. No real child, no electrode placement, no proprietary connector, no labels.

### padBatteryPacks

Asset: `visuals/pad-battery-packs-*.webp`

A sealed generic combined replacement-supply pack in a clear protective outer tray with a closed battery-shaped module and foil supply pouch visible, studio three-quarter angle on pale grey, no connectors, no brand or printed compatibility claims.

### trainingDevices

Asset: `visuals/training-devices-*.webp`

Two blue clearly practice-only generic trainer devices resting beside unplugged training cables and a CPR manikin head in a classroom storage tray; understated embossed geometric practice icons only, no medical brand, no operational instructions.

### carryCases

Asset: `visuals/carry-cases-*.webp`

Single unbranded red-and-navy soft equipment carry case open to show padded empty compartments, shoulder strap carefully arranged, outdoors on a clean picnic table in soft daylight with a blurred recreation field. No actual device included.

### outdoorCabinets

Asset: `visuals/outdoor-cabinets-*.webp`

Weather-resistant closed white equipment cabinet under a sheltered exterior canopy at a Canadian recreation building, light autumn rain beyond the canopy and clear accessible paved approach. Generic green heart/lightning pictogram only, no brands, no temperature ratings or installation measurements.

### defibrillators

Asset: `visuals/defibrillators-*.webp`

A person planning an AED purchase at a bright table, three neutral closed equipment carry cases in the background and two comparison sheets without readable text in the foreground; calm research moment, no brands or actual device faces.

### compare

Asset: `visuals/compare-*.webp`

Editorial close-up of two different unbranded CLOSED equipment carry cases side by side, one compact soft navy bag and one grey rigid case, with a simple blank comparison checklist and pen on a light surface. No device visible, no prices, no logos.

### industries

Asset: `visuals/industries-*.webp`

Wide daylight architectural scene of a mixed-use Canadian community complex with office wing, recreation entry and retail frontage, ordinary anonymous buildings without signs, clean accessible pedestrian paths, no equipment, no landmarks implying an actual client.

### offices

Asset: `visuals/offices-*.webp`

Modern small Canadian office reception with accessible circulation, plants, navy seating and an empty white equipment cabinet discreetly visible on a side wall, daylight, no people, no brand signs.

### industrial

Asset: `visuals/industrial-*.webp`

Clean warehouse safety station near an unobstructed pedestrian route, high visibility floor markings, shelving and a generic closed emergency-equipment case on a wall shelf, worker in hardhat at a distance, no heavy machinery operation, no words or brands.

### properties

Asset: `visuals/properties-*.webp`

Bright condominium lobby with mailboxes, accessible vestibule and management desk, discreet unbranded wall cabinet, no unit numbers or personal information, warm modern Canadian architecture, no people.

### schools

Asset: `visuals/schools-*.webp`

Empty Canadian school gym before an activity, wooden floor, stacked mats and a closed generic red equipment carry bag at the adult staff desk, no children or school logos, broad daylight composition.

### fitness

Asset: `visuals/fitness-*.webp`

A modern fitness studio reception with treadmills softly blurred in background, a tidy generic wall safety station near the entrance, no clients or brands, bright side lighting, strong geometric composition.

### hospitality

Asset: `visuals/hospitality-*.webp`

Quiet hotel lobby with navy lounge chairs, reception desk, luggage trolley and a small discreet closed white safety cabinet on an accessible wall, warm daylight, no hotel name or people, upscale but realistic.

### retail

Asset: `visuals/retail-*.webp`

A neighbourhood retail store entrance with customer-service counter and unobstructed checkout approach; staff member in plain navy clothing checks an unlabeled safety folder, ordinary shelving blurred, no brands, no products with text.

### municipalities

Asset: `visuals/municipalities-*.webp`

Municipal recreation centre interior with swimming-pool viewing windows, an accessible corridor and generic closed equipment cabinet; empty public space in daylight, no municipal crest, no people in pool.

### residential

Asset: `visuals/residential-*.webp`

Warm modern home living room with an adult family member calmly reviewing a blank equipment planning booklet at a side table and a closed compact red carry case on an accessible shelf. No illness or medical emergency, no brand, no patient.

### resources

Asset: `visuals/resources-*.webp`

Editorial library-table scene with neatly arranged safety-reference folders, a laptop showing an abstract document outline, reading glasses and a simple notebook; daylight, no titles, logos or device, appealing research context.

### about

Asset: `visuals/about-*.webp`

Canadian community meeting room with two project coordinators examining a simple blank plan and supply list, candid wide view, inclusive adult people in everyday business clothing, no handshake, no logos, no claim these are real employees.

### buying

Asset: `visuals/buying-*.webp`

Overhead purchase-planning desk with blank procurement checklist, calculator, small layout sketch, neutral document folder and closed red equipment bag partly in view, precise organized composition, no currency amounts or brands.

Final precise-object edit (same source scene): Use case: precise-object-edit. Edit only the paper on the central clipboard: remove all readable words and replace them with short pale grey horizontal rule lines, retaining the navy checkboxes and red divider. The checklist must be completely language-neutral for an English/French website. Preserve every other object, composition, lighting, floor-plan illustration, calculator, bag, hands, and original scene unchanged. No new text or numbers. Keep horizontal 3:2 format.

### costs

Asset: `visuals/costs-*.webp`

Close still life of a calculator, plain budget workbook with simple unlabelled rows, pen, sealed neutral supply box and small calendar, warm side light, no prices or specific sums, no AED unit.

### zoll3

Asset: `visuals/zoll3-*.webp`

A close editorial view of a CPR training coordinator reviewing an abstract compression-feedback graph on a tablet beside a single torso manikin on a table, with a closed navy equipment bag in the background. No branded device and no hands demonstrating treatment. This illustrates feedback planning, not a ZOLL device.

### cr2

Asset: `visuals/cr2-*.webp`

A bright modern public library reception with an accessible equipment cabinet holding a closed plain white rescue case, an open clear walkway, books and a librarian checking a blank readiness sheet at a distance. Wide architectural composition. This illustrates public-access AED planning, not a LIFEPAK device.

### heartsine

Asset: `visuals/heartsine-*.webp`

Outdoor volunteer preparation at a dry covered community pavilion overlooking a river walking trail. One compact closed plain red soft equipment bag with a shoulder strap and folded route map rests on a wooden bench. A volunteer's sleeve and hand checking the map enter at the edge. No visible device. This illustrates portable-equipment planning, not a HeartSine device.

### g5

Asset: `visuals/g5-*.webp`

A facilities supervisor in an ordinary factory safety office beside a window overlooking orderly factory floor, reviewing a plain equipment instruction binder with an unbranded closed grey hard case on the desk. Worker wears sensible navy workwear. No device is visible. This illustrates staff-readiness planning, not a Powerheart device.

### installation

Asset: `visuals/installation-*.webp`

Use case: photorealistic-natural. Asset type: original service-page editorial hero photograph for Defibrillators.ca, AED installation planning. Create a high-end, realistic horizontal 3:2 composition of an installation specialist in a navy work shirt, seen mostly in profile, using a spirit level beside a clean empty white wall-mounted AED cabinet in a bright Canadian workplace corridor. Red subtle accents, navy and warm white visual palette. Cabinet has a plain transparent door, no brand logos, no device inside, no certification labels, no text. A closed tool bag rests safely off the walking route. Daylight, accurate hands and ordinary architecture, calm professional preparation. Keep the full cabinet and relevant tools clearly visible with generous edge space. No emergency, no patient, no CPR demonstration, no posed handshake, no watermark. This is illustrative service context, not a photograph of actual company staff.

## Additional licensed photographs

| Asset            | Source / author                                                                                                                 | Licence                                                         | Review                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------- |
| philips-frx-case | [AED Wroclaw main station 2013 P01.JPG](https://commons.wikimedia.org/wiki/File:AED_Wroclaw_main_station_2013_P01.JPG), Pnapora | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) | FRx carrying case in a station cabinet; device is concealed.  |
| lifeline-view    | [Lifeline View (Defibtech).jpg](<https://commons.wikimedia.org/wiki/File:Lifeline_View_(Defibtech).jpg>), Puradigm              | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | Three views show the VIEW label; retained without alteration. |

Both photographs resized and converted to WebP; source/licence attribution is visible in both language footers and image metadata. Existing reference photos retain the licences in [ASSETS.md](ASSETS.md).

Rejected `Défibrillateur LifeLine View DEFIBTECH avec écran vidéo.jpg` because its visible label identifies Lifeline PRO despite the Commons filename. ZOLL's public distributor gallery was reviewed, but no permission for this website was established; none of its photographs were copied.
