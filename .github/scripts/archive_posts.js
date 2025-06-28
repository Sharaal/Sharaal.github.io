import fs from 'fs';
import { glob } from 'glob';
import matter from 'gray-matter';

async function main() {
    const postFiles = await glob(['_posts/**/*.md']);
    console.log('postFiles', postFiles);

    postFiles.sort((aPostFile, bPostFile) => {
        const aDate = aPostFile.substring(7, 17);
        const bDate = bPostFile.substring(7, 17);
        if (aDate === bDate) {
            return 0;
        }
        if (aDate < bDate) {
            return -1;
        }
        return 1;
    });
    console.log('postFiles', postFiles);

    const archiveAmount = postFiles.length - process.env.MAX_POSTS;
    if (archiveAmount <= 0) {
        console.log('No posts to archive');
        return;
    }

    console.log(`Archiving ${archiveAmount} posts...`);

    const aiGeneratedFiles = postFiles.filter((postFile) => {
        const content = fs.readFileSync(postFile, 'utf8');
        const { data } = matter(content);
        return data.aigenerated;
    });
    console.log('aiGeneratedFiles', aiGeneratedFiles);

    console.log(aiGeneratedFiles.slice(0, archiveAmount));
    for (const aiGeneratedFile of aiGeneratedFiles.slice(0, archiveAmount)) {
        const archiveFile = aiGeneratedFile.replace('_posts', '_archives');
        fs.renameSync(aiGeneratedFile, archiveFile);
        console.log(`Archived: ${aiGeneratedFile} to ${archiveFile}`);
    }

    console.log('Archiving completed.');
}

main().catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
});
