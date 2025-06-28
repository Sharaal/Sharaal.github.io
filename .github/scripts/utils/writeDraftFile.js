import fs from 'fs';

export async function writeDraftFile(date, sanatizedTitle, slugifiedTitle, sanitizedContent) {
    const draftFile = `_drafts/${date}-${slugifiedTitle}.md`;
    const draftContent = `---
layout: "post"
language: "de"
title: "${sanatizedTitle.replace(/"/g, '\\"')}"
aigenerated: true
---

${sanitizedContent}
`;
    await fs.writeFileSync(draftFile, draftContent);
}
