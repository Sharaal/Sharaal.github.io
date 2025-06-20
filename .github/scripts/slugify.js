#!/usr/bin/env node

import { slugify } from './utils/slugify.js';

// Prüfe, ob ein Kommandozeilenparameter übergeben wurde
const args = process.argv.slice(2);
    
if (args.length === 0) {
    console.log('No input text provided');
    process.exit(1);
}

const slugifiedText = slugify(args[0]);
console.log(slugifiedText);
