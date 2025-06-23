import fs from 'fs';
import { glob } from 'glob';
import matter from 'gray-matter';

export async function getExistingTitles() {
    const mdFiles = await glob(['_drafts/**/*.md', '_posts/**/*.md']);
    console.log('mdFiles', mdFiles);
    return mdFiles.map(file => {
        const content = fs.readFileSync(file, 'utf8');
        const { data } = matter(content);
        if (data.title) {
            return data.title;
        }
    }).filter(Boolean);
}
